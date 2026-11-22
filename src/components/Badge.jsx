// Status badges always pair an icon-free colour with text, so meaning never
// depends on colour alone (accessibility requirement).
export default function Badge({ tone = 'neutral', children }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}
