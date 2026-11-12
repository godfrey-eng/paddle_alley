import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Col, Flex, Input, Row, Select, Table, Tag, Typography } from 'antd'
import { useStore } from '../store'
import { useAdStore } from '../store/useAdStore'
import '../admin.css'

const COL = { ref: 0, total: 5, payment: 6, status: 7, id: 8, stamp: 9 }
const HEADS = ['Reference', 'Customer', 'Contact', 'Date', 'Schedule', 'Total', 'Payment', 'Reservation']
const LOGIN_FIELDS = [
  ['user', 'Username or email', Input, 'admin@paddlealley.ph'],
  ['pass', 'Password', Input.Password, 'Enter your password'],
]
const COURT_FACTS = [
  ['Standard rental rate', '₱100 per hour'],
  ['Booking durations', '30 min, 1 hr, 2 hrs, 3 hrs'],
  ['Operating hours', '6:00 AM – 10:00 PM'],
  ['Maintenance', 'Sundays · 10:00–11:00 PM'],
]
const PAGINATION = {
  pageSize: 4,
  showSizeChanger: false,
  hideOnSinglePage: true,
  showTotal: (total, [from, to]) => `Showing ${from}–${to} of ${total}`,
}

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
          <p className="admin-hero-text">Manage reservations, availability, and court operations in one workspace.</p>
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
  const { rows, q, date, filter } = useStore()
  const dates = [...new Set(rows.map((r) => r[3]))]

  const columns = HEADS.map((head, index) => ({
    title: <span className="admin-th">{history && index === COL.status ? 'Date confirmed' : head}</span>,
    dataIndex: index,
    render: (value, row) => <Cell index={index} value={value} row={row} history={history} />,
  }))
  const pool = rows.filter((r) => r[COL.status] === (history ? 'Confirmed' : 'Confirm'))
  const list = (history ? [...pool].reverse() : pool).filter(
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

export function Court() {
  const { open, saved, put } = useStore()

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
          <p className="admin-court-text">Competition-grade pickleball court with bright lighting and a sideline area.</p>
          <Row gutter={[24, 20]} className="admin-court-facts">
            {COURT_FACTS.map(([label, value]) => (
              <Col span={12} key={label}>
                <label className="admin-label">{label}<Input size="large" defaultValue={value} /></label>
              </Col>
            ))}
          </Row>
          <Flex justify="flex-end" gap={14}>
            <Button size="large" onClick={() => put({ open: !open, saved: false })}>
              {open ? 'Schedule closure' : 'Reopen court'}
            </Button>
            <Button size="large" type="primary" onClick={() => put({ saved: true })}>
              {saved ? 'Saved' : 'Save availability'}
            </Button>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}
