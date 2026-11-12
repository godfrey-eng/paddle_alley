import React from 'react';
import { Alert } from 'antd';
import { missingInfo, useAdStore } from '../store/useAdStore';

const MissingInfo: React.FC = () => {
  const state = useAdStore();
  const gaps = missingInfo(state);
  if (!gaps.length) return null;

  return (
    <Alert
      type="warning"
      showIcon
      style={{ marginBottom: 20 }}
      message="Complete your booking first"
      description={`Payment is locked until you provide: ${gaps.join(', ')}.`}
    />
  );
};

export default MissingInfo;