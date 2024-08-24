import React, { useEffect, useState } from 'react';
import { Layout, Spin } from 'antd';
import { fetchOrderHistory } from '../../../services/api/OrderApi';
import OrderHistoryComponent from '../../../components/PaymentForm/OrderHistoryComponent';
import { Order } from '../../../Interfaces/Order';

const { Content } = Layout;

const PharmacistOrderPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const pharmacistId = parseInt(localStorage.getItem('userId') || '0', 10);
      const data = await fetchOrderHistory(pharmacistId,true);
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
    <Layout>
      <Content style={{ padding: '20px' }}>
        <h1>Pharmacist Order Management</h1>
        {loading ? (
          <Spin tip="Loading orders..." />
        ) : (
          <OrderHistoryComponent orders={orders} refreshOrders={loadOrders} isPharmacist={true}/>
        )}
      </Content>
    </Layout>
  );
};

export default PharmacistOrderPage;
