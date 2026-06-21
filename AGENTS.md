# AGENTS.md — 유쳐(Uture) 랜딩페이지 리뉴얼

AI·AX 에이전시 "유쳐" 랜딩페이지를 **`references/`의 레퍼런스 디자인(twelvelabs.io/ko)** 과 똑같은 톤·레이아웃·인터랙션으로 리디자인한다.

## 디렉토리 구조

| 경로 | 역할 | 규칙 |
|------|------|------|
| `legacy/` | 기존(구) 랜딩페이지 소스 — 콘텐츠/문구/에셋 원본 | **읽기 전용. 절대 수정·삭제 금지.** 새 사이트 콘텐츠는 여기서 가져온다. |
| `references/reference.html` | twelvelabs.io/ko 캡처본 (2.9MB, minified) | 디자인 정답지. 실제 인터랙션은 라이브 사이트로 확인. |
| `web/` | **새 리디자인 소스 코드 (Vite+React+TS, 작업 결과물)** | 모든 신규 코드·에셋은 여기에. |
| `motion/` | **Remotion 프로젝트** — 영상으로 렌더할 모션 그래픽 | 렌더 결과(WebM)는 `web/public/assets/motion/`으로 출력. |
| `.claude/skills/` | 프로젝트 전용 스킬 (`uture-spot-graphics`) | 추적됨(커밋). |
| `.agents/skills/` | 설치한 외부 스킬 (`remotion-best-practices`) | skills.sh로 설치. |
| 루트(`/`) | `AGENTS.md`, `CLAUDE.md`, `.gitignore` 등 **필수 파일만** | 그 외 파일은 만들지 말고 하위 폴더로 분리. |

## 그래픽 시스템 & 스킬

- **스팟 그래픽**(노드·커넥터·타일·글로우 패널·씬스트립·임베딩 닷클라우드 등 추상 UI 일러스트): `web/src/components/graphics/`. 새로 만들 땐 **`uture-spot-graphics` 스킬**을 따른다(프리미티브 재사용, 브랜드 톤 유지).
- **모션/영상 요소**: 기본은 in-page SVG+GSAP. 무거운 모션은 `motion/`에서 Remotion으로 만들어 투명/패널 WebM으로 렌더 → `<video>`로 임베드(`web/src/components/graphics/MotionGraphic.tsx`). 예: Plan 탭 데모.
- **브랜드 색**: 오렌지 메인 + 톤 일관 파스텔 7색. `web/src/styles/globals.css` `:root` 토큰만 사용.

## 루트 정리 원칙

루트에는 꼭 필요한 설정 파일만 둔다. 소스·에셋·문서·스크립트는 전부 하위 폴더로 분리한다.

## 작업 내용

1. **레퍼런스 분석** — `references/reference.html` + 라이브 사이트(twelvelabs.io/ko)를 브라우저로 스크롤·인터랙션하며 요소 단위로 분석(섹션 구성, 모션, 스크롤 트리거, 색/타이포/간격).
2. **콘텐츠 이식** — 유쳐의 실제 문구·통계·고객사·사례는 `legacy/`에서 가져와 그대로 사용. 디자인만 레퍼런스 톤으로 교체.
3. **신규 구현** — `web/`에 새 소스로 구현. `legacy/`는 손대지 않는다.

## 레퍼런스 디자인 특징 (twelvelabs.io)

- 다크 베이스, 비디오 인텔리전스 플랫폼 톤, 스크롤 기반 모션이 강한 마케팅 사이트.
- 유쳐 콘텐츠(한국어, AI·AX 교육→실행 에이전시)에 이 비주얼 랭귀지를 입히는 것이 목표.

## 유쳐 기존 사이트 콘텐츠 맥락

기존 섹션 흐름(`legacy/main-v2.jsx` 기준): Nav → Hero → 고객사 로고 → 고민(Concerns) → 철학(Philosophy) → FDE 여정 → 서비스(Bento) → 솔루션 → 사례(Cases) → 통계 → 프로세스 → CTA → Footer. 다크/오렌지 포인트 테마.
