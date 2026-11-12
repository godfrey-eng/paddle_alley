import {
  AppstoreOutlined,
  CalendarOutlined,
  CloseOutlined,
  HistoryOutlined,
} from '@ant-design/icons'
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Drawer,
  Flex,
  Grid,
  Layout,
  Menu,
  Row,
} from 'antd'
import { useStore } from './store'
import { s } from './styles'
import Login from './components/Login'
import Bookings from './components/Table'
import Court from './components/Court'

const statsOf = (rows) => {
  const done = rows.filter((r) => r[7] === 'Confirmed').length
  return [
    ['Total bookings', rows.length],
    ['Upcoming', rows.length - done],
    ['Confirmed', done],
    ['Pending payments', 0],
    ['Cancelled', 0],
  ]
}
const nav = [
  ['booking', <CalendarOutlined />],
  ['court', <AppstoreOutlined />],
  ['history', <HistoryOutlined />],
]
const cap = (k) => k[0].toUpperCase() + k.slice(1)

export default function App() {
  const { page, rows, drawer, put, go, exportCsv } = useStore()
  const wide = Grid.useBreakpoint().lg
  if (page === 'login') return <Login />
  const items = nav.map(([key, icon]) => ({
    key,
    icon,
    label: page === key ? <b>{cap(key)}</b> : cap(key),
  }))
  const views = {
    booking: (
      <>
        <Row
          gutter={[18, 18]}
          style={{ marginBottom: 30 }}
        >
          {statsOf(rows).map(([t, v]) => {
            const hi = t === 'Upcoming'
            return (
              <Col
                key={t}
                xs={12}
                md={8}
                xl={{ flex: '20%' }}
              >
                <Card
                  style={{ ...s.stat, ...(hi && s.statHi) }}
                  styles={{ body: s.statBody }}
                >
                  <span style={hi ? { color: '#7f8f2a' } : s.muted}>{t}</span>
                  <b style={s.statNum}>{v}</b>
                  <small
                    style={{ ...s.statSmall, ...(hi && { color: '#7f8f2a' }) }}
                  >
                    This month
                  </small>
                </Card>
              </Col>
            )
          })}
        </Row>
        <Bookings title="Reservations" />
      </>
    ),
    court: <Court />,
    history: (
      <>
        <Flex
          justify="space-between"
          align="center"
          style={s.row}
        >
          <p>
            Review completed, cancelled, expired, payment, and refund activity.
          </p>
          
        </Flex>
        <Bookings
          title="Booking history"
          rev
        />
      </>
    ),
  }
  return (
    <Layout style={s.shell}>
      <Drawer
        open={drawer}
        placement="left"
        size={310}
        closable={false}
        mask={!wide}
        keyboard={false}
        maskClosable={false}
        styles={{ section: s.sider, body: s.siderBody }}
      >
        <div>
          <img
            src="/logo.png"
            alt="Paddle Alley"
            style={s.logo}
          />
          <Menu
            theme="dark"
            selectedKeys={[page]}
            items={items}
            onClick={(e) => go(e.key)}
          />
        </div>
        <Menu
          theme="dark"
          selectable={false}
          style={s.logout}
          onClick={() => go('login')}
          items={[{ key: 'out', icon: <LogoutOutlined />, label: 'Logout' }]}
        />
      </Drawer>
      <Layout.Content
        style={{ ...s.main, marginLeft: drawer && wide ? 310 : 0 }}
      >
        <Button
          aria-label="Toggle menu"
          style={s.menuBtn}
          onClick={() => put({ drawer: !drawer })}
          type={drawer ? 'primary' : 'default'}
          icon={drawer ? <CloseOutlined /> : <MenuOutlined />}
        />
        <span style={s.eye}>Admin workspace</span>
        <h1 style={s.h1}>{page}</h1>
        <Avatar
          size={52}
          style={s.avatar}
        >
          PA
        </Avatar>
        {views[page]}
      </Layout.Content>
    </Layout>
  )
}