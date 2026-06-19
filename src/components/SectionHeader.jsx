export default function SectionHeader({ kicker, title, subtitle, align = "center" }) {
  return (
    <div className={`section-header section-header--${align}`}>
      {kicker ? <p className="section-kicker">{kicker}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
}
