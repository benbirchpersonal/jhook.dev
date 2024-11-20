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

                    const textElement = document.createElement("p");
                    
                    // Check if message content looks like code (based on file extension or content type)
                    if (msg.message.includes('<') || msg.message.includes('function') || msg.file_name) {
                        const codeElement = document.createElement("pre");
                        codeElement.textContent = msg.message; // Display code inside <pre> for formatting
                        messageElement.appendChild(codeElement);
                    } else {
                        textElement.textContent = msg.message;
                        messageElement.appendChild(textElement);
                    }

                    if (msg.file_name) {
                        const fileLink = document.createElement("a");
                        fileLink.href = `download.php?id=${msg.id}`;
                        fileLink.textContent = `Download ${msg.file_name}`;
                        fileLink.target = "_blank";
                        messageElement.appendChild(fileLink);
                    }

                    messagesDiv.appendChild(messageElement);
                });
            }
        })
        .catch(err => console.error("Error fetching messages:", err));
}

// Initial fetch of messages
fetchMessages();
