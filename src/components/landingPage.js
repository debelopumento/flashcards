import React, { PureComponent } from "react";
import { connect } from "react-redux";
import store from "../store";
import * as actions from "../actions/actionIndex";
import reactCSS from "reactcss";
import FacebookLoginButton from "./facebookLogin";
import "../index.css";
import img1 from "../../public/images/landingPageImage-1.png";
import img2 from "../../public/images/landingPageImage-2.png";
import img3 from "../../public/images/landingPageImage-3.png";
import img4 from "../../public/images/landingPageImage-4.png";

class LandingPage extends PureComponent {
    demoLogin = () => {
        store.dispatch(actions.updateFacebookId("101984600370648"));
        store.dispatch(actions.lookupUser("101984600370648"));
        store.dispatch({ type: "LOGIN", payload: null });
    };
    render() {
        const styles = reactCSS({
            default: {
                navBar: {
                    height: 30,
                    paddingTop: 20,
                    paddingBottom: 0,
                    textAlign: "center",
                    backgroundColor: "#4a4c52"
                },
                mainBody: {
                    paddingTop: 30,
                    paddingBottom: 20,
                    marginBottom: 20,
                    borderBottom: "1px #ccc solid"
                },
                demo: {
                    paddingTop: 100,
                    color: "#aaa",
                    fontSize: 12
                },
                button: {
                    color: "white",
                    backgroundColor: "#02ddba",
                    border: 0,
                    borderRadius: 60,
                    width: 80,
                    height: 80,
                    fontSize: 16,
                    marginTop: 35,
                    marginBottom: 20
                },
                title: {
                    color: "#4a4c52",
                    fontSize: 50,
                    padding: 10
                },
                img: {
                    width: "100%"
                },
                footer: {
                    height: "10%",
                    color: "white",
                    fontSize: 10,
                    backgroundColor: "#4a4c52",
                    verticalAlign: "bottom"
                }
            }
        });

        return (
            <div>
                <div style={styles.navBar} />
                <div className="main">
                    <div style={styles.mainBody}>
                        <div style={styles.title}>Virtual Flashcards</div>
                        <FacebookLoginButton />
                        <div>
                            <input
                                style={styles.button}
                                type="submit"
                                value="Demo"
                                onClick={this.demoLogin}
                            />
                        </div>
                    </div>

                    <div className="block">
                        <img className="landingPageImg" src={img3} />
                        <h4 className="landingPageText right color1">
                            Online flashcards are a great way to study! Learn a foreign language, practice your multiplication table or prepare for your MCAT by memorizing every term.
                        </h4>{" "}
                    </div>
                    <div className="block">
                        <img className="landingPageImg" src={img1} />
                        <h4 className="landingPageText left color2">
                            Flashcards are effective because they are founded on the principles of rote and memorization. With Virtual Flashcards, you can use our web-based flashcard maker to create your own set.
                        </h4>{" "}
                    </div>
                    <div className="block">
                        <img className="landingPageImg" src={img2} />
                        <h4 className="landingPageText right color3">
                            You can study mobile flashcards for your Android, iPhone or Windows device, allowing you to take your flashcards on the go! Study on the bus or train, or on any occasion you have some free time.
                        </h4>{" "}
                    </div>
                    <div className="block">
                        <img className="landingPageImg" src={img4} />
                        <h4 className="landingPageText left color4">
                            When you create flashcards with Virtual Flashcards, they travel with you! Continuously reviewing your flash cards will ensure you’ll retain more of the information you’re studying with little effort required.
                        </h4>{" "}
                    </div>
                </div>

                <div style={styles.footer}>
                    Built with &lt;3 by
                    {" "}
                    <a
                        style={{ color: "white" }}
                        href="https://debelopumento.github.io/portfolio/"
                        target="blank"
                    >
                        Di Ye
                    </a>
                </div>
            </div>
        );
    }
}

export default connect(storeState => ({}), {
    updateFacebookId: actions.resetDeck,
    updateNameOnServer: actions.updateNameOnServer,
    lookupUser: actions.lookupUser
})(LandingPage);
