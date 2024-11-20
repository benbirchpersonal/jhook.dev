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

                    // Check if the message was sent by the user (right aligned) or the recipient (left aligned)
                    const isUserMessage = msg.is_user || false; // Add a check here for user messages

                    messageElement.classList.add(isUserMessage ? "right" : "left");

                    const textElement = document.createElement("p");
                    textElement.textContent = msg.message;
                    messageElement.appendChild(textElement);

                    // Add file download link if exists
                    if (msg.file_name) {
                        const fileLink = document.createElement("a");
                        fileLink.href = `download.php?id=${msg.id}`;
                        fileLink.textContent = `Download ${msg.file_name}`;
                        fileLink.target = "_blank";
                        messageElement.appendChild(fileLink);
                    }

                    // Add timestamp to the message
                    const timestampElement = document.createElement("span");
                    timestampElement.classList.add("timestamp");
                    timestampElement.textContent = msg.timestamp;
                    messageElement.appendChild(timestampElement);

                    messagesDiv.appendChild(messageElement);
                });
            }
        })
        .catch(err => console.error("Error fetching messages:", err));
}

// Initial fetch of messages
fetchMessages();
