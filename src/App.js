//import React from "react";
import * as React from "react";
import { getRandomWord } from "./utils.js";
import "./App.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // currWord is the current secret word for this round. Update this with this.setState after each round.
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      remainGuess: 10,
      // Insert form input state here
      input: "",
      correctWord: false,
      guessedLetter: "",
      remainGuessValue: 100,
    };
  }

  generateWordDisplay = () => {
    const wordDisplay = [];
    let word = "";
    // for...of is a string and array iterator that does not use index
    for (let letter of this.state.currWord) {
      if (this.state.guessedLetters.includes(letter)) {
        wordDisplay.push(letter);
      } else {
        wordDisplay.push("_");
      }
    }
    word = wordDisplay.toString();
    return word;
  };

  checkWord = () => {
    let wordArr = [...this.state.currWord];
    let string = wordArr.toString();
    if (string === this.generateWordDisplay()) {
      this.setState({
        correctWord: true,
      });
    }
  };

  // Insert form callback functions handleChange and handleSubmit here
  handleChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let letters = [...this.state.guessedLetters];
    let currLetter = e.target.value;
    let setLetters = new Set(letters);
    if (setLetters.has(currLetter)) {
      alert(`You have already keyed in ${currLetter} before.`);
      this.setState({
        input: "",
      });
      return;
    } else if (!/^[a-z]+$/i.test(currLetter)) {
      alert(
        `You keyed in ${currLetter} which is a number. Please key in a letter.`
      );
      this.setState({
        input: "",
      });
    } else {
      letters.push(currLetter);
      this.setState(
        {
          guessedLetters: letters,
          input: "",
          remainGuess: this.state.remainGuess - 1,
          remainGuessValue: this.state.remainGuessValue - 10,
        },
        () => {
          let word = this.generateWordDisplay();
          let noComma = word.split(",");
          let currLetter = letters[letters.length - 1];
          noComma = new Set(noComma);
          if (noComma.has(currLetter)) {
            alert(`You keyed in the correct letter ${currLetter}!`);
          }
          noComma = [...noComma].join("");
          console.log(currLetter);

          if (letters.length >= noComma.length) {
            this.checkWord();
          }
        }
      );
    }
  };

  handleReset = (e) => {
    e.preventDefault();
    this.setState({
      currWord: getRandomWord(),
      // guessedLetters stores all letters a user has guessed so far
      guessedLetters: [],
      // Insert num guesses left state here
      remainGuess: 10,
      // Insert form input state here
      input: "",
      correctWord: false,
      guessedLetter: "",
      remainGuessValue: 100,
    });
  };

  render() {
    const displayNew = (
      <div>
        <h2>
          You have used up 10 guesses. Click "New Game" to start a new game.{" "}
        </h2>
        <h3>The word was {this.state.currWord}.</h3>
        <h3>Better luck next time!</h3>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => this.handleReset(e)}
        >
          New Game
        </Button>
      </div>
    );

    const displayGuess = (
      <div>
        {this.generateWordDisplay()}
        <h3>Guessed Letters</h3>
        {this.state.guessedLetters.length > 0
          ? this.state.guessedLetters.toString()
          : "-"}
        <h3>Input</h3>
        {/* Insert form element here */}
        <input
          type="text"
          maxLength="1"
          placeholder="Pls key in an alphabet"
          value={this.state.input}
          onChange={(e) => this.handleChange(e)}
          name="input"
        />
        <br />
        <br />
        <Button
          type="submit"
          variant="primary"
          onClick={(e) => this.handleSubmit(e)}
          value={this.state.input}
        >
          Submit
        </Button>
      </div>
    );

    if (!this.state.correctWord && this.state.remainGuess > 0) {
      return (
        <div className="App">
          <header className="App-header">
            <Container fluid>
              <Row className="justify-content-md-center">
                <Col>
                  <h1>Guess The Word 🚀</h1>
                  <br />
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col xs={4}>
                  <h3>Word Display</h3>
                  {displayGuess}
                </Col>
                <Col xs={3}>
                  <br />

                  <div style={{ width: 250, height: 250 }}>
                    <CircularProgressbar
                      variant="determinate"
                      value={this.state.remainGuessValue}
                      text={`${this.state.remainGuess} tries`}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </header>
        </div>
      );
    } else if (this.state.correctWord) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Guess The Word 🚀</h1>
            <h3>Word Display</h3>
            <h2>Congratulations! You guessed the correct word!</h2>
            <h2>The word is {this.state.currWord}</h2>
            <h3>Guessed Letters</h3>
            {this.state.guessedLetters.length > 0
              ? this.state.guessedLetters.toString()
              : "-"}
            {/* Insert form element here */}
            <form>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => this.handleReset(e)}
              >
                New Game
              </Button>
            </form>
          </header>
        </div>
      );
    } else if (!this.state.correctWord && this.state.remainGuess === 0) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Guess The Word 🚀</h1>
            <h3>Word Display</h3>
            {displayNew}
          </header>
        </div>
      );
    }
  }
}

export default App;
