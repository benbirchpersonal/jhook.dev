const messageBoard = document.getElementById('messageBoard');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const linkContainer = document.getElementById('linkContainer');
const rolePrompt = document.getElementById('rolePrompt');
const connectionLink = document.getElementById('connectionLink');
const qrCodeContainer = document.getElementById('qrCode');

let peerConnection = null;
let dataChannel = null;

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

// Display messages on the message board
function displayMessage(message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageBoard.appendChild(messageDiv);
}

// Broadcast a message
function broadcastMessage(message) {
  displayMessage(`You: ${message}`);
  dataChannel.send(message);
}

// Generate and display the QR code
function generateQRCode(data) {
  QRCode.toDataURL(data, (err, url) => {
    if (err) {
      console.error('Error generating QR code', err);
    } else {
      qrCodeContainer.innerHTML = `<img src="${url}" alt="QR Code">`;
    }
  });
}

// Show broadcaster's link and QR code
function showBroadcasterLink(offer) {
  connectionLink.innerHTML = `<a href="#">Share this link with viewers: ${window.location.href}?offer=${offer}</a>`;
  generateQRCode(window.location.href + '?offer=' + offer);
  rolePrompt.textContent = 'You are the broadcaster. Share this link or QR code with viewers.';
}

// Show viewer's link and QR code for answering the offer
function showViewerLink(answer) {
  connectionLink.innerHTML = `<a href="#">Share this link with broadcaster: ${window.location.href}?answer=${answer}</a>`;
  generateQRCode(window.location.href + '?answer=' + answer);
  rolePrompt.textContent = 'You are a viewer. Share this link or QR code with the broadcaster.';
}

// Setup for broadcaster
async function setupBroadcaster() {
  peerConnection = new RTCPeerConnection(configuration);
  dataChannel = peerConnection.createDataChannel('broadcast');

  dataChannel.onmessage = (event) => {
    displayMessage(event.data);
  };

  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  const offerString = JSON.stringify(offer);

  showBroadcasterLink(offerString);
}

// Setup for viewer (answering the broadcaster's offer)
async function setupViewer() {
  peerConnection = new RTCPeerConnection(configuration);
  const urlParams = new URLSearchParams(window.location.search);
  const broadcasterOffer = urlParams.get('offer');
  if (broadcasterOffer) {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(JSON.parse(broadcasterOffer)));

    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    const answerString = JSON.stringify(answer);

    showViewerLink(answerString);
  }
}

// When the send button is clicked, send the message to everyone
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message && dataChannel) {
    broadcastMessage(message);
    messageInput.value = '';
  }
});

// Decide on the role (Broadcaster or Viewer)
function chooseRole() {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('offer')) {
    setupViewer();
  } else {
    setupBroadcaster();
  }
}

chooseRole();
