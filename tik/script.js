function addMessage(side) {
    const messageInput = document.getElementById('messageInput');
    const chat = document.getElementById('chat');
    const messageText = messageInput.value.trim();

    if (messageText === "") {
        alert("Please enter a message.");
        return;
    }

    // Create message element
    const message = document.createElement('div');
    message.classList.add('message', side);
    message.textContent = messageText;

    // Append message to the chat box
    chat.appendChild(message);

    // Clear input
    messageInput.value = "";

    // Scroll chat to the bottom
    chat.scrollTop = chat.scrollHeight;
}
