import React, { PureComponent, PropTypes } from 'react';
import store from '../store';
import reactCSS from 'reactcss';
import { connect } from 'react-redux';
import * as actions from '../actions/actionIndex';
import config from '../config';

class ProgressBar extends PureComponent {
  state = {
    deckLength: 0,
    slotLength: 0,
    WIDTH: config.width,
  };
  componentDidMount() {
    const deckLength = this.props.cards.length;
    this.setState({ deckLength: deckLength });
    const slotLength = Math.round(100 / deckLength);
    this.setState({ slotLength: slotLength });
  }

  render() {
    const greenWidth = this.state.slotLength * this.props.greenCount + '%';
    const greyCount = this.props.cardIndex;
    const greyWidth = this.state.slotLength * greyCount + '%';

    const styles = reactCSS({
      default: {
        progressBar: {
          border: '1px solid #ccc',
          borderRadius: 2,
          width: '90%',
          margin: 'auto',
          marginTop: 15,
          position: 'relative',
          textAlign: 'left',
          height: 25,
        },
        green: {
          backgroundColor: '#02ddba',
          borderRadius: 2,
          width: greenWidth,
          position: 'relative',
          float: 'left',
          height: 25,
        },
        grey: {
          width: greyWidth,
          borderRadius: 2,
          backgroundColor: '#ccc',
          position: 'absolute',
          height: 25,
        },
      },
    });
    return (
      <div style={styles.progressBar}>
        <span style={styles.green} />
        <span style={styles.grey} />
      </div>
    );
  }
}

export default connect(
  storeState => ({
    showInstruction: storeState.showInstruction,
    cards: storeState.cards,
    greenCount: storeState.greenCount,
    cardIndex: storeState.cardIndex,
  }),
  {
    incrementGreenCount: actions.incrementGreenCount,
  }
)(ProgressBar);
