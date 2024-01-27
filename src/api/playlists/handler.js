const autoBind = require('auto-bind');

class PlayslistsHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;

        autoBind(this);
    }

    async postPlaylistHandler(request, h) {
        this._validator.validatePlaylistsPayload(request.payload);

        const { name = 'Untitled' } = request.payload;

        const { id: credentialId } = request.auth.credentials;

        const playlistId = await this._service.addPlaylist({ name, owner: credentialId });

        const response = h.response({
            status: 'success',
            message: 'Playlist berhasil ditambahkan',
            data: {
              playlistId,
            },
          });
          response.code(201);
          return response;
    }

    // eslint-disable-next-line no-unused-vars
    async getPlaylistsHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;

        const playlists = await this._service.getPlaylists(credentialId);

        return {
            status: 'success',
            data: {
              playlists,
            },
        };
    }

    async deletePlaylistHandler(request, h) {
        const { id } = request.params;

        await this._service.deletePlaylist(id);

        return h.response().code(204);
    }
}

module.exports = PlayslistsHandler;
