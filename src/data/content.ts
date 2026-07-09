// 유쳐(Uture) 콘텐츠 — 단일 진실 소스 (legacy 추출 기반)

export const brand = {
  name: '유쳐',
  nameEn: 'uture',
  tagline: '기업을 위한 AI·AX 파트너',
  logo: '/assets/brand/wordmark.svg',
  footerLogo: '/assets/footer-logo.png',
  email: 'official.uture@gmail.com',
}

export const nav = {
  links: [
    { label: '유쳐의 방식', href: '#fde' },
    { label: '솔루션', href: '#architecture' },
    { label: '고객 사례', href: '#cases' },
    { label: '프로세스', href: '#process' },
  ],
  cta: { label: '교육 문의', href: '#contact' },
}

export const hero = {
  badge: '교육 그 다음까지 책임지는 AX 파트너',
  titleLines: ['AI를 아는 조직에서', 'AI로 일하는 조직으로.'],
  sub: '교육 · 현장 밀착 실행 · 도구 구축 — 기업을 위한 풀사이클 AX 파트너. 구성원이 실제 업무에서 AI로 일하는 방식을 바꿀 때까지, 유쳐가 현장에 함께 있습니다.',
  cta: { label: '교육 문의', href: '#contact' },
  ctaGhost: { label: '유쳐의 방식 보기', href: '#fde' },
}

// 03 — pinned blur narrative
export const narrative = {
  title: ['조직과 사람에 맞춰야', '비로소 작동합니다'],
  intro: [
    '50여 개 기업과 일하며 정리한,',
    'AI가 실무에 안착하지 못하는 이유.',
    '유쳐는 그 지점을',
    '각 구성원 곁에서 함께 풀어냅니다.',
  ],
  // **단어** = 키워드 컬러 강조 (스텝별 장면 틴트와 동일 계열)
  steps: [
    {
      n: '01',
      text: '모두에게 **같은 강의만** 반복되는 교육. 직무도 숙련도도 다른데, 정작 **"내 업무에 어떻게?"**가 빠집니다.',
    },
    {
      n: '02',
      text: '강의는 들었지만 다음 날 자기 일에 어떻게 적용할지 막막한 채로 끝나는, **실무로 이어지지 않는 학습.**',
    },
    {
      n: '03',
      text: 'AI 기술은 매주 쏟아지는데, 우리 회사는 **어디서부터 어떻게 시작해야 할지** 막막합니다.',
    },
  ],
}

export const testimonial = {
  badgeLogos: '함께하는 고객사',
  badgeQuote: '유쳐의 철학',
  quote: '내가 만들 수 없다면, 이해한 것이 아니다.',
  quoteAuthor: 'Andrej Karpathy',
  quoteRole: 'OpenAI 창립 멤버 · 前 Tesla AI 총괄',
  quoteAvatar: '/assets/andrej-karpathy.webp',
  // 문단 배열 — 긴 줄글은 호흡 단위로 끊는다 (가독성 원칙)
  philosophy: [
    'AI 교육이 실패하는 지점은 강의실이 아니라 그 다음 날입니다. 자리로 돌아가면 결국 원래 하던 방식으로 되돌아가니까요.',
    '그래서 유쳐는 구성원 각자의 실제 현업 과제를 프로젝트로 잡고, 옆에서 함께 풀어 끝까지 완성합니다. 자기 손으로 만들어 본 사람은 이전 방식으로 돌아가지 않습니다.',
  ],
}

export const logoCount = 14

export const features = {
  title: ['교육에서 도구까지,', '한 팀이 끝까지 책임집니다'],
  intro:
    '컨설팅 · 교육 · 현장 실행 · 도구 구축 · 사내 정착까지. 단계별로 분리된 모델이 아니라, 한 팀이 끝까지 함께합니다.',
  items: [
    {
      icon: 'target',
      title: '맞춤 진단',
      desc: '산업 · 환경 · 보안과 구성원 직무 · 숙련도까지 진단해 도입 우선순위를 설계합니다.',
    },
    {
      icon: 'people',
      title: '현장 밀착 실행',
      desc: '교육 후 현장으로 들어가, 구성원과 정기 워킹 미팅으로 실제 업무를 함께 바꿉니다.',
    },
    {
      icon: 'build',
      title: '도구 공동 구축',
      desc: '기존 툴로 안 되는 지점은 사내 환경 · 보안에 맞는 도구를 협업해 만들어 배포합니다.',
    },
    {
      icon: 'cloud',
      title: '사내 정착',
      desc: '분기 리뷰 · 사내 챔피언 육성 · 도구 운영 고도화로 AI를 시스템으로 자리잡게 합니다.',
    },
  ],
}

