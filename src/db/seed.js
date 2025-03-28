import sequelize from './index.js';
import Section from '../models/Section.js';
import Song from '../models/Song.js';
import Artist from '../models/Artist.js';
import Mix from '../models/Mix.js';
import data from '../utils/data.json';

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

   
    for (const section of data.sections) {
      const createdSection = await Section.create({
        title: section.title,
        type: section.type,
      });

      if (section.type === 'songs') {
        for (const song of section.songs) {
          await Song.create({
            title: song.title,
            image: song.image,
            plays: song.plays,
            genre: song.genre,
            type: 'single', // Default to single for now
            sectionId: createdSection.id,
          });
        }
      } else if (section.type === 'artists') {
        for (const artist of section.artists) {
          await Artist.create({
            name: artist.name,
            image: artist.image,
            bio: artist.bio,
            instagram: artist.socials.instagram,
            twitter: artist.socials.twitter,
            sectionId: createdSection.id,
          });
        }
      } else if (section.type === 'mixes') {
        for (const mix of section.mixes) {
          await Mix.create({
            title: mix,
            sectionId: createdSection.id,
          });
        }
      }
    }

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();