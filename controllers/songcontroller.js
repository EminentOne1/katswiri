const songs = [
  { id: 1, title: 'Song 1', artist: 'Artist 1' },
  { id: 2, title: 'Song 2', artist: 'Artist 2' },
  { id: 3, title: 'Song 3', artist: 'Artist 3' },
];

const getAllSongs = async (req, res) => {
  try {
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch songs', error });
  }
  console.log("getAllSongs");
};

const getSongById = async (req, res) => {
  const { id } = req.params; 
  try {
    const song = songs.find(s => s.id === parseInt(id)); 
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    res.json(song); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching song by ID', error });
  }
};

export const SongController = {
  getAllSongs,
  getSongById,
};

