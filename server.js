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
const { Users } = require('./models-users');
const { Decks } = require('./models-decks');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('common'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

let FACEBOOKID;

//look up user in users collection
app.get('/main/:facebookId', (req, res) => {
    const facebookId = req.params.facebookId;
    Users.find({ facebookId: facebookId })
        .exec()
        .then(data => {
            FACEBOOKID = facebookId;
            if (data.length === 0) {
                //add a new user to userscollection
                const newUser = {
                    facebookId: facebookId,
                    decks: [],
                };
                Users.create(newUser).then(user => {
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

//create a new deck, add this deck to decks collection and add its id to users collection
app.post('/createDeck/:deckName/:userId', (req, res) => {
    const deckName = req.params.deckName;
    const userId = req.params.userId;
    const newDeck = {
        deckName: deckName,
        users: [{ userId: userId }],
    };
    Decks.create(newDeck)
        .then(newDeck => {
            const newDeckId = newDeck._id;
            Users.findById(userId).exec().then(user => {
                const decks = user.decks;
                const newDeckObj = {
                    deckId: newDeckId,
                    deckName: deckName,
                    card: [],
                };
                decks.push(newDeckObj);
                const newUser = {
                    decks: decks,
                };
                Users.findByIdAndUpdate(userId, newUser)
                    .exec()
                    .then(user => {
                        res.json({ newDeck });
                    })
                    .catch(err => {
                        res.json({ message: 'Internal server error' });
                    });
            });
        })
        .catch(err => {
            res.json({ message: 'Internal server error' });
        });
});

//check out deck
app.get('/deck/:deckId', (req, res) => {
    const deckId = req.params.deckId;
    Decks.findById(deckId)
        .exec()
        .then(deck => {
            Flashcards.find({
                decks: {
                    $elemMatch: { deckId: deckId },
                },
            })
                .exec()
                .then(cards => {
                    res.json({ deck, cards });
                });
        })
        .catch(err => {
            res.json({ message: 'Internal server error' });
        });
});

//edit a deck
app.put('/editdeck/:deckId', (req, res) => {
    const deckId = req.params.deckId;
    const newDeck = req.body.deckInfo;
    const userId = req.body.userInfo.userId;
    Decks.findByIdAndUpdate(deckId, newDeck)
        .exec()
        .then(data => {
            console.log(80, deckId, 80.1, newDeck, 80.2, userId);
            console.log(81, data);
            Users.findById(userId).exec().then(user => {
                let decks = user.decks;
                const newDecks = decks.map(deck => {
                    if (deck.deckId === deckId) {
                        const updatedDeck = {
                            deckName: newDeck.deckName,
                            deckId: deckId,
                        };
                        return updatedDeck;
                    } else
                        return deck;
                });
                console.log(82);
                user.decks = newDecks;
                Users.findByIdAndUpdate(userId, user)
                    .exec()
                    .then(result => {
                        console.log(83);
                        res.json({ newDeck, user });
                    })
                    .catch(e => {
                        res.json({ message: 'Internal server error' });
                    });
            });
        })
        .catch(e => {
            res.json({ message: 'Internal server error' });
        });
});

//delete a deck
app.delete('/deletedeck/:deckId', (req, res) => {
    const deckId = req.params.deckId;
    Decks.findByIdAndRemove(deckId)
        .exec()
        .then(deck => {
            res.json({ deck });
        })
        .catch(err => {
            res.json({ message: 'Internal server error' });
        });
});

//create a card
app.post('/createnewcard', (req, res) => {
    const newCard = req.body;
    const deckId = newCard.decks[0].deckId;
    Flashcards.create(newCard)
        .then(newCard => {
            Decks.findById(deckId).exec().then(deck => {
                const cards = deck.cards;
                cards.push({ cardId: newCard._id });
                const newDeck = { cards: cards };
                Decks.findByIdAndUpdate(deckId, newDeck)
                    .exec()
                    .then(newDeck => {
                        res.json({ newCard });
                    })
                    .catch(e => {
                        res.json({ message: 'Internal server error' });
                    });
            });
        })
        .catch(e => {
            res.json({ message: 'Internal server error' });
        });
});

//edit a card
app.put('/editCard/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    Flashcards.findByIdAndUpdate(cardId, req.body)
        .exec()
        .then(data => {
            res.json({ data });
        })
        .catch(e => {
            res.json({ message: 'Internal server error' });
        });
});

//delete a card
app.delete('/deleteCard/:cardId', (req, res) => {
    const cardId = req.params.cardId;
    Flashcards.findByIdAndRemove(cardId)
        .exec()
        .then(data => {
            res.json({ data });
        })
        .catch(e => {
            res.json({ message: 'Internal server error' });
        });
});

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
