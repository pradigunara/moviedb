import { Row, Col } from 'antd';

export default function Container({ children }) {
  return (
    <Row style={{ marginLeft: '1em', marginRight: '1em', marginTop: '200px' }}>
      <Col span={24}>
        {children}
      </Col>
    </Row>
  )
}
