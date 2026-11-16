import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Input, InputNumber, Row, Select, Table, Tag, Typography } from 'antd'
import { useEffect, useMemo } from 'react'
import { useStore } from '../store'
import { useAdStore } from '../store/useAdStore'
import { buildAdminRows, newestConfirmedFirst } from '../admin-bookings'
import { COL, HEADS, PAGINATION } from '../admin-config'
import { clockLabel } from '../utils/pricing'
import '../admin.css'

const LOGIN_FIELDS = [
  ['user', 'Username or email', Input, 'admin@paddlealley.ph'],
  ['pass', 'Password', Input.Password, 'Enter your password'],
]
export function Login() {
  const { put, login, error, ...form } = useStore()
  const closeAdmin = useAdStore((st) => st.closeAdmin)

  return (
    <Row className="admin-shell">
      <Col xs={0} lg={12}>
        <div className="admin-hero">
          <img className="admin-hero-img" src="/login-logo.png" alt="Paddle Alley" />
          <span className="admin-eye admin-eye-lime">Administration</span>
          <h1 className="admin-hero-title">Keep every game on track.</h1>
          <p className="admin-hero-text">Manage reservations, availability, and court operations from one focused workspace.</p>
          <small className="admin-hero-note">Secure staff access ·</small>
          <div className="admin-circle" />
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <Flex vertical justify="center" gap={16} className="admin-form">
          <button type="button" className="admin-back" onClick={closeAdmin}>← Back to customer site</button>
          <span className="admin-eye">Welcome back</span>
          <h2 className="admin-form-title">Sign in to Paddle Alley</h2>
          <p className="admin-form-text">Use your administrator credentials to continue.</p>
          {LOGIN_FIELDS.map(([key, label, Field, placeholder]) => (
            <label key={key} className="admin-label">
              {label} *
              <Field size="large" placeholder={placeholder} value={form[key]}
                onChange={(e) => put({ [key]: e.target.value, error: '' })} />
            </label>
          ))}
          <Typography.Text type="danger" strong>{error}</Typography.Text>
          <Button type="primary" size="large" onClick={login}>Sign in securely →</Button>
        </Flex>
      </Col>
    </Row>
  )
}

function Cell({ index, value, row, history }) {
  const confirm = useStore((st) => st.confirm)

  if (index === COL.ref) return <b className="admin-ref">{value}</b>
  if (index === COL.payment) return <Tag className="admin-ok">Paid</Tag>
  if (index === COL.status && history) return <span className="admin-muted">{row[COL.stamp] || '—'}</span>
  if (index === COL.status && value === 'Confirmed') return <Tag className="admin-ok">Confirmed</Tag>
  if (index === COL.status) {
    return <Button type="primary" size="small" shape="round" onClick={() => confirm(row[COL.id])}>Confirm</Button>
  }
  return <span className="admin-muted">{index === COL.total ? `₱${value}` : value}</span>
}

export function Bookings({ title, history }) {
  const { q, date, filter, confirmed } = useStore()
  const bookings = useAdStore((st) => st.bookings)
  const rows = useMemo(() => buildAdminRows(bookings, confirmed), [bookings, confirmed])
  const dates = [...new Set(rows.map((r) => r[3]))]

  const columns = HEADS.map((head, index) => ({
    title: <span className="admin-th">{history && index === COL.status ? 'Date confirmed' : head}</span>,
    dataIndex: index,
    render: (value, row) => <Cell index={index} value={value} row={row} history={history} />,
  }))
  const pool = rows.filter((r) => r[COL.status] === (history ? 'Confirmed' : 'Confirm'))
  const list = (history ? newestConfirmedFirst(pool) : pool).filter(
    (r) => r.slice(0, 8).join(' ').toLowerCase().includes(q.toLowerCase()) && (date === 'All' || r[3] === date),
  )

  return (
    <Card className="admin-card">
      <Flex justify="space-between" align="flex-start" gap={12} wrap>
        <div>
          <span className="admin-eye">Court activity</span>
          <h2 className="admin-card-title">{title}</h2>
        </div>
        <Flex gap={12}>
          <Input className="admin-search" prefix={<SearchOutlined />} placeholder="Search" value={q}
            onChange={(e) => filter({ q: e.target.value })} />
          <Select className="admin-select" value={date} onChange={(value) => filter({ date: value })}
            options={[{ value: 'All', label: 'Date' }, ...dates.map((value) => ({ value }))]} />
        </Flex>
      </Flex>
      <Table
        className="admin-table"
        columns={columns}
        dataSource={list.map((r, i) => ({ ...r, key: i }))}
        pagination={PAGINATION}
        locale={{ emptyText: history ? 'No confirmed bookings yet' : 'No bookings to confirm' }}
        scroll={{ x: 760 }}
      />
    </Card>
  )
}

const HOUR_OPTIONS = Array.from({ length: 23 }, (_, h) => ({ value: h, label: clockLabel(h) }))
const CLOSE_OPTIONS = Array.from({ length: 24 }, (_, i) => ({ value: i + 1, label: clockLabel(i + 1) }))

export function Court() {
  const { open, saved, courtSaving, courtError, courtDraft: draft, put, initCourtDraft, setCourtField, saveCourt } = useStore()

  useEffect(() => {
    initCourtDraft()
  }, [initCourtDraft])

  if (!draft) return null
  const closeOptions = CLOSE_OPTIONS.filter((o) => o.value > draft.openHour)

  return (
    <Card className="admin-card admin-court">
      <Row gutter={[50, 24]}>
        <Col xs={24} lg={10}>
          <img className="admin-court-img" src="/court.png" alt="Court 1" />
        </Col>
        <Col xs={24} lg={14}>
          <span className="admin-court-status">
            <span className="admin-dot">●</span> {open ? 'Open & available' : 'Closed for now'}
          </span>
          <h2 className="admin-court-title">Paddle Alley Court 1</h2>
          <p className="admin-court-text">
            Set the price and playing hours. Customers see the new values the next time they open the site.
          </p>
          <Row gutter={[24, 20]} className="admin-court-facts">
            <Col span={24}>
              <label className="admin-label">
                Standard rate (₱ per hour)
                <InputNumber
                  size="large"
                  min={1}
                  precision={0}
                  prefix="₱"
                  style={{ width: '100%' }}
                  value={draft.hourlyRate}
                  onChange={(value) => setCourtField('hourlyRate', value)}
                />
              </label>
            </Col>
            <Col span={12}>
              <label className="admin-label">
                Opening time
                <Select
                  size="large"
                  options={HOUR_OPTIONS}
                  value={draft.openHour}
                  onChange={(value) => setCourtField('openHour', value)}
                />
              </label>
            </Col>
            <Col span={12}>
              <label className="admin-label">
                Closing time
                <Select
                  size="large"
                  options={closeOptions}
                  value={draft.closeHour}
                  onChange={(value) => setCourtField('closeHour', value)}
                />
              </label>
            </Col>
          </Row>
          {courtError && <Typography.Text type="danger">{courtError}</Typography.Text>}
          <Flex justify="flex-end" gap={14}>
            <Button size="large" onClick={() => put({ open: !open, saved: false })}>
              {open ? 'Schedule closure' : 'Reopen court'}
            </Button>
            <Button size="large" type="primary" loading={courtSaving} onClick={saveCourt}>
              {saved ? 'Saved' : 'Save changes'}
            </Button>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}
