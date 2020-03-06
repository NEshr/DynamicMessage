import React, { Component } from "react";
import logo from "./speechBubbles.png";
import companies from "./JSON/Companies.json";
import guests from "./JSON/Guests.json";
import messages from "./JSON/Messages.json";
import moment from 'moment-timezone';
import MessageService from "./Message/MessageService.js";
import "./App.css";

import Dropdown from "./Dropdown/Dropdown";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { guest: null, hotel: null, message: null, sentMessage: null };
    this.saveSelection = this.saveSelection.bind(this);
    this.printMessage = this.printMessage.bind(this);
    this.greeting = this.greeting.bind(this);
  }

  saveSelection(objectType, objectName, objDirectory, jsonArray) {

    let jsonIndex = objDirectory[objectName] - 1;

    let object = jsonArray[jsonIndex];
    console.log("object: " + Object.entries(object));

    this.setState({ [objectType]: object }, () => console.log(this.state));
  }

  printMessage() {
    if(!this.state.guest || !this.state.message || !this.state.hotel){
      return;
    }
    if (this.state.message.id === 1) {
      let messageArr = this.state.message.message.split(" ");

      for (let i = 0; i < messageArr.length; i++) {

        if (/\$guest,?/.test(messageArr[i])) {
          messageArr[i] = this.state.guest.firstName;
        }
        if(/\$greet,?/.test(messageArr[i])){
          messageArr[i] = this.greeting();
        }
      }
      let result = messageArr.join(' ');
   
      this.setState({ sentMessage: result });

    }
  }
  greeting(){
    let time = moment.tz(new Date(), this.state.hotel.timezone);
    
    console.log(time);
  }


  render() {

    let guestDirectory = {};
    let companyDirectory = {};
    let messageDirectory = {};

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
      result = (<p className="message">{this.state.sentMessage}</p>)
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

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
          <button onClick={(e) => this.printMessage()} type="submit"> Send message! </button>
        </p>
        {result}


      </div>
    );
  }
}

export default App;
