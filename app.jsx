// uture — main app
const { useState, useEffect, useRef, useMemo } = React;

/* ====================== Icons ====================== */
const Icon = {
  ArrowRight: (p) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
  ),
  ArrowUpRight: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
  ),
  Check: (p) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>
  ),
  Lock: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  ),
  Compass: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="9"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
  ),
  Trend: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>
  ),
  Users: (p) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Plus: (p) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
  ),
};

/* ====================== Reveal Hook ====================== */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-stagger');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
    requestAnimationFrame(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
          el.classList.add('in');
          io.unobserve(el);
        }
      });
    });
    return () => io.disconnect();
  }, []);
}

/* ====================== Counter ====================== */
function Counter({ to, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ====================== Nav ====================== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="logo">
          <img className="nav-logo-img" src="assets/nav-logo.png" alt="uture"/>
        </a>
        <div className="nav-links">
          <a href="#sol1">솔루션</a>
          <a href="#cases">교육 사례</a>
          <a href="#process">설계 프로세스</a>
          <a href="#contact" className="nav-cta"><span>기업교육 문의</span> <Icon.ArrowRight width={14} height={14}/></a>
        </div>
      </div>
    </nav>
  );
}

/* ====================== Hero ====================== */
function Hero({ variant }) {
  const heroRef = useRef(null);
  useEffect(() => {
    const el = heroRef.current; if (!el) return;
    const cta = el.querySelector('.hero-main-cta');
    const canHover = window.matchMedia('(hover: hover)').matches;
    const onScroll = () => {
      const y = window.scrollY;
      const glow = el.querySelector('.hero-glow');
      const grid = el.querySelector('.hero-grid');
      if (glow) glow.style.transform = `translateX(-50%) translateY(${y * 0.15}px)`;
      if (grid) grid.style.transform = `translateY(${y * 0.08}px)`;
    };
    const onPointerMove = (event) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      el.style.setProperty('--hero-aura-x', `${(x * 18).toFixed(2)}px`);
      el.style.setProperty('--hero-aura-y', `${(y * 14).toFixed(2)}px`);
    };
    const onCtaMove = (event) => {
      if (!cta) return;
      cta.classList.add('is-magnetic');
      const rect = cta.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      cta.style.setProperty('--cta-x', `${(x * 0.13).toFixed(2)}px`);
      cta.style.setProperty('--cta-y', `${(y * 0.18).toFixed(2)}px`);
    };
    const onCtaEnter = () => {
      if (cta) cta.classList.add('is-magnetic');
    };
    const onCtaLeave = () => {
      if (!cta) return;
      cta.classList.remove('is-magnetic');
      cta.style.setProperty('--cta-x', '0px');
      cta.style.setProperty('--cta-y', '0px');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('pointermove', onPointerMove, { passive: true });
    if (cta && canHover) {
      cta.addEventListener('pointerenter', onCtaEnter);
      cta.addEventListener('pointermove', onCtaMove, { passive: true });
      cta.addEventListener('pointerleave', onCtaLeave);
    }
    return () => {
      window.removeEventListener('scroll', onScroll);
      el.removeEventListener('pointermove', onPointerMove);
      if (cta && canHover) {
        cta.removeEventListener('pointerenter', onCtaEnter);
        cta.removeEventListener('pointermove', onCtaMove);
        cta.removeEventListener('pointerleave', onCtaLeave);
      }
    };
  }, []);

  if (variant === 'conservative') {
    return (
      <section className={`hero v-conservative`} ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-grid"></div>
          <div className="hero-glow" style={{opacity: 0.3, width: 600, height: 600, top: -100}}></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge reveal">
            <span className="pulse"></span>
            <span>2026 AX Transformation Partner</span>
          </div>
          <h1 className="hero-title reveal" style={{maxWidth: 1100}}>
            기업과 구성원,<br/>
            <span className="accent">한 명 한 명</span>에 맞추는<br/>
            AX 컨설팅
          </h1>
          <p className="hero-sub reveal">
            uture는 회사와 직무, 그리고 사람을 함께 봅니다.<br/>
            구성원이 실제 업무에서 AI를 써서 일을 혁신할 때까지 — 밀착해서 동행합니다.
          </p>
          <div className="hero-actions reveal">
            <a href="#contact" className="btn btn-primary">기업교육 문의하기 <Icon.ArrowRight/></a>
            <a href="#sol1" className="btn btn-ghost">솔루션 살펴보기</a>
          </div>
          <HeroMeta/>
        </div>
      </section>
    );
  }

  if (variant === 'impact') {
    return (
      <section className={`hero v-impact`} ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-grid"></div>
          <div className="hero-glow"></div>
          <div className="hero-aura hero-aura-primary"></div>
          <div className="hero-aura hero-aura-secondary"></div>
        </div>
        <div className="container hero-content">
          <div className="hero-badge reveal">
            <span className="pulse"></span>
            <span>지금 바로 유쳐와 함께하세요</span>
          </div>
          <HeroTypingTitle/>
          <h1 className="hero-title hero-mobile-title reveal">
            <span className="accent">기업에 진짜 필요한</span>
            <span className="accent">AI 교육</span>
            <span>배움에서 ✦ 실무로.</span>
            <span className="accent">지식을 성과로</span>
            <span className="accent">바꾸다</span>
          </h1>
          <p className="hero-sub reveal">
            기업을 위한 맞춤형 AI / AX 솔루션
          </p>
          <div className="hero-actions reveal">
            <a href="#contact" className="btn btn-ghost hero-main-cta"><span>기업교육 문의하기</span> <Icon.ArrowRight/></a>
          </div>
          <HeroMeta/>
        </div>
      </section>
    );
  }

  // Balanced (default)
  return (
    <section className={`hero v-balanced`} ref={heroRef}>
      <div className="hero-bg">
        <div className="hero-grid"></div>
        <div className="hero-glow"></div>
        <HeroOrbital/>
      </div>
      <div className="container hero-content">
        <div className="hero-badge reveal">
          <span className="pulse"></span>
          <span>AX Transformation Agency for Enterprise</span>
        </div>
        <h1 className="hero-title reveal">
          기업과 사람에<br/>
          <span className="accent">1:1로 맞추는</span><br/>
          <span style={{fontFamily:'var(--font-mono)', fontWeight: 600}}>uture.</span>
        </h1>
        <p className="hero-sub reveal">
          기업 맞춤 · 조직원 맞춤 · 밀착 컨설팅.<br/>
          구성원이 실제 업무에서 AI로 일하는 방식을 바꿀 때까지, uture가 함께 갑니다.
        </p>
        <div className="hero-actions reveal">
          <a href="#contact" className="btn btn-primary">기업교육 문의하기 <Icon.ArrowRight/></a>
          <a href="#sol1" className="btn btn-ghost">솔루션 살펴보기</a>
        </div>
        <HeroMeta/>
      </div>
    </section>
  );
}

