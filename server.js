const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

try {
    require('dotenv').config();
} catch (error) {
    console.warn('unable to load .env');
}

const { PORT, DATABASE_URL } = require('./config');
console.log('DATABASE_URL: ', DATABASE_URL);

const { Flashcards } = require('./models-flashcards');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

/*
app.get('/main/:facebookId', (req, res) => {
    const facebookId = req.params.facebookId;
    Flashcards.find({ facebookId: facebookId })
        .exec()
        .then(data => {
            console.log(1, data);
            if (data.length === 0) {
                //add a new user in database
                const newUser = {
                    facebookId: facebookId,
                    decks: [
                        { deckName: 'Japanese Greetings' },
                        { deckName: 'Japanese Numbers' },
                    ],
                    cards: [
                        {
                            cardFront: 'こんにちわ',
                            cardBack: 'Hello',
                            deckName: 'Japanese Greetings',
                        },
                        {
                            cardFront: 'じゃね',
                            cardBack: 'Bye',
                            deckName: 'Japanese Greetings',
                        },
                        {
                            cardFront: 'いち',
                            cardBack: 'One',
                            deckName: 'Japanese Numbers',
                        },
                    ],
                };
                Flashcards.create(newUser).then(user => {
                    res.json({ user });
                });
            } else {
                res.json({ data });
            }
        })
        .catch(err => {
            res.json({ message: 'Internal server error' });
        });
});
*/

app.use('*', function(req, res) {
    res.status(404).json({ message: 'Not Found' });
});

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, err => {
            if (err) {
                return reject(err);
            }
            server = app
                .listen(port, () => {
                    console.log(`Your app is listening on port ${port}`);
                    resolve();
                })
                .on('error', err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
