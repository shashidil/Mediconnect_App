import React, { useState } from 'react';
import { Card, DatePicker, Button, message, Empty, Table, Spin, notification, Input, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { GetOrdersByDateRange } from '../../services/api/ReportsAPI';
import { SearchOutlined } from "@ant-design/icons";
import * as XLSX from 'xlsx';

const { RangePicker } = DatePicker;
const disableFutureDates = (current: Dayjs) => {
    return current && current > dayjs().endOf('day');
};

export const Reports: React.FC = () => {
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [ordersData, setOrdersData] = useState<any[]>([]); // Use appropriate typing for your data structure
    const [loading, setLoading] = useState(false);
    const [isDataAvailable, setIsDataAvailable] = useState(false);

    const onDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
        setDateRange(dates);
    };

    const getReports = async () => {
        if (!dateRange || !dateRange[0] || !dateRange[1]) {
            message.warning('Please select a valid date range.');
            return;
        }

        const [startDate, endDate] = dateRange;
        const fromDate = startDate.startOf('day').toISOString();
        const toDate = endDate.endOf('day').toISOString();

        setLoading(true); // Show spinner while fetching data

        try {
            const response = await GetOrdersByDateRange(fromDate, toDate);
            setOrdersData(response);

            if (response.length === 0) {
                setIsDataAvailable(false);
                notification.info({
                    message: 'No Reports Found',
                    description: 'No reports found for the selected date range.',
                });
            } else {
                setIsDataAvailable(true);
            }
        } catch (error) {
            notification.error({
                message: 'Failed',
                description: 'Failed to fetch reports. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = !dateRange || !dateRange[0] || !dateRange[1];

    const handleSearch = (selectedKeys: React.Key[], confirm: () => void, dataIndex: string) => {
        confirm();
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex: string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => (
            <div style={{ padding: 8 }}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value: any, record: any) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    });

    const columns = [
        {
            title: 'Order Number',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
            ...getColumnSearchProps('orderNumber'),
        },
        {
            title: 'Order Status',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            ...getColumnSearchProps('orderStatus'),
        },
        {
            title: 'Payment Status',
            dataIndex: 'paymentStatus',
            key: 'paymentStatus',
            ...getColumnSearchProps('paymentStatus'),
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            ...getColumnSearchProps('totalAmount'),
            render: (amount: number) =>
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount) // Format as currency
        },
        {
            title: 'Order Date',
            dataIndex: 'orderDate',
            key: 'orderDate',
            ...getColumnSearchProps('orderDate'),
            render: (date: string) => new Date(date).toLocaleString(), // Format date as needed
        },
    ];

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(ordersData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Reports');
        XLSX.writeFile(wb, 'reports.xlsx');
    };

    return (
        <Card style={{ minHeight: '85vh' }}>
            <h1>Reports</h1>
            <hr style={{ border: '1px solid #ddd', margin: '8px 0 40px 0' }} />
            {!isDataAvailable && <h3 style={{ textAlign: 'left' }}>Select Date Range for Reports...</h3>}

            <RangePicker
                disabledDate={disableFutureDates}
                onChange={onDateChange}
                style={{ width: '100%' }}
            />
            <Button
                type="primary"
                onClick={getReports}
                disabled={isButtonDisabled}
                style={{ marginTop: '16px' }}
                loading={loading}
            >
                Get Reports
            </Button>
            {isDataAvailable && (
                <Button
                    type="default"
                    onClick={downloadExcel}
                    style={{ marginTop: '16px', marginLeft: '16px' }}
                >
                    Download Excel
                </Button>
            )}
            <div style={{ margin: '10% 0%' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px', minHeight: '500px' }}>
                        <Spin size="large" />
                    </div>
                ) : ordersData.length > 0 ? (
                    <>
                        <div style={{ textAlign: 'left', fontWeight: 'bolder' }}>Total Records: {ordersData.length}</div>
                        <Table
                            dataSource={ordersData}
                            columns={columns}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                        />
                    </>
                ) : (
                    <Empty description={false} />
                )}
            </div>
        </Card>
    );
};
