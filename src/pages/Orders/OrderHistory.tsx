import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { fetchOrderHistory } from '../../services/api/OrderApi';
import OrderHistoryComponent from '../../components/PaymentForm/OrderHistoryComponent';

const { Content } = Layout;

const PharmacistOrderPage: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const pharmacistId = parseInt(localStorage.getItem('userId') || '0', 10);
      const data = await fetchOrderHistory(pharmacistId,false);
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
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h1> Order Management</h1>
        {loading ? (
          <Spin tip="Loading orders..." />
        ) : (
          <OrderHistoryComponent orders={orders} refreshOrders={loadOrders} isPharmacist={false} />
        )}
      </Content>
    </Layout>
  );
};

export default PharmacistOrderPage;
