import React, { useEffect, useState } from 'react';
import { Card, Layout, Spin } from 'antd';
import { fetchOrderHistory } from '../../services/api/OrderApi';
import OrderHistoryComponent from '../../components/PaymentForm/OrderHistoryComponent';

const PharmacistOrderPage: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const pharmacistId = parseInt(localStorage.getItem('userId') || '0', 10);
      const data = await fetchOrderHistory(pharmacistId, false);
      setOrders(data);
    } catch (error) {
      console.error('Failed to load pharmacist orders', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
      <Spin spinning={loading} tip="Loading...">
        <Card style={{ minHeight: '85vh' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1>Order Management</h1>
            <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
          </div>
          <OrderHistoryComponent orders={orders} refreshOrders={loadOrders} isPharmacist={false} />
        </Card>
      </Spin>
  );
};

export default PharmacistOrderPage;
