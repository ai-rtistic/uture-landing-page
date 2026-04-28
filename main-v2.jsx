// uture v2 — root mount with Automatix-inspired layout
const { useEffect: useEffectM2 } = React;

const TWEAK_DEFAULTS_V2 = /*EDITMODE-BEGIN*/{
  "heroVariant": "impact",
  "orangeHue": 22,
  "bgDepth": "deep",
  "density": "balanced",
  "glowIntensity": 55,
  "showMarquees": true
}/*EDITMODE-END*/;

function AppV2() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS_V2);
  useReveal();

  useEffectM2(() => {
    const root = document.documentElement;
    const h = tweaks.orangeHue;
    root.style.setProperty('--orange', `hsl(${h}, 100%, 55%)`);
    root.style.setProperty('--orange-hot', `hsl(${h}, 100%, 60%)`);
    root.style.setProperty('--orange-soft', `hsl(${h}, 90%, 72%)`);
    root.style.setProperty('--orange-glow', `hsla(${h}, 100%, 55%, 0.35)`);
    root.style.setProperty('--orange-faint', `hsla(${h}, 100%, 55%, 0.08)`);

    if (tweaks.bgDepth === 'pure') {
      root.style.setProperty('--bg-0', '#000000');
      root.style.setProperty('--bg-1', '#070708');
      root.style.setProperty('--bg-2', '#0E0E10');
    } else if (tweaks.bgDepth === 'charcoal') {
      root.style.setProperty('--bg-0', '#13131A');
      root.style.setProperty('--bg-1', '#1A1A22');
      root.style.setProperty('--bg-2', '#22222B');
    } else {
      root.style.setProperty('--bg-0', '#08080A');
      root.style.setProperty('--bg-1', '#0E0E12');
      root.style.setProperty('--bg-2', '#14141A');
    }

    if (tweaks.density === 'airy') root.style.setProperty('--section-y', '200px');
    else if (tweaks.density === 'dense') root.style.setProperty('--section-y', '120px');
    else root.style.setProperty('--section-y', '160px');

    document.querySelectorAll('.hero-glow, .final-cta-glow').forEach((el) => {
      el.style.opacity = tweaks.glowIntensity / 100;
    });
  }, [tweaks]);

  return (
    <>
      <Nav/>
      <Hero variant={tweaks.heroVariant}/>
      {tweaks.showMarquees && <LogoMarquee/>}
      <Approach/>
      <Philosophy/>
      <Concerns/>
      <BentoServices/>
      {tweaks.showMarquees && <ChipMarquee/>}
      <Solution1/>
      <Cases/>
      <StatsStrip/>
      <Process/>
      <BigCTA/>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero 변형">
          <TweakRadio
            options={[
              { value: 'conservative', label: '보수적' },
              { value: 'balanced', label: '균형' },
              { value: 'impact', label: '임팩트' },
            ]}
            value={tweaks.heroVariant}
            onChange={(v) => setTweak('heroVariant', v)}
          />
        </TweakSection>
        <TweakSection label="오렌지 Hue">
          <TweakSlider min={5} max={45} step={1} value={tweaks.orangeHue} onChange={(v) => setTweak('orangeHue', v)}/>
        </TweakSection>
        <TweakSection label="배경 깊이">
          <TweakRadio
            options={[
              { value: 'pure', label: '순검정' },
              { value: 'deep', label: '딥블랙' },
              { value: 'charcoal', label: '차콜' },
            ]}
            value={tweaks.bgDepth}
            onChange={(v) => setTweak('bgDepth', v)}
          />
        </TweakSection>
        <TweakSection label="정보 밀도">
          <TweakRadio
            options={[
              { value: 'airy', label: '여백' },
              { value: 'balanced', label: '균형' },
              { value: 'dense', label: '밀집' },
            ]}
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
          />
        </TweakSection>
        <TweakSection label="글로우 강도">
          <TweakSlider min={0} max={100} step={5} value={tweaks.glowIntensity} onChange={(v) => setTweak('glowIntensity', v)}/>
        </TweakSection>
        <TweakSection label="마퀴 표시">
          <TweakToggle value={tweaks.showMarquees} onChange={(v) => setTweak('showMarquees', v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AppV2/>);
