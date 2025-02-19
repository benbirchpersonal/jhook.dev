<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $url = escapeshellarg($_POST["url"]); // Sanitize input

    // Use the Python interpreter from your virtual environment
    $pythonEnv = "/env/bin/python3";  // Change this to your actual path
    $command = "$pythonEnv convert.py " . $url . " 2>&1";

    $output = shell_exec($command);

    if (strpos($output, ".mp3") !== false) {
        $mp3_file = trim($output);
        echo json_encode(["status" => "success", "file" => $mp3_file]);
    } else {
        echo json_encode(["status" => "error", "message" => $output]);
    }
}
?>
