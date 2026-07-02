import "./index.css";
import { Composition } from "remotion";
import { SpotGraphic } from "./SpotGraphic";
import { HeroChain } from "./HeroChain";
import { TileFlow } from "./TileFlow";

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
      {/* 히어로 배경 루프 — 24s, 심리스 (배경색 구움, H.264) */}
      <Composition
        id="HeroChain"
        component={HeroChain}
        durationInFrames={720}
        fps={30}
        width={1920}
        height={1080}
      />
      {/* 히어로 배경 — 프로스트 타일 행렬 (examples/TWL_Web_Generate 스타일 재창작), 25s 심리스 */}
      <Composition
        id="TileFlow"
        component={TileFlow}
        durationInFrames={750}
        fps={30}
        width={2400}
        height={950}
      />
    </>
  );
};
