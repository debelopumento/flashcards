const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

mongoose.Promise = global.Promise;

try {
    require("dotenv").config();
} catch (error) {
    console.warn("unable to load .env");
}

const { PORT, DATABASE_URL } = require("./config");
console.log("DATABASE_URL: ", DATABASE_URL);

const { Flashcards } = require("./models-flashcards");
const { Users } = require("./models-users");
const { Decks } = require("./models-decks");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("common"));
app.use(express.static("build"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/build/index.html");
});

//look up user in users collection
app.get("/main/:facebookId", (req, res) => {
    const facebookId = req.params.facebookId;
    Users.find({ facebookId: facebookId })
        .exec()
        .then(data => {
            FACEBOOKID = facebookId;
            if (data.length === 0) {
                //add a new user to userscollection
                const newUser = {
                    facebookId: facebookId,
                    decks: [
                        {
                            deckName: "English",
                            deckId: "5902d22621eaa57b02f3ead2"
                        },
                        {
                            deckId: "590b92770a66580e1296b9c3",
                            deckName: "Math"
                        },
                        {
                            deckId: "58fe929ade9f56f7416a6b0e",
                            deckName: "Japanese"
                        }
                    ]
                };
                Users.create(newUser).then(user => {
                    res.json({ user });
                });
            } else {
                res.json({ data });
            }
        })
        .catch(err => {
            res.json({ message: "Internal server error" });
        });
});

//update user's name in db
app.put("/name/:userId/:name", (req, res) => {
    const name = req.params.name;
    const userId = req.params.userId;
    const request = { name: name };
    Users.findByIdAndUpdate(userId, request)
        .exec()
        .then(data => {
            res.json({ data });
        })
        .catch(err => {
            res.json({ message: "Internal server error" });
        });
});

//update the order of decks for a user in users collection
app.put("/rearrangeDecks/:userId", (req, res) => {
    const userId = req.params.userId;
    Users.findByIdAndUpdate(userId, req.body)
        .exec()
        .then(data => {
            res.json({ data });
        })
        .catch(err => {
            res.json({ message: "Internal server error" });
        });
});

//create a new deck, add this deck to decks collection and add its id to users collection
app.post("/createDeck/:deckName/:userId", (req, res) => {
    const deckName = req.params.deckName;
    const userId = req.params.userId;
    const newDeck = {
        deckName: deckName,
        users: [{ userId: userId }]
    };
    Decks.create(newDeck)
        .then(newDeck => {
            const newDeckId = newDeck._id;
            const updatedDeck = newDeck.toObject();
            updatedDeck.deckId = newDeckId;
            console.log(49, updatedDeck);
            Users.findById(userId).exec().then(user => {
                const decks = user.decks;
                const newDeckObj = {
                    deckId: newDeckId,
                    deckName: deckName,
                    card: []
                };
                decks.push(newDeckObj);
                const newUser = {
                    decks: decks
                };
                Users.findByIdAndUpdate(userId, newUser)
                    .exec()
                    .then(user => {
                        console.log(50, updatedDeck);
                        res.json({ newDeck: updatedDeck });
                    })
                    .catch(err => {
                        res.json({ message: "Internal server error" });
                    });
            });
        })
        .catch(err => {
            res.json({ message: "Internal server error" });
        });
});

//check out deck
app.get("/deck/:deckId", (req, res) => {
    const deckId = req.params.deckId;
    Decks.findById(deckId)
        .exec()
        .then(deck => {
            Flashcards.find({
                decks: {
                    $elemMatch: { deckId: deckId }
                }
            })
                .exec()
                .then(cards => {
                    res.json({ deck, cards });
                });
        })
        .catch(err => {
            res.json({ message: "Internal server error" });
        });
});

//edit a deck
app.put("/editdeck/:deckId", (req, res) => {
    const deckId = req.params.deckId;
    const newDeck = req.body.deckInfo;
    const userId = req.body.userInfo.userId;
    Decks.findByIdAndUpdate(deckId, newDeck)
        .exec()
        .then(data => {
            Users.findById(userId).exec().then(user => {
                const decks = user.decks;
                const newDecks = decks.map(deck => {
                    if (deck.deckId === deckId) {
                        const updatedDeck = {
                            deckName: newDeck.deckName,
                            deckId: deckId
                        };
                        return updatedDeck;
                    } else return deck;
                });
                user.decks = newDecks;
                Users.findByIdAndUpdate(userId, user)
                    .exec()
                    .then(result => {
                        res.json({ newDeck, user });
                    })
                    .catch(e => {
                        res.json({ message: "Internal server error" });
                    });
            });
        })
        .catch(e => {
            res.json({ message: "Internal server error" });
        });
});

//delete a deck
app.delete("/deletedeck/:deckId/:userId", (req, res) => {
    const deckId = req.params.deckId;
    const userId = req.params.userId;
    console.log(81, deckId, userId);
    Decks.findByIdAndRemove(deckId)
        .exec()
        .then(deck => {
            console.log(82, deck);
            //update user's deck list in user database collection
            Users.findById(userId).exec().then(user => {
                const decks = user.decks;
                let newDecks = [];
                decks.forEach(deck => {
                    if (deck.deckId !== deckId) {
                        newDecks.push(deck);
                    }
                });
                console.log(83, newDecks);
                user.decks = newDecks;
                Users.findByIdAndUpdate(userId, user)
                    .exec()
                    .then(result => {
                        res.json({ newDecks, user });
                    })
                    .catch(e => {
                        res.json({ message: "Internal server error" });
                    });
            });
        })
        .catch(err => {
            res.json({ message: "Internal server error" });
        });
});

//create a card
app.post("/createnewcard", (req, res) => {
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
                        res.json({ message: "Internal server error" });
                    });
            });
        })
        .catch(e => {
            res.json({ message: "Internal server error" });
        });
});

//edit a card
app.put("/editCard/:cardId", (req, res) => {
    const cardId = req.params.cardId;
    Flashcards.findByIdAndUpdate(cardId, req.body)
        .exec()
        .then(data => {
            res.json({ data });
        })
        .catch(e => {
            res.json({ message: "Internal server error" });
        });
});

//delete a card
app.delete("/deleteCard/:cardId", (req, res) => {
    const cardId = req.params.cardId;
    Flashcards.findByIdAndRemove(cardId)
        .exec()
        .then(data => {
            res.json({ data });
        })
        .catch(e => {
            res.json({ message: "Internal server error" });
        });
});

app.use("*", function(req, res) {
    res.status(404).json({ message: "Not Found" });
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
                .on("error", err => {
                    mongoose.disconnect();
                    reject(err);
                });
        });
    });
}
function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log("Closing server");
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
