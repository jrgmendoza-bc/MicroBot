export default function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head">
      <p className="section-kicker"><span>{index}</span><i />{label}</p>
      <h2 className="section-title">{title}</h2>
      {children}
    </div>
  );
}