// 06 — FDE pipeline
export const fde = {
  title: ['교육에서 시작해,', '현장에서 완성하는 AX.'],
  intro: [
    '유쳐는 강의만 하고 떠나지 않습니다.',
    '구성원 옆자리로 들어가 실제 업무를 함께 바꾸고,',
    '필요한 도구가 없으면 만들어서라도 정착시킵니다.',
  ],
  nodes: [
    { id: 'educate', n: '01', label: '교육으로 기준을 세우고', tag: 'EDUCATE' },
    { id: 'execute', n: '02', label: '현장에 들어가 함께 실행하고', tag: 'EXECUTE' },
    { id: 'build', n: '03', label: '필요한 도구는 함께 만들고', tag: 'BUILD' },
    { id: 'adopt', n: '04', label: '사내 시스템으로 정착', tag: 'ADOPT' },
  ],
  tools: [
    '주간 리포트 자동화 에이전트',
    'VOC 분류 파이프라인',
    '회의록 → 액션아이템 봇',
    '견적서 초안 생성기',
    '사내 문서 검색 어시스턴트',
    '정산 데이터 검증 자동화',
  ],
}

// 06.5 — AX transform map (pinned, scroll-scrubbed 3b1b-style)
// 흩어진 수작업 → 유쳐의 한 가지 방식(교육·실전 적용·AX 자산화)으로 재편. 어느 분야든.
export const axMap = {
  title: ['어느 분야든,', 'AX로 전환됩니다'],
  intro:
    '흩어진 수작업이 교육 · 실전 적용 · AX 자산화 — 유쳐의 한 가지 방식으로 재편됩니다. 분야별 실제 전환들.',
  // 모든 분야에 공통으로 적용되는 유쳐의 3단계 (파이프라인 클러스터 라벨)
  method: [
    { step: '01', label: '교육' },
    { step: '02', label: '실전 적용' },
    { step: '03', label: 'AX 자산화' },
  ],
  // 각 분야: before(수작업) → after(AX 결과). 방식은 위 3단계로 동일.
  industries: [
    {
      id: 'cs',
      field: 'CS',
      before: '문의가 메일 · 채팅 · 전화로 흩어져 매번 수기 분류',
      after: 'VOC 자동 분류 · 태깅 파이프라인',
    },
    {
      id: 'docs',
      field: '전사',
      before: '필요한 자료를 부서 · 폴더마다 일일이 뒤짐',
      after: '사내 문서 검색 어시스턴트',
    },
    {
      id: 'sales',
      field: '영업',
      before: '제안서 · 견적서를 매번 백지에서 새로 작성',
      after: '사내 템플릿 기반 견적 초안 생성기',
    },
    {
      id: 'fin',
      field: '재무',
      before: '정산 내역을 사람이 일일이 대사 · 검증',
      after: '정산 데이터 검증 자동화',
    },
    {
      id: 'mkt',
      field: '마케팅',
      before: '캠페인 성과를 매주 수기로 취합 · 정리',
      after: '캠페인 성과 리포트 자동 생성',
    },
    {
      id: 'hr',
      field: '인사',
      before: '지원서 · 이력을 한 장씩 읽어 정리',
      after: '채용 문서 검색 · 지원자 요약',
    },
  ],
  finale: {
    lead: '교육 · 실전 적용 · AX 자산화 — 한 가지 방식이',
    headline: '모든 분야로 번집니다',
  },
}

