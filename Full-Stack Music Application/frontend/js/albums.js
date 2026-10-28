const API_BASE_URL = 'http://localhost:5000';
const albumStatus = document.getElementById('album-status');
const albumsTableBody = document.getElementById('albums-table-body');
const albumForm = document.getElementById('album-form');

function setAlbumStatus(message, isError = false) {
  albumStatus.textContent = message;
  albumStatus.style.color = isError ? '#dc2626' : '#2563eb';
}

function getAlbumPayload() {
  return {
    name: document.getElementById('album-name').value.trim(),
    release_year: Number(document.getElementById('album-year').value),
    number_of_listens: Number(document.getElementById('album-listens').value),
    artist_id: Number(document.getElementById('album-artist-id').value)
  };
}

function resetAlbumForm() {
  albumForm.reset();
}

async function loadAlbums() {
  try {
    const response = await fetch(`${API_BASE_URL}/albums`);
    const result = await response.json();

    if (!response.ok) throw new Error(result.message || 'Failed to load albums');

    albumsTableBody.innerHTML = result.data.map((album) => `
      <tr>
        <td>${album.id}</td>
        <td>${album.name}</td>
        <td>${album.release_year}</td>
        <td>${album.number_of_listens}</td>
        <td>${album.artist_id}</td>
        <td>${album.artist_name}</td>
      </tr>
    `).join('');

    setAlbumStatus(`Loaded ${result.data.length} albums successfully.`);
  } catch (error) {
    setAlbumStatus(error.message, true);
  }
}

albumForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`${API_BASE_URL}/albums`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getAlbumPayload())
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to create album');

    setAlbumStatus(result.message);
    resetAlbumForm();
    loadAlbums();
  } catch (error) {
    setAlbumStatus(error.message, true);
  }
});

document.getElementById('album-update-btn').addEventListener('click', async () => {
  const id = document.getElementById('album-id').value;
  if (!id) return setAlbumStatus('Enter Album ID to update.', true);

  try {
    const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getAlbumPayload())
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update album');

    setAlbumStatus(result.message);
    resetAlbumForm();
    loadAlbums();
  } catch (error) {
    setAlbumStatus(error.message, true);
  }
});

document.getElementById('album-delete-btn').addEventListener('click', async () => {
  const id = document.getElementById('album-delete-id').value;
  if (!id) return setAlbumStatus('Enter Album ID to delete.', true);

  try {
    const response = await fetch(`${API_BASE_URL}/albums/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete album');

    setAlbumStatus(result.message);
    resetAlbumForm();
    loadAlbums();
  } catch (error) {
    setAlbumStatus(error.message, true);
  }
});

document.getElementById('album-reset-btn').addEventListener('click', () => {
  resetAlbumForm();
  setAlbumStatus('Form cleared.');
});

loadAlbums();