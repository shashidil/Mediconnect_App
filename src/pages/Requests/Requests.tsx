import React, { useEffect, useState } from 'react';
import { RequestCard, RequestData } from "../../components/Card/RequestCard";
import { getPrescriptions } from "../../services/api/UploadPrescriptionAPI";
import { Card, Empty, Row, Spin } from "antd";

const Requests: React.FC = () => {
  const [responsesData, setResponsesData] = useState<RequestData[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      if (userId !== null) {
        try {
          setLoading(true);
          const prescriptionData = await getPrescriptions(userId);
          setResponsesData(prescriptionData);
        } catch (error) {
          console.error('Failed to fetch prescriptions:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    loadUsers();
  }, [userId]);

  if (loading) {
    return (
        <div style={{ textAlign: 'center', padding: '50px', minHeight: '500px' }}>
          <Spin size="large" />
        </div>
    );
  }

  return (
      <Card style={{ minHeight: '85vh' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1>Requests</h1>
          <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
        </div>
        {responsesData.length === 0 ? (
            <Empty
                description={<span>No Requests Available</span>}
                style={{ textAlign: 'center', marginTop: '20vh' }}
            />
        ) : (
            <Row gutter={16} justify="center">
              {responsesData.map((data, index) => (
                  <RequestCard key={index} data={data} />
              ))}
            </Row>
        )}
      </Card>
  );
}

export default Requests;
