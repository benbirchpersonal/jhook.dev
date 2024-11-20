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
                    textElement.textContent = msg.message;
                    messageElement.appendChild(textElement);
                    if (msg.id && msg.file_name) {
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
