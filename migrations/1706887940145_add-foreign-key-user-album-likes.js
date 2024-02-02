exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addConstraint('useralbumlikes', 'fk_useralbumlikes.userId_users.id', 'FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE');
    pgm.addConstraint('useralbumlikes', 'fk_useralbumlikes.albumId_albums.id', 'FOREIGN KEY ("albumId") REFERENCES albums(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropConstraint('useralbumlikes', 'fk_useralbumlikes.userId_users.id');
    pgm.dropConstraint('useralbumlikes', 'fk_useralbumlikes.albumId_albums.id');
};
