import React, { useState, useEffect } from 'react';
import { Container, Card, Form, InputGroup, Button, Row, Col } from 'react-bootstrap';
import { ArrowLeftRight, TrendingUp } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number>(19.21);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [isMxnToUsd, setIsMxnToUsd] = useState<boolean>(true);

  useEffect(() => {
    // Randomize exchange rate on mount
    const rates = [19.21, 19.64, 18.86, 19.07, 19.45, 18.92];
    const randomRate = rates[Math.floor(Math.random() * rates.length)];
    setExchangeRate(randomRate);
  }, []);

  useEffect(() => {
    if (isMxnToUsd) {
      setConvertedAmount(amount / exchangeRate);
    } else {
      setConvertedAmount(amount * exchangeRate);
    }
  }, [amount, exchangeRate, isMxnToUsd]);

  const handleSwap = () => {
    setIsMxnToUsd(!isMxnToUsd);
  };

  const formatCurrency = (val: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <Card className="shadow-sm border-0 rounded-4" style={{ maxWidth: '700px', width: '100%' }}>
        <Card.Body className="p-4 p-md-5">
          <div className="mb-4">
            <h1 className="h4 mb-1 text-primary fw-bold">
              {isMxnToUsd ? 'Mexican Peso' : 'United States Dollar'} to {isMxnToUsd ? 'United States Dollar' : 'Mexican Peso'}
            </h1>
            <p className="text-muted small mb-0">
              1 {isMxnToUsd ? 'MXN' : 'USD'} = {isMxnToUsd ? (1 / exchangeRate).toFixed(6) : exchangeRate.toFixed(6)} {isMxnToUsd ? 'USD' : 'MXN'}
            </p>
          </div>

          <div className="bg-white border rounded-3 p-3 mb-4 position-relative">
            <Row className="g-3 align-items-center">
              <Col md={5}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold mb-1">Amount</Form.Label>
                  <InputGroup className="input-group-lg border-0">
                    <Form.Control
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                      className="border-0 shadow-none fs-2 fw-bold p-0 text-dark"
                      style={{ background: 'transparent' }}
                    />
                  </InputGroup>
                  <div className="text-primary fw-bold mt-1">
                    {isMxnToUsd ? 'MXN - Mexican Peso' : 'USD - US Dollar'}
                  </div>
                </Form.Group>
              </Col>

              <Col md={2} className="text-center">
                <Button 
                  variant="outline-secondary" 
                  className="rounded-circle p-2 border-2 d-flex align-items-center justify-content-center mx-auto"
                  style={{ width: '48px', height: '48px' }}
                  onClick={handleSwap}
                >
                  <ArrowLeftRight size={20} />
                </Button>
              </Col>

              <Col md={5}>
                <Form.Group>
                  <Form.Label className="text-muted small fw-bold mb-1">Converted to</Form.Label>
                  <div className="fs-2 fw-bold text-dark">
                    {convertedAmount.toFixed(2)}
                  </div>
                  <div className="text-primary fw-bold mt-1">
                    {isMxnToUsd ? 'USD - US Dollar' : 'MXN - Mexican Peso'}
                  </div>
                </Form.Group>
              </Col>
            </Row>
          </div>

          <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded-3">
             <div className="d-flex align-items-center text-muted small">
                <TrendingUp size={16} className="me-2" />
                <span>
                  Market rates are volatile. This is a simulated rate.
                </span>
             </div>
             <Button variant="primary" className="px-4 rounded-pill fw-bold">
                Track currency
             </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CurrencyConverter;
