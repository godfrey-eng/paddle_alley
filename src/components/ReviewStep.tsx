import React from 'react';
import { Button, Typography } from 'antd';
import dayjs from 'dayjs';
import MissingInfo from './MissingInfo';
import { COURT, HOURLY_RATE, durationLabel, peso, priceOf, timeRange } from '../utils/pricing';
import { missingInfo, useAdStore } from '../store/useAdStore';
import { Actions, Eyebrow, Heading, Panel, Rows } from '../ui';

const ReviewStep: React.FC = () => {
  const state = useAdStore();
  const { date, start, hours, name, contact, update } = state;
  const locked = missingInfo(state).length > 0;

  return (
    <Panel>
      <Eyebrow>Step 2 of 4</Eyebrow>
      <Heading>One last look.</Heading>
      <MissingInfo />
      <Rows
        rows={[
          { label: 'Date', value: date ? dayjs(date).format('dddd, MMMM D, YYYY') : '—' },
          { label: 'Court', value: COURT },
          { label: 'Schedule', value: start !== undefined ? timeRange(start, hours) : '—' },
          { label: 'Duration', value: durationLabel(hours) },
          { label: 'Customer', value: name.trim() || '—', sub: contact },
          { label: 'Rate', value: `${peso(HOURLY_RATE, false)} / hour` },
          { label: 'Total amount', value: peso(priceOf(hours)), big: true },
        ]}
      />
      <Typography.Text type="secondary">
        By proceeding, you agree to Paddle Alley’s booking, cancellation, privacy, and refund policies.
      </Typography.Text>
      <Actions>
        <Button size="large" onClick={() => update({ step: 1 })}>Edit booking</Button>
        <Button type="primary" size="large" disabled={locked} onClick={() => update({ step: 3 })}>
          Proceed to secure payment
        </Button>
      </Actions>
    </Panel>
  );
};

export default ReviewStep;