import os
import argparse
from pytube import YouTube
from moviepy.editor import VideoFileClip

# Set up argument parser
parser = argparse.ArgumentParser(description="Download a YouTube video and extract audio as MP3.")
parser.add_argument("url", help="YouTube video URL")
args = parser.parse_args()

# Download the video
yt = YouTube(args.url)
stream = yt.streams.get_highest_resolution()
filename = stream.default_filename
stream.download()

# Extract the audio
video = VideoFileClip(filename)
audio = video.audio
audio_filename = filename.replace('.mp4', '.mp3')
audio.write_audiofile(audio_filename)

# Delete the downloaded video file
video.close()
audio.close()
os.remove(filename)

print(f"Audio saved as {audio_filename}")
