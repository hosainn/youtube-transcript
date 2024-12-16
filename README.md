# YouTube Transcript Viewer

YouTube Transcript Viewer is a dynamic and interactive React application designed to provide users with an enhanced experience of viewing and interacting with the transcripts of YouTube videos. This project ensures that as the video plays, the corresponding transcript lines are highlighted and scrolled into view, creating a synchronized and seamless experience.

## Architectural design 

![Technical design](https://drive.google.com/uc?id=1ttdIlox48Ci8i20biBJvLZXb4K9JozL2)

## Technical design 
https://docs.google.com/presentation/d/1-T7zTZxNvm6o488M-Sy97gbJnU-1Mr1FTOtd1aSLs-M/edit?usp=sharing

## Features

### Dynamic Transcript Highlighting
- The application highlights the current line of the transcript that matches the playback time of the YouTube video.
- Highlighting helps users easily follow along with the audio content of the video.

### Smooth Scrolling
- As the video progresses, the transcript automatically scrolls to keep the current line visible.
- Smooth scrolling enhances the user experience by providing a visually pleasing way to follow the transcript.

### Real-time Updates
- The application updates the current time of the transcript in real-time based on the video player’s time.
- Ensures that the transcript is always in sync with the video playback.

### User Interaction
- Users can input a YouTube video URL to load the video and its transcript.
- Provides a clear interface for interacting with the video and transcript.

## Prerequisites

- **Docker**: Ensure you have Docker installed. You can download it from [docker.com](https://www.docker.com/).
- **Docker Compose**: Ensure you have Docker Compose installed. You can find the installation instructions on the [Docker Compose documentation page](https://docs.docker.com/compose/install/).

## To Run 

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/hosainn/youtube-transcript.git
   cd youtube-transcript

2. **Build and Run with Docker**: Ensure you are using Docker 20.10 or later. Note that the commands might vary depending on the Docker Compose version you have installed.
For Docker Compose v1.x (the standalone version), use the following commands:
```
sudo docker-compose build
sudo docker-compose up
```

For **Docker Compose v2.x** (the integrated Docker CLI plugin), use the following commands:
```
sudo docker compose build
sudo docker compose up
```

3. **Access the Application**:
     Open your browser and navigate to http://localhost:3000 to see the frontend view.
