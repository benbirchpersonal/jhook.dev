// Add Fuse.js library for fuzzy search
//import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.4.6';

document.getElementById("messageForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("upload.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                fetchMessages();
            } else {
                alert("Failed to upload message.");
            }
        })
        .catch(err => console.error("Error uploading message:", err));
});

document.getElementById("searchInput").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    if (query) {
        filterMessages(query);
    } else {
        fetchMessages(); // Reset to show all messages
    }
});

function fetchMessages() {
    fetch("fetch.php")
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById("messages");
            messagesDiv.innerHTML = "";

            if (data.success) {
                data.messages.forEach(msg => {
                    const messageElement = document.createElement("div");
                    messageElement.classList.add("message");

                    const textElement = document.createElement("p");
                    textElement.textContent = msg.message;
                    messageElement.appendChild(textElement);

                    if (msg.file_name) {
                        const fileLink = document.createElement("a");
                        fileLink.href = `download.php?id=${msg.id}`;
                        fileLink.textContent = `Download ${msg.file_name}`;
                        fileLink.target = "_blank";
                        messageElement.appendChild(fileLink);
                    }

                    // Display the message timestamp
                    const timestampElement = document.createElement("p");
                    timestampElement.classList.add("timestamp");
                    const timestamp = new Date(msg.created_at); // Convert to Date object
                    timestampElement.textContent = timestamp.toLocaleString(); // Format as local date/time
                    messageElement.appendChild(timestampElement);

                    messagesDiv.appendChild(messageElement);
                });
            }
        })
        .catch(err => console.error("Error fetching messages:", err));
}


function filterMessages(query) {
    fetch("fetch.php")
        .then(response => response.json())
        .then(data => {
            const messagesDiv = document.getElementById("messages");
            messagesDiv.innerHTML = ""; // Clear previous messages

            if (data.success) {
                const fuse = new Fuse(data.messages, {
                    keys: ['message', 'file_name'],
                    threshold: 0.4
                });

                const results = fuse.search(query);
                results.forEach(result => {
                    const messageElement = createMessageElement(result.item);
                    messagesDiv.appendChild(messageElement);
                });
            }
        })
        .catch(err => console.error("Error filtering messages:", err));
}

function createMessageElement(msg) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    const textElement = document.createElement("p");
    textElement.textContent = msg.message;
    messageElement.appendChild(textElement);

    if (msg.file_name) {
        const fileLink = document.createElement("a");
        fileLink.href = `download.php?id=${msg.id}`;
        fileLink.textContent = `Download ${msg.file_name}`;
        fileLink.target = "_blank";
        messageElement.appendChild(fileLink);
    }

    return messageElement;
}

// Initial fetch of messages
fetchMessages();