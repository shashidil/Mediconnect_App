import React, { useEffect, useState } from "react";
import { ResponseCard } from "../../components/Card/ResponseCard";
import { ResponseData } from "../../Interfaces/ResposeData";
import { GetInvoice } from "../../services/api/InvoiceAPI";
import { Card, Empty, Row, Spin } from "antd";

export const Responses: React.FC = () => {
  const [responsesData, setResponsesData] = useState<ResponseData[]>([]);
  const [userId, setUserId] = useState<number>(Number);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  useEffect(() => {
    if (userId !== null) {
      const fetchInvoices = async () => {
        setLoading(true);
        try {
          const invoices = await GetInvoice(userId);
          setResponsesData(invoices);
        } catch (error) {
          console.error('Failed to fetch invoices:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchInvoices();
    }
  }, [userId]);

  // Function to remove a response from the list after successful order
  const handleRemoveResponse = (invoiceNumber: number) => {
    setResponsesData((prevData) =>
      prevData.filter((response) => response.id !== invoiceNumber)
    );
  };

  const sortedResponses = Array.isArray(responsesData)
    ? responsesData.sort((a, b) => a.distance - b.distance || a.total - b.total)
    : [];

  return (
    <Card style={{ minHeight: "85vh" }}>
      <div style={{ marginBottom: "24px" }}>
        <h1>Responses</h1>
        <hr style={{ border: "1px solid #ddd", margin: "8px 0" }} />
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: "50px", minHeight: "500px" }}>
          <Spin size="large" />
        </div>
      ) : responsesData.length === 0 ? (
        <Empty
          description={<span>No Responses Available</span>}
          style={{ textAlign: "center", marginTop: "20vh" }}
        />
      ) : (
        <Row gutter={16} justify="center">
          {sortedResponses.map((data, index) => (
            <ResponseCard
              key={index}
              data={data}
              buttonTexts={{ Order: "Order", Contact: "Contact" }}
              onOrderSuccess={handleRemoveResponse} // Pass the removal handler to each ResponseCard
            />
          ))}
        </Row>
      )}
    </Card>
  );
};
