To Run This Program:

1. Have the latest version of Node.js installed.
2. Download files from github.
3. Go to file location in terminal window, type "npm install".
4. Once installed, type "npm start".
5. This should start up the app on your browser.

For this project, I took at UX-first or top-down approach. I used to work at a hotel front desk, so I thought about what I would want in terms of a smooth experience.

On a related note, the language I chose for this was JavaScript/React as this is what I am currently most familiar with(also the backend language I have been using is proprietary to my current employer).

I did encounter some drawbacks to using JavaScript as it lacks some features of more strict object oriented languages(in fact classes and objects in JavaScript are actually functions under the hood). There were, for instance, times when I wanted to use method overloading, but this is not supported. Also React uses component based architecture which is different from pure object oriented design, though it does share some properties such as abstaction and inheritance as well as state. Despite these differences, it did lend itself very nicely to a UX/UI-first approach.

This approach also made it wasy to debug or notice errors since even if the program did not return an error in the console, it would be visually noticeable on the page.

There is certainly much more to be done; for starters, adding more messages and perhaps creating categories of messages which will be handled by different message objects. Otherwise, I feel the state in the App Component would come to be bloated with a dozen or more variables. Also the time/timezone functionality was tricky to implement and may merit more thorough review and testing. 

All in all, a fun little project!