// 07 — industry cards
export const industries = {
  title: ['모든 산업을 위한', '새로운 AX'],
  intro: [
    '통신 · 제조 · 공공 · 금융까지,',
    '유쳐가 설계하고 운영한',
    '산업별 실행 사례입니다.',
  ],
  cards: [
    {
      tag: 'IT · FinTech',
      photo: '/assets/cases/case-1.jpg',
      title: '핀테크 실무자의 4주 업무 자동화 도전',
      desc: '비개발 실무자가 실제 업무를 AI로 자동화하는 4주 밀착 과정. 현장 안건 위에서 함께 만들었습니다.',
      stat: '94%',
      statLabel: '재수강 의향',
    },
    {
      tag: '제조 · 대기업',
      photo: '/assets/cases/case-2.jpg',
      title: '반기마다 찾아오는 전사 생성형 AI 정착',
      desc: '3기 이상 연속 운영된 전사 단위 AX 프로그램. 반기마다 현장에 맞춰 커리큘럼을 새로 설계합니다.',
      stat: '3기+',
      statLabel: '연속 운영',
    },
    {
      tag: '금융 · 공공',
      photo: '/assets/cases/case-3.jpg',
      title: '신입 행원부터 AI로 데이터를 분석하다',
      desc: '비개발직 신입도 AI로 데이터를 다루도록 설계한 집중 과정. 업무 시간을 실질적으로 줄였습니다.',
      stat: '32%',
      statLabel: '업무 시간 단축',
    },
  ],
  // 현장 성과 스트립 — legacy 벤토의 서비스 전체 성과 수치를 그대로 (특정 사례 귀속 없음)
  proof: {
    label: '도입 현장 성과',
    items: [
      { num: '87%', label: '도입 후 사내 활용률' },
      { num: '11h', label: '주당 절감되는 업무 시간' },
    ],
  },
}

// 08 — service tabs = "이렇게 일합니다" 에이전트 데모 (인페이지 GSAP 시퀀스)
export const serviceTabs = {
  badge: '이렇게 일합니다',
  title: ['요청하면,', '에이전트 팀이 알아서 끝냅니다'],
  intro: '한 번 요청하면 — 서브에이전트들이 일을 나눠 처리하고, 완성된 결과를 메일과 대시보드로 보내줍니다.',
  tabs: [
    {
      id: 'search',
      label: '사내 문서 검색',
      icon: 'search',
      title: ['묻기만 하면', '사내 문서에서 바로 답'],
      desc: '자연어로 물으면 흩어진 사내 문서 · 규정에서 근거와 함께 답을 찾아줍니다.',
    },
    {
      id: 'assistant',
      label: '종합 업무 어시스턴트',
      icon: 'people',
      title: ['요청하지 않아도', '아침마다 알아서 브리핑'],
      desc: '예약된 에이전트가 메일 · 메신저 · 일정을 스스로 종합해, 출근 전에 우선순위 브리핑을 메일로 보내줍니다.',
    },
    {
      id: 'report',
      label: '사내 템플릿 생성',
      icon: 'build',
      title: ['요청 한 번이면', '완성본이 메일로 도착'],
      desc: '서브에이전트들이 데이터 집계 · 차트 · 슬라이드를 분담해 회사 템플릿에 맞춘 완성본을 만들고, 메일 발송과 대시보드 게시까지 끝냅니다.',
    },
  ],
}

// 08.5 — AX 아키텍처 (uture-motion-diagrams 아티팩트, /diagrams/*.html iframe 임베드)
export const architecture = {
  badge: '이렇게 구축합니다',
  title: ['팀에 맞는', 'AX 아키텍처'],
  // 문장 단위 수제 줄바꿈 (가독성 원칙)
  intro: ['요구는 팀마다 다릅니다.', '유쳐가 실제로 설계 · 구축하는 대표 아키텍처 — 사내 환경과 보안에 맞춰 조정됩니다.'],
  items: [
    { id: 'rag', label: '사내 데이터 챗봇', file: '/diagrams/ax-01-rag-chatbot-dark.html', fileMobile: '/diagrams/ax-01-rag-chatbot-mobile.html' },
    { id: 'doc', label: '문서 업무 자동화', file: '/diagrams/ax-02-doc-automation-dark.html', fileMobile: '/diagrams/ax-02-doc-automation-mobile.html' },
    { id: 'cs', label: 'CS 상담 자동화', file: '/diagrams/ax-03-cs-automation-dark.html', fileMobile: '/diagrams/ax-03-cs-automation-mobile.html' },
    { id: 'search', label: '지식 통합 검색', file: '/diagrams/ax-07-knowledge-search-dark.html', fileMobile: '/diagrams/ax-07-knowledge-search-mobile.html' },
    { id: 'sales', label: '영업 미팅 · 리드', file: '/diagrams/ax-08-sales-crm-dark.html', fileMobile: '/diagrams/ax-08-sales-crm-mobile.html' },
    { id: 'forecast', label: '수요 예측', file: '/diagrams/ax-10-demand-forecast-dark.html', fileMobile: '/diagrams/ax-10-demand-forecast-mobile.html' },
  ],
}

