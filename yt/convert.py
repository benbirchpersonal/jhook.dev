import os
import sys
import yt_dlp
import subprocess

if len(sys.argv) < 2:
    print("Error: No URL provided")
    sys.exit(1)

url = sys.argv[1]

# Set the options for yt-dlp
ydl_opts = {
    'format': 'bestaudio/best',  # Best audio format
    'postprocessors': [{
        'key': 'FFmpegAudioConvertor',  # Convert to mp3
        'preferredcodec': 'mp3',
        'preferredquality': '192',
    }],
    'outtmpl': 'downloads/%(id)s.%(ext)s',  # Save location
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    },
}

try:
    # Download the video and extract audio
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        audio_filename = f"downloads/{info_dict['id']}.mp3"
    
    print(f"Audio file saved as: {audio_filename}")
except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
