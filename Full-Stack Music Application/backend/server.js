const express = require('express');
const cors = require('cors');
require('./db');

const artistsRoutes = require('./routes/artistsRoutes');
const albumsRoutes = require('./routes/albumsRoutes');
const songsRoutes = require('./routes/songsRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Music Library API is running',
    endpoints: ['/artists', '/albums', '/songs']
  });
});

app.use('/artists', artistsRoutes);
app.use('/albums', albumsRoutes);
app.use('/songs', songsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});