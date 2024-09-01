import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, Row, Col, Spin, notification } from 'antd';
import { ApexOptions } from 'apexcharts';
import { GetMonthlyOrderQuantities, GetTopMedicinesForMonth } from "../../services/api/OverviewAPI";

export const Analytics: React.FC = () => {
    // State to store chart data
    const [topSellingMedicines, setTopSellingMedicines] = useState<{
        medicationName: string;
        totalQuantity: number;
    }[]>([]);
    const [monthlyOrders, setMonthlyOrders] = useState<{ year: number; month: number; orderCount: number; }[]>([]);
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const topMedicinesData = await GetTopMedicinesForMonth();
                const monthlyOrdersData = await GetMonthlyOrderQuantities();

                setTopSellingMedicines(topMedicinesData);
                setMonthlyOrders(monthlyOrdersData);
            } catch (error) {
                console.error("Error fetching data for analytics:", error);
                notification.error({
                    message: 'Fetch Error',
                    description: 'Failed to fetch data for analytics. Please try again.',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const topSellingOptions: ApexOptions = {
        chart: {
            type: 'bar',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                }
            }
        },
        xaxis: {
            categories: topSellingMedicines.map(medicine => medicine.medicationName),
        },
        colors: ['#28a745'], // Green color
    };

    const topSellingSeries = [{
        name: 'Total Quantity',
        data: topSellingMedicines.map(medicine => medicine.totalQuantity)
    }];

    const monthlyOrdersOptions: ApexOptions = {
        chart: {
            type: 'line',
            toolbar: {
                show: true,
                tools: {
                    download: true,
                }
            }
        },
        xaxis: {
            categories: monthlyOrders.map(order => `${order.year}-${order.month.toString().padStart(2, '0')}`),
        },
    };

    const monthlyOrdersSeries = [{
        name: 'Order Count',
        data: monthlyOrders.map(order => order.orderCount)
    }];

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '50px', minHeight: '500px' }}>
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Card>
            <h1>Overview</h1>
            <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card title="Top Selling Medicines">
                        <ReactApexChart
                            options={topSellingOptions}
                            series={topSellingSeries}
                            type="bar"
                            height={350}
                        />
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Monthly Order Quantities">
                        <ReactApexChart
                            options={monthlyOrdersOptions}
                            series={monthlyOrdersSeries}
                            type="line"
                            height={350}
                        />
                    </Card>
                </Col>
            </Row>
        </Card>
    );
};
