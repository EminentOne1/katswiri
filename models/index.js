import { Sequelize } from 'sequelize';
import Admin from './Admin.js';
import Artist from './Artist.js';
import Album from './Album.js';
import Song from './Song.js';
import Mix from './Mix.js';
import Genre from './Genre.js';
import SongMix from './SongMix.js';
import Notification from './Notification.js';
import User from './User.js';

const isProduction = process.env.NODE_ENV === "production";

const sequelize = new Sequelize({
  dialect: 'mysql', 
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'katswiri',
  logging: !isProduction, 
});



Admin.initModel(sequelize);
Artist.initModel(sequelize);
Album.initModel(sequelize);
Song.initModel(sequelize);
Mix.initModel(sequelize);
Genre.initModel(sequelize);
//SongMix.initModel(sequelize);
Notification.initModel(sequelize);
User.initModel(sequelize);

//await sequelize.sync({ force: false, alter: true });
Artist.hasMany(Song, { foreignKey: 'artistId' });


Artist.hasMany(Album, { foreignKey: 'artistId' });
Album.belongsTo(Artist, { foreignKey: 'artistId' });

Album.hasMany(Song, { foreignKey: 'albumId' });
Song.belongsTo(Album, { foreignKey: 'albumId' });

Genre.hasMany(Song, { foreignKey: 'genreId' });
Song.belongsTo(Genre, { foreignKey: 'genreId' });

Genre.hasMany(Mix, { foreignKey: 'genreId' });
Mix.belongsTo(Genre, { foreignKey: 'genreId' });

// Song.belongsToMany(Mix, { through: SongMix, foreignKey: 'songId' });
// Mix.belongsToMany(Song, { through: SongMix, foreignKey: 'mixId' });

export { sequelize, Admin, Artist, Album, Song, Mix, Genre, Notification, User };
