import React, { useEffect, useState } from 'react';
import { Card, Layout, Spin } from 'antd';
import { fetchOrderHistory } from '../../../services/api/OrderApi';
import OrderHistoryComponent from '../../../components/PaymentForm/OrderHistoryComponent';
import { Order } from '../../../Interfaces/Order';

const PharmacistOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const pharmacistId = parseInt(localStorage.getItem('userId') || '0', 10);
      const data = await fetchOrderHistory(pharmacistId, true);
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
      <Spin spinning={loading} size="large" tip="Loading..." style={{ minHeight: '500px' }}>
        <Card style={{ minHeight: '85vh' }}>
          <div style={{ marginBottom: '24px' }}>
            <h1>Pharmacist Order Management</h1>
            <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
          </div>
          <OrderHistoryComponent orders={orders} refreshOrders={loadOrders} isPharmacist={true} />
        </Card>
      </Spin>
  );
};

export default PharmacistOrderPage;
