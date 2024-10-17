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


function editName() {
    const contactNameElement = document.getElementById('contactName');
    
    // Enable editing
    contactNameElement.setAttribute('contenteditable', 'true');
    contactNameElement.focus();

    // Add a blur event to disable editing when clicking outside
    contactNameElement.addEventListener('blur', () => {
        contactNameElement.setAttribute('contenteditable', 'false');
        
        // Optional: Trim the name to prevent leading/trailing spaces
        contactNameElement.textContent = contactNameElement.textContent.trim();
    });

    // Optional: Prevent line breaks when pressing Enter
    contactNameElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            contactNameElement.blur(); // End editing on Enter key
        }
    });
}
