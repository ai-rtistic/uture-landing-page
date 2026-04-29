// uture v2 — Automatix-inspired sections
const { useEffect: useEffectV2 } = React;

const Star = ({ size = 14, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2 L13.5 9 L20 10 L13.5 14.5 L15 22 L12 17 L9 22 L10.5 14.5 L4 10 L10.5 9 Z"/>
  </svg>
);

/* ====================== Logo Marquee ====================== */
function LogoMarquee() {
  const base = 'assets/customer-logos';
  const logos = [
    'logo-01.png',
    'logo-02.png',
    'logo-03.png',
    'logo-04.png',
    'logo-05.png',
    'logo-06.png',
    'logo-07.png',
    'logo-08.png',
    'logo-09.png',
    'logo-10.png',
    'logo-11.png',
    'logo-12.png',
    'logo-13.png',
    'logo-14.png',
  ];
  const topLogos = logos.filter((_, i) => i % 2 === 0);
  const bottomLogos = logos.filter((_, i) => i % 2 === 1);
  const renderRow = (rowLogos, rev = false) => (
    <div className={`marquee logo-marquee ${rev ? 'reverse' : ''}`}>
      <div className="marquee-track">
        {[...rowLogos, ...rowLogos, ...rowLogos].map((l, i) => (
          <div className="logo-item" key={i}>
            <img src={`${base}/${l}`} alt={`고객사 로고 ${i + 1}`}/>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <section className="logo-row">
      <div className="logo-row-head">성과 중심 실무 교육, 지금 당신의 조직도 함께하세요.</div>
      <div className="logo-stack">
        {renderRow(topLogos, true)}
        {renderRow(bottomLogos, false)}
      </div>
    </section>
  );
}

/* ====================== Approach (3-col) ====================== */
function Approach() {
  const cards = [
    {
      title: '현업 과제 기반 설계',
      desc: '강의실이 아니라 실제 사내 워크플로에서 출발합니다. 부서·직무별 과제를 먼저 인터뷰하고, 그 위에 커리큘럼을 얹습니다.',
      illust: <ApproachIllust1/>,
    },
    {
      title: 'Hands-on 실습 중심',
      desc: '듣기만 하는 강의의 50% 수준 비중. 사내 데이터·도구로 직접 만들어보고, 코칭으로 결과물을 가다듬습니다.',
      illust: <ApproachIllust2/>,
    },
    {
      title: '장기 파트너십',
      desc: '교육이 끝나면 우리도 끝나는 모델이 아닙니다. 분기별 리뷰와 인프라 자문으로 사내 정착까지 함께 책임집니다.',
      illust: <ApproachIllust3/>,
    },
  ];
  return (
    <section className="approach">
      <div className="container">
        <div className="approach-head reveal">
          <span className="eyebrow">Our Approach</span>
          <h2 className="section-title">우리는 이렇게 일합니다</h2>
          <p className="section-sub">교육 회사가 아니라 AX 파트너로서, 도입 이전과 이후를 함께 설계합니다.</p>
        </div>
        <div className="approach-grid reveal-stagger">
          {cards.map((c, i) => (
            <div className="approach-card" key={i}>
              <div className="approach-illust">{c.illust}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachIllust1() {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="ill1grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="320" height="200" fill="url(#ill1grid)"/>
      <rect x="40" y="60" width="120" height="28" rx="6" fill="#1F1F25" stroke="rgba(255,255,255,0.08)"/>
      <rect x="40" y="96" width="160" height="28" rx="6" fill="#1F1F25" stroke="rgba(255,255,255,0.08)"/>
      <rect x="40" y="132" width="100" height="28" rx="6" fill="#FF6A1A" opacity="0.18" stroke="#FF6A1A" strokeWidth="1"/>
      <circle cx="50" cy="74" r="4" fill="#FF6A1A"/>
      <circle cx="50" cy="110" r="4" fill="rgba(255,255,255,0.4)"/>
      <circle cx="50" cy="146" r="4" fill="#FF6A1A"/>
      <text x="64" y="150" fontFamily="JetBrains Mono" fontSize="11" fill="#FF6A1A" fontWeight="600">진단 → 설계</text>
    </svg>
  );
}
function ApproachIllust2() {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="200" fill="#16161A"/>
      <rect x="20" y="30" width="280" height="140" rx="8" fill="#0A0A0B" stroke="rgba(255,255,255,0.06)"/>
      <rect x="20" y="30" width="280" height="22" rx="8" fill="#1B1B22"/>
      <circle cx="34" cy="41" r="4" fill="#FF6A1A"/>
      <circle cx="48" cy="41" r="4" fill="rgba(255,255,255,0.2)"/>
      <circle cx="62" cy="41" r="4" fill="rgba(255,255,255,0.2)"/>
      <text x="36" y="80" fontFamily="JetBrains Mono" fontSize="11" fill="#9DD49C">$ python train.py</text>
      <text x="36" y="100" fontFamily="JetBrains Mono" fontSize="11" fill="#8E8E9A">› loading dataset...</text>
      <text x="36" y="120" fontFamily="JetBrains Mono" fontSize="11" fill="#FF6A1A">✓ epoch 1/3 acc=0.92</text>
      <text x="36" y="140" fontFamily="JetBrains Mono" fontSize="11" fill="#FF6A1A">✓ epoch 2/3 acc=0.96</text>
      <rect x="36" y="150" width="6" height="11" fill="#FF6A1A">
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
      </rect>
    </svg>
  );
}
function ApproachIllust3() {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="200" fill="#16161A"/>
      <line x1="40" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.1)" strokeDasharray="4 6"/>
      <circle cx="60" cy="100" r="14" fill="#1F1F25" stroke="rgba(255,255,255,0.15)"/>
      <circle cx="140" cy="100" r="14" fill="#1F1F25" stroke="rgba(255,255,255,0.15)"/>
      <circle cx="220" cy="100" r="14" fill="#FF6A1A"/>
      <circle cx="280" cy="100" r="6" fill="#FF6A1A" opacity="0.6"/>
      <text x="48" y="135" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E9A">Q1</text>
      <text x="128" y="135" fontFamily="JetBrains Mono" fontSize="10" fill="#8E8E9A">Q2</text>
      <text x="208" y="135" fontFamily="JetBrains Mono" fontSize="10" fill="#FF6A1A" fontWeight="700">NOW</text>
      <text x="60" y="76" fontFamily="JetBrains Mono" fontSize="9" fill="#5A5A66" textAnchor="middle">진단</text>
      <text x="140" y="76" fontFamily="JetBrains Mono" fontSize="9" fill="#5A5A66" textAnchor="middle">교육</text>
      <text x="220" y="76" fontFamily="JetBrains Mono" fontSize="9" fill="#FF6A1A" textAnchor="middle" fontWeight="700">정착</text>
    </svg>
  );
}

/* ====================== Philosophy ====================== */
function Philosophy() {
  return (
    <section className="philosophy">
      <div className="container philosophy-inner reveal">
        <p className="philosophy-text">
          <span className="muted">"AI 툴을 배우는 교육은 많습니다.</span><br/>
          지금은 <span className="accent">'툴'이 아닌 '틀'</span>을<br/>
          바꿔야 할 때입니다."
        </p>
        <div className="philosophy-meta">
          <div className="avatar">U</div>
          <div style={{textAlign:'left'}}>
            <div style={{color:'var(--text-0)', fontWeight: 600}}>Kim Future</div>
            <div>Founder · Head of AX, uture</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== Chip Marquee ====================== */
function ChipMarquee() {
  const chips = [
    'AI-Driven Curriculum', '★ Custom AX Consulting', 'Cloud Integration',
    '★ On-prem 보안 환경', 'AI Agent 개발', '★ LLM Fine-tuning',
    'Prompt Engineering', '★ MLOps 운영 정착', '데이터 거버넌스',
    '★ 임원 AX 워크숍', 'Multi-modal AI', '★ 디자인 씽킹',
  ];
  return (
    <section className="chip-row">
      <div className="marquee">
        <div className="marquee-track" style={{gap: 16}}>
          {[...chips, ...chips].map((c, i) => {
            const accent = i % 5 === 2;
            return (
              <span className={`chip ${accent ? 'accent' : ''}`} key={i}>{c}</span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ====================== Bento Services ====================== */
function BentoServices() {
  return (
    <section className="bento" id="services">
      <div className="container">
        <div className="bento-head reveal">
          <div>
            <span className="eyebrow">Services</span>
            <h2 className="section-title"><Star/> AX의 전 과정,<br/>한 팀에서 끝냅니다</h2>
          </div>
          <p className="section-sub" style={{marginTop:0}}>
            컨설팅 · 커리큘럼 · 인프라 · 사내 정착까지.<br/>
            우리는 단계별로 분리된 모델이 아니라, 한 팀이 끝까지 책임지는 모델로 일합니다.
          </p>
        </div>

        <div className="bento-grid reveal-stagger">
          {/* Plan & Organize */}
          <div className="bento-card b-plan">
            <div className="bento-tag"><Star size={10}/> AX Roadmap</div>
            <h3>진단부터 도입까지<br/>플랜 & 운영</h3>
            <p>조직 진단 데이터를 기반으로 도입 우선순위를 결정하고, 분기 단위로 점검합니다.</p>
            <div className="plan-list">
              <div className="plan-row done">
                <div className="check"><Icon.Check width={10} height={10}/></div>
                <span>사내 보안 정책 검토</span>
              </div>
              <div className="plan-row done">
                <div className="check"><Icon.Check width={10} height={10}/></div>
                <span>직무별 인터뷰 (32명)</span>
              </div>
              <div className="plan-row">
                <div className="check"><Icon.Check width={10} height={10}/></div>
                <span>커리큘럼 v2 배포</span>
              </div>
              <div className="plan-row">
                <div className="check" style={{background:'rgba(255,255,255,0.08)', color:'var(--text-3)'}}><Icon.Plus width={10} height={10}/></div>
                <span style={{color:'var(--text-3)'}}>Q3 사내 해커톤</span>
              </div>
            </div>
          </div>

          {/* Custom Projects (code) */}
          <div className="bento-card b-code">
            <div className="bento-tag"><Star size={10}/> Custom Projects</div>
            <h3>사내 데이터로<br/>맞춤 AI 프로젝트</h3>
            <p>실제 사내 데이터·시스템과 연결되는 AI 워크플로를 함께 만듭니다.</p>
            <div className="code-block">
              <div><span className="ln">01</span><span className="com"># uture custom agent</span></div>
              <div><span className="ln">02</span><span className="kw">from</span> uture <span className="kw">import</span> Agent</div>
              <div><span className="ln">03</span></div>
              <div><span className="ln">04</span>agent = Agent(</div>
              <div><span className="ln">05</span>  domain=<span className="str">"telco"</span>,</div>
              <div><span className="ln">06</span>  secure=<span className="kw">True</span>,</div>
              <div><span className="ln">07</span>)</div>
              <div><span className="ln">08</span>agent.deploy()</div>
            </div>
          </div>

          {/* Smart Workflow */}
          <div className="bento-card b-flow">
            <div className="bento-tag"><Star size={10}/> Smart Workflow</div>
            <h3>업무 흐름에<br/>자동으로 녹여내기</h3>
            <p>사내 SaaS·메신저·문서 시스템과 연결된 AI 워크플로를 설계합니다.</p>
            <div className="flow-diagram">
              <div className="flow-node"><div className="pin">IN</div><span>Slack 메시지 수집</span></div>
              <div className="flow-arrow">↓</div>
              <div className="flow-node active"><div className="pin">AI</div><span>uture Agent 분석</span></div>
              <div className="flow-arrow">↓</div>
              <div className="flow-node"><div className="pin">→</div><span>Confluence 자동 업로드</span></div>
            </div>
          </div>

          {/* Stats */}
          <div className="bento-card b-stat-1">
            <div>
              <div className="bento-tag"><Star size={10}/> Adoption Rate</div>
              <h3 style={{margin:0}}>도입 후 사내<br/>활용률</h3>
            </div>
            <div className="bento-stat-num"><Counter to={87}/>%</div>
          </div>
          <div className="bento-card b-stat-2">
            <div>
              <div className="bento-tag"><Star size={10}/> Time Saved</div>
              <h3 style={{margin:0}}>주당 절감되는<br/>업무 시간</h3>
            </div>
            <div className="bento-stat-num"><Counter to={11}/>h</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====================== Big Stats Strip ====================== */
function StatsStrip() {
  const stats = [
    { num: 38000, suffix: '+', label: '교육생 수료', accent: true },
    { num: 4.9, suffix: '/5', label: '평균 만족도', accent: false },
    { num: 210, suffix: '+', label: '도입 기업', accent: false },
    { num: 94, suffix: '%', label: '재계약률', accent: true },
  ];
  return (
    <section className="stats-strip">
      <div className="container">
        <div className="stats-strip-grid reveal-stagger">
          {stats.map((s, i) => (
            <div className="stat-cell" key={i}>
              <div className="num">
                {s.num < 10 ? (
                  <>
                    <span className={s.accent ? 'accent' : ''}>{s.num}</span>
                    <span style={{color:'var(--text-3)'}}>{s.suffix}</span>
                  </>
                ) : (
                  <>
                    <span className={s.accent ? 'accent' : ''}><Counter to={Math.round(s.num)}/></span>
                    <span style={{color: s.accent ? 'var(--orange)' : 'var(--text-3)'}}>{s.suffix}</span>
                  </>
                )}
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====================== Big Final CTA ====================== */
function BigCTA() {
  return (
    <section className="big-cta" id="contact-big">
      <div className="container big-cta-inner reveal">
        <div className="proposal-layout">
          <div className="proposal-copy">
            <span className="proposal-eyebrow">Proposal Preview</span>
            <h2>
              우리 조직에 맞는<br/>
              <span className="accent">AI 교육 설계안</span>을 받아보세요.
            </h2>
            <p>진단 미팅 전, 업종과 부서에 맞춘 사례집 · 커리큘럼 샘플 · 도입 로드맵을 먼저 보내드립니다.</p>
            <div className="proposal-points" aria-hidden="true">
              {['업종별 사례집', '직무별 커리큘럼', '도입 로드맵'].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="actions">
              <a href="#" className="btn btn-primary">무료 진단 신청 <Icon.ArrowRight/></a>
              <a href="#" className="btn btn-ghost">사례집 다운로드</a>
            </div>
          </div>

          <div className="proposal-card" aria-hidden="true">
            <div className="proposal-card-head">
              <span>AX Education Proposal</span>
              <strong>uture</strong>
            </div>
            <div className="proposal-status">
              <span>Preview Package</span>
              <em>Ready in D+7</em>
            </div>
            <div className="proposal-card-title">
              <span>Prepared for</span>
              <strong>Your Organization</strong>
            </div>
            <div className="proposal-summary">
              <div>
                <span>Industry</span>
                <strong>맞춤 사례</strong>
              </div>
              <div>
                <span>Team</span>
                <strong>직무 매핑</strong>
              </div>
              <div>
                <span>Scope</span>
                <strong>파일럿 설계</strong>
              </div>
            </div>
            <div className="proposal-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="proposal-checklist">
              {['조직 진단 미팅', '직무별 커리큘럼', '파일럿 운영 로드맵'].map((item, index) => (
                <div className="proposal-check" key={item}>
                  <Icon.Check width={15} height={15}/>
                  <span>{item}</span>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                </div>
              ))}
            </div>
            <div className="proposal-footer">
              <span>Avg. first meeting</span>
              <strong>D+7</strong>
              <span>Included files</span>
              <strong>3</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { LogoMarquee, Approach, Philosophy, ChipMarquee, BentoServices, StatsStrip, BigCTA, Star });
