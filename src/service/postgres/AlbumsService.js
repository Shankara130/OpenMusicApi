const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapAlbumsDbToModel, mapDBToAlbumLike } = require('../../utils');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
    constructor() {
        this._pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, name, year, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Album gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAlbums() {
        const result = await this._pool.query('SELECT * FROM albums');
        return result.rows.map(mapAlbumsDbToModel);
    }

    async getAlbumById(id) {
        const queryAlbum = {
            text: 'SELECT * FROM albums WHERE id = $1',
            values: [id],
        };
        const querySong = {
            text: 'SELECT songs.id, songs.title, songs.performer FROM songs INNER JOIN albums ON albums.id=songs."albumId" WHERE albums.id=$1',
            values: [id],
        };
        const resultAlbum = await this._pool.query(queryAlbum);
        const resultSong = await this._pool.query(querySong);

        if (!resultAlbum.rows.length) {
            throw new NotFoundError('Album tidak ditemukan');
        }
        return {
            id: resultAlbum.rows[0].id,
            name: resultAlbum.rows[0].name,
            year: resultAlbum.rows[0].year,
            coverUrl: resultAlbum.rows[0].cover,
            songs: resultSong.rows,
        };
    }

    async editAlbumById(id, { name, year }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE id = $4 RETURNING id',
            values: [name, year, updatedAt, id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }
    }

    async deleteAlbumById(id) {
        const query = {
            text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }
    }

    async updateAlbumCover(id, coverUrl) {
        const query = {
            text: 'UPDATE albums SET cover =$1 WHERE id = $2 RETURNING id',
            values: [coverUrl, id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album tidak ditemukan');
        }
    }

    async addLikeToAlbum(userId, albumId) {
        const queryLike = {
            text: 'SELECT * FROM useralbumlikes WHERE "userId" = $1 AND "albumId" = $2',
            values: [userId, albumId],
        };

        const existingLike = await this._pool.query(queryLike);

        if (existingLike.rows.length > 0) {
            throw new InvariantError('Gagal menambahkan like. Like sudah ada');
        }
        const id = nanoid(16);
        const query = {
            text: 'INSERT INTO useralbumlikes VALUES($1, $2, $3) RETURNING id',
            values: [id, userId, albumId],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Gagal menambahkan like');
        }
    }

    async deleteLikeFromAlbum(userId, albumId) {
        const query = {
            text: 'DELETE FROM useralbumlikes WHERE "userId" = $1 AND "albumId" = $2 RETURNING id',
            values: [userId, albumId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal menghapus like. Like tidak ditemukan');
        }
    }

    async getAlbumLikes(albumId) {
        const query = {
            text: 'SELECT COUNT("albumId") FROM useralbumlikes WHERE "albumId" = $1',
            values: [albumId],
        };

        const result = await this._pool.query(query);

        return mapDBToAlbumLike(result.rows[0].count);
    }
}

module.exports = AlbumsService;
