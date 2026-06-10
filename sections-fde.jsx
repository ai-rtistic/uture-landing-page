// uture — AX journey section (education → on-site execution → co-build)
function FDEJourney() {
  const phases = [
    {
      num: '01',
      phase: 'EDUCATE',
      title: '교육으로\n기준을 세우고',
      desc: '직무·숙련도에 맞춘 커리큘럼으로 조직의 AI 기준선을 끌어올립니다. 여기까지는 시작일 뿐입니다.',
      points: ['직무별 맞춤 트랙 설계', '실제 업무 산출물로 핸즈온', '리더십 AX 워크숍'],
      visual: <FdeVisualEducate/>,
    },
    {
      num: '02',
      phase: 'EXECUTE',
      title: '현장에 들어가\n함께 실행하고',
      desc: '교육이 끝나면 강의실을 떠나 현장으로 갑니다. 구성원과 정기 미팅하며 실제 업무 안건 위에서 AX를 함께 실행합니다.',
      points: ['구성원과의 정기 워킹 미팅', '실제 안건 위에서 워크플로 개선', '막히는 지점 즉시 해결'],
      visual: <FdeVisualEmbed/>,
    },
    {
      num: '03',
      phase: 'BUILD',
      title: '필요한 도구는\n함께 만듭니다',
      desc: '기존 툴로 안 되는 지점이 나오면, 현장에서 발견한 요구 그대로 사내 환경과 보안에 맞는 도구를 협업해 구축하고 정착시킵니다.',
      points: ['현장 요구 기반 도구 공동 개발', '사내 시스템 · 보안 정책 연동', '배포 후 운영 정착까지 동행'],
      visual: <FdeVisualBuild/>,
    },
  ];

  const proofs = [
    '주간 리포트 자동화 에이전트',
    'VOC 분류 파이프라인',
    '회의록 → 액션아이템 봇',
    '견적서 초안 생성기',
    '사내 문서 검색 어시스턴트',
    '정산 데이터 검증 자동화',
  ];

  return (
    <section className="fde" id="fde">
      <div className="container">
        <div className="fde-head reveal">
          <span className="eyebrow">The uture Way · 교육 그 다음</span>
          <h2 className="section-title">교육은 시작점입니다.<br/><span className="accent-orange">완성은 현장에서</span> 이뤄집니다</h2>
          <p className="section-sub">
            유쳐는 강의만 하고 떠나지 않습니다. 구성원 옆자리로 들어가
            실제 업무를 함께 바꾸고, 필요한 도구가 없으면 만들어서라도 정착시킵니다.
          </p>
        </div>

        <div className="fde-track reveal-stagger">
          <div className="fde-track-divider" aria-hidden="true"><span>보통의 교육은 여기까지</span></div>
          {phases.map((p) => (
            <div className="fde-col" key={p.num}>
              <div className="fde-node">
                <span className="fde-node-dot">{p.num}</span>
                <span className="fde-node-label">{p.phase}</span>
              </div>
              <div className="fde-card">
                <div className="fde-visual">{p.visual}</div>
                <h3>{p.title.split('\n').map((l, i, arr) => <span key={i}>{l}{i < arr.length - 1 ? ' ' : ''}<br/></span>)}</h3>
                <p>{p.desc}</p>
                <ul className="fde-points">
                  {p.points.map((pt) => (
                    <li key={pt}><Icon.Check width={14} height={14}/><span>{pt}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="fde-proof reveal">
          <span className="fde-proof-label">함께 만들어 온 도구들</span>
          <div className="fde-proof-chips">
            {proofs.map((t) => (
              <span className="fde-proof-chip" key={t}><Star size={10}/>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Phase 01 — curriculum tracks */
function FdeVisualEducate() {
  return (
    <div className="fde-mock fde-mock-educate" aria-hidden="true">
      <div className="fde-mock-head">
        <span className="dot on"></span>
        <span className="fde-mock-title">AX Curriculum · 직무별 트랙</span>
      </div>
      <div className="fde-edu-row done">
        <span className="bar" style={{width: '100%'}}></span>
        <span className="lbl">기획 · 마케팅 트랙</span>
        <em>완료</em>
      </div>
      <div className="fde-edu-row active">
        <span className="bar" style={{width: '64%'}}></span>
        <span className="lbl">개발 · 데이터 트랙</span>
        <em>W6/10</em>
      </div>
      <div className="fde-edu-row">
        <span className="bar" style={{width: '18%'}}></span>
        <span className="lbl">경영지원 트랙</span>
        <em>시작</em>
      </div>
    </div>
  );
}

/* Phase 02 — embedded working meeting chat */
function FdeVisualEmbed() {
  return (
    <div className="fde-mock fde-mock-embed" aria-hidden="true">
      <div className="fde-mock-head">
        <span className="dot on"></span>
        <span className="fde-mock-title">#ax-재무팀 · 주간 워킹 미팅</span>
      </div>
      <div className="fde-chat them">
        <span className="who">김대리</span>
        <p>월말 정산 리포트가 매번 4시간씩 걸려요…</p>
      </div>
      <div className="fde-chat us">
        <span className="who">유쳐 파트너</span>
        <p>ERP 데이터만 연결하면 자동화돼요. 수요일에 같이 만들어볼까요?</p>
      </div>
      <div className="fde-chat-meta">✓ 수 14:00 · 정산 자동화 워킹세션 확정</div>
    </div>
  );
}

/* Phase 03 — build & deploy terminal */
function FdeVisualBuild() {
  return (
    <div className="fde-mock fde-mock-build" aria-hidden="true">
      <div className="fde-mock-head">
        <span className="dot on"></span>
        <span className="fde-mock-title">uture co-build</span>
      </div>
      <div className="fde-term">
        <div><span className="ps">$</span> uture build settlement-bot</div>
        <div className="ok">✓ 사내 ERP 연동 완료</div>
        <div className="ok">✓ 보안 검토 통과 · on-prem</div>
        <div className="dep">→ deployed to 재무팀 · v1.0</div>
        <div className="caret"></div>
      </div>
    </div>
  );
}

Object.assign(window, { FDEJourney });
