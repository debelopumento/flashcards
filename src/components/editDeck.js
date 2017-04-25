import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import { Link } from 'react-router-dom';
import reactCSS from 'reactcss';
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
        console.log(91, deckName);
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
        const styles = reactCSS({
            default: {
                navBar: {
                    height: 40,
                    paddingTop: 20,
                    paddingBottom: 0,
                    textAlign: 'center',
                },
                button_home: {
                    float: 'center',
                    color: '#4a4c52',
                    padding: 10,
                },
                inputArea: {
                    height: 400,
                },
                input: {
                    display: 'block',
                    height: 60,
                    width: '96%',
                    border: '1px #cccccc solid',
                    fontSize: 30,
                    color: '#555555',
                    borderRadius: 2,
                    textAlign: 'center',
                    margin: 'auto',
                    marginTop: 100,
                },
                buttonContainer: {
                    display: 'block',
                    textAlign: 'center',
                },
                button: {
                    height: 50,
                    width: '48%',
                    fontSize: 20,
                    backgroundColor: '#02ddba',
                    border: 0,
                    borderRadius: 2,
                    color: 'white',
                    margin: 2,
                    marginTop: 15,
                },
            },
        });
        if (this.state.redirect) {
            return <Redirect to="/" />;
        }
        return (
            <div>
                <div style={styles.navBar}>
                    <Link style={styles.button_home} to="/">
                        <i className="fa fa-home fa-2x" aria-hidden="true" />
                    </Link>
                </div>
                <div style={styles.inputArea}>
                    <div>
                        <input
                            style={styles.input}
                            type="text"
                            onChange={this.handleChange}
                            placeholder={this.state.deckName}
                        />
                    </div>
                    <div style={styles.buttonContainer}>

                        <input
                            style={styles.button}
                            type="submit"
                            value="Submit"
                            onClick={this.submitChange}
                        />
                        <input
                            style={styles.button}
                            type="submit"
                            value="Delete Deck"
                            onClick={this.deleteDeck}
                        />
                    </div>
                </div>
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
