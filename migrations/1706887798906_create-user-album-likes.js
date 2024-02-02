exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('useralbumlikes', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        userId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        albumId: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('useralbumlikes');
};
