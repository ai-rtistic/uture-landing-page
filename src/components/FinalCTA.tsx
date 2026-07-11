import { useState } from 'react'
import { finalCTA, footer } from '../data/content'
import { Arrow } from '../ui/primitives'

const CAPSULES = Array.from({ length: 9 })

/**
 * 최종 CTA — 인라인 문의 폼.
 * - finalCTA.googleForm이 설정되면: 제출값을 구글폼 응답으로 백그라운드 전송
 *   (사용자는 사이트를 떠나지 않고, 응답은 구글폼 시트에 자동 수집 — 별도 DB 불필요)
 * - 미설정 폴백: 입력값을 담은 mailto 초안을 연다
 */
export function FinalCTA() {
  const [sent, setSent] = useState<null | 'google' | 'mail'>(null)
  const gf = finalCTA.googleForm
  const gfReady = Boolean(gf.action && gf.fields.company)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const f = new FormData(form)
    const v = (k: string) => String(f.get(k) ?? '').trim()
    const company = v('company')
    const name = v('name')
    const email = v('contact')
    const note = v('note')

    if (gfReady) {
      // 구글폼 formResponse로 전송 — no-cors라 fire-and-forget (응답 확인 불가가 스펙)
      const body = new FormData()
      body.append(gf.fields.company, company)
      body.append(gf.fields.name, name)
      body.append(gf.fields.contact, email)
      body.append(gf.fields.note, note || '(작성 안 함)')
      fetch(gf.action, { method: 'POST', mode: 'no-cors', body }).catch(() => {})
      form.reset()
      setSent('google')
      return
    }

    const subject = `[유쳐] AX 교육 문의 — ${company}`
    const mailBody = [
      `회사명: ${company}`,
      `담당자: ${name}`,
      `이메일: ${email}`,
      '',
      '고민 내용:',
      note || '(작성 안 함)',
    ].join('\n')
    window.location.href = `mailto:${footer.company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`
    setSent('mail')
  }

  return (
    <section className="section final-cta" id="contact">
      <div className="final-cta-field" aria-hidden>
        {CAPSULES.map((_, i) => (
          <span className={`capsule capsule-${i % 5}`} key={i} />
        ))}
      </div>
      <div className="container final-cta-inner">
        <h2 className="final-cta-title reveal">
          {finalCTA.title.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </h2>
        <p className="final-cta-sub reveal" data-delay="120">
          {finalCTA.sub}
        </p>

        <form className="cta-form reveal" data-delay="200" onSubmit={handleSubmit}>
          <div className="cta-form-grid">
            <label className="cta-field">
              <span>회사명</span>
              <input name="company" type="text" required placeholder="회사명" autoComplete="organization" />
            </label>
            <label className="cta-field">
              <span>담당자</span>
              <input name="name" type="text" required placeholder="이름 · 직함" autoComplete="name" />
            </label>
            <label className="cta-field cta-field-wide">
              <span>이메일</span>
              <input
                name="contact"
                type="email"
                required
                placeholder="name@company.com"
                autoComplete="email"
                inputMode="email"
              />
            </label>
            <label className="cta-field cta-field-wide">
              <span>지금 가장 큰 고민 (선택)</span>
              <textarea
                name="note"
                rows={3}
                placeholder="예: 보고서 작성에 팀 전체가 매주 10시간을 씁니다"
              />
            </label>
          </div>
          <button type="submit" className="btn btn-dark cta-form-submit">
            {finalCTA.primary.label}
            <Arrow />
          </button>
          {sent === 'google' && (
            <p className="cta-form-done" role="status">
              접수되었습니다 — 3영업일 안에 남겨주신 이메일로 회신드립니다.
            </p>
          )}
          {sent === 'mail' && (
            <p className="cta-form-done" role="status">
              메일 초안이 열렸습니다 — 그대로 보내주시면 3영업일 안에 회신드립니다.
              창이 열리지 않으면 <a href={`mailto:${footer.company.email}`}>{footer.company.email}</a>로
              보내주세요.
            </p>
          )}
          <p className="cta-form-note">
            남겨주신 정보는 문의 회신에만 사용합니다 ·{' '}
            <a href="/privacy.html" target="_blank" rel="noreferrer">
              개인정보처리방침
            </a>
          </p>
        </form>

      </div>
    </section>
  )
}
