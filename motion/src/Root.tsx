import "./index.css";
import { Composition, Still } from "remotion";
import { SpotGraphic } from "./SpotGraphic";
import { HeroChain } from "./HeroChain";
import { TileFlow } from "./TileFlow";
import { OgCard } from "./OgCard";
import { HeroInk, HeroAuroraCalm, HeroLanes } from "./HeroCandidates";

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
      {/* OG 공유 카드 스틸 — web/public/og.png로 렌더 */}
      <Still id="OgCard" component={OgCard} width={1200} height={630} />
      {/* 히어로 배경 후보 3종 — 12s 심리스, web/public/mockups/로 렌더 (배포 제외) */}
      <Composition id="HeroInk" component={HeroInk} durationInFrames={720} fps={30} width={2400} height={950} />
      <Composition id="HeroAuroraCalm" component={HeroAuroraCalm} durationInFrames={720} fps={30} width={2400} height={950} />
      <Composition id="HeroLanes" component={HeroLanes} durationInFrames={720} fps={30} width={2400} height={950} />
    </>
  );
};
