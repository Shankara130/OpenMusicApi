const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongActivitiesService {
    constructor() {
        this._pool = new Pool();
    }

    async activitiesAddSongToPlaylist(playlistId, songId, userId) {
        const querySong = {
            text: 'SELECT title FROM songs WHERE id = $1',
            values: [songId],
        };

        const queryUser = {
            text: 'SELECT username FROM users WHERE id = $1',
            values: [userId],
        };

        const resultSong = await this._pool.query(querySong);
        const resultUser = await this._pool.query(queryUser);

        const songTitle = resultSong.rows[0].title;
        const { username } = resultUser.rows[0];

        const activitiesId = `activity-${nanoid(16)}`;
        const time = new Date().toISOString();

        const query = {
            text: 'INSERT INTO playlistsongactivities VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            values: [activitiesId, playlistId, songId, songTitle, userId, username, 'add', time],
        };

        await this._pool.query(query);
    }

    async activitiesDeleteSongPlaylist(playlistId, songId, userId) {
        const querySong = {
            text: 'SELECT title FROM songs WHERE id = $1',
            values: [songId],
        };

        const queryUser = {
            text: 'SELECT username FROM users WHERE id = $1',
            values: [userId],
        };

        const resultSong = await this._pool.query(querySong);
        const resultUser = await this._pool.query(queryUser);

        const songTitle = resultSong.rows[0].title;
        const { username } = resultUser.rows[0];

        const activitiesId = `activity-${nanoid(16)}`;
        const time = new Date().toISOString();

        const query = {
            text: 'INSERT INTO playlistsongactivities VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            values: [activitiesId, playlistId, songId, songTitle, userId, username, 'delete', time],
        };

        await this._pool.query(query);
    }

    async getActivitiesPlaylist(playlistId) {
        const query = {
            text: 'SELECT * FROM playlistsongactivities WHERE "playlistId" = $1',
            values: [playlistId],
        };

        const result = await this._pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('Aktivitas tidak ditemukan');
        }

        const resultMap = result.rows.map((data) => ({
            username: data.username,
            title: data.songTitle,
            action: data.action,
            time: data.time,
        }));

        return {
            playlistId,
            activities: resultMap,
        };
    }
}

module.exports = PlaylistSongActivitiesService;
