const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: handler.postAlbumHandler,
    },
    {
        method: 'GET',
        path: '/albums',
        handler: handler.getAlbumsHandler,
    },
    {
        method: 'POST',
        path: '/albums/{id}',
        handler: handler.getAlbumByIdHanlder,
    },
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: handler.putAlbumByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: handler.deleteAlbumByIdHandler,
    },
];

module.exports = routes;
