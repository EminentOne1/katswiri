import sequelize from './sequelize.js';
import Admin from './Admin.js';
import Artist from './Artist.js';
import Album from './Album.js';
import Song from './Song.js';
import Mix from './Mix.js';
import Genre from './Genre.js';
import Notification from './Notification.js';
import User from './User.js';

const isProduction = process.env.NODE_ENV === "production";

Admin.initModel(sequelize);
Artist.initModel(sequelize);
Album.initModel(sequelize);
Genre.initModel(sequelize); // Initialize Genre before Song
Song.initModel(sequelize);
Mix.initModel(sequelize);
Notification.initModel(sequelize);
User.initModel(sequelize);

await sequelize.sync({ force: false, alter: true });

// Define relationships
Genre.hasMany(Song, { foreignKey: 'genreId' });
Song.belongsTo(Genre, { foreignKey: 'genreId' });

Album.hasMany(Song, { foreignKey: 'albumId' }); // An album has many songs
Song.belongsTo(Album, { foreignKey: 'albumId' }); // A song belongs to an album

export { sequelize, Admin, Artist, Album, Song, Mix, Genre, Notification, User };
