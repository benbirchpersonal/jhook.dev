<form action="upload_message.php" method="POST" enctype="multipart/form-data">
    <textarea name="message" placeholder="Enter your message" required></textarea>
    <input type="file" name="file">
    
    <label for="is_private">Private Message</label>
    <input type="checkbox" name="is_private" value="1">

    <button type="submit">Send</button>
</form>
