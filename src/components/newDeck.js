import React, { PureComponent } from 'react';
import store from '../store';
import * as actions from '../actions/actionIndex';

class NewDeck extends PureComponent {
    state = {
        deckName: '',
    };

    handleChange = event => {
        const deckName = event.target.value;
        this.setState({ deckName: deckName });
    };

    submit = event => {
        console.log(2, actions.createDeck);
        const deckName = this.state.deckName;
        console.log(3, deckName);

        const facebookId = store.getState().facebookId;
        //store.dispatch(actions.lookupUser(facebookId));

        store.dispatch(actions.createDeck(deckName));
    };

    render() {
        return (
            <div>
                <input
                    type="text"
                    onChange={this.handleChange}
                    placeholder="Enter Deck Name"
                />
                <input type="submit" value="Submit" onClick={this.submit} />
            </div>
        );
    }
}

export default NewDeck;
