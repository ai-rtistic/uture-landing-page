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
            우리는 50여 개 기업과 일하며, AI가 실무에 안착하지 못하는 4가지 이유를 정리했습니다.
            <br/>유쳐는 그 지점을 각 구성원 곁에서 함께 풀어냅니다.
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
            유쳐의 컨설팅은 두 축이 함께 움직일 때 진짜 변화가 시작된다고 믿습니다.
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
    { tag: 'IT · FinTech', visual: 'v-comm', label: 'FIN', title: '핀테크 실무자의\n10주 업무자동화 도전', stat: '94', label2: '% 재수강 의향' },
    { tag: '제조 · 대기업', visual: 'v-mfg', label: 'MFG', title: '반기마다 찾아오는\n전사 생성형 AI 정착 과정', stat: '3', label2: '기+ 연속 운영' },
    { tag: 'IT · 플랫폼', visual: 'v-it', label: 'IT', title: '게임사 신입 공채\nAI와 함께 첫 출근', stat: '100', label2: '% 신입 이수율' },
    { tag: '금융 · 공공', visual: 'v-pub', label: 'GOV', title: '신입 행원부터\nAI로 데이터를 분석하다', stat: '32', label2: '% 업무 시간 단축' },
    { tag: '금융 · 신입', visual: 'v-fin', label: 'FIN', title: '비개발직도 AI를 쓴다\n신입사원 집중 과정', stat: '4.8', label2: '/ 5.0 만족도' },
    { tag: '금융 · 승진', visual: 'v-fin', label: 'FIN', title: '승진자가 먼저 익히는\nAI 코딩 실전', stat: '98', label2: '% 승진자 이수율' },
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
              통신 · 제조 · 공공 · 금융까지.<br/>유쳐가 설계하고 운영한 산업별 교육 사례입니다.
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
                {c.img && <img src={`assets/case-images/${c.img}`} alt={c.tag} className="case-visual-img"/>}
                {c.img && <div className="case-visual-overlay"/>}
                <div className="case-visual-pin"><span className="dot"></span>{c.tag}</div>
                {!c.img && <div className="case-visual-label">{c.label}</div>}
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
            교육이 아니라 조직과 사람의 일하는 맥락을 설계합니다. 유쳐는 4단계 내내 옆에서 함께 갑니다.
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
          <span className="accent">유쳐</span>를 켜세요.
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

/* ====================== Privacy Policy ====================== */
function PrivacyPolicyModal({ onClose }) {
  return (
    <div className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="privacy-title" onClick={onClose}>
      <div className="privacy-panel" onClick={(event) => event.stopPropagation()}>
        <div className="privacy-head">
          <div>
            <span>Privacy Policy</span>
            <h2 id="privacy-title">개인정보처리방침</h2>
          </div>
          <button type="button" className="privacy-close" onClick={onClose} aria-label="개인정보처리방침 닫기">×</button>
        </div>

        <div className="privacy-body">
          <p>
            아이솔(이하 "회사")는 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고,
            개인정보와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>

          <section>
            <h3>제1조 개인정보의 처리목적 및 수집 항목</h3>
            <p>회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리 중인 개인정보는 해당 목적 이외의 용도로 이용되지 않으며, 이용 목적이 변경되는 경우 별도 동의를 받는 등 필요한 조치를 이행합니다.</p>
            <ol>
              <li><strong>문의 및 상담 응대</strong>: 기업교육 문의 확인, 담당자 연락, 상담 일정 조율. 수집 항목은 성명, 회사명, 직함, 연락처, 이메일주소, 문의 내용입니다.</li>
              <li><strong>서비스 제공 및 계약 이행</strong>: 기업교육·컨설팅 제공, 계약서 및 청구서 발송, 교육 운영 안내, 요금 결제 및 정산. 수집 항목은 성명, 회사명, 부서/직함, 연락처, 이메일주소, 계약 및 정산에 필요한 정보입니다.</li>
              <li><strong>고충 처리</strong>: 민원인의 신원 확인, 민원사항 확인, 사실조사를 위한 연락·통지, 처리 결과 통보. 수집 항목은 성명, 연락처, 민원 내용 확인에 필요한 정보입니다.</li>
              <li><strong>마케팅 정보 제공</strong>: 별도 선택 동의를 받은 경우 교육, 세미나, 프로모션, 뉴스레터 안내를 위해 성명, 회사명, 직함, 연락처, 이메일주소, 관심 분야를 처리할 수 있습니다.</li>
            </ol>
            <p>인터넷 서비스 이용 과정에서 IP주소, 쿠키, 서비스 이용기록, 방문기록, 불량 이용기록이 자동으로 생성되어 수집될 수 있습니다.</p>
          </section>

          <section>
            <h3>제2조 개인정보의 처리 및 보유기간</h3>
            <p>회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 동의받은 보유·이용 기간 내에서 개인정보를 처리·보유합니다.</p>
            <ul>
              <li>문의 및 상담 응대: 문의 처리 완료 후 3년</li>
              <li>서비스 제공 및 계약 이행: 재화·서비스 공급 완료 및 요금 결제·정산 완료 시까지</li>
              <li>고충 처리: 민원 처리 및 분쟁 해결 완료 시까지</li>
              <li>마케팅 정보 제공: 동의 철회 또는 정보주체 요청 시까지</li>
            </ul>
            <p>관계 법령에 따라 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보관합니다. 계약 또는 청약철회, 대금결제, 재화 등의 공급기록은 5년, 소비자 불만 또는 분쟁 처리에 관한 기록은 3년, 표시·광고에 관한 기록은 6개월 동안 보관될 수 있습니다.</p>
          </section>

          <section>
            <h3>제3조 마케팅 정보 활용 수신 동의</h3>
            <p>회사는 정보주체의 별도 선택 동의를 받은 경우에 한하여 교육 및 세미나, 프로모션, 뉴스레터 등 광고성 정보를 제공할 수 있습니다. 동의하지 않아도 기본 서비스 이용에는 제한이 없습니다.</p>
          </section>

          <section>
            <h3>제4조 정보주체와 법정대리인의 권리 및 행사 방법</h3>
            <p>정보주체는 회사에 대해 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다. 권리 행사는 전자우편을 통해 요청할 수 있으며, 회사는 이에 대해 지체 없이 조치합니다.</p>
          </section>

          <section>
            <h3>제5조 개인정보의 파기</h3>
            <p>회사는 개인정보 보유기간 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때 지체 없이 해당 개인정보를 파기합니다. 전자적 파일은 복구 또는 재생되지 않도록 파기하며, 종이 문서는 분쇄하거나 소각하여 파기합니다.</p>
          </section>

          <section>
            <h3>제6조 개인정보의 안전성 확보조치</h3>
            <p>회사는 개인정보의 안전성 확보를 위해 내부관리계획 수립 및 시행, 개인정보 취급자 교육, 접근 권한 관리, 보안프로그램 설치, 자료보관실 접근통제 등 필요한 조치를 시행합니다.</p>
          </section>

          <section>
            <h3>제7조 개인정보 자동 수집 장치의 설치·운영 및 거부</h3>
            <p>회사는 이용자에게 맞춤형 서비스를 제공하기 위해 쿠키를 사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으며, 쿠키 저장을 거부할 경우 일부 서비스 이용에 제한이 있을 수 있습니다.</p>
          </section>

          <section>
            <h3>제8조 개인정보 보호책임자</h3>
            <p>회사는 개인정보 처리에 관한 업무를 총괄하고 개인정보 관련 문의, 불만 처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
            <ul>
              <li>개인정보 보호책임자: 이재준</li>
              <li>연락처: 070-4571-4871</li>
              <li>이메일: official.uture@gmail.com</li>
            </ul>
          </section>

          <section>
            <h3>제9조 개인정보 처리방침 시행 및 변경</h3>
            <p>이 개인정보 처리방침은 2026년 4월 29일부터 적용됩니다. 법령 또는 회사 정책에 따라 내용이 변경될 경우 홈페이지를 통해 고지합니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ====================== Terms of Use ====================== */
function TermsOfUseModal({ onClose }) {
  return (
    <div className="privacy-modal" role="dialog" aria-modal="true" aria-labelledby="terms-title" onClick={onClose}>
      <div className="privacy-panel" onClick={(event) => event.stopPropagation()}>
        <div className="privacy-head">
          <div>
            <span>Terms of Use</span>
            <h2 id="terms-title">이용약관</h2>
          </div>
          <button type="button" className="privacy-close" onClick={onClose} aria-label="이용약관 닫기">×</button>
        </div>

        <div className="privacy-body">
          <p>
            본 이용약관은 아이솔(이하 "회사")이 운영하는 유쳐 uture 웹사이트와 기업 AI·AX 교육 및 컨설팅 관련 서비스의 이용조건,
            절차, 권리와 의무 및 책임사항을 정함을 목적으로 합니다.
          </p>

          <section>
            <h3>제1조 목적</h3>
            <p>본 약관은 회사가 제공하는 웹사이트, 교육 문의, 상담, 제안, 기업교육, 컨설팅 및 이에 부수하는 서비스의 이용과 운영에 관한 기본 사항을 규정합니다.</p>
          </section>

          <section>
            <h3>제2조 용어의 정의</h3>
            <ol>
              <li><strong>사이트</strong>란 회사가 서비스 안내, 문의 접수, 자료 제공 등을 위해 운영하는 웹사이트를 말합니다.</li>
              <li><strong>이용자</strong>란 사이트에 접속하여 회사가 제공하는 정보를 열람하거나 문의, 상담 신청, 자료 요청 등을 하는 자를 말합니다.</li>
              <li><strong>서비스</strong>란 회사가 제공하는 기업 AI·AX 교육, 진단, 컨설팅, 워크숍, 자료 제공 및 관련 부가 서비스를 말합니다.</li>
              <li><strong>콘텐츠</strong>란 사이트와 서비스에서 제공되는 텍스트, 이미지, 영상, 교육자료, 제안서, 커리큘럼, 사례집 등 일체의 자료를 말합니다.</li>
            </ol>
          </section>

          <section>
            <h3>제3조 약관의 효력 및 변경</h3>
            <p>본 약관은 사이트에 게시함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 적용일자와 주요 변경 내용을 사이트에 공지합니다.</p>
          </section>

          <section>
            <h3>제4조 서비스의 제공</h3>
            <p>회사는 이용자에게 기업교육 및 컨설팅 소개, 문의 접수, 상담 안내, 제안 자료 제공, 교육 운영 안내 등의 서비스를 제공합니다. 구체적인 교육 범위, 일정, 비용, 산출물, 운영 방식은 별도 제안서 또는 계약에서 정합니다.</p>
          </section>

          <section>
            <h3>제5조 서비스 이용 및 상담 신청</h3>
            <p>이용자는 회사가 요청하는 정보가 있는 경우 정확한 정보를 제공해야 합니다. 허위 정보, 타인의 정보, 부정확한 연락처를 제공하여 발생하는 불이익에 대해서 회사는 책임을 지지 않습니다.</p>
          </section>

          <section>
            <h3>제6조 개인정보 보호</h3>
            <p>회사는 서비스 제공과 문의 응대를 위해 필요한 범위에서 개인정보를 처리하며, 개인정보의 처리 목적, 보유기간, 보호조치 등은 사이트에 게시된 개인정보처리방침에 따릅니다.</p>
          </section>

          <section>
            <h3>제7조 회사의 의무</h3>
            <ol>
              <li>회사는 관련 법령과 본 약관을 준수하며 안정적인 서비스 제공을 위해 노력합니다.</li>
              <li>회사는 이용자로부터 제기되는 정당한 의견이나 불만을 확인하고 합리적인 범위에서 신속히 처리하기 위해 노력합니다.</li>
              <li>회사는 설비 장애, 시스템 점검, 보안 이슈 등 부득이한 사유가 있는 경우 서비스의 전부 또는 일부를 일시 중지할 수 있습니다.</li>
            </ol>
          </section>

          <section>
            <h3>제8조 이용자의 의무</h3>
            <p>이용자는 관련 법령, 본 약관, 사이트에 공지된 이용 안내를 준수해야 하며 다음 행위를 해서는 안 됩니다.</p>
            <ol>
              <li>허위 정보 또는 타인의 정보를 이용하여 문의하거나 신청하는 행위</li>
              <li>회사의 서비스 운영을 방해하거나 시스템에 비정상적으로 접근하는 행위</li>
              <li>회사, 임직원, 강사, 파트너 또는 제3자의 명예와 권리를 침해하는 행위</li>
              <li>회사의 콘텐츠를 무단 복제, 배포, 판매, 2차 가공하거나 상업적으로 이용하는 행위</li>
              <li>기타 관계 법령이나 공서양속에 위반되는 행위</li>
            </ol>
          </section>

          <section>
            <h3>제9조 지식재산권 및 콘텐츠 이용</h3>
            <p>사이트와 서비스에서 제공되는 콘텐츠의 저작권 및 지식재산권은 회사 또는 정당한 권리자에게 귀속됩니다. 이용자는 회사의 사전 서면 동의 없이 콘텐츠를 복제, 배포, 전송, 전시, 판매, 편집, 강의자료로 활용하거나 외부에 공개할 수 없습니다.</p>
          </section>

          <section>
            <h3>제10조 계약 및 유료 서비스</h3>
            <p>기업교육, 컨설팅, 워크숍 등 유료 서비스는 별도 제안서, 견적서, 계약서 또는 합의된 문서에 따라 제공됩니다. 유료 서비스의 일정 변경, 취소, 환불, 산출물 범위 및 비용 정산은 해당 계약 또는 개별 합의에 따릅니다.</p>
          </section>

          <section>
            <h3>제11조 서비스의 변경 및 중단</h3>
            <p>회사는 운영상 또는 기술상 필요한 경우 서비스의 전부 또는 일부를 변경하거나 중단할 수 있습니다. 천재지변, 정전, 통신 장애, 보안 사고, 외부 플랫폼 장애 등 회사가 통제하기 어려운 사유로 서비스가 중단될 수 있습니다.</p>
          </section>

          <section>
            <h3>제12조 책임의 제한</h3>
            <p>회사는 사이트에 게시된 정보의 최신성과 정확성을 유지하기 위해 노력하나, 이용자가 해당 정보를 바탕으로 독자적으로 판단하거나 실행하여 발생한 손해에 대해서는 회사의 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.</p>
            <p>회사는 이용자의 귀책사유, 제3자 서비스 장애, 불가항력적 사유로 인한 서비스 이용 장애나 손해에 대해 책임을 지지 않습니다.</p>
          </section>

          <section>
            <h3>제13조 분쟁 해결 및 준거법</h3>
            <p>본 약관은 대한민국 법령에 따라 해석됩니다. 회사와 이용자 간 분쟁이 발생한 경우 상호 협의를 통해 해결하며, 협의가 어려운 경우 관할 법원은 민사소송법 등 관련 법령에 따릅니다.</p>
          </section>

          <section>
            <h3>부칙</h3>
            <p>본 약관은 2026년 4월 29일부터 시행합니다.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

/* ====================== Footer ====================== */
function Footer() {
  const [activeLegalModal, setActiveLegalModal] = useStateS(null);

  useEffectS(() => {
    if (!activeLegalModal) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveLegalModal(null);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeLegalModal]);

  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-simple">
          <div className="footer-logo" aria-label="uture">
            <img src="assets/footer-logo.png" alt="uture"/>
          </div>
          <div className="footer-info">
            <p>
              <span>상호 아이솔</span>
              <span>대표 이재준</span>
              <span>사업자등록번호 766-17-02203</span>
            </p>
            <p>
              <span>서울특별시 용산구 원효로 115(원효로3가), 1102호</span>
              <span>대표번호 070-4571-4871</span>
              <span>이메일 official.uture@gmail.com</span>
            </p>
            <p>
              <span>개인정보보호책임자 : 이재준</span>
              <span><button type="button" className="footer-policy-button" onClick={() => setActiveLegalModal('terms')}>이용약관</button></span>
              <span><button type="button" className="footer-policy-button" onClick={() => setActiveLegalModal('privacy')}>개인정보처리방침</button></span>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 아이솔. All rights reserved.</span>
          <span>유쳐 uture | AI AX 에이전시</span>
        </div>
      </div>
      {activeLegalModal === 'terms' && <TermsOfUseModal onClose={() => setActiveLegalModal(null)}/>}
      {activeLegalModal === 'privacy' && <PrivacyPolicyModal onClose={() => setActiveLegalModal(null)}/>}
    </footer>
  );
}

Object.assign(window, { Concerns, Solution1, Cases, Process, FinalCTA, Footer });
