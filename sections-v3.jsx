// uture v3 — interactive sections
const { useState: useStateI, useEffect: useEffectI, useRef: useRefI, useMemo: useMemoI } = React;

/* ============== Match Your Team (interactive plan builder) ============== */
function MatchYourTeam() {
  const ROLES = [
    { id: 'mgmt', label: '경영진', emoji: 'M' },
    { id: 'plan', label: '기획/전략', emoji: 'P' },
    { id: 'mkt', label: '마케팅', emoji: 'K' },
    { id: 'dev', label: '개발', emoji: 'D' },
    { id: 'ops', label: '운영/CS', emoji: 'O' },
    { id: 'hr', label: 'HR/지원', emoji: 'H' },
  ];
  const LEVELS = ['입문', '기초', '실무', '응용', '전문'];

  const [role, setRole] = useStateI('plan');
  const [level, setLevel] = useStateI(2);
  const [size, setSize] = useStateI(20);

  // Generate modules from inputs
  const plan = useMemoI(() => {
    const r = ROLES.find(x => x.id === role);
    const lv = LEVELS[level];

    const titleMap = {
      mgmt: { title: '경영진을 위한 AX 의사결정 코칭', desc: '전략 · 의사결정 · 투자 판단을 AI 기반으로 가속화합니다. 경영 KPI에 직접 연결된 1:1 코칭 프로그램.' },
      plan: { title: '기획자의 사고를 확장하는 AI 워크플로', desc: '리서치 · 시장 분석 · 기획서 작성 전 과정을 AI 페어워크로 재설계. 본인 PRD를 가지고 코치와 함께 다듬습니다.' },
      mkt: { title: '마케터를 위한 콘텐츠 · 데이터 · 운영 자동화', desc: '캠페인 기획 · 카피 · 데이터 분석을 AI로 절반 시간에. 실제 진행 중인 캠페인으로 1:1 코칭 진행.' },
      dev: { title: '개발자를 위한 AI 페어 프로그래밍 · 에이전트 설계', desc: '커서 · 클로드 · 에이전트 빌딩을 본인 사내 코드베이스로 학습. 사내 보안 · 인프라 환경에 맞춘 실전.' },
      ops: { title: '운영 · CS의 반복 업무를 AI로 자동화', desc: 'CS 응대 · 보고서 · 데이터 정리 등 매일 반복되는 업무를 AI 워크플로로 변환합니다.' },
      hr: { title: 'HR · 지원 부서의 AI 활용 가속', desc: '채용 · 평가 · 사내 커뮤니케이션 자동화. HR 데이터 보안을 고려한 사내 환경에서 실습.' },
    };

    const baseModules = {
      mgmt: [
        { t: '경영 KPI · AX 매핑', d: '핵심 지표를 AI로 어디서 끌어올릴지 함께 설계' },
        { t: '의사결정 어시스턴트 구축', d: '본인 결재 흐름에 맞춘 GPT 어시스턴트 1:1 셋업' },
        { t: '임원 라운드테이블', d: '월 1회 동료 임원과의 케이스 스터디' },
        { t: '투자 · 리스크 시뮬레이션', d: 'AI 기반 시나리오 분석 코칭' },
      ],
      plan: [
        { t: '리서치 워크플로 재설계', d: '시장 · 경쟁사 · 사용자 인터뷰를 AI 페어로' },
        { t: 'PRD/기획서 코칭', d: '본인 진행 중인 문서를 1:1로 다듬기' },
        { t: '데이터 기반 의사결정', d: '간단한 SQL · 차트 작성을 AI로' },
        { t: '발표 · 보고 자료 가속', d: '슬라이드 · 한 페이지 보고서 자동화' },
      ],
      mkt: [
        { t: '캠페인 콘셉트 발산', d: '본인 캠페인 브리프로 GPT 페어 워크샵' },
        { t: '카피 · 비주얼 페어', d: '카피 · 이미지 · 영상 프롬프트 1:1 코칭' },
        { t: '실적 데이터 분석', d: 'GA · 메타 데이터를 AI로 진단' },
        { t: 'A/B 테스트 자동화', d: '프롬프트 기반 변형 + 결과 해석' },
      ],
      dev: [
        { t: 'AI Pair Programming', d: '커서 · 클로드 코드를 사내 환경에서 1:1' },
        { t: '코드베이스 분석 · 리팩토링', d: '본인 레포로 진행하는 코칭' },
        { t: '에이전트 · MCP 설계', d: '사내 시스템에 붙는 에이전트 직접 빌드' },
        { t: '보안 · 거버넌스', d: '사내 정책에 맞춘 LLM 프록시 구성' },
      ],
      ops: [
        { t: 'CS 응대 자동 초안', d: '내 메일함 데이터로 1:1 셋업' },
        { t: '리포트 · 정리 자동화', d: 'Sheets · Notion 워크플로 코칭' },
        { t: '내부 챗봇 만들기', d: '운영 매뉴얼 RAG 챗봇 직접 제작' },
        { t: '월간 운영 회고', d: '데이터 자동 요약 → 액션 도출' },
      ],
      hr: [
        { t: 'JD · 면접 질문 가속', d: '채용 직무별 JD 생성 코칭' },
        { t: '평가 · 피드백 워크플로', d: '평가 데이터 · 피드백 정리 자동화' },
        { t: '사내 정책 챗봇', d: '취업규칙 · 가이드를 RAG로 챗봇화' },
        { t: '온보딩 자동화', d: '신규 입사자 1주차 자동 가이드' },
      ],
    };

    const weeks = level <= 1 ? 8 : level <= 3 ? 12 : 16;
    const sessions = Math.ceil(size / 4) * 4 + level * 2;
    const lift = 30 + level * 8 + (size > 30 ? 6 : 0);

    return {
      role: r,
      level: lv,
      title: titleMap[role].title,
      desc: titleMap[role].desc,
      modules: baseModules[role],
      weeks,
      sessions,
      lift,
    };
  }, [role, level, size]);

  const planId = useMemoI(() => `UTR-${role.toUpperCase()}-${level}-${String(size).padStart(3,'0')}`, [role, level, size]);

  return (
    <section className="match-section" id="match">
      <div className="match-bg-glow l"></div>
      <div className="match-bg-glow r"></div>
      <div className="container">
        <div className="match-head reveal">
          <span className="eyebrow">Live Plan Builder</span>
          <h2 className="section-title">우리 팀에 맞는 <span style={{color:'var(--orange)'}}>1:1 코칭 플랜</span>,<br/>지금 바로 그려보세요</h2>
          <p className="section-sub">
            직무 · 숙련도 · 인원만 입력하면 우리 팀에 딱 맞는 컨설팅 계획이 실시간으로 만들어집니다.
            실제 진행 시에는 AX 컨설턴트가 한 번 더 인터뷰로 깎아드립니다.
          </p>
        </div>

        <div className="match-builder reveal">
          {/* Controls */}
          <div className="match-controls">
            <div className="match-control">
              <h4>① 우리 팀 직무</h4>
              <div className="role-grid">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    className={`role-btn data-cursor-hover ${role === r.id ? 'active' : ''}`}
                    onClick={() => setRole(r.id)}
                  >
                    <span className="role-icon">{r.emoji}</span>
                    <span>{r.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="match-control">
              <h4>② 평균 AI 숙련도</h4>
              <div className="level-track">
                <div className="level-rail">
                  <div className="level-fill" style={{width: `${(level / (LEVELS.length - 1)) * 100}%`}}></div>
                  <div className="level-dots">
                    {LEVELS.map((_, i) => (
                      <div
                        key={i}
                        className={`level-dot data-cursor-hover ${i < level ? 'passed' : ''} ${i === level ? 'active' : ''}`}
                        onClick={() => setLevel(i)}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="level-labels">
                  {LEVELS.map((l, i) => (
                    <span key={i} className={i === level ? 'active' : ''}>{l}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="match-control">
              <h4>③ 코칭 받을 인원</h4>
              <div className="size-input">
                <button className="size-btn data-cursor-hover" onClick={() => setSize(Math.max(5, size - 5))}>−</button>
                <span className="size-val">{size}<span className="unit">명</span></span>
                <button className="size-btn data-cursor-hover" onClick={() => setSize(Math.min(200, size + 5))}>+</button>
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="match-output">
            <div className="match-output-head">
              <div className="match-output-tag">
                <span className="live-dot"></span>
                LIVE PLAN · {plan.level} 레벨
              </div>
              <div className="match-output-pid">{planId}</div>
            </div>
            <h3 key={plan.title} className="match-output-title mm-anim">
              {plan.title}
            </h3>
            <p key={plan.desc} className="match-output-desc mm-anim">{plan.desc}</p>

            <div className="match-modules" key={role + level}>
              {plan.modules.map((m, i) => (
                <div className="match-module mm-anim" key={i} style={{animationDelay: `${i * 0.06}s`}}>
                  <div className="mm-num">MODULE / {String(i+1).padStart(2,'0')}</div>
                  <div className="mm-title">{m.t}</div>
                  <div className="mm-desc">{m.d}</div>
                  <div className="mm-pill">★ 1:1 COACHING</div>
                </div>
              ))}
            </div>

            <div className="match-summary">
              <div className="match-summary-stat">
                <span className="v"><Counter to={plan.weeks} key={`w${plan.weeks}`}/>주</span>
                <span className="l">기본 운영 기간</span>
              </div>
              <div className="match-summary-stat">
                <span className="v"><span className="accent"><Counter to={plan.sessions} key={`s${plan.sessions}`}/></span>회</span>
                <span className="l">1:1 코칭 세션</span>
              </div>
              <div className="match-summary-stat">
                <span className="v"><span className="accent">+<Counter to={plan.lift} key={`l${plan.lift}`}/>%</span></span>
                <span className="l">예상 업무 효율 향상</span>
              </div>
              <a href="#contact" className="cta btn btn-primary data-cursor-hover">이 플랜으로 상담받기 <Icon.ArrowRight/></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Closeness — sticky scroll narrative ============== */
function Closeness() {
  const [active, setActive] = useStateI(0);
  const wrapRef = useRefI(null);

  const stages = [
    { idx: '01', label: '진단 — 한 명씩 들여다보기' },
    { idx: '02', label: '매칭 — 코치와 1:1 페어' },
    { idx: '03', label: '코칭 — 내 업무로 함께 작업' },
    { idx: '04', label: '정착 — 결과로 증명' },
  ];

  useEffectI(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const idx = Math.min(stages.length - 1, Math.floor(progress * stages.length));
      setActive(idx);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="closeness" style={{padding: '60px 0'}}>
      <div className="container">
        <div className="closeness-wrap" ref={wrapRef} style={{minHeight: '220vh'}}>
          {/* Left: text */}
          <div className="closeness-text reveal">
            <span className="eyebrow">How Close We Get</span>
            <h2 style={{marginTop: 24}}>
              교육이 아니라,<br/><span className="accent">옆에서 같이 일합니다</span>
            </h2>
            <p>
              uture의 컨설턴트는 강의장이 아니라 구성원의 책상 옆에 앉습니다.
              실제 업무를 함께 들여다보고, AI를 어디에 어떻게 끼워 넣을지 — 한 명 한 명에게 다른 답을 줍니다.
            </p>
            <ul className="closeness-stages">
              {stages.map((s, i) => (
                <li key={i} className={active === i ? 'active' : ''} onClick={() => {
                  const el = wrapRef.current;
                  if (!el) return;
                  const total = el.offsetHeight - window.innerHeight;
                  window.scrollTo({ top: el.offsetTop + total * (i / stages.length) + 1, behavior: 'smooth' });
                }}>
                  <span className="idx">{s.idx}</span>
                  <span className="lbl">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: sticky canvas */}
          <div className="closeness-canvas">
            <div className={`cc-stage ${active === 0 ? 'active' : ''}`}>
              <div className="cc-persona">
                <div className="cc-radar">
                  <svg viewBox="0 0 280 280">
                    {[120, 90, 60, 30].map((r, i) => (
                      <polygon key={i}
                        points={[0, 1, 2, 3, 4].map(j => {
                          const ang = -Math.PI/2 + j * (2 * Math.PI / 5);
                          return `${140 + Math.cos(ang) * r},${140 + Math.sin(ang) * r}`;
                        }).join(' ')}
                        fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                    ))}
                    <polygon
                      points={[80, 95, 70, 110, 60].map((v, j) => {
                        const ang = -Math.PI/2 + j * (2 * Math.PI / 5);
                        return `${140 + Math.cos(ang) * v},${140 + Math.sin(ang) * v}`;
                      }).join(' ')}
                      fill="rgba(255,106,26,0.18)"
                      stroke="#FF6A1A"
                      strokeWidth="1.5"/>
                    {[0,1,2,3,4].map(j => {
                      const ang = -Math.PI/2 + j * (2 * Math.PI / 5);
                      return <circle key={j} cx={140 + Math.cos(ang) * 120} cy={140 + Math.sin(ang) * 120} r="3" fill="#FF6A1A"/>;
                    })}
                    {['툴', '데이터', '협업', '자동화', '판단'].map((label, j) => {
                      const ang = -Math.PI/2 + j * (2 * Math.PI / 5);
                      return <text key={j} x={140 + Math.cos(ang) * 138} y={140 + Math.sin(ang) * 138} fontSize="11" fill="#8E8E9A" textAnchor="middle" dy="4" fontFamily="JetBrains Mono">{label}</text>;
                    })}
                  </svg>
                </div>
                <div className="cc-persona-card">
                  <div className="av">JK</div>
                  <div className="nm">정 기획 차장</div>
                  <div className="ro">기획팀 · 9년차</div>
                  <div className="lb">
                    <div>
                      <div className="row"><span>도구 활용</span><span style={{color:'var(--orange)'}}>72%</span></div>
                      <div className="bar" style={{'--w': '72%'}}></div>
                    </div>
                    <div>
                      <div className="row"><span>업무 적용</span><span style={{color:'var(--orange)'}}>40%</span></div>
                      <div className="bar" style={{'--w': '40%'}}></div>
                    </div>
                    <div>
                      <div className="row"><span>자동화</span><span style={{color:'var(--orange)'}}>25%</span></div>
                      <div className="bar" style={{'--w': '25%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={`cc-stage ${active === 1 ? 'active' : ''}`}>
              <div className="cc-match">
                <div className="cc-col">
                  <div className="cc-chip-block">정 기획 차장</div>
                  <div className="cc-chip-block">박 마케터</div>
                  <div className="cc-chip-block">김 개발자</div>
                </div>
                <svg className="cc-match-svg" viewBox="0 0 200 240">
                  {[40, 120, 200].map((y, i) => (
                    <path key={i} d={`M 0 ${y} C 80 ${y}, 120 ${[120,40,200][i]}, 200 ${[120,40,200][i]}`}
                      fill="none" stroke={i === 1 ? '#FF6A1A' : 'rgba(255,255,255,0.18)'} strokeWidth={i === 1 ? 2 : 1}
                      strokeDasharray={i === 1 ? '0' : '4 4'}/>
                  ))}
                </svg>
                <div className="cc-col">
                  <div className="cc-chip-block">컨설턴트 A</div>
                  <div className="cc-chip-block coach">★ 컨설턴트 B</div>
                  <div className="cc-chip-block">컨설턴트 C</div>
                </div>
              </div>
            </div>

            <div className={`cc-stage ${active === 2 ? 'active' : ''}`}>
              <div className="cc-chat">
                <div className="cc-msg user"><span className="who">정 기획 차장</span>이번 주 발표 자료, AI로 어떻게 풀까요?</div>
                <div className="cc-msg coach"><span className="who">★ 컨설턴트 B</span>지난번 PRD 흐름 그대로 가져갑시다. 본인 자료 공유해주시면 같이 슬라이드 골격부터 잡을게요.</div>
                <div className="cc-msg user">공유드렸어요. 데이터 챕터가 약해서 걱정이에요.</div>
                <div className="cc-typing"><span></span><span></span><span></span></div>
              </div>
            </div>

            <div className={`cc-stage ${active === 3 ? 'active' : ''}`}>
              <div className="cc-dash">
                <div className="cc-tile">
                  <div className="l">주간 절감</div>
                  <div className="v">11<small>h</small></div>
                  <div className="delta">▲ +3.4h</div>
                </div>
                <div className="cc-tile">
                  <div className="l">활용률</div>
                  <div className="v">87<small>%</small></div>
                  <div className="delta">▲ +28%</div>
                </div>
                <div className="cc-tile spark">
                  <div className="l">12주차 학습 곡선</div>
                  <svg viewBox="0 0 400 60" preserveAspectRatio="none">
                    <path d="M 0 50 L 30 48 L 60 44 L 90 38 L 120 36 L 150 28 L 180 24 L 210 18 L 240 16 L 270 12 L 300 10 L 330 8 L 360 6 L 400 4"
                      fill="none" stroke="#FF6A1A" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M 0 50 L 30 48 L 60 44 L 90 38 L 120 36 L 150 28 L 180 24 L 210 18 L 240 16 L 270 12 L 300 10 L 330 8 L 360 6 L 400 4 L 400 60 L 0 60 Z"
                      fill="url(#sparkGrad)" opacity="0.3"/>
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF6A1A" stopOpacity="0.8"/>
                        <stop offset="100%" stopColor="#FF6A1A" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== Cursor follower ============== */
function CursorFX() {
  const ringRef = useRefI(null);
  const dotRef = useRefI(null);

  useEffectI(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.classList.add('visible');
      dot.classList.add('visible');
    };
    const onLeave = () => {
      ring.classList.remove('visible');
      dot.classList.remove('visible');
    };
    const onDown = () => ring.style.transform += ' scale(0.85)';
    const onUp = () => { ring.style.transform = ring.style.transform.replace(' scale(0.85)', ''); };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    tick();

    const checkHover = (e) => {
      const t = e.target;
      const isHover = t.closest('a, button, .role-btn, .level-dot, .size-btn, [data-cursor-hover], .data-cursor-hover, .case-card, .concern-card, .approach-card, .case-btn');
      ring.classList.toggle('hover', !!isHover);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', checkHover);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', checkHover);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <>
      <div className="cursor-fx" ref={ringRef}></div>
      <div className="cursor-dot" ref={dotRef}></div>
    </>
  );
}

/* ============== Magnetic CTA wrapper (applied via global handler) ============== */
function MagneticBoot() {
  useEffectI(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const btns = document.querySelectorAll('.btn-primary');
    const handlers = [];
    btns.forEach((btn) => {
      btn.classList.add('magnetic-btn');
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
      };
      const onLeave = () => { btn.style.transform = ''; };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      handlers.push({ btn, onMove, onLeave });
    });
    return () => handlers.forEach(({ btn, onMove, onLeave }) => {
      btn.removeEventListener('mousemove', onMove);
      btn.removeEventListener('mouseleave', onLeave);
    });
  });
  return null;
}

Object.assign(window, { MatchYourTeam, Closeness, CursorFX, MagneticBoot });