// 09 — case quote
export const caseQuote = {
  badge: '고객 이야기',
  quote:
    '강의만 듣고 끝나는 교육이 아니라, 우리 팀의 실제 업무를 함께 바꿔준다는 점이 달랐습니다. 4주 뒤, 팀 전체가 AI로 일하고 있었습니다.',
  author: '핀테크 실무 교육 담당자',
  org: 'IT · FinTech',
}

// 10 — glow CTA
export const glowCTA = {
  title: '강의가 아니라, 일하는 방식을 바꿉니다.',
  sub: '유쳐는 사람들이 일하는 방식 자체를 현장에서 바꾸고 있습니다.',
  cta: { label: '고객 사례 보기', href: '#cases' },
}

// 10.5 — PBL 설명 (glowCTA 슬롯 대체 — "교육 문의"가 가리키는 상품이 무엇인지 답한다)
export const pbl = {
  badge: '프로젝트형 교육 · PBL',
  title: ['듣는 교육이 아니라,', '만드는 교육입니다.'],
  sub: 'PBL(Project-Based Learning) — 각자 자기 업무의 실제 과제 하나를 잡아, 강의와 옆자리 코칭을 받으며 교육 기간 안에 끝까지 완성하는 프로젝트형 교육입니다.',
  // 강의식 vs 유쳐 PBL 대비 (다이어그램 행 2개)
  rows: [
    {
      id: 'lecture',
      label: '강의식',
      dim: true,
      steps: ['강의 수강', '수료증'],
      end: '월요일, 원래 방식으로',
    },
    {
      id: 'pbl',
      label: '유쳐 PBL',
      dim: false,
      steps: ['내 업무에서 과제 선정', '강의 + 옆자리 코칭으로 실행'],
      end: '완성된 결과물 · 실무에 정착',
    },
  ],
  cta: { label: '교육 문의', href: '#contact' },
}

// 11 — process (pricing slot)
export const process = {
  title: ['진단에서 정착까지,', '현장을 바꾸는 5단계'],
  intro:
    '강의가 아니라 조직과 사람의 일하는 맥락을 설계합니다. 유쳐는 5단계 내내 현장에 함께 있습니다.',
  steps: [
    {
      n: '01',
      title: '조직 진단 · 구성원 인터뷰',
      desc: '회사의 산업 · 환경과 함께, 구성원 개개인의 직무 · 숙련도 · AI 경험까지 들여다봅니다.',
      tags: ['기업 진단', '1:1 인터뷰'],
      duration: '~ 5일',
      deliverable: 'AX 진단 리포트 · 도입 우선순위 맵',
    },
    {
      n: '02',
      title: '맞춤 교육 · 기준 세우기',
      desc: '그룹별 다른 트랙을 설계하고, 실제 업무 산출물로 진행하는 핸즈온으로 AI 기준선을 끌어올립니다.',
      tags: ['그룹별 트랙', '핸즈온 워크샵'],
      duration: '2주',
      deliverable: '직무별 커리큘럼 · 팀 AI 기준 문서',
    },
    {
      n: '03',
      title: '현장 밀착 실행',
      desc: '교육이 끝나면 현장으로. 구성원과 정기 워킹 미팅으로 실제 업무 안건 위에서 AX를 실행합니다.',
      tags: ['현업 워킹 미팅', '1:1 코칭'],
      duration: '3 ~ 4주',
      deliverable: '업무별 자동화 사례 · 워킹 미팅 로그',
    },
    {
      n: '04',
      title: '필요한 도구 공동 구축',
      desc: '기존 툴로 안 되는 지점은 현장 요구 그대로 사내 환경 · 보안에 맞는 도구를 만들어 배포합니다.',
      tags: ['사내 도구 개발', '보안 검토'],
      duration: '추가 별도 제작',
      deliverable: '사내 배포 도구 · 운영 가이드',
    },
    {
      n: '05',
      title: '사내 정착 · 장기 파트너십',
      desc: '분기 리뷰와 사내 챔피언 육성, 구축한 도구의 운영 고도화까지 — 계속 옆에 있습니다.',
      tags: ['분기 리뷰', '운영 고도화'],
      duration: '장기 운영',
      deliverable: '분기 리뷰 리포트 · 사내 챔피언 그룹',
    },
  ],
}

