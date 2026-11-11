/** Fixed ambient background: engineering grid + soft accent glows. */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-grid" />
      <div className="backdrop-glow glow-a" />
      <div className="backdrop-glow glow-b" />
    </div>
  );
}
