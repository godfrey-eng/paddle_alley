import React from 'react';
import { Button } from 'antd';
import Receipt from './Receipt';
import { useAdStore } from '../store/useAdStore';
import { Panel } from '../ui';

const ConfirmedStep: React.FC = () => {
  const { current, reset } = useAdStore();
  if (!current) return null;

  return (
    <Panel>
      <Receipt booking={current} eyebrow="Payment verified · Reserved" title="You’re all set to play." />
      <div className="no-print" style={{ textAlign: 'center', marginTop: 12 }}>
        <Button type="link" onClick={reset}>Book again</Button>
      </div>
    </Panel>
  );
};

export default ConfirmedStep;