// uture — sections (concerns, solutions, cases, process, cta, footer)
const { useState: useStateS, useEffect: useEffectS, useRef: useRefS } = React;

/* ====================== Concerns ====================== */
function Concerns() {
  const items = [
    { num: '01', icon: <Icon.Users/>, title: <>모두에게 <em>같은 강의</em>만 반복되는 교육</>, desc: '직무도 숙련도도 다른데 강의는 한 가지. 정작 "내 업무에 어떻게?"가 빠집니다.' },
    { num: '02', icon: <Icon.Compass/>, title: <>실무로 <em>이어지지 않는</em> 학습</>, desc: '강의는 들었지만 다음 날 자기 일에 어떻게 적용할지 막막한 상태로 끝납니다.' },
    { num: '03', icon: <Icon.Lock/>, title: <>회사 환경에 <em>맞지 않는</em> 도구</>, desc: '보안 · 데이터 정책 · 사내 시스템과 어긋나, 결국 책상 위에서만 멈추는 AI.' },
    { num: '04', icon: <Icon.Trend/>, title: <>혼자 남는 <em>교육 이후</em></>, desc: '교육이 끝나면 끝. 막힐 때 물어볼 사람이 없어 점점 다시 안 쓰게 됩니다.' },
  ];
  return (
    <section className="concerns" id="concerns">
      <div className="container">
        <div className="concerns-head reveal">
          <div>
            <span className="eyebrow">Why uture</span>
            <h2 className="section-title">조직과 사람에<br/>맞춰야 비로소 작동합니다</h2>
          </div>
          <p className="section-sub">
            우리는 210여 개 기업과 일하며, AI가 "책상 밖"으로 나가지 못하는 4가지 이유를 정리했습니다.
            uture는 그 지점을 한 명 한 명 옆에서 풀어냅니다.
          </p>
        </div>
        <div className="concerns-grid reveal-stagger">
          {items.map((it) => (
            <div className="concern-card" key={it.num}>
              <div className="concern-num">PROBLEM / {it.num}</div>
              <div className="concern-icon">{it.icon}</div>
              <h3 className="concern-title">{it.title}</h3>
              <p className="concern-desc">{it.desc}</p>
              <div className="concern-arrow"><Icon.ArrowUpRight/></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== Solution 1 ====================== */
function Solution1() {
  return (
    <section className="sol1" id="sol1">
      <div className="container">
        <div className="sol1-head reveal">
          <span className="eyebrow">Solution 01</span>
          <h2 className="section-title">기업 맞춤 · 조직원 맞춤,<br/><span style={{color:'var(--orange)'}}>두 축으로 설계</span>합니다</h2>
          <p className="section-sub">
            회사의 산업 · 환경 · 보안에 맞추고, 그 안에서 한 명 한 명의 직무와 숙련도까지 들여다봅니다.
            uture의 컨설팅은 두 축이 함께 움직일 때 진짜 변화가 시작된다고 믿습니다.
          </p>
        </div>
        <div className="sol1-grid reveal-stagger">
          <div className="sol1-card">
            <div className="sol1-decor"></div>
            <span className="sol1-tag">AXIS 01 · COMPANY</span>
            <h3 className="sol1-title">기업 맞춤<br/>AX 컨설팅</h3>
            <p className="sol1-desc">산업, 사내 환경, 보안 정책, 데이터 자산까지 — 회사의 "맥락" 위에 AI를 올립니다.</p>
            <ul className="sol1-list">
              <li><Icon.Check/><span>산업 · 직무군별 AX 진단 워크숍 운영</span></li>
              <li><Icon.Check/><span>보안 정책 · 데이터 거버넌스 검토와 인프라 자문</span></li>
              <li><Icon.Check/><span>경영진과 함께 만드는 12개월 AX 로드맵</span></li>
              <li><Icon.Check/><span>분기별 성과 리뷰 + 로드맵 업데이트</span></li>
            </ul>
          </div>
          <div className="sol1-card long">
            <div className="sol1-decor"></div>
            <span className="sol1-tag">AXIS 02 · PEOPLE</span>
            <h3 className="sol1-title">조직원 맞춤<br/>밀착 코칭</h3>
            <p className="sol1-desc">구성원 한 명 한 명의 실제 업무를 함께 들여다보고, AI로 일하는 방식까지 바꿔드립니다.</p>
            <ul className="sol1-list">
              <li><Icon.Check/><span>1:1 직무 인터뷰로 "내 업무에 AI 어떻게" 매핑</span></li>
              <li><Icon.Check/><span>숙련도별 학습 트랙 + 동료 페어 코칭</span></li>
              <li><Icon.Check/><span>실제 업무 산출물로 진행하는 핸즈온 워크샵</span></li>
              <li><Icon.Check/><span>전담 코치가 12주간 슬랙·미팅으로 밀착 동행</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== Cases ====================== */
function Cases() {
  const trackRef = useRefS(null);
  const cases = [
    { tag: '통신 · 개발직', visual: 'v-comm', label: 'TEL', title: 'AI Agent 개발을 위한\n150명 이상 실무형 인재 양성', stat: '152', label2: '명 수료' },
    { tag: '제조 · 기술직', visual: 'v-mfg', label: 'MFG', title: '제조 현장 데이터 활용\n극대화 직무별 맞춤 교육', stat: '4.8', label2: '/ 5.0 만족도' },
    { tag: 'IT · 플랫폼', visual: 'v-it', label: 'IT', title: '나이 · 전공 · 직업 불문\nN사와 함께한 전사 AI 교육', stat: '2,300', label2: '명 동시 운영' },
    { tag: '공공 · 행정', visual: 'v-pub', label: 'GOV', title: 'AX를 통한 공기업\n생산성 향상 대표 사례', stat: '37', label2: '% 업무 시간 단축' },
    { tag: '연구 · 교육', visual: 'v-edu', label: 'EDU', title: '학점 연계 과정 Y대 학생들의\n마음을 사로잡은 AI 교육', stat: '98', label2: '% 재수강 의향' },
    { tag: '금융 · 전사 공통', visual: 'v-fin', label: 'FIN', title: '리스크 부서 실무자 대상\nAI 워크플로 도입 프로젝트', stat: '12', label2: '주 단축' },
  ];
  const scroll = (dir) => {
    const el = trackRef.current; if (!el) return;
    el.scrollBy({ left: dir * 420, behavior: 'smooth' });
  };
  return (
    <section className="cases" id="cases">
      <div className="container">
        <div className="cases-head reveal">
          <div>
            <span className="eyebrow">Solution 02 · Cases</span>
            <h2 className="section-title">산업과 직무에 맞춰,<br/>이미 작동 중인 교육</h2>
          </div>
          <div style={{display:'flex', flexDirection:'column', gap:24, alignItems:'flex-end'}}>
            <p className="section-sub" style={{textAlign:'right'}}>
              통신 · 제조 · 공공 · 금융까지.<br/>uture가 설계하고 운영한 산업별 교육 사례입니다.
            </p>
            <div className="cases-controls">
              <button className="case-btn" onClick={() => scroll(-1)} aria-label="prev">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="case-btn" onClick={() => scroll(1)} aria-label="next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="cases-track" ref={trackRef}>
          {cases.map((c, i) => (
            <div className="case-card" key={i}>
              <div className={`case-visual ${c.visual}`}>
                <div className="case-visual-pin"><span className="dot"></span>{c.tag}</div>
                <div className="case-visual-label">{c.label}</div>
              </div>
              <div className="case-body">
                <div className="meta">CASE · {String(i+1).padStart(2,'0')}</div>
                <h3>{c.title.split('\n').map((l, j) => <span key={j}>{l}<br/></span>)}</h3>
                <div className="stat">
                  <span className="v">{c.stat}</span>
                  <span className="l">{c.label2}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== Process ====================== */
function Process() {
  const [active, setActive] = useStateS(0);
  const stepsRef = useRefS(null);
  useEffectS(() => {
    const root = stepsRef.current; if (!root) return;
    const steps = root.querySelectorAll('.process-step');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = parseInt(e.target.dataset.idx, 10);
          setActive(idx);
        }
      });
    }, { threshold: 0.5 });
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const steps = [
    { num: 'STEP 01', title: '조직 진단 · 구성원 인터뷰', desc: '회사의 산업 · 환경과 함께, 구성원 개개인의 직무 · 숙련도 · AI 경험까지 들여다봅니다.', tags: ['기업 진단', '1:1 인터뷰'], time: '~ 5일' },
    { num: 'STEP 02', title: '맞춤 커리큘럼 · 코칭 설계', desc: '구성원 그룹별 다른 트랙을 설계하고, 1:1 코칭 패어와 실제 업무 산출물까지 정의합니다.', tags: ['그룹별 트랙', '코치 매칭'], time: '5 ~ 7일' },
    { num: 'STEP 03', title: '밀착 컨설팅 · 실전 적용', desc: '강의가 아닌 "내 업무"를 다뤄서 함께 개선합니다. 주간 슬랙 · 워크숍으로 진짜 결과물을 만듭니다.', tags: ['1:1 코칭', '종합 워크샵'], time: '8 ~ 12주' },
    { num: 'STEP 04', title: '사내 정착 · 장기 파트너십', desc: '교육 종료 후에도 분기별 리뷰와 사내 챔피언 육성으로 구성원이 쓰는 AI가 시스템으로 자리잡도록 계속 옆에 있습니다.', tags: ['분기 리뷰', '사내 챔피언'], time: '장기 운영' },
  ];
  return (
    <section className="process" id="process">
      <div className="container">
        <div className="process-head reveal" style={{maxWidth: 720}}>
          <span className="eyebrow">Process</span>
          <h2 className="section-title">한 명 한 명의 일하는<br/>방식을 바꾸는 4단계</h2>
          <p className="section-sub">
            교육이 아니라 조직과 사람의 일하는 맥락을 설계합니다. uture는 4단계 내내 염에서 함께 갑니다.
          </p>
        </div>
        <div className="process-list" ref={stepsRef}>
          {steps.map((s, i) => (
            <div className={`process-step ${active === i ? 'active' : ''}`} key={i} data-idx={i}>
              <div className="process-num">
                <div className="dot"></div>
                <div className="label">{s.num}</div>
              </div>
              <div className="process-body">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
              </div>
              <div className="process-time">{s.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== Final CTA ====================== */
function FinalCTA() {
  return (
    <section className="final-cta" id="contact">
      <div className="final-cta-glow"></div>
      <div className="container final-cta-inner reveal">
        <span className="eyebrow" style={{justifyContent:'center'}}>Get Started</span>
        <h2 style={{marginTop: 24}}>
          성과와 혁신이 필요한 지금,<br/>
          <span className="accent">uture</span>를 켜세요.
        </h2>
        <p>맞춤 진단부터 운영까지, 평균 7일 안에 첫 미팅을 잡아드립니다.</p>
        <div className="actions">
          <a href="#" className="btn btn-primary">기업교육 무료 진단 신청 <Icon.ArrowRight/></a>
          <a href="#" className="btn btn-ghost">사례집 다운로드</a>
        </div>
      </div>
    </section>
  );
}

/* ====================== Footer ====================== */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#" className="logo">
              <span className="logo-mark">u</span>
              <span>uture</span>
            </a>
            <p className="desc">기업의 AI 전환을 설계하는 AX 에이전시. 진단 · 교육 · 인프라 · 정착까지 한 팀이 책임집니다.</p>
          </div>
          <div className="footer-col">
            <h4>Service</h4>
            <ul>
              <li><a href="#">AX 진단</a></li>
              <li><a href="#">기업교육</a></li>
              <li><a href="#">AI 인프라</a></li>
              <li><a href="#">사내 정착</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Cases</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Newsroom</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="#">biz@uture.ai</a></li>
              <li><a href="#">+82 010-0000-0000</a></li>
              <li><a href="#">서울 강남구</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 uture Inc. All rights reserved.</span>
          <span>사업자등록번호 000-00-00000 · 대표 김유쳐</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Concerns, Solution1, Cases, Process, FinalCTA, Footer });
