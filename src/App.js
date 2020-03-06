import React, { Component } from "react";
import logo from "./speechBubbles.png";
import companies from "./JSON/Companies.json";
import guests from "./JSON/Guests.json";
import messages from "./JSON/Messages.json";
import moment from "moment-timezone";
import "./App.css";
import Dropdown from "./Dropdown/Dropdown";

class App extends Component {
  constructor(props) {
    super(props);
    //state will hold guest, hotel, and message objects, then when the send button is clicked, relevant data from all three will be combined and set as a string message in sentMessage property
    this.state = { guest: null, hotel: null, message: null, sentMessage: null };

    this.saveSelection = this.saveSelection.bind(this);
    this.greeting = this.greeting.bind(this);
    this.printMessage = this.printMessage.bind(this);
  }

  //this dynamically assigns an object to its corresponding property in the state
  saveSelection(objectType, objectName, objDirectory, jsonArray) {
    let jsonIndex = objDirectory[objectName] - 1;
    let object = jsonArray[jsonIndex];
    this.setState({ [objectType]: object });
  }
  //combines data from guest, hotel and message objects to generate message
  printMessage() {
    if (!this.state.guest || !this.state.message || !this.state.hotel) {
      return;
    }

    let message = this.state.message.message;
    //replaces all placeholders with selected data
    message = message.replace(/\$guest/gi, this.state.guest.firstName);
    message = message.replace(/\$greet/gi, this.greeting());
    message = message.replace(/\$hotel/gi, this.state.hotel.company);
    message = message.replace(
      /\$checkIn/gi,
      moment
        .unix(this.state.guest.reservation.startTimestamp)
        .utc()
        .format("MMMM Do YYYY")
    );

    this.setState({ sentMessage: message });
  }
  //gives greeting depending on time of day, times chosen are based on colloquial sense of when morning, afternoon and evening are, not on technical definitions.
  greeting() {
    let time = moment().tz(this.state.hotel.timezone);

    let todaysDate = time.format("MM-DD-YYYY");
    let greeting = "";
    if (
      time.isBefore(todaysDate + " 12:00") &&
      time.isAfter(todaysDate + "3:00")
    ) {
      greeting = "Good morning";
    } else if (
      time.isAfter(time.format("MM-DD-YYYY") + " 12:00") &&
      time.isBefore(todaysDate + "18:00")
    ) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
    return greeting;
  }

  render() {
    let guestDirectory = {};
    let companyDirectory = {};
    let messageDirectory = {};

    //the following loops populate the above directories, using name and id of each object within the JSON files as the key and value respectively. The relevant object an then be pulled in O(1) time from the JSON arrays of objects, avoiding subsequent array searches.
    for (let guest of guests) {
      let fullName = `${guest.firstName} ${guest.lastName}`;
      guestDirectory[fullName] = guest.id;
    }
    for (let company of companies) {
      let companyName = company.company;
      companyDirectory[companyName] = company.id;
    }
    for (let message of messages) {
      let messagePurpose = message.purpose;
      messageDirectory[messagePurpose] = message.id;
    }

    let result = "";
    if (this.state.sentMessage) {
      result = <p className="message">{this.state.sentMessage}</p>;
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <Dropdown
            class="dropDown"
            label="Select Guest"
            selectionArray={Object.keys(guestDirectory)}
            objType="guest"
            jsonArray={guests}
            directory={guestDirectory}
            saveSelection={this.saveSelection}
          />
          <Dropdown
            class="dropDown"
            label="Select Hotel"
            selectionArray={Object.keys(companyDirectory)}
            objType="hotel"
            jsonArray={companies}
            directory={companyDirectory}
            saveSelection={this.saveSelection}
          />
          <Dropdown
            class="dropDown"
            label="Select Occasion"
            selectionArray={Object.keys(messageDirectory)}
            objType="message"
            jsonArray={messages}
            directory={messageDirectory}
            saveSelection={this.saveSelection}
          />
          <p>
            <button
              className="sendButton"
              onClick={e => this.printMessage()}
              type="submit"
            >
              Send message!
            </button>
          </p>
          {result}
        </header>
      </div>
    );
  }
}

export default App;
