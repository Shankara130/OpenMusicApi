const autoBind = require('auto-bind');

class UploadsHandler {
    constructor(storageService, albumsService, validator) {
        this._storageService = storageService;
        this._albumsService = albumsService;
        this._validator = validator;

        autoBind(this);
    }

    async postUploadAlbumCoverHandler(request, h) {
        const { cover } = request.payload;
        this._validator.validateImageHeaders(cover.hapi.headers);

        const { id } = request.params;
        const coverUrl = await this._storageService.writeFile(cover, cover.hapi);

        await this._albumsService.updateAlbumCover(id, coverUrl);

        const response = h.response({
            status: 'success',
            message: 'Sampul berhasil diunggah',
        });
        response.code(201);
        return response;
    }
}

module.exports = UploadsHandler;
