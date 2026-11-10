import React from 'react';
import { Alert, Button } from 'antd';
import { missingInfo, update, useBooking } from './store';

const MissingInfo: React.FC = () => {
  const state = useBooking();
  const gaps = missingInfo(state);
  if (!gaps.length) return null;

  return (
    <Alert
      type="warning"
      showIcon
      style={{ marginBottom: 20 }}
      message="Complete your booking first"
      description={`Payment is locked until you provide: ${gaps.join(', ')}.`}
      action={
        <Button size="small" onClick={() => update({ step: 1 })}>Back to booking</Button>
      }
    />
  );
};

export default MissingInfo;