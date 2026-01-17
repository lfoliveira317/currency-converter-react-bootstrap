import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Share } from 'lucide-react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState<number>(1);
  const [exchangeRate, setExchangeRate] = useState<number>(0.057);
  const [convertedAmount, setConvertedAmount] = useState<number>(0.057);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Simulate historical data for the chart
    const data = [];
    const startDate = new Date('2025-12-16');
    let currentRate = 0.056;
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      // Random fluctuation
      const change = (Math.random() - 0.5) * 0.002;
      currentRate += change;
      
      data.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        rate: currentRate,
        fullDate: date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }
    // Ensure the last point matches our current "random" rate roughly or just set it
    setChartData(data);
    setExchangeRate(data[data.length - 1].rate);
  }, []);

  useEffect(() => {
    setConvertedAmount(amount * exchangeRate);
  }, [amount, exchangeRate]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark text-white p-2 rounded border border-secondary shadow-sm" style={{ fontSize: '0.85rem' }}>
          <div className="fw-bold">{payload[0].value.toFixed(3)}</div>
          <div className="text-secondary small">{payload[0].payload.fullDate}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-vh-100 bg-black text-white p-4">
      <Container fluid="md">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div className="text-secondary fs-5">1 Mexican Peso equals</div>
          <Share className="text-secondary" size={20} />
        </div>
        
        <h1 className="display-3 fw-normal mb-1">
          {convertedAmount.toFixed(3)} United States
        </h1>
        <h1 className="display-3 fw-normal mb-4">
          Dollar
        </h1>

        <div className="text-secondary small mb-4">
          Jan 16, 8:07 PM UTC · From Morningstar · Disclaimer
        </div>

        <Row className="g-5">
          <Col lg={5}>
            <div className="mb-3">
              <div className="d-flex align-items-center border border-secondary rounded-3 p-0 overflow-hidden" style={{ height: '56px' }}>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="form-control bg-transparent text-white border-0 fs-4 h-100 shadow-none ps-3"
                  style={{ width: '120px' }}
                />
                <div className="border-start border-secondary h-50 my-auto"></div>
                <select 
                  className="form-select bg-transparent text-white border-0 h-100 shadow-none text-end pe-5 fs-5"
                  style={{ backgroundImage: 'none' }}
                  value="MXN"
                  disabled
                >
                  <option value="MXN">Mexican Peso</option>
                </select>
                <div className="pe-3 text-secondary">▼</div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex align-items-center border border-secondary rounded-3 p-0 overflow-hidden" style={{ height: '56px' }}>
                <input
                  type="number"
                  value={convertedAmount.toFixed(3)}
                  readOnly
                  className="form-control bg-transparent text-white border-0 fs-4 h-100 shadow-none ps-3"
                  style={{ width: '120px' }}
                />
                <div className="border-start border-secondary h-50 my-auto"></div>
                <select 
                  className="form-select bg-transparent text-white border-0 h-100 shadow-none text-end pe-5 fs-5"
                  style={{ backgroundImage: 'none' }}
                  value="USD"
                  disabled
                >
                  <option value="USD">United States Dollar</option>
                </select>
                <div className="pe-3 text-secondary">▼</div>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <div className="d-flex justify-content-end mb-3 gap-3">
              {['1D', '5D', '1M', '1Y', '5Y', 'Max'].map((period) => (
                <button
                  key={period}
                  className={`btn btn-sm rounded-pill px-3 ${period === '1M' ? 'btn-secondary bg-opacity-25 text-primary' : 'text-secondary btn-link text-decoration-none'}`}
                  style={period === '1M' ? { backgroundColor: '#3c4043', color: '#8ab4f8' } : {}}
                >
                  {period}
                </button>
              ))}
            </div>
            
            <div style={{ height: '250px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8ab4f8" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8ab4f8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#3c4043" strokeDasharray="1 0" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9aa0a6', fontSize: 12 }}
                    interval={14}
                  />
                  <YAxis 
                    domain={['dataMin - 0.001', 'dataMax + 0.001']} 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: '#9aa0a6', fontSize: 12 }}
                    orientation="left"
                    tickFormatter={(val) => val.toFixed(3)}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9aa0a6', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  <Area 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#8ab4f8" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRate)" 
                    dot={<CustomDot />}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const CustomDot = (props: any) => {
  const { cx, cy, index, dataPoint } = props;
  // Only show dot for the last point or hover (handled by tooltip cursor)
  // Here we just show a dot at the end to match the screenshot style if needed, 
  // but Recharts handles active dots on hover. 
  // The screenshot shows a specific point highlighted.
  // We'll leave the default active dot behavior for interactivity.
  return null;
};

export default CurrencyConverter;
