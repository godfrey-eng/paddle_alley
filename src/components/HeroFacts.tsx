import type { Fact } from '../types';

interface HeroFactsProps {
  facts: Fact[];
}

export default function HeroFacts({ facts }: HeroFactsProps) {
  return (
    <div className="facts">
      {facts.map((fact) => (
        <div key={fact.label}>
          <b>{fact.value}</b>
          <span>{fact.label}</span>
        </div>
      ))}
    </div>
  );
}
