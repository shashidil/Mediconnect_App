import React, { useState } from 'react';
import { notification, Radio, Input, Button, Form, Divider } from 'antd';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { processOrderPayment, createPaymentIntent } from '../../services/api/OrderApi'; 
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { ResponseData } from '../../Interfaces/ResposeData';

const cardStyle: StripeCardElementOptions = {
  style: {
    base: {
      color: '#2e384d',
      fontSize: '16px',
      '::placeholder': {
        color: '#a9a9fd',
      },
    },
    invalid: {
      color: '#ff4d4f',
    },
  },
};

type PaymentFormProps = {
  orderNumber: string;
  data: ResponseData;
  onOrderComplete: () => void;
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ orderNumber, data, onOrderComplete }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');
  const [cardType, setCardType] = useState('Visa');
  const [orderType, setOrderType] = useState('Pickup');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // First Step: Create payment intent on the backend
    try {
      const customerId = localStorage.getItem('userId') || '';
      const createIntentResponse = await createPaymentIntent({
        amount: Math.round(data.total * 100), 
      });

      const clientSecret = createIntentResponse.client_secret;

      // Second Step: Confirm payment with Stripe using the client secret
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            name: cardholderName,
          },
        },
      });

      if (error) {
        notification.error({
          message: 'Payment Error',
          description: error.message,
        });
        return;
      }

      // Third Step: Call your process payment API after payment success
      const response = await processOrderPayment({
        invoiceId: data.id,
        orderNumber: orderNumber,
        pharmacistId: data.pharmacistId,
        customerId: Number(customerId),
        paymentMethod: cardType,
        amount: data.total,
      });

      notification.success({
        message: 'Payment Successful',
        description: 'Order placed successfully!',
      });

      onOrderComplete(); // Execute callback when order is completed
    } catch (error) {
      notification.error({
        message: 'Payment Processing Error',
        description: 'There was an issue processing your payment.',
      });
    }
  };

  return (
    <Form onSubmitCapture={handleSubmit}>
      <h4 style={{ textAlign: 'start' }}>PAYMENT METHOD</h4>
      <Divider />
      <Input
        placeholder="Cardholder Name"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
        style={{ marginBottom: '15px' }}
      />
      <Radio.Group
        onChange={(e) => setCardType(e.target.value)}
        value={cardType}
        style={{ marginBottom: '15px' }}
      >
        <Radio value="Visa">Visa</Radio>
        <Radio value="MasterCard">MasterCard</Radio>
      </Radio.Group>
      <div style={{ border: '1px solid #a9a9fd', padding: '20px', borderRadius: '8px' }}>
        <CardElement options={cardStyle} />
      </div>
      <Radio.Group
        onChange={(e) => setOrderType(e.target.value)}
        value={orderType}
        style={{ marginTop: '15px', marginBottom: '15px' }}
      >
        <Radio value="Pickup">Pickup</Radio>
        <Radio value="Delivery">Delivery</Radio>
      </Radio.Group>
      <Button
        type="primary"
        htmlType="submit"
        style={{ marginTop: '30px', background: '#2e384d', padding: '15px 0', borderRadius: '8px', width: '100%', fontWeight: 'bold', border: '0', textJustify: 'auto' }}
        disabled={!stripe}
      >
        Pay Now
      </Button>
    </Form>
  );
};
