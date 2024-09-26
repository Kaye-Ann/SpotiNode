const express = require('express');
const path = require('path');
const SpotifyRouter = require('../routes/SpotifyRouter'); // Adjusted path

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());


app.use('/', SpotifyRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





/*
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
let accessToken;

async function authenticateSpotify() {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
        params: {
            grant_type: 'client_credentials'
        },
        headers: {
            'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    accessToken = response.data.access_token;
}



authenticateSpotify().catch(err => console.error(err));

app.get('/search', async (req, res) => {
    const searchTerm = req.query.q;
    if (!searchTerm) return res.render('index', { songs: [], searchTerm });

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                q: searchTerm,
                type: 'track'
            }
        });
        const songs = response.data.tracks.items.map(track => ({
            title: track.name,
            artist: track.artists[0].name,
            url: track.preview_url
        }));
        res.render('index', { songs, searchTerm });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching songs from Spotify');
    }
});
*/