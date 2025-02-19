import os
import sys
import yt_dlp
from pydub import AudioSegment

if len(sys.argv) < 2:
    print("Error: No URL provided")
    sys.exit(1)

url = sys.argv[1]

# Set the options for yt-dlp
ydl_opts = {
    'format': 'bestaudio/best',  # Best audio format
    'outtmpl': 'downloads/%(id)s.%(ext)s',  # Save location
    'headers': {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    },
}

try:
    # Download the video and extract audio using yt-dlp
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info_dict = ydl.extract_info(url, download=True)
        video_filename = f"downloads/{info_dict['id']}.webm"  # yt-dlp saves audio in webm format

    # Convert the downloaded audio to MP3 using pydub
    audio = AudioSegment.from_file(video_filename)
    audio.export(f"downloads/{info_dict['id']}.mp3", format="mp3")

    # Optionally, delete the original downloaded video file
    os.remove(video_filename)

    print(f"Audio file saved as: downloads/{info_dict['id']}.mp3")
except Exception as e:
    print(f"Error: {str(e)}")
    sys.exit(1)
