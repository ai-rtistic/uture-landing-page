# 유쳐 디자인 시스템 (twelvelabs.io 측정 기반)

> 모든 수치는 **twelvelabs.io/ko 라이브 사이트의 computed style을 직접 측정**해 추출한 값입니다(추측 아님).
> 플레이그라운드는 로그인 게이트(`auth.twelvelabs.io`)라 공개 마케팅 사이트를 기준으로 합니다.
> 시각 카탈로그: `/design-system.html` · 토큰 소스: `web/src/styles/globals.css` · 그래픽 규칙: `.claude/skills/uture-spot-graphics/SKILL.md`

---

## 1. Foundations

### 1.1 색상 (measured)
| 역할 | 값 | 비고 |
|---|---|---|
| 페이지 배경 | `#f5f5f5` | body 배경 |
| 패널/섹션/배지 배경 | `#f4f3f3` | 살짝 더 어두운 오프화이트 |
| 카드/표면 | `#ffffff` | |
| 보조 배경 | `#ececec` | |
| 본문·제목 | `#1d1c1b` | 웜블랙 (rgb 29,28,27) |
| 보조 텍스트 | `#3e3e3c` | |
| 캡션/비활성 | `#8e8d8d` | |
| 헤어라인 디바이더 | `#e0e0e0` | (카드 보더는 약간 진한 `#d3d1cf` 허용) |

**브랜드 액센트(유쳐 고유, 오렌지 리드 파스텔 7색)** — twelvelabs는 거의 무채색이지만, 유쳐는 포인트에만 절제해 사용:
`--c-orange #ff7a33` · `--c-peach #ff9e6b` · `--c-amber #efb34a` · `--c-rose #ff8fa8` · `--c-lilac #b49df5` · `--c-sky #82b4f0` · `--c-mint #5fcba0`
- 스팟 그래픽 = 모노크롬 우선, 색은 whisper(글로우 alpha ≤ 0.12, 강조는 태그+옅은 링).
- 텍스트 단어-리빌·소프트 글로우 등 "포인트 순간"에만 색.

### 1.2 타이포그래피 (measured, 전부 weight 400)
twelvelabs는 디스플레이체 `Milling Duplex 1mm`(커스텀) 사용 → 유쳐는 **한글 Pretendard / 라틴·숫자 Geist**로 대체하되 **크기·행간·자간은 동일**하게.

| 토큰 | font-size | line-height | letter-spacing | 용도 |
|---|---|---|---|---|
| Display / H1·H2 | **56px** | **64px** | **-1.12px** (-0.02em) | 히어로·섹션 대제목 |
| Statement / H-lg | **48px** | **56px** | **-0.96px** (-0.02em) | 대형 문장(핀 내러티브 등) |
| Title / H3 | 20px | 1.3 | normal | 카드 제목 |
| Body | **16px** | **24px** (1.5) | normal | 본문·서브카피 |
| Button text | 16px | 24px | **0.16px** (0.01em) | 버튼 라벨 |
| Caption / Nav | **12px** | normal | 0.24px (대문자 라벨) | 캡션·배지·작은 라벨 |
| Nav link | 16px | 24px | normal | 상단 메뉴 |

- 모바일: Display는 clamp로 ~36–40px까지 축소.

### 1.3 레이아웃 · 간격 (measured)
- **콘텐츠 컨테이너 max-width: 1600px**, 좌우 패딩 **40px** (모바일 20px).
- 텍스트 컬럼 max-width ≈ **640px** (넓은 컨테이너 안에서 본문은 좁게).
- **섹션 세로 패딩: 80–100px** (대형 핀 섹션은 100vh 별도).
- 8px 베이스 스페이싱: 4 · 8 · 12 · 16 · 20 · 24 · 40 · 80 · 100.

### 1.4 라운드 · 보더 · 섀도우 (measured)
- 라운드: 버튼 **14px** / 작은 pill **7px** / 노드·타일 12–16px / 큰 카드 22–32px.
- 보더: 1px solid `#e0e0e0` (헤어라인).
- 버튼 섀도우(히어로 CTA): `inset 0 0 0 1px rgba(0,0,0,0.1)`.
- 카드 호버: `0 24px 40px -28px rgba(29,28,27,0.4)`.

---

## 2. Components

