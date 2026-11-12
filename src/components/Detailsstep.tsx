import React from 'react';
import { Button, Form, Input } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import {  useAdStore } from '../store/useAdStore';
import { Actions, Eyebrow, Heading, Muted, Panel, requiredAfter } from '../ui';

interface DetailsValues {
  name: string;
  contact: string;
}

const DetailsStep: React.FC = () => {
  const { name, contact } = useAdStore();

  return (
    <Panel>
      <Eyebrow>Step 2 of 5</Eyebrow>
      <Heading>Who’s making the booking?</Heading>
      <Muted>We’ll use these details to help you look up your reservation later.</Muted>

      <Form<DetailsValues>
        layout="vertical"
        requiredMark={requiredAfter}
        initialValues={{ name, contact }}
        onFinish={(values) => useAdStore.getState().update({ ...values, step: 3 })}
      >
        <Form.Item label="Full name" name="name" rules={[{ required: true, whitespace: true, message: 'Enter your full name' }]}>
          <Input placeholder="e.g. Juan Dela Cruz" />
        </Form.Item>
        <Form.Item
          label="Contact number"
          name="contact"
          rules={[
            { required: true, message: 'Enter your contact number' },
            {
              pattern: /^(09|\+639)\d{9}$/,
              transform: (value: string) => value?.replace(/\s/g, ''),
              message: 'Use a PH mobile number, e.g. 0917 123 4567',
            },
          ]}
        >
          <Input placeholder="e.g. 0917 123 4567" inputMode="tel" maxLength={16} />
        </Form.Item>

        <Actions>
          <Button size="large" onClick={() => useAdStore.getState().update({ step: 1 })}>Back</Button>
          <Button type="primary" size="large" htmlType="submit">
            Review booking <ArrowRightOutlined />
          </Button>
        </Actions>
      </Form>
    </Panel>
  );
};

export default DetailsStep;