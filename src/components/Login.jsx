import { Button, Col, Flex, Input, Row, Typography } from 'antd'
import { useStore } from '../store'
import { s } from '../styles'

const fields = [
  ['user', 'Username or email', Input, 'admin@paddlealley.ph'],
  ['pass', 'Password', Input.Password, 'Enter your password'],
]

export default function Login() {
  const { put, login, error, ...form } = useStore()
  return (
    <Row style={s.shell}>
      <Col
        xs={0}
        lg={12}
      >
        <div style={s.hero}>
          <img
            src="/login-logo.png"
            alt="Paddle Alley"
            style={s.heroImg}
          />
          <span style={{ ...s.eye, color: '#b9cc42', marginTop: 50 }}>
            Administration
          </span>
          <h1 style={s.heroH1}>Keep every game on track.</h1>
          <p style={s.heroP}>
            Manage reservations, availability, and court operations from one
            focused workspace.
          </p>
          <small style={s.heroSmall}>Secure staff access ·</small>
          <div style={s.circle} />
        </div>
      </Col>
      <Col
        xs={24}
        lg={12}
      >
        <Flex
          vertical
          justify="center"
          gap={16}
          style={s.form}
        >
          <a
            href="#"
            style={s.back}
          >
            ← Back to customer site
          </a>
          <span style={s.eye}>Welcome back</span>
          <h2 style={s.formH2}>Sign in to Paddle Alley</h2>
          <p style={s.formP}>Use your administrator credentials to continue.</p>
          {fields.map(([k, label, C, ph]) => (
            <label
              key={k}
              style={s.label}
            >
              {label} *
              <C
                size="large"
                placeholder={ph}
                value={form[k]}
                onChange={(e) => put({ [k]: e.target.value, error: '' })}
              />
            </label>
          ))}
          <Typography.Text
            type="danger"
            strong
          >
            {error}
          </Typography.Text>
          <Button
            type="primary"
            size="large"
            onClick={login}
          >
            Sign in securely →
          </Button>
          <small style={s.formSmall}>
           
          </small>
        </Flex>
      </Col>
    </Row>
  )
}
