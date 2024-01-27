exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addConstraint('collaborations', 'fk_collaborations.playlistId_playlists.id', 'FOREIGN KEY ("playlistId") REFERENCES playlists(id) ON DELETE CASCADE');
    pgm.addConstraint('collaborations', 'fk_collaborations.userId_users.id', 'FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropConstraint('collaborations', 'fk_collaborations.playlistId_playlists.id');
    pgm.dropConstraint('collaborations', 'fk_collaborations.userId_users.id');
};
