const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class CollaborationsService {
    constructor() {
        this._pool = new Pool();
    }

    async verifyCollaborator(playlistId, userId) {
        const query = {
            text: 'SELECT * FROM collaborations WHERE "playlistId" = $1 AND "userId" = $2',
            values: [playlistId, userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Kolaborasi gagal diverifikasi');
        }
    }

    async addCollaborator(playlistId, userId) {
        const queryUser = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [userId],
        };

        const resultUser = await this._pool.query(queryUser);

        if (!resultUser.rows.length) {
            throw new NotFoundError('User tidak ditemukan');
        }

        const id = `collaboration-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, userId],
        };

        const result = await this._pool.query(query);

        return result.rows[0].id;
    }

    async deleteCollaborator(playlistId, userId) {
        const query = {
            text: 'DELETE FROM collaborations WHERE "playlistId" = $1 AND "userId" = $2 RETURNING id',
            values: [playlistId, userId],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new InvariantError('Kolaborasi gagal dihapus');
        }
    }
}

module.exports = CollaborationsService;
