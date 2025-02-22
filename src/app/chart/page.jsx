import ChartComponent from '@/components/ChartComponent'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const page = () => {
  return (
      <Container>
          <Row className='mt-4 mb-4'>
              <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Bar Chart</h2>
                  <ChartComponent type="bar" />
              </Col>
              <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Line Chart</h2>
                  <ChartComponent type="line" />
              </Col>
              <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Area Chart</h2>
                  <ChartComponent type="area" />
              </Col>
              <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Scatter Chart</h2>
                  <ChartComponent type="scatter" />
              </Col>
              <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Pie Chart</h2>
                  <ChartComponent type="pie" />
              </Col>  
               <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Donut Chart</h2>
                  <ChartComponent type="donut" />
              </Col>  
              <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Dubble Chart</h2>
                  <ChartComponent type="bubble" />
              </Col>  
              <Col md={6} className='mt-4 pt-3 border'>
                  <h2>Combination Chart</h2>
                  <ChartComponent type="combination" />
              </Col>  
          </Row>
      </Container>
  )
}

export default page
