import React,{useState,useEffect }from 'react';
import { Card, Button, Divider, Form,notification,Radio, Input  } from 'antd';
import { Elements, useStripe, useElements, CardElement, CardNumberElement, CardExpiryElement, CardCvcElement, AddressElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';
import{ResponseData} from "../../Interfaces/ResposeData"
import { processOrderPayment } from '../../services/api/OrderApi';
import { PaymentForm } from '../../components/PaymentForm/PaymentForm';
import PurchaseSuccess from '../../components/PaymentForm/PurchaseSuccess';

const stripePromise = loadStripe('pk_test_51PlqqoBk6PYt3LyQFjp7Fgafw2HQtEYKLFw4BO5JbOhN5KMKM7BmWA9BUW3WENzPkq4NdiqaH6QKHGxWGNi7KbAL00XSGnPogD');

const Orders = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const location = useLocation();
  const data = location.state as ResponseData;

  useEffect(() => {
    const generateOrderNumber = () => `ORD#${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generateOrderNumber());
  }, []);

  const handleOrderCompletion = () => {
    setIsOrderCompleted(true);
  };

  return (
    <>
    {isOrderCompleted ? (
      <PurchaseSuccess orderNumber={orderNumber} />
    ) : (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Payment Section */}
        <div style={{ width: '50%' }}>
          <Card title="Payment" bordered={false} style={{ marginRight: '20px' }}>
            <PaymentForm orderNumber={orderNumber} data={data} onOrderComplete={handleOrderCompletion} />
          </Card>
        </div>

        {/* Order Summary Section */}
        <div style={{ width: '40%' }}>
          <Card title="Order Summary" bordered={false}>
            <p>Pharmacist Name: {data.pharmacistName}</p>
            <p>Order Number: {orderNumber}</p>
            <p>Invoice Number: {data.invoiceNumber}</p>
            <Divider />
            <h3>Total: {data.total}</h3>
          </Card>
        </div>
      </div>
    )}
  </>
  );
};


const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Orders />
    </Elements>
  );
};


export default App;

