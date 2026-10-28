PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    genre TEXT NOT NULL,
    monthly_listeners INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    number_of_listens INTEGER NOT NULL DEFAULT 0,
    artist_id INTEGER NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists(id) ON DELETE CASCADE
);

CREATE TABLE songs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    release_year INTEGER NOT NULL,
    album_id INTEGER NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

INSERT INTO artists (name, genre, monthly_listeners) VALUES
('Taylor Swift', 'Pop', 105000000),
('The Weeknd', 'R&B/Pop', 98000000);

INSERT INTO albums (name, release_year, number_of_listens, artist_id) VALUES
('Midnights', 2022, 1980000000, 1),
('Starboy', 2016, 2100000000, 2);

INSERT INTO songs (name, release_year, album_id) VALUES
('Blank Space', 2014, 1),
('Style', 2014, 1),
('Blinding Lights', 2020, 4),
('Save Your Tears', 2020, 4),
('Starboy', 2016, 5),
('Die For You', 2016, 5);