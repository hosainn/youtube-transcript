"use client"

import { useState } from "react";
import VideoInputForm from "./components/videoinputform/VideoInputForm";
import VideoPlayer from "./components/videoplayer/VideoPlayer";
import TranscriptViewer from "./components/transcriptviewer/TranscriptViewer";
import styles from "./page.module.css";

export default function Home() {
  const [transcriptData, setTranscriptData] = useState({ videoId: null, transcript: [] })
  const [playerRef, setPlayerRef] = useState(null);

  return (
    <div id={styles.appContainer}>
      <div id={styles.appWrapper}>
        <VideoInputForm setTranscriptData={setTranscriptData} />
        <VideoPlayer
          transcriptData={transcriptData}
          setPlayerRef={setPlayerRef}
        />
        <TranscriptViewer
          transcriptData={transcriptData}
          playerRef={playerRef}
        />
      </div>
    </div>
  );
}
