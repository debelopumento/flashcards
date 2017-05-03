const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    id: String,
    facebookId: String,
    name: String,
    decks: [
        {
            deckId: String,
            deckName: String,
        },
    ],
});

usersSchema.methods.apiRepr = () => {
    return {
        id: this._id,
        facebookId: this.facebookId,
        name: this.name,
        decks: this.decks,
    };
};

const Users = mongoose.model('Users', usersSchema, 'userscollection');

module.exports = { Users };
