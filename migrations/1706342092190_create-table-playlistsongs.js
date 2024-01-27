/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('playlistsongs', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        playlistId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        songId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('playlistsongs');
};
