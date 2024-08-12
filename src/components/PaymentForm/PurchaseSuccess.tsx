import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const PurchaseSuccess = ({ orderNumber }: { orderNumber: string }) => {
    const navigate = useNavigate();

  const backDashboard = () => {
    navigate('/patient/upload'); 
  };

  return (
    <Result
      status="success"
      title="Successfully Purchased Your Order!"
      subTitle={`Order number: ${orderNumber}. Your purchase is being processed. This may take 1-5 minutes.`}
      extra={[
        <Button type="primary" key="console" onClick={backDashboard}>
          Go Home
        </Button>,
      ]}
    />
  );
};

export default PurchaseSuccess;