### 2.1 버튼 (measured)
| 속성 | Dark (기본) | Hero CTA | Ghost |
|---|---|---|---|
| 배경 | `#1d1c1b` | `#1d1c1b` | transparent |
| 텍스트색 | `#f4f3f3` | `#f4f3f3` | `#1d1c1b` |
| 텍스트 | 16px / LH24 / LS 0.16px | 동일 | 동일 |
| radius | 14px | 14.4px(≈14) | 14px |
| height | 44px | 48px | 44px |
| padding | **18px 16px** | 18px | 18px 16px |
| gap(아이콘) | 8px | 8px | 8px |
| 보더/섀도우 | 없음 | `inset 0 0 0 1px rgba(0,0,0,.1)` | 1px `#e0e0e0` |
| 아이콘 | 우측 화살표 ↗ (14px) | ↗ | ↗ |

### 2.2 배지 / Pill (measured)
- 텍스트 12px / LS 0.24px / `#1d1c1b`, 배경 `#f4f3f3` 또는 흰색.
- radius ~7px, padding ~`3px 6px`(작은 라벨) ~ `8px 14px`(큰 배지), 1px `#e0e0e0` 보더.

### 2.3 Nav
- 링크 16px / weight400 / LH24 / `#1d1c1b`, 링크 간격 ~30px.
- 스크롤 시 배경 `rgba(245,245,245,0.72)` + `backdrop-blur(14px)` + 하단 1px `#e0e0e0`.
- 우측: 다크 pill 버튼.

### 2.4 카드
- 표면 `#ffffff`(또는 `#f4f3f3`), 1px `#e0e0e0`, radius 22px, 패딩 30px.
- 호버: translateY(-4px) + soft shadow.

---

## 3. 비주얼 요소 (스팟 그래픽)
- 추상 UI 일러스트(노드·커넥터·타일·글로우 패널·씬스트립·임베딩 닷). 전부 SVG/CSS.
- **모노크롬 우선**: 흰 타일·얇은 회색 보더·검은 라인 아이콘·회색 커넥터. 색은 whisper.
- 프리미티브: `web/src/components/graphics/`. 새로 만들 땐 `uture-spot-graphics` 스킬.

---

## 4. 배경 영상 / 이미지 (measured — 중요)
twelvelabs는 배경 모션을 **압축 MP4 `<video>`** 로 처리:
- 속성: `autoplay loop muted playsinline`, `object-fit: cover`. (히어로만 autoplay, 일부는 스크롤 진입 시 재생)
- 예: `Hero_Animation_2025.08.14.mp4`(1920w), `12Labs_MasterBrand_Home_..._COMPRESSED.mp4`, `..._EdgeBlur_..._COMPRESSED.mp4` — 전부 `_COMPRESSED`, CDN(cloudfront) 호스팅.
- 그라디언트 블롭은 `radial-gradient` 배경 + SVG data-URI. 캔버스(canvas) 미사용. `<img>`는 로고·정적 비주얼용.

**유쳐 적용 규칙:**
- 가벼운 모션 → CSS/GSAP (in-page, 기본).
- 무거운/시네마틱 모션 → **Remotion(`motion/`)으로 제작 → 압축 WebM/MP4 렌더 → `web/public/assets/motion/`** → `<video autoplay loop muted playsinline>` (`MotionGraphic` 컴포넌트). 현재 예: Plan 탭 `spot-search.webm`.
- 정적 비주얼(로고·고객사) → `<img loading="lazy">`.
- 모든 모션은 `prefers-reduced-motion` 폴백 필수.

---

## 5. 모션 원칙
- ease 기본: `cubic-bezier(0.22, 1, 0.36, 1)`.
- 스크롤 리빌(아래→페이드업), 핀 고정+블러 크로스페이드, 단어 컬러 리빌(sparse·soft), 카운트업, 마퀴, nav 축소.
- fade transition ≈ 700ms.

---

## 6. 어디서 보고 어떻게 쓰나
- **시각 미리보기**: `/design-system.html` — 컴포넌트별 라이브 프리뷰 + 복붙 코드.
- **이 문서**: 정확한 수치(패딩·폰트·라운드) 레퍼런스.
- **토큰**: `web/src/styles/globals.css :root` — 색은 토큰만 사용.
- **그래픽 만들기**: `uture-spot-graphics` 스킬(프리미티브 재사용, 모노크롬 우선).
