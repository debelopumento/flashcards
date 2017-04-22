import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class DeckContainer extends PureComponent {
  render() {
    return (
      <div>
        DeckA
      </div>
    );
  }
}

DeckContainer;

export default connect(storeState => ({
  decks: storeState.decks,
}))(DeckContainer);
