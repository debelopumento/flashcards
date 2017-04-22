const mongoose = require('mongoose');

const deckSchema = mongoose.Schema({
    id: String,
    deckName: String,
    users: [
        {
            userId: String,
        },
    ],
});

deckSchema.methods.apiRepr = () => {
    return {
        id: this._id,
        deckName: this.deckName,
        users: this.users,
    };
};

const Decks = mongoose.model('Decks', deckSchema, 'deckscollection');

module.exports = { Decks };
