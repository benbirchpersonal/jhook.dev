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
    const contactPictureElement = document.getElementById('contactPicture');
    
    // Enable editing
    contactNameElement.setAttribute('contenteditable', 'true');
    contactNameElement.focus();

    // Add a blur event to disable editing when clicking outside
    contactNameElement.addEventListener('blur', () => {
        contactNameElement.setAttribute('contenteditable', 'false');
        
        // Trim the name to prevent leading/trailing spaces
        contactNameElement.textContent = contactNameElement.textContent.trim();
        
        // Update the initials in the contact picture
        updateContactPicture(contactNameElement.textContent);
    });

    // Prevent line breaks when pressing Enter
    contactNameElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            contactNameElement.blur(); // End editing on Enter key
        }
    });
}

function updateContactPicture(name) {
    const contactPictureElement = document.getElementById('contactPicture');
    
    // Get the initials from the name (max 2 characters)
    const initials = name.split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .slice(0, 2) // Max of 2 initials
        .join('');
    
    contactPictureElement.textContent = initials;
}