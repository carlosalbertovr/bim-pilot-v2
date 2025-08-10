import { ViewerContextProvider } from "../components/viewer/context/ViewerContext";
import { Controls } from "../components/viewer/Controls";
import { ModelViewer } from "../components/viewer/ModelViewer";
import { RightSidebar } from "../components/viewer/RightSidebar";

export default function Home() {
  return (
    <div className="w-full h-full relative">
      <ViewerContextProvider>
        <RightSidebar />
        <ModelViewer />
        <Controls />
      </ViewerContextProvider>
    </div>
  );
}
