import React from 'react';
import { Button, DatePicker, Form, Input } from 'antd';
import { ArrowRightOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { EndTimes, SlotKey, StartTimes } from './SlotPicker';
import { Legend, endOptions, firstAvailableDate, isOccupied, isPast, makeDateCell, slotStatus, takenHours } from './availability';
import { COURT, DATE_KEY, HOURLY_RATE, durationLabel, peso, priceOf, timeRange } from '../utils/pricing';
import { useAdStore, validContact } from '../store/useAdStore';
import { Eyebrow, Heading, Panel, Rows, requiredAfter } from '../ui';

interface BookingValues {
  date: Dayjs;
  start?: number;
  end?: number;
  name: string;
  contact: string;
}

const BookingStep: React.FC = () => {
  const saved = useAdStore();
  const { bookings, update } = saved;
  const [form] = Form.useForm<BookingValues>();
  
  const initial = React.useMemo<BookingValues>(
    () => ({
      date: dayjs(saved.date ?? firstAvailableDate()),
      start: saved.start,
      end: saved.start !== undefined ? saved.start + saved.hours : undefined,
      name: saved.name,
      contact: saved.contact,
    }),
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  const date = Form.useWatch('date', form) ?? initial.date;
  const start = Form.useWatch('start', form);
  const end = Form.useWatch('end', form);
  const hours = start !== undefined && end !== undefined ? end - start : 0;
  const day = date.format(DATE_KEY);

  const handleChange = (changed: Partial<BookingValues>, all: BookingValues) => {
    if ('start' in changed && changed.start !== undefined) {
      form.setFieldValue('end', changed.start + 1); // default: one hour, the client can extend it
    }
    if ('date' in changed && all.start !== undefined) {
      // new date: keep the times only if they are still free
      const d = all.date.format(DATE_KEY);
      const taken = takenHours(d, bookings);
      if (slotStatus(taken, all.start, 1, d) !== 'ok') form.setFieldsValue({ start: undefined, end: undefined });
      else if (all.end === undefined || !endOptions(taken, all.start).includes(all.end)) form.setFieldValue('end', all.start + 1);
    }
  };

  const handleBook = (v: BookingValues) =>
    update({ date: v.date.format(DATE_KEY), start: v.start, hours: (v.end ?? 0) - (v.start ?? 0), name: v.name.trim(), contact: v.contact, step: 2 });

  return (
    <Form<BookingValues>
      form={form}
      layout="vertical"
      requiredMark={requiredAfter}
      scrollToFirstError
      initialValues={initial}
      onValuesChange={handleChange}
      onFinish={handleBook}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
        <Panel style={{ flex: '2 1 460px' }}>
          <Eyebrow>Step 1 of 4</Eyebrow>
          <Heading>Choose your game time</Heading>

          <Form.Item label="Booking date" name="date" style={{ marginTop: 24 }} extra={<Legend />} rules={[{ required: true, message: 'Choose an available date' }]}>
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              placeholder="Select date"
              allowClear={false}
              suffixIcon={<CalendarOutlined />}
              disabledDate={(d) => isPast(d) || isOccupied(d)}
              cellRender={makeDateCell(date)}
            />
          </Form.Item>
          {/* Start time on the left, end time on the right, on every screen size */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '0 16px' }}>
            <Form.Item label="Start time" name="start" rules={[{ required: true, message: 'Choose a start time' }]}>
              <StartTimes date={day} />
            </Form.Item>
            <Form.Item
              label="End time"
              name="end"
              extra={`${peso(HOURLY_RATE, false)} per hour`}
              rules={[{ required: true, message: 'Choose an end time' }]}
            >
              <EndTimes date={day} start={start} />
            </Form.Item>
          </div>
          <SlotKey />

          <Form.Item label="Full name" name="name" rules={[{ required: true, whitespace: true, message: 'Enter your full name' }]}>
            <Input placeholder="e.g. Juan Dela Cruz" />
          </Form.Item>
          <Form.Item
            label="Contact number"
            name="contact"
            rules={[
              { required: true, message: 'Enter your contact number' },
              {
                validator: (_, value: string) =>
                  !value || validContact(value) ? Promise.resolve() : Promise.reject(new Error('Use a PH mobile number, e.g. 0917 123 4567')),
              },
            ]}
          >
            <Input placeholder="e.g. 0917 123 4567" inputMode="tel" maxLength={16} />
          </Form.Item>
        </Panel>

        <Panel style={{ flex: '1 1 300px' }}>
          <Eyebrow>Your selection</Eyebrow>
          <h3 style={{ margin: '12px 0 0', fontSize: 22, fontWeight: 500 }}>{COURT}</h3>
          <Rows
            rows={[
              { label: 'Date', value: date.format('ddd, MMM D, YYYY') },
              { label: 'Time', value: start !== undefined && hours > 0 ? timeRange(start, hours) : '—' },
              { label: 'Duration', value: hours > 0 ? durationLabel(hours) : '—' },
              { label: 'Hourly rate', value: peso(HOURLY_RATE, false) },
              { label: 'Total', value: hours > 0 ? peso(priceOf(hours)) : '—', big: true },
            ]}
          />
          <Button type="primary" size="large" htmlType="submit" block>
            Book now <ArrowRightOutlined />
          </Button>
        </Panel>
      </div>
    </Form>
  );
};

export default BookingStep;