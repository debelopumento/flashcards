const mongoose = require('mongoose');

const flashcardSchema = mongoose.Schema({
    id: String,
    cardFront: String,
    cardBack: String,
    deckId: String,
});

flashcardSchema.methods.apiRepr = () => {
    return {
        id: this._id,
        cardFront: this.cardFront,
        cardBack: this.cardBack,
        deckId: this.deckId,
    };
};

const Flashcards = mongoose.model(
    'Flashcards',
    flashcardSchema,
    'flashcardscollection'
);

module.exports = { Flashcards };
