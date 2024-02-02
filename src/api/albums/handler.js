/* eslint-disable no-unused-vars */

const autoBind = require('auto-bind');

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postAlbumHandler(request, h) {
        this._validator.validateAlbumsPayload(request.payload);
        const { name, year } = request.payload;

        const albumId = await this._service.addAlbum({ name, year });

        const response = h.response({
            status: 'success',
            message: 'Album berhasil ditambahkan',
            data: {
                albumId,
            },
        });
        response.code(201);
        return response;
    }

    async getAlbumsHandler() {
        const albums = await this._service.getAlbums();
        return {
            status: 'success',
            data: {
                albums,
            },
        };
    }

    async getAlbumByIdHandler(request, h) {
        const { id } = request.params;
        const album = await this._service.getAlbumById(id);
        return {
            status: 'success',
            data: {
                album,
            },
        };
    }

    async putAlbumByIdHandler(request, h) {
        this._validator.validateAlbumsPayload(request.payload);
        const { id } = request.params;

        await this._service.editAlbumById(id, request.payload);

        return {
            status: 'success',
            message: 'Album berhasil diperbarui',
        };
    }

    async deleteAlbumByIdHandler(request, h) {
        const { id } = request.params;
        await this._service.deleteAlbumById(id);
        return {
            status: 'success',
            message: 'Album berhasil dihapus',
        };
    }

    async postAlbumLikeHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const { id: albumId } = request.params;

        await this._service.getAlbumById(albumId);
        await this._service.addLikeToAlbum(credentialId, albumId);

        const response = h.response({
            status: 'success',
            message: 'Like berhasil ditambahkan',
        });
        response.code(201);
        return response;
    }

    async deleteAlbumLikeHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const { id: albumId } = request.params;

        await this._service.deleteLikeFromAlbum(credentialId, albumId);

        return {
            status: 'success',
            message: 'Like berhasil dihapus',
        };
    }

    async getAlbumLikesHandler(request, h) {
        const { id } = request.params;

        const likes = await this._service.getAlbumLikes(id);

        if (likes.isCache === true) {
            const response = h.response({
                status: 'success',
                data: likes.result,
            });
            response.header('X-Data-Source', 'cache');
            return response;
        }

        return {
            status: 'success',
            data: likes.result,
        };
    }
}

module.exports = AlbumsHandler;
