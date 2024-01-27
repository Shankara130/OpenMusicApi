const mapAlbumsDbToModel = ({
    id,
    name,
    year,
    songs,
    created_at,
    updated_at,
}) => ({
    id,
    name,
    year,
    songs,
    createdAt: created_at,
    updatedAt: updated_at,
});

const mapSongDbToModel = ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    created_at,
    updated_at,
}) => ({
    id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId,
    createdAt: created_at,
    updatedAt: updated_at,
});

const mapPlaylistDbToModel = (playlist) => ({
        id: playlist.id,
        name: playlist.name,
        username: playlist.username,
    });
const filterTitleSongByParam = (song, title) => (song.title.toLowerCase().includes(title));
const filterPerformerSongByParam = (song, performer) => (song.performer.toLowerCase().includes(performer));

module.exports = { mapAlbumsDbToModel, mapSongDbToModel, filterPerformerSongByParam, filterTitleSongByParam, mapPlaylistDbToModel };
