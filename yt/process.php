<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $url = escapeshellarg($_POST["url"]); // Sanitize user input
    $command = "python3 convert.py " . $url . " 2>&1";
    
    $output = shell_exec($command);
    
    if (strpos($output, ".mp3") !== false) {
        $mp3_file = trim($output);
        echo json_encode(["status" => "success", "file" => $mp3_file]);
    } else {
        echo json_encode(["status" => "error", "message" => $output]);
    }
}

else{
    echo shell_exec("python3 --version 2>&1");
}
?>
