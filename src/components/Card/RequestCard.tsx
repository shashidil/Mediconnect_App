import React, { useState } from 'react';
import { Modal, Card, Button, Form, Input, notification, Space, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { SendInvoice } from '../../services/api/InvoiceAPI';

export interface RequestData {
  id: number;
  fileName: string;
  filePath: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  imageData: string;
}

interface Medication {
  medicationName: string;
  medicationDosage: string;
  medicationQuantity: number;
  amount: number;
}

interface RequestCardProps {
  data: RequestData;
  buttonTexts?: { Order: string; Contact: string };
}

export const RequestCard: React.FC<RequestCardProps> = ({ data, buttonTexts }) => {
  const orderText = buttonTexts?.Order || 'Order';
  const contactext = buttonTexts?.Contact || 'Contact';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isFinalInvoiceModalOpen, setIsFinalInvoiceModalOpen] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [form] = Form.useForm();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const navigate = useNavigate();

  const base64String = `data:image/png;base64,${data.imageData}`;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showInvoiceModal = () => {
    setIsInvoiceModalOpen(true);
  };

  const handleInvoiceOk = () => {
    setIsInvoiceModalOpen(false);
  };

  const handleInvoiceCancel = () => {
    setIsInvoiceModalOpen(false);
    form.resetFields(); // Reset the form fields
  };

  const showFinalInvoiceModal = () => {
    setIsFinalInvoiceModalOpen(true);
  };

  const handleFinalInvoiceCancel = () => {
    setIsFinalInvoiceModalOpen(false);
    setMedications([]); // Reset the medications list when the modal is closed
  };

  const addMedication = () => {
    form.validateFields().then(values => {
      const newMedication = {
        ...values,
        medicationQuantity: Number(values.medicationQuantity),
        amount: Number(values.amount),
      };

      setMedications([...medications, newMedication]);
      form.resetFields(); // Clear form fields after adding a medication
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  const calculateTotal = () => {
    return medications.reduce((total, med) => total + med.amount, 0);
  };

  const onFinish = async () => {
    if (medications.length === 0) {
      notification.error({
        message: 'Error',
        description: 'Please add at least one medication before submitting the invoice.',
      });
      return;
    }

   

    try {
      const generateOrderNumber = () => `INV${Math.floor(1000 + Math.random() * 9000)}`;
      setInvoiceNumber(generateOrderNumber);
      const pharmacistId = localStorage.getItem('userId');
      const formData = {
        medications,
        prescriptionId: data.id,
        pharmacistId: pharmacistId ? parseInt(pharmacistId, 10) : null,
        totalAmount: calculateTotal(),
        invoiceNumber:invoiceNumber
      };

      const response = await SendInvoice(formData);
      if (response) {
        notification.success({
          message: 'Success',
          description: 'Invoice sent successfully',
        });
      }

      setIsFinalInvoiceModalOpen(false);
      setMedications([]); // Reset medications after submitting the invoice
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Invoice sending failed',
      });
    }
  };

  const handleContactClick = () => {
    navigate('/pharmacist/chat', { state: { name: data.user.name, id: data.user.id } });
  };

  return (
    <>
      <Card style={{ width: "100%" }}>
        <div style={{ display: 'flex', textAlign: 'start', fontWeight: '500', flexDirection: 'column' }}>
          <h1>{data.user.name}</h1>
          <h4 style={{ margin: '0', fontWeight: '400' }}>Email - {data.user.email}</h4>
          <img src={base64String} alt={data.fileName} style={{ width: '100px', height: '100px', marginBottom: '10px' }} />
          <Button type="primary" onClick={showModal} style={{ margin: '20px 0', position: 'absolute', top: '200px' }}>
            View More
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '35%', float: 'right' }}>
          <a href={base64String} download={data.fileName} style={{ margin: '10px 0' }}>Download Image</a>
          <button onClick={handleContactClick} style={{ padding: '12px', color: '#2e384d', width: '140px', borderRadius: '5px', fontWeight: 'bold', border: '0', margin: '10px' }}>Contact</button>
          <button onClick={showInvoiceModal} style={{ padding: '12px', color: '#2e384d', width: '140px', borderRadius: '5px', fontWeight: 'bold', border: '0', margin: '10px' }}>Add Medication</button>
        </div>
      </Card>

      <Modal title="User Image" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <img src={base64String} alt={data.fileName} style={{ width: '100%' }} />
      </Modal>

      <Modal title="Add Medication" open={isInvoiceModalOpen} onOk={handleInvoiceOk} onCancel={handleInvoiceCancel} footer={null}>
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Medication Name"
            name="medicationName"
            rules={[{ required: true, message: 'Please input the medication name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Medication Dosage"
            name="medicationDosage"
            rules={[{ required: true, message: 'Please input the medication dosage!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Days"
            name="days"
            rules={[{ required: true, message: 'Please day the medication dosage!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Medication Quantity"
            name="medicationQuantity"
            rules={[{ required: true, message: 'Please input the medication quantity!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input the amount!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="dashed" onClick={addMedication} block icon={<PlusOutlined />}>
              Add Medication
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={showFinalInvoiceModal} block>
          View Final Invoice
        </Button>
      </Modal>

      <Modal title="Final Invoice" open={isFinalInvoiceModalOpen} onCancel={handleFinalInvoiceCancel} footer={null}>
        <h3>Final Invoice</h3>
        {medications.length > 0 ? (
          <>
            <ul>
              {medications.map((med, index) => (
                <li key={index}>
                  {med.medicationName} - {med.medicationDosage} - {med.medicationQuantity} units - ${med.amount}
                </li>
              ))}
            </ul>
            <h4>Total: ${calculateTotal()}</h4>
          </>
        ) : (
          <p>No medications added.</p>
        )}
        <Button type="primary" onClick={onFinish} block>
          Submit Invoice
        </Button>
      </Modal>
    </>
  );
};
