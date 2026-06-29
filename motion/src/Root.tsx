import "./index.css";
import { Composition, CalculateMetadataFunction } from "remotion";
import { SpotGraphic } from "./SpotGraphic";
import { HeroFlow } from "./HeroFlow";
import { WorkDemo } from "./WorkDemo";

// transparent WebM defaults so Studio + render both export alpha
const alphaWebm: CalculateMetadataFunction<Record<string, unknown>> = async () => ({
  defaultCodec: "vp9",
  defaultVideoImageFormat: "png",
  defaultPixelFormat: "yuva420p",
});

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
      <Composition
        id="HeroFlow"
        component={HeroFlow}
        durationInFrames={360}
        fps={30}
        width={1400}
        height={1000}
        calculateMetadata={alphaWebm}
      />
      <Composition
        id="WorkDemo"
        component={WorkDemo}
        durationInFrames={450}
        fps={30}
        width={1000}
        height={720}
        calculateMetadata={alphaWebm}
      />
    </>
  );
};
