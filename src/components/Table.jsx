import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Input, Select, Space, Table, Tag } from 'antd'
import { useStore } from '../store'
import { s } from '../styles'

const heads = [
  'Reference',
  'Customer',
  'Contact',
  'Date',
  'Schedule',
  'Total',
  'Payment',
  'Reservation',
]
const cell = (c, i, rec, confirm, rev) =>
  i === 6 ? (
    <Tag style={s.ok}>Paid</Tag>
  ) : i === 7 && rev ? (
    <span style={s.muted}>{rec[9] || '—'}</span>
  ) : i === 7 ? (
    c === 'Confirmed' ? (
      <Tag style={s.ok}>Confirmed</Tag>
    ) : (
      <Button
        type="primary"
        size="small"
        shape="round"
        onClick={() => confirm(rec[8])}
      >
        Confirm
      </Button>
    )
  ) : i === 0 ? (
    <b style={s.ref}>{c}</b>
  ) : (
    <span style={s.muted}>{i === 5 ? `₱${c}` : c}</span>
  )
const opts = (label, a) => [
  { value: 'All', label },
  ...a.map((value) => ({ value })),
]

export default function Bookings({ title, rev }) {
  const { rows, q, date, pg, put, filter, confirm } = useStore()
  const columns = heads.map((h, i) => ({
    title: <span style={s.th}>{rev && i === 7 ? 'Date confirmed' : h}</span>,
    dataIndex: i,
    render: (c, rec) => cell(c, i, rec, confirm, rev),
  }))
  const kind = rev ? 'Confirmed' : 'Confirm'
  const pool = rows.filter((r) => r[7] === kind)
  const list = (rev ? [...pool].reverse() : pool).filter(
    (r) =>
      r.slice(0, 8).join(' ').toLowerCase().includes(q.toLowerCase()) &&
      (date === 'All' || r[3] === date),
  )
  const n = Math.ceil(list.length / 4)
  const page = Math.min(pg, Math.max(n - 1, 0))
  const view = list.slice(page * 4, page * 4 + 4)
  return (
    <Card style={s.card}>
      <Flex
        justify="space-between"
        align="flex-start"
        gap={12}
        wrap
      >
        <div>
          <span style={s.eye}>Court activity</span>
          <h2 style={s.cardTitle}>{title}</h2>
        </div>
        <Flex gap={12}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            value={q}
            style={s.search}
            onChange={(e) => filter({ q: e.target.value })}
          />
          <Select
            value={date}
            options={opts('Date', [...new Set(rows.map((r) => r[3]))])}
            style={s.select}
            onChange={(v) => filter({ date: v })}
          />
        </Flex>
      </Flex>
      <Table
        columns={columns}
        dataSource={view.map((r, i) => ({ ...r, key: i }))}
        pagination={false}
        locale={{
          emptyText: rev
            ? 'No confirmed bookings yet'
            : 'No bookings to confirm',
        }}
        scroll={{ x: 760 }}
        style={{ marginTop: 44 }}
      />
      <Flex
        justify="space-between"
        align="center"
        style={s.foot}
      >
        <small>
          Showing {list.length ? page * 4 + 1 : 0}–{page * 4 + view.length} of{' '}
          {list.length}
        </small>
        <Space.Compact>
          <Button
            style={s.page}
            onClick={() => put({ pg: Math.max(page - 1, 0) })}
          >
            ←
          </Button>
          {Array.from({ length: n }, (_, i) => (
            <Button
              key={i}
              style={s.page}
              type={i === page ? 'primary' : 'default'}
              onClick={() => put({ pg: i })}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            style={s.page}
            onClick={() => put({ pg: Math.min(page + 1, n - 1) })}
          >
            →
          </Button>
        </Space.Compact>
      </Flex>
    </Card>
  )
}