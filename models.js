const mongoose = require('mongoose');

const flashcardsSchema = mongoose.Schema({
    facebookId: String,
    decks: [
        {
            deckName: String,
        },
    ],
    cards: [
        {
            cardFront: String,
            cardBack: String,
            deckName: String,
        },
    ],
});

flashcardsSchema.methods.apiRepr = () => {
    return {
        id: this._id,
        facebookId: this.facebookId,
        decks: this.decks,
        cards: this.cards,
    };
};

const Flashcards = mongoose.model(
    'Flashcards',
    flashcardsSchema,
    'flashcardscollection'
);

module.exports = { Flashcards };
