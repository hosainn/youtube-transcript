import VideoInputForm from "./components/videoinputform/VideoInputForm";
import VideoPlayer from "./components/videoplayer/VideoPlayer";
import TranscriptViewer from "./components/transcriptviewer/TranscriptViewer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div id={styles.appContainer}>
      <div id={styles.appWrapper}>
        <VideoInputForm />
        <VideoPlayer />
        <TranscriptViewer />
      </div>
    </div>

  );
}
