import { React } from 'react';
import store from '../store';
import reactCSS from 'reactcss';

const Instruction = () => {
  const styles = reactCSS({
    default: {
      instruction: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        border: '2px solid #02ddba',
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 45,
        color: 'white',
        padding: 30,
        position: 'absolute',
      },
    },
  });
  if (store.getState().showInstruction === true) {
    return (
      <div style={styles.instruction}>
        <p>
          All flashcards in this deck would be diplayed in a loop. Please click on the green button if you DO NOT want to see this flashcard in the next round. Click on the red button if you want to review this card again in the next round.
        </p>
      </div>
    );
  } else
    return <div />;
};

export default Instruction;