// 12 — stats
export const stats = [
  { value: 6000, suffix: '+', label: '교육생 수료' },
  { value: 4.8, suffix: '/5', label: '평균 만족도', decimals: 1 },
  { value: 50, suffix: '+', label: '도입 기업' },
  { value: 300, suffix: '+', label: '완료된 AX 프로젝트' },
]

// 13 — philosophy (research slot)
export const philosophy = {
  badge: '유쳐의 약속',
  title: ['강의실을 떠나지 않는', 'AX 파트너.'],
  sub: '유쳐는 강의실을 떠나지 않습니다. 구성원 곁에서 함께 실행하고, 필요한 도구는 만들어서라도 정착시킵니다.',
  // legacy sections-v2.jsx Philosophy 블록에서 이식
  founder: {
    quote: '"AI 툴을 배우는 교육은 많습니다. 지금은 \'툴\'이 아닌 \'틀\'을 바꿔야 할 때입니다."',
    name: '이재준',
    role: 'Head of AX · uture',
    avatar: '/assets/founder-avatar.png',
  },
  cta: { label: '교육 문의', href: '#contact' },
}

// 14 — final CTA
export const finalCTA = {
  title: ['우리 조직에 맞는', 'AX 실행 설계안을 받아보세요.'],
  sub: '문의 주시면 업종과 부서에 맞춘 교육 커리큘럼과 도입 로드맵을 먼저 보내드립니다.',
  // 인라인 폼 제출을 구글폼 '응답'으로 자동 수집 — 별도 DB 불필요 (응답은 구글폼 응답 탭/시트에 쌓임).
  // 폼: "유쳐 uture — AX 무료 진단 신청" (official.uture 계정, 2026-07-04 생성·게시)
  // action을 비우면 폴백: 입력값을 담은 mailto 초안이 열린다.
  googleForm: {
    action:
      'https://docs.google.com/forms/d/e/1FAIpQLSfVEakdLGdvmvZ-IiwPcoT_79SRWfez3dR1iDfhk_7dg8-Uig/formResponse',
    fields: {
      company: 'entry.1617690447',
      name: 'entry.1965515015',
      contact: 'entry.1084546948',
      note: 'entry.857230564',
    },
  },
  primary: {
    label: '교육 문의',
    href: 'mailto:official.uture@gmail.com?subject=[유쳐]%20AX%20교육%20문의',
  },
  // secondary(사례집) 제거 — 사례집 자산이 아직 없음 (2026-07-07 오너 지시)
}

export const footer = {
  columns: [
    {
      title: '서비스',
      links: [
        { label: '맞춤 교육', href: '#fde' },
        { label: '현장 밀착 실행', href: '#fde' },
        { label: '도구 공동 구축', href: '#architecture' },
      ],
    },
    {
      title: '솔루션',
      links: [
        { label: '기업 맞춤 AX', href: '#architecture' },
        { label: '조직원 맞춤 코칭', href: '#fde' },
        { label: '산업별 사례', href: '#cases' },
      ],
    },
    // '회사' 열은 nav와 완전 중복이라 삭제 (2026-07-04 오너 확정, 감사 항목 14)
    {
      title: '문의',
      links: [
        { label: 'AX 도입 문의', href: '#contact' },
        { label: 'official.uture@gmail.com', href: 'mailto:official.uture@gmail.com' },
        { label: '070-4571-4871', href: 'tel:070-4571-4871' },
      ],
    },
  ],
  company: {
    name: '아이솔',
    ceo: '이재준',
    bizId: '766-17-02203',
    address: '서울특별시 용산구 원효로 115(원효로3가)',
    tel: '070-4571-4871',
    email: 'official.uture@gmail.com',
  },
  legal: [
    { label: '이용약관', href: '/terms.html' },
    { label: '개인정보처리방침', href: '/privacy.html' },
  ],
  copyright: '© 2026 아이솔. All rights reserved.',
}
