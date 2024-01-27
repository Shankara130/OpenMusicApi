exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addConstraint('playlistsongactivities', 'fk_playlistsongactivities.playlistId_playlists.id', 'FOREIGN KEY ("playlistId") REFERENCES playlists(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropConstraint('playlistsongactivities', 'fk_playlistsongactivities.playlistId_playlists.id');
};
