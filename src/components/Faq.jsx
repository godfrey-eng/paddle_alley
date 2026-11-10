import { Collapse } from 'antd';
import { faqs } from '../data/content';

export default function Faq() {
  const items = faqs.map((f, i) => ({ key: i, label: f.q, children: <p className="muted">{f.a}</p> }));
  return (
    <section id="faq">
      <div className="wrap">
        <p className="eyebrow">Good to know</p>
        <h2 style={{ marginBottom: 32 }}>Frequently asked.</h2>
        <Collapse ghost items={items} expandIconPosition="end" />
      </div>
    </section>
  );
}
