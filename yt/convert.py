import os
import sys
from pytube import YouTube
import subprocess

if len(sys.argv) < 2:
    print("Error: No URL provided")
    sys.exit(1)

url = sys.argv[1]

try:
    # Download the video
    yt = YouTube(url, headers={"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"})
    stream = yt.streams.filter(only_audio=True).first()
    filename = stream.download(filename="temp_video.mp4")

    # Extract audio using ffmpeg
    audio_filename = filename.replace('.mp4', '.mp3')
    command = f"ffmpeg -i {filename} -q:a 0 -map a {audio_filename}"
    subprocess.run(command, shell=True, check=True)

    # Remove the temporary video file
    os.remove(filename)

    print(audio_filename)

except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
