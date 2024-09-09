import React, { useState } from 'react';
import { Modal, Card, Button, Form, Input, notification, Tooltip, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MessageOutlined, PlusOutlined, DownloadOutlined } from '@ant-design/icons';
import { SendInvoice } from '../../services/api/InvoiceAPI';

export interface RequestData {
  id: number;
  fileName: string | null;
  filePath: string | null;
  user: {
    id: number;
    name: string;
    email: string;
  };
  imageData: string | null; // imageData can be null
  medicationName: string | null; // medicationName from the backend
  medicationQuantity: number | null; // medicationQuantity from the backend
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
  onInvoiceSuccess: (id: number) => void; // Callback to remove card on invoice success
}

export const RequestCard: React.FC<RequestCardProps> = ({ data, buttonTexts, onInvoiceSuccess }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isFinalInvoiceModalOpen, setIsFinalInvoiceModalOpen] = useState(false);
  const [medications, setMedications] = useState<Medication[]>([]);
  const [form] = Form.useForm();
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const navigate = useNavigate();
  const { Meta } = Card;

  const base64String = data.imageData ? `data:image/png;base64,${data.imageData}` : ''; // Use empty string if no image

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

  const handleContactClick = () => {
    navigate('/pharmacist/chat', { state: { name: data.user.name, id: data.user.id } });
  };

  const handleDownloadClick = (imageUrl: string) => {
    if (!imageUrl) {
      notification.error({ message: 'Error', description: 'No image available for download.' });
      return;
    }
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'downloaded-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add medication logic
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

  // Calculate total amount of medications
  const calculateTotal = () => {
    return medications.reduce((total, med) => total + med.amount, 0);
  };

  // Submit invoice logic
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
      const newInvoiceNumber = generateOrderNumber();
      setInvoiceNumber(newInvoiceNumber);
      const pharmacistId = localStorage.getItem('userId');
      const formData = {
        medications,
        prescriptionId: data.id,
        pharmacistId: pharmacistId ? parseInt(pharmacistId, 10) : null,
        totalAmount: calculateTotal(),
        invoiceNumber: newInvoiceNumber,
      };

      const response = await SendInvoice(formData);
      if (response) {
        notification.success({
          message: 'Success',
          description: 'Invoice sent successfully',
        });
        setIsFinalInvoiceModalOpen(false);
        setMedications([]); // Reset medications after submitting the invoice
        onInvoiceSuccess(data.id); // Remove the card from the list after success
      }
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Invoice sending failed',
      });
    }
  };

  return (
    <>
      <Card
        style={{ width: 200, margin: 20 }}
        cover={
          base64String ? (
            <div style={{ position: 'relative' }}>
              <img
                alt="example"
                src={base64String}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '7px 7px 0px 0px' }}
              />
              <Button
                type="primary"
                style={{
                  position: 'absolute',
                  bottom: 10,
                  right: 10,
                  background: '#2e384d',
                  color: 'white',
                }}
                onClick={showModal}
              >
                View
              </Button>
            </div>
          ) : (
            // Render medicationName and medicationQuantity if no image is available
            <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '10px', textAlign: 'center', backgroundColor: '#f0f0f0', borderRadius: '7px 7px 0px 0px' }}>
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>{data.medicationName || 'No Medication Name'}</p>
              <p style={{ fontSize: '14px' }}>Quantity: {data.medicationQuantity || 'N/A'}</p>
            </div>
          )
        }
        actions={[
          <Tooltip title="Send Message" key="message">
            <MessageOutlined onClick={handleContactClick} />
          </Tooltip>,
          <Tooltip title="Download" key="download">
            <DownloadOutlined onClick={() => handleDownloadClick(base64String)} />
          </Tooltip>,
          <Tooltip title="Add Medication" key="add">
            <PlusOutlined onClick={showInvoiceModal} />
          </Tooltip>,
        ]}
      >
        <Meta
          title={data.user.name}
          description={data.user.email}
        />
      </Card>

      {/* Modal for viewing the image */}
      <Modal title="User Image" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {base64String ? (
          <img src={base64String} alt={data.fileName || 'Image'} style={{ width: '100%' }} />
        ) : (
          <p>No image available to display.</p>
        )}
      </Modal>

      {/* Add Medication Modal with Prescription Image on Left */}
      <Modal title="Add Medication" open={isInvoiceModalOpen} onOk={handleInvoiceOk} onCancel={handleInvoiceCancel} footer={null}>
        <Row gutter={16}>
          <Col span={8}>
            {base64String ? (
              <img src={base64String} alt={data.fileName || 'Prescription Image'} style={{ width: '100%', borderRadius: '8px' }} />
            ) : (
              <div style={{ textAlign: 'center', padding: '10px' }}>No image available.</div>
            )}
          </Col>
          <Col span={16}>
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
                rules={[{ required: true, message: 'Please input the number of days!' }]}
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
            <Button type="primary" 
              style={{ background: '#2e384d', color: 'white', marginTop: '10px' }}
              onClick={() => setIsFinalInvoiceModalOpen(true)} block>
              View Final Invoice
            </Button>
          </Col>
        </Row>
      </Modal>

      {/* Final Invoice Modal */}
      <Modal title="Final Invoice" open={isFinalInvoiceModalOpen} onCancel={() => setIsFinalInvoiceModalOpen(false)} footer={null}>
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
        <Button type="primary" 
          style={{ background: '#2e384d', color: 'white' }}
          onClick={onFinish} block>
          Submit Invoice
        </Button>
      </Modal>
    </>
  );
};
