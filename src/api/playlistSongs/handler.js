const autoBind = require('auto-bind');

class PlaylistSongsHandler {
    constructor(playlistsService, playlistSongsService, playlistSongActivitiesService, validator) {
        this._playlistsService = playlistsService;
        this._playlistSongsService = playlistSongsService;
        this._playlistSongActivitiesService = playlistSongActivitiesService;
        this._validator = validator;

        autoBind(this);
    }

    async postSongToPlaylistHandler(request, h) {
        this._validator.validatePlaylistSongsPayload(request.payload);

        const { id: credentialId } = request.auth.credentials;
        const { id: playlistId } = request.params;
        const { songId } = request.payload;

        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
        const playlistsongId = await this._playlistSongsService.addSongToPlaylist(playlistId, songId);
        await this._playlistSongActivitiesService.activitiesAddSongToPlaylist(playlistId, songId, credentialId);

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan',
            data: {
                playlistsongId,
            },
        });
        response.code(201);
        return response;
    }

    // eslint-disable-next-line no-unused-vars
    async getSongPlaylistsHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const { id: playlistId } = request.params;

        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
        const playlistsongs = await this._playlistSongsService.getSongPlaylists(playlistId);

        return {
            status: 'success',
            data: {
                playlist: playlistsongs,
            },
        };
    }

    // eslint-disable-next-line no-unused-vars
    async deleteSongPlaylistHandler(request, h) {
        this._validator.validatePlaylistSongsPayload(request.payload);
        const { id: credentialId } = request.auth.credentials;
        const { songId } = request.payload;
        const { id: playlistId } = request.params;

        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
        await this._playlistSongsService.deleteSongPlaylist(playlistId, songId);
        await this._playlistSongActivitiesService.activitiesDeleteSongPlaylist(playlistId, songId, credentialId);

        return {
            status: 'success',
            message: 'Lagu berhasil dihapus',
        };
    }

    // eslint-disable-next-line no-unused-vars
    async getActivitiesPlaylistHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const { id: playlistId } = request.params;

        await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

        const activities = await this._playlistSongActivitiesService.getActivitiesPlaylist(playlistId);

        return {
            status: 'success',
            data: activities,
        };
    }
}

module.exports = PlaylistSongsHandler;
