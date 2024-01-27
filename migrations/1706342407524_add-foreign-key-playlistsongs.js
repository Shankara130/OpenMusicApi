exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.addConstraint('playlistsongs', 'fk_playlistsongs.playlistId_playlists.id', 'FOREIGN KEY ("playlistId") REFERENCES playlists(id) ON DELETE CASCADE');
    pgm.addConstraint('playlistsongs', 'fk_playlistsongs.songId_songs.id', 'FOREIGN KEY ("songId") REFERENCES songs(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropConstraint('playlistsongs', 'fk_playlistsongs.playlistId_playlists.id');
    pgm.dropConstraint('playlistsongs', 'fk_playlistsongs.songId_songs.id');
};
