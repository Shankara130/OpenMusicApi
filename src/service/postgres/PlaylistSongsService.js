const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylisySongsService {
    constructor() {
        this._pool = new Pool();
    }

    async addSongToPlaylist(playlistId, songId) {
        const querySong = {
            text: 'SELECT * FROM songs WHERE id = $1',
            values: [songId],
        };
        const resultSong = await this._pool.query(querySong);

        if (!resultSong.rows.length) {
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        const id = `playlist-song-${nanoid(16)}`;

        const query = {
            text: 'INSERT INTO playlistsongs VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, songId],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSongPlaylists(playlistId) {
        const query = {
            text: `SELECT playlistsongs.*, songs.title, songs.performer 
            FROM playlistsongs 
            LEFT JOIN songs ON songs.id = playlistsongs."songId"
            WHERE playlistsongs."playlistId" = $1`,
            values: [playlistId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Playlist tidak ditemukan');
        }

        const queryPlaylist = {
            text: `SELECT playlists.id, playlists.name, users.username FROM playlists 
            LEFT JOIN users ON playlists.owner = users.id
            WHERE playlists.id = $1`,
            values: [playlistId],
        };

        const playlistResult = await this._pool.query(queryPlaylist);
        const playlist = playlistResult.rows[0];

        result.rows = result.rows.map((song) => ({
            id: song.id,
            title: song.title,
            performer: song.performer,
        }));

        return {
            id: playlist.id,
            name: playlist.name,
            username: playlist.username,
            songs: result.rows,
        };
    }

    async deleteSongPlaylist(playlistId, songId) {
        const query = {
            text: 'DELETE FROM playlistsongs WHERE "songId" = $1 AND "playlistId" = $2 RETURNING id',
            values: [songId, playlistId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Lagu gagal dihapus');
        }
    }
}

module.exports = PlaylisySongsService;
