import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { faqs } from '../data/content';
import type { FaqEntry } from '../types';

type PanelItem = NonNullable<CollapseProps['items']>[number];

const toPanel = (faq: FaqEntry, index: number): PanelItem => ({
  key: index,
  label: faq.q,
  children: <p className="muted">{faq.a}</p>,
});

// Built once: the questions never change while the page is open.
const panels = faqs.map(toPanel);

export default function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <p className="eyebrow">Good to know</p>
        <h2 className="section-title">Frequently asked.</h2>
        <Collapse ghost items={panels} expandIconPosition="end" />
      </div>
    </section>
  );
}
