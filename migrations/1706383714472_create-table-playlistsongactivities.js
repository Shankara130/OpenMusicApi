exports.up = (pgm) => {
    pgm.createTable('playlistsongactivities', {
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
        songTitle: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        userId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        username: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        action: {
            type: 'VARCHAR(10)',
            notNull: true,
        },
        time: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP'),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('playlistsongactivities');
};
