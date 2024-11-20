const messageBoard = document.getElementById('messageBoard');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Set up peer-to-peer connections
const peers = new Map();
let isBroadcaster = false;

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const peerConnection = new RTCPeerConnection(configuration);
const dataChannel = peerConnection.createDataChannel('broadcast');

// Listen for incoming messages
dataChannel.onmessage = (event) => {
  displayMessage(event.data);
};

// For viewers: listen for broadcasters
peerConnection.ondatachannel = (event) => {
  const receiveChannel = event.channel;
  receiveChannel.onmessage = (event) => {
    displayMessage(event.data);
  };
};

// Display messages on the message board
function displayMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageBoard.appendChild(messageDiv);
}

// Broadcast a message
function broadcastMessage(message) {
  displayMessage(`You: ${message}`);
  peers.forEach((channel) => {
    channel.send(message);
  });
}

// When send button is clicked
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    broadcastMessage(message);
    messageInput.value = '';
  }
});

// Networking setup for WebRTC signaling
async function setupBroadcaster() {
  isBroadcaster = true;

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);

  // Simulate signaling by sharing the offer directly
  const viewerAnswer = JSON.parse(prompt('Paste viewer answer here:'));
  await peerConnection.setRemoteDescription(new RTCSessionDescription(viewerAnswer));
}

async function setupViewer() {
  isBroadcaster = false;

  const broadcasterOffer = JSON.parse(prompt('Paste broadcaster offer here:'));
  await peerConnection.setRemoteDescription(new RTCSessionDescription(broadcasterOffer));

  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);

  // Simulate signaling by sharing the answer directly
  alert('Copy this and send to the broadcaster: ' + JSON.stringify(answer));
}

// Choose mode
if (confirm('Are you the broadcaster?')) {
  setupBroadcaster();
} else {
  setupViewer();
}
