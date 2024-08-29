import React, { useState } from 'react';
import { Table, Tag, Space, Modal, Button, Input, Select, notification, List, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { UpdateOrderRequest } from '../../Interfaces/UpdateOrderRequest';
import { Order } from '../../Interfaces/Order';
import { ResponseData } from '../../Interfaces/ResposeData';
import { updateOrder } from '../../services/api/OrderApi';
import { GetInvoiceByInvoceNumber } from '../../services/api/InvoiceAPI';

const { Option } = Select;
const { Title, Text } = Typography;

interface OrderHistoryComponentProps {
  orders: Order[];
  refreshOrders: () => void; 
  isPharmacist: boolean; 
}

const OrderHistoryComponent: React.FC<OrderHistoryComponentProps> = ({ orders, refreshOrders, isPharmacist }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<UpdateOrderRequest>({
    status: '',
    trackingNumber: '',
  });

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [invoiceData, setInvoiceData] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEditClick = (order: Order) => {
    setEditingOrder(order);
    setFormValues({
      status: order.orderStatus,
      trackingNumber: order.trackingNumber || '',
    });
    setIsEditing(true);
  };

  const handleUpdateOrder = async () => {
    if (!editingOrder) return;
    setUpdateLoading(true);
    try {
      // Make API call using the order number from the editingOrder object
      
      await updateOrder(editingOrder.id, formValues);
     
      notification.success({
        message: 'Success',
        description: `Order ${editingOrder.orderNumber} updated successfully.`,
      });
      setIsEditing(false);
      refreshOrders(); // Reload orders to reflect changes
    } catch (error) {
      notification.error({
        message: 'Error',
        description: `Failed to update order ${editingOrder.orderNumber}.`,
      });
    } finally {
      setUpdateLoading(false);
    }
  };
  

  const showInvoice = async (invoiceNumber: string) => {
    try {
      setLoading(true);
      const data = await GetInvoiceByInvoceNumber(invoiceNumber);
      setInvoiceData(data);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Failed to load invoice details', error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<Order> = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
    },
    {
      title: 'Order Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: (status: string) => (
        <Tag color={status === 'Paid' ? 'green' : 'volcano'}>{status}</Tag>
      ),
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
      render: (status: string) => {
        let color = 'default';
        switch (status) {
          case 'Complete':
            color = 'green';
            break;
          case 'Shipped':
            color = 'blue';
            break;
          case 'Awaiting Shipment':
            color = 'orange';
            break;
          case 'Cancelled':
            color = 'red';
            break;
          default:
            break;
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Tracking Number',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
      render: (trackingNumber: string) => trackingNumber || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Order) => (
        <Space size="middle">
          <Button type="default" onClick={() => showInvoice(record.invoiceNumber)}>
            View Details
          </Button>
          {isPharmacist && (
            <Button type="primary" onClick={() => handleEditClick(record)}>
              Edit
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={orders} rowKey="orderId" />

      <Modal
        title="Update Order"
        open={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={handleUpdateOrder}
        confirmLoading={updateLoading}
      >
        <div style={{ marginBottom: 16 }}>
          <label><strong>Order Status:</strong></label>
          <Select
            style={{ width: '100%', marginTop: 8 }}
            value={formValues.status}
            onChange={(value) => setFormValues({ ...formValues, status: value })}
          >
            <Option value="Awaiting Shipment">Awaiting Shipment</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Complete">Complete</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </div>
        <div>
          <label><strong>Tracking Number:</strong></label>
          <Input
            style={{ marginTop: 8 }}
            placeholder="Enter tracking number"
            value={formValues.trackingNumber}
            onChange={(e) => setFormValues({ ...formValues, trackingNumber: e.target.value })}
          />
        </div>
      </Modal>

      <Modal
        title="Invoice Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          invoiceData && (
            <>
              <Title level={4}>Pharmacist: {invoiceData.pharmacistName}</Title>
              <Title level={5}>Total Amount: ${invoiceData.total}</Title>
              {invoiceData.medications && invoiceData.medications.length > 0 ? (
                <List
                  header={<div>Medication Details</div>}
                  bordered
                  dataSource={invoiceData.medications}
                  renderItem={item => (
                    <List.Item>
                      <div>
                        <Text strong>Medication Name:</Text> {item.medicationName}
                      </div>
                      <div>
                        <Text strong>Dosage:</Text> {item.medicationDosage}
                      </div>
                      <div>
                        <Text strong>Quantity:</Text> {item.medicationQuantity}
                      </div>
                      <div>
                        <Text strong>Amount:</Text> ${item.amount}
                      </div>
                    </List.Item>
                  )}
                />
              ) : (
                <p>No medications available for this invoice.</p>
              )}
            </>
          )
        )}
      </Modal>
    </>
  );
};

export default OrderHistoryComponent;
