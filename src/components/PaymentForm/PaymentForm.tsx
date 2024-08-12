import React,{useState }from 'react';
import { Result, Button, Divider, Form,notification,Radio, Input  } from 'antd';
import { Elements, useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ResponseData } from '../../components/Card/ResponseCard';
import { processOrderPayment } from '../../services/api/OrderApi';
import PurchaseSuccess from './PurchaseSuccess';

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
    onOrderComplete : () => void;
  };
  
 export const PaymentForm: React.FC<PaymentFormProps> = ({ orderNumber, data,onOrderComplete }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardholderName, setCardholderName] = useState('');
    const [cardType, setCardType] = useState('Visa');
    const [orderType, setOrderType] = useState('Pickup');



    const backDashborad= ()=>{}
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement!,
      });
  
      if (error) {
        notification.error({
          message: 'Error',
          description: 'Payment Failed',
        });
      } else {
        try {
            const customerId = localStorage.getItem('userId') || '';
            console.log(data.pharmacistId);
            const response = await processOrderPayment(
            data.invoiceNumber,  // Use actual invoiceId from the data
            orderNumber,
            data.pharmacistId, // Use actual pharmacistId from the data
            Number(customerId),  // Use actual customerId from the data
            cardType,  // Selected card type
            data.total  // Use the actual total amount from the data
          );
          onOrderComplete();
  
        //   notification.success({
        //     message: 'Success',
        //     description: `Order placed successfully! Order Number: ${orderNumber}`,
        //   });
        
         
  
         // console.log('Order Response:', response);
        } catch (error) {
          notification.error({
            message: 'Payment Processing Error',
            description: 'There was an issue processing your payment.',
          });
        }

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
  