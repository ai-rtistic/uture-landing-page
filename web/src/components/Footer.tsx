import { footer, brand } from '../data/content'
import { Container } from '../ui/primitives'

export function Footer() {
  const c = footer.company
  return (
    <footer className="footer">
      <Container>
        <div className="footer-cols">
          {footer.columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <div className="footer-col-title">{col.title}</div>
              {col.links.map((l) => (
                <a className="footer-link" href={l.href} key={l.label}>
                  {l.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-meta">
          <div className="footer-company">
            <span>상호 {c.name}</span>
            <span>대표 {c.ceo}</span>
            <span>사업자등록번호 {c.bizId}</span>
            <span>{c.address}</span>
            <span>{c.tel} · {c.email}</span>
          </div>
          <div className="footer-legal">
            {footer.legal.map((l) => (
              <a href={l.href} key={l.label}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className="footer-wordmark" aria-hidden>
        <div className="footer-wordmark-bg" />
        <span className="geist">{brand.nameEn}</span>
      </div>
      <div className="footer-copy">
        <Container>
          {footer.copyright} · 유쳐 uture | AI·AX 에이전시
        </Container>
      </div>
    </footer>
  )
}
