document.getElementById('sendButton').addEventListener('click', function() {
    const messageInput = document.getElementById('messageInput');
    const fileInput = document.getElementById('fileInput');
    const messageContainer = document.querySelector('.message-container');

    const message = messageInput.value.trim();
    const file = fileInput.files[0];

    if (!message && !file) {
        alert('Please enter a message or select a file.');
        return;
    }

    // Display the message locally
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
    }

    // If a file is selected, upload it
    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const fileLink = document.createElement('a');
                fileLink.href = data.fileUrl;
                fileLink.textContent = `Download ${file.name}`;
                fileLink.target = '_blank';
                messageContainer.appendChild(fileLink);
            } else {
                alert('Failed to upload file.');
            }
        })
        .catch(err => {
            console.error('Error uploading file:', err);
        });
    }

    // Clear input fields
    messageInput.value = '';
    fileInput.value = '';
});
