"use client"

import { createContext, useState } from "react";
import VideoInputForm from "./components/videoinputform/VideoInputForm";
import VideoPlayer from "./components/videoplayer/VideoPlayer";
import TranscriptViewer from "./components/transcriptviewer/TranscriptViewer";
import styles from "./page.module.css";

const HomePageContext = createContext()

export default function Home() {
  const [transcriptData, setTranscriptData] = useState({ videoId: null, transcript: [] })
  const [playerRef, setPlayerRef] = useState(null);

  return (
    <div id={styles.appContainer}>
      <div id={styles.appWrapper}>
        <HomePageContext.Provider value={{ transcriptData, setTranscriptData, setPlayerRef, playerRef }}>
          <VideoInputForm />
          <VideoPlayer />
          <TranscriptViewer />
        </HomePageContext.Provider>
      </div>
    </div>

  );
}

export { HomePageContext };
