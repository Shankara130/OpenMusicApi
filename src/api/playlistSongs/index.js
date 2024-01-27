const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'playlistSongs',
    version: '2.0.0',
    register: async (server, { playlistsService, playlistSongsService, playlistSongActivitiesService, validator }) => {
        const playlistsHandler = new PlaylistSongsHandler(playlistsService, playlistSongsService, playlistSongActivitiesService, validator);
        server.route(routes(playlistsHandler));
    },
};
