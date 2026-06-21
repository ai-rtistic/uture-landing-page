import "./index.css";
import { Composition } from "remotion";
import { SpotGraphic } from "./SpotGraphic";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SpotGraphic"
        component={SpotGraphic}
        durationInFrames={150}
        fps={30}
        width={900}
        height={680}
      />
    </>
  );
};
