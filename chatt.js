let chatServer;
let clients = [];
let messages = new Array(100);
let currentMessage = "";

let inputField;
let sendButton;
let chatArea;

function setup() {
  createCanvas(windowWidth, windowHeight); // Use the full window size

  // Replace "your-domain-name.com" with your actual domain name
  let serverAddress = "https://acebyte.github.io/btb-chat/";
  let serverPort = 12345; // Use the port you've configured on the server

  chatServer = new WebSocket(serverAddress + ":" + serverPort);

  chatServer.onopen = function (event) {
    console.log("Connected to the server.");
  };

  chatServer.onmessage = function (event) {
    receiveMessage("Client: " + event.data);
  };

  createUI();
}

function createUI() {
  // Create input field
  inputField = createInput();
  inputField.position(10, height - 70);
  inputField.size(width - 80, 50);
  inputField.attribute("placeholder", "Type your message here");
  inputField.style("background-color", "#343345");
  inputField.style("border", "1px solid #0000");
  inputField.style("color", "#FFFFFF");
  inputField.changed(sendCurrentMessage);

  // Create send button
  sendButton = createButton("Send");
  sendButton.position(width - 60, height - 70);
  sendButton.size(50, 50);
  sendButton.mousePressed(sendCurrentMessage);
  sendButton.style("background-color", "#3c3a57");
  sendButton.style("border", "1px solid #0000");
  sendButton.style("color", "#FFFFFF");

  // Create chat area
  chatArea = createElement("textarea");
  chatArea.position(30, 20);
  chatArea.size(width - 80, height - 120);
  chatArea.attribute("placeholder", "Chat messages will appear here");
  chatArea.style("background-color", "#343345");
  chatArea.style("color", "#FFFFFF");
  chatArea.style("border", "1px solid #0000");
  chatArea.style("resize", "none");
  chatArea.elt.readOnly = true;
}

function draw() {
  background(36, 35, 48);
}

function sendCurrentMessage() {
  let message = inputField.value();
  if (message !== "") {
    chatServer.send(message);
    receiveMessage("You: " + message);
    inputField.value(""); // Clear the input field
  }
}

function windowResized() {
  // Resize canvas to fit the new window size
  resizeCanvas(windowWidth, windowHeight);
}

function receiveMessage(message) {
  for (let i = 0; i < messages.length; i++) {
    if (!messages[i]) {
      messages[i] = message;
      chatArea.elt.value += message + "\n";
      break;
    }
  }
}
