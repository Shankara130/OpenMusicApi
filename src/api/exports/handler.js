const autoBind = require('auto-bind');

class ExportsHandler {
    constructor(exportsService, playlistsService, validator) {
        this._exportsService = exportsService;
        this._playlistsService = playlistsService;
        this._validator = validator;

        autoBind(this);
    }

    async postExportPlaylistSongsHandler(request, h) {
        this._validator.validateExportPlaylistSongsPayload(request.payload);

        const { playlistId } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

        const message = {
            userId: credentialId,
            playlistId,
            targetEmail: request.payload.targetEmail,
        };

        await this._exportsService.sendMessage('export: songs', JSON.stringify(message));

        const response = h.response({
            status: 'success',
            message: 'Permintaan Anda dalam antrean',
        });
        response.code(201);
        return response;
    }
}

module.exports = ExportsHandler;
