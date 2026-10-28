const API_BASE_URL = 'http://localhost:5000';
const artistStatus = document.getElementById('artist-status');
const artistsTableBody = document.getElementById('artists-table-body');
const artistForm = document.getElementById('artist-form');

function setArtistStatus(message, isError = false) {
  artistStatus.textContent = message;
  artistStatus.style.color = isError ? '#dc2626' : '#2563eb';
}

function getArtistPayload() {
  return {
    name: document.getElementById('artist-name').value.trim(),
    genre: document.getElementById('artist-genre').value.trim(),
    monthly_listeners: Number(document.getElementById('artist-listeners').value)
  };
}

function resetArtistForm() {
  artistForm.reset();
}

async function loadArtists() {
  try {
    const response = await fetch(`${API_BASE_URL}/artists`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to load artists');
    }

    artistsTableBody.innerHTML = result.data.map((artist) => `
      <tr>
        <td>${artist.id}</td>
        <td>${artist.name}</td>
        <td>${artist.genre}</td>
        <td>${artist.monthly_listeners}</td>
      </tr>
    `).join('');

    setArtistStatus(`Loaded ${result.data.length} artists successfully.`);
  } catch (error) {
    setArtistStatus(error.message, true);
  }
}

artistForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    const response = await fetch(`${API_BASE_URL}/artists`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getArtistPayload())
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to create artist');

    setArtistStatus(result.message);
    resetArtistForm();
    loadArtists();
  } catch (error) {
    setArtistStatus(error.message, true);
  }
});

document.getElementById('artist-update-btn').addEventListener('click', async () => {
  const id = document.getElementById('artist-id').value;
  if (!id) return setArtistStatus('Enter Artist ID to update.', true);

  try {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(getArtistPayload())
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update artist');

    setArtistStatus(result.message);
    resetArtistForm();
    loadArtists();
  } catch (error) {
    setArtistStatus(error.message, true);
  }
});

document.getElementById('artist-delete-btn').addEventListener('click', async () => {
  const id = document.getElementById('artist-delete-id').value;
  if (!id) return setArtistStatus('Enter Artist ID to delete.', true);

  try {
    const response = await fetch(`${API_BASE_URL}/artists/${id}`, {
      method: 'DELETE'
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete artist');

    setArtistStatus(result.message);
    resetArtistForm();
    loadArtists();
  } catch (error) {
    setArtistStatus(error.message, true);
  }
});

document.getElementById('artist-reset-btn').addEventListener('click', () => {
  resetArtistForm();
  setArtistStatus('Form cleared.');
});

loadArtists();