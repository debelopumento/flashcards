import React, { PureComponent } from "react";
import reactCSS from "reactcss";
import { connect } from "react-redux";
import * as actions from "../actions/actionIndex";

class Instruction extends PureComponent {
  turnOffInstruction = () => {
    this.props.toggleInstruction();
  };
  render() {
    const styles = reactCSS({
      default: {
        instructionDiv: {
          position: "absolute",
          left: "20%"
        },
        instructionText: {
          position: "relative",
          left: "-12%",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          border: "2px solid #02ddba",
          borderRadius: 15,
          marginTop: 60,
          color: "white",
          padding: 20
        },
        turnOffInstructionButton: {
          backgroundColor: "#02ddba",
          border: 0,
          borderRadius: 3,
          color: "white",
          fontSize: 15
        }
      }
    });
    if (this.props.showInstruction === true) {
      return (
        <div style={styles.instructionDiv}>
          <div style={styles.instructionText}>
            <p>
              All flashcards in this deck would be diplayed in a loop. Please click on the green button if you DO NOT want to see this flashcard in the next round. Click on the red button if you want to review this card again in the next round.
            </p>
            <input
              style={styles.turnOffInstructionButton}
              type="submit"
              value="Got it!"
              onClick={this.turnOffInstruction}
            />
          </div>

        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  storeState => ({
    showInstruction: storeState.showInstruction
  }),
  {
    toggleInstruction: actions.toggleInstruction
  }
)(Instruction);
