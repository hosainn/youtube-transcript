import VideoInputForm from "./components/videoinputform/VideoInputForm";
import VideoPlayer from "./components/videoplayer/VideoPlayer";
import TranscriptViewer from "./components/transcriptviewer/TranscriptViewer";

export default function Home() {
  return (
    <div>
      <VideoInputForm />
      <VideoPlayer />
      <TranscriptViewer />
    </div>
  );
}