function HeroTypingTitle() {
  const lines = useMemo(() => [
    { text: '기업에 진짜 필요한 AI 교육', className: 'accent' },
    { text: '배움에서 ✦ 실무로.', className: '' },
    { text: '지식을 성과로 바꾸다', className: 'accent' },
  ], []);
  const [visible, setVisible] = useState(() => lines.map(() => 0));
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const charsByLine = lines.map((line) => Array.from(line.text));
    if (reduceMotion) {
      setVisible(charsByLine.map((chars) => chars.length));
      setActiveLine(null);
      return;
    }

    let lineIndex = 0;
    let charIndex = 0;
    let timer;
    const tick = () => {
      if (lineIndex >= charsByLine.length) {
        setActiveLine(null);
        return;
      }
      setActiveLine(lineIndex);
      charIndex += 1;
      const currentLine = lineIndex;
      const currentCount = charIndex;
      setVisible((prev) => {
        const next = [...prev];
        next[currentLine] = currentCount;
        return next;
      });
      if (charIndex >= charsByLine[lineIndex].length) {
        lineIndex += 1;
        charIndex = 0;
        timer = window.setTimeout(tick, 260);
      } else {
        timer = window.setTimeout(tick, 74);
      }
    };

    timer = window.setTimeout(tick, 360);
    return () => window.clearTimeout(timer);
  }, [lines]);

  return (
    <h1 className="hero-title hero-type-title reveal" style={{fontSize: 'clamp(56px, 9vw, 140px)'}}>
      {lines.map((line, index) => {
        const text = Array.from(line.text).slice(0, visible[index]).join('');
        const showCursor = activeLine === index || (activeLine === null && index === lines.length - 1);
        return (
          <span className={`typed-line ${line.className}`} key={line.text}>
            <span className="typed-ghost" aria-hidden="true">{line.text}</span>
            <span className="typed-live">
              {text}
              {showCursor && <span className="typed-caret" aria-hidden="true"></span>}
            </span>
          </span>
        );
      })}
    </h1>
  );
}

function HeroMeta() {
  return (
    <div className="hero-meta reveal">
      <div className="hero-meta-item">
        <div className="num"><Counter to={50} suffix="+"/></div>
        <div className="label">밀착 컨설팅 기업</div>
      </div>
      <div className="hero-meta-item">
        <div className="num"><Counter to={6000} suffix="+"/></div>
        <div className="label">1:1 코칭 받은 구성원</div>
      </div>
      <div className="hero-meta-item">
        <div className="num"><Counter to={300} suffix="+"/></div>
        <div className="label">완료된 AX 실무 프로젝트</div>
      </div>
      <div className="hero-meta-item">
        <div className="num"><Counter to={11}/><span className="unit">h</span></div>
        <div className="label">구성원 1인당 주간 절감</div>
      </div>
    </div>
  );
}

function HeroOrbital() {
  return (
    <svg className="hero-grid-decor" style={{position:'absolute', right:'-120px', top:'180px', width:'560px', height:'560px', opacity: 0.6, zIndex: 1}} viewBox="0 0 600 600" fill="none">
      <circle cx="300" cy="300" r="280" stroke="rgba(255,255,255,0.06)"/>
      <circle cx="300" cy="300" r="220" stroke="rgba(255,255,255,0.05)"/>
      <circle cx="300" cy="300" r="160" stroke="rgba(255,255,255,0.04)"/>
      <circle cx="300" cy="300" r="100" stroke="rgba(255,106,26,0.18)"/>
      <circle cx="300" cy="300" r="6" fill="#FF6A1A"/>
      <g style={{transformOrigin:'300px 300px', animation:'spin 24s linear infinite'}}>
        <circle cx="580" cy="300" r="4" fill="#FF6A1A"/>
        <circle cx="520" cy="300" r="3" fill="rgba(255,255,255,0.4)"/>
      </g>
      <g style={{transformOrigin:'300px 300px', animation:'spin 18s linear infinite reverse'}}>
        <circle cx="300" cy="80" r="4" fill="rgba(255,255,255,0.6)"/>
        <circle cx="460" cy="140" r="3" fill="#FF8434"/>
      </g>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </svg>
  );
}

Object.assign(window, { Nav, Hero, Counter, Icon, useReveal });
