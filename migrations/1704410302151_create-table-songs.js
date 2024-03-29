exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('songs', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        title: {
          type: 'VARCHAR(50)',
          notNull: true,
        },
        year: {
          type: 'INT',
          notNull: true,
        },
        performer: {
          type: 'VARCHAR(35)',
          notNull: true,
        },
        genre: {
          type: 'VARCHAR(12)',
          notNull: true,
        },
        duration: {
          type: 'INT',
        },
        albumId: {
          type: 'VARCHAR(50)',
        },
        created_at: {
          type: 'TEXT',
          notNull: true,
        },
        updated_at: {
          type: 'TEXT',
          notNull: true,
        },
      });
};

exports.down = (pgm) => {
    pgm.dropTable('songs');
};
