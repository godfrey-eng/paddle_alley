import { Button, Card, Col, Flex, Input, Row } from 'antd'
import { useStore } from '../store'
import { s } from '../styles'

const F = [
  ['Standard rental rate', '₱100 per hour'],
  ['Booking durations', '30 min, 1 hr, 2 hrs, 3 hrs'],
  ['Operating hours', '6:00 AM – 10:00 PM'],
  ['Maintenance', 'Sundays · 10:00–11:00 PM'],
]

export default function Court() {
  const { open, saved, put } = useStore()
  return (
    <Card
      style={s.card}
      styles={{ body: s.courtBody }}
    >
      <Row gutter={[50, 24]}>
        <Col
          xs={24}
          lg={10}
        >
          <img
            src="/court.png"
            alt="Court 1"
            style={s.courtImg}
          />
        </Col>
        <Col
          xs={24}
          lg={14}
        >
          <span style={s.courtEye}>
            <span style={{ color: '#b9cc42' }}>●</span>{' '}
            {open ? 'Open & available' : 'Closed for now'}
          </span>
          <h2 style={s.courtH2}>Paddle Alley Court 1</h2>
          <p style={s.sub}>
            Competition-grade pickleball court with bright lighting and a
            comfortable sideline area.
          </p>
          <Row
            gutter={[24, 20]}
            style={{ marginBottom: 34 }}
          >
            {F.map(([l, v]) => (
              <Col
                span={12}
                key={l}
              >
                <label style={s.label}>
                  {l}
                  <Input
                    size="large"
                    defaultValue={v}
                  />
                </label>
              </Col>
            ))}
          </Row>
          <Flex
            justify="flex-end"
            gap={14}
          >
            <Button
              size="large"
              onClick={() => put({ open: !open, saved: false })}
            >
              {open ? 'Schedule closure' : 'Reopen court'}
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={() => put({ saved: true })}
            >
              {saved ? 'Saved' : 'Save availability'}
            </Button>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}
