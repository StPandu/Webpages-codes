const API_BASE_URL = 'http://localhost:5000';
const songStatus = document.getElementById('song-status');
const songsTableBody = document.getElementById('songs-table-body');
const songForm = document.getElementById('song-form');

function setSongStatus(message, isError = false) {
  songStatus.textContent = message;
  songStatus.style.color = isError ? '#dc2626' : '#2563eb';
}

function getSongPayload() {
  return {
    name: document.getElementById('song-name').value.trim(),
    release_year: Number(document.getElementById('song-year').value),
    album_id: Number(document.getElementById('song-album-id').value)
  };
}

function resetSongForm() {
  songForm.reset();
}

async function loadSongs() {
  try {
    const response = await fetch(`${API_BASE_URL}/songs`);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message || 'Failed to load songs');

    songsTableBody.innerHTML = result.data.map((song) => `
      <tr>
        <td>${song.id}</td>
        <td>${song.name}</td>
        <td>${song.release_year}</td>
        <td>${song.album_id}</td>
        <td>${song.album_name}</td>
      </tr>
    `).join('');

    setSongStatus(`Loaded ${result.data.length} songs successfully.`);
  } catch (error) {
    setSongStatus(error.message, true);
  }
}

songForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`${API_BASE_URL}/songs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getSongPayload())
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to create song');

    setSongStatus(result.message);
    resetSongForm();
    loadSongs();
  } catch (error) {
    setSongStatus(error.message, true);
  }
});

document.getElementById('song-update-btn').addEventListener('click', async () => {
  const id = document.getElementById('song-id').value;
  if (!id) return setSongStatus('Enter Song ID to update.', true);

  try {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getSongPayload())
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update song');

    setSongStatus(result.message);
    resetSongForm();
    loadSongs();
  } catch (error) {
    setSongStatus(error.message, true);
  }
});

document.getElementById('song-delete-btn').addEventListener('click', async () => {
  const id = document.getElementById('song-delete-id').value;
  if (!id) return setSongStatus('Enter Song ID to delete.', true);

  try {
    const response = await fetch(`${API_BASE_URL}/songs/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete song');

    setSongStatus(result.message);
    resetSongForm();
    loadSongs();
  } catch (error) {
    setSongStatus(error.message, true);
  }
});

document.getElementById('song-reset-btn').addEventListener('click', () => {
  resetSongForm();
  setSongStatus('Form cleared.');
});

loadSongs();