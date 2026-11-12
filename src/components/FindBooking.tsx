import React from 'react';
import { Alert, Button, Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Receipt from './Receipt';
import { useAdStore } from '../store/useAdStore';
import { Eyebrow, Heading, Panel, requiredAfter } from '../ui';

interface LookupValues {
  reference: string;
  contact: string;
}

const FindBooking: React.FC = () => {
  const { found, findBooking, update } = useAdStore();

  return (
    <>
      <Panel>
        <Eyebrow>Booking lookup</Eyebrow>
        <Heading>Enter your booking details.</Heading>

        <Form<LookupValues>
          layout="vertical"
          requiredMark={requiredAfter}
          style={{ marginTop: 28 }}
          onFinish={({ reference, contact }) =>
            update({ found: findBooking(reference, contact) ?? null })
          }
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 16px' }}>
            <Form.Item label="Booking reference number" name="reference" rules={[{ required: true, whitespace: true, message: 'Enter your reference number' }]}>
              <Input placeholder="e.g. PA-250823-0912" />
            </Form.Item>
            <Form.Item label="Contact number" name="contact" rules={[{ required: true, message: 'Enter your contact number' }]}>
              <Input placeholder="e.g. 0917 123 4567" inputMode="tel" />
            </Form.Item>
          </div>
          <Button type="primary" size="large" htmlType="submit" icon={<SearchOutlined />}>
            Search
          </Button>
        </Form>
      </Panel>

      {found != null && (
        <Panel style={{ marginTop: 24 }}>
          <Receipt booking={found} eyebrow="Booking found" title="Here’s your reservation." />
        </Panel>
      )}
      {found === null && (
        <Alert
          type="warning"
          showIcon
          style={{ marginTop: 24 }}
          message="No booking found"
          description="Check your reference number and contact number, then try again."
        />
      )}
    </>
  );
};

export default FindBooking;