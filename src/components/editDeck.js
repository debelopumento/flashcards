import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import store from '../store';
import * as actions from '../actions/actionIndex';

class EditDeck extends PureComponent {
    state = {
        deckName: '',
        redirect: false,
        deckId: '',
    };

    handleChange = event => {
        const deckName = event.target.value;
        this.setState({ deckName: deckName });
    };

    submitChange = event => {
        const deckName = this.state.deckName;
        const deckId = this.state.deckId;
        this.props.editDeck(deckName, deckId);
        this.setState({ redirect: true });
    };

    deleteDeck = event => {
        const userId = this.props.userId;
        this.props.deleteDeck(this.state.deckId, userId);
        this.setState({ redirect: true });
    };

    componentWillMount() {
        console.log(2, this.props.match);
        this.setState({ deckId: this.props.match.params.deckId });
        this.setState({ deckName: this.props.match.params.deckName });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.deckName}
                />
                <input
                    type="submit"
                    value="Submit"
                    onClick={this.submitChange}
                />
                <input
                    type="submit"
                    value="Delete Deck"
                    onClick={this.deleteDeck}
                />
            </div>
        );
    }
}

export default connect(
    storeState => ({
        userId: storeState.userId,
    }),
    {
        editDeck: actions.editDeck,
        deleteDeck: actions.deleteDeck,
    }
)(EditDeck);
