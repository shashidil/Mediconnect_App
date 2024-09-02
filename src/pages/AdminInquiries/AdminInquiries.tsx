import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Dropdown,
    Empty,
    Input,
    Menu,
    notification,
    Popconfirm,
    Space,
    Spin,
    Table,
    Tabs,
    Tag
} from "antd";
import { GetPharmacistInquiries, GetUserInquiries, UpdateInquiryStatus } from "../../services/api/InquiresAPI";
import { EllipsisOutlined, MessageOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import TabPane from "antd/es/tabs/TabPane";

interface InquiryResponseDTO {
    id: number;
    subject: string;
    message: string;
    status: string;
    senderId: number;
    senderName: string;
    createdDate: string;
    lastUpdated: string;
}

export const AdminInquiries: React.FC = () => {
    const [userInquiries, setUserInquiries] = useState<InquiryResponseDTO[]>([]);
    const [pharmacistInquiries, setPharmacistInquiries] = useState<InquiryResponseDTO[]>([]);
    const [loadingUser, setLoadingUser] = useState<boolean>(true);
    const [loadingPharmacist, setLoadingPharmacist] = useState<boolean>(true);
    const navigate = useNavigate();

    const fetchUserInquiries = async () => {
        try {
            const data = await GetUserInquiries();
            setUserInquiries(data);
        } catch (error) {
            console.error("Error fetching user inquiries:", error);
        } finally {
            setLoadingUser(false);
        }
    };

    const fetchPharmacistInquiries = async () => {
        try {
            const data = await GetPharmacistInquiries();
            setPharmacistInquiries(data);
        } catch (error) {
            console.error("Error fetching pharmacist inquiries:", error);
        } finally {
            setLoadingPharmacist(false);
        }
    };

    useEffect(() => {
        fetchUserInquiries();
        fetchPharmacistInquiries();
    }, []);

    const paginationConfig = {
        pageSize: 5
    };

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

    // Function to handle status change
    const handleChangeStatus = async (record: InquiryResponseDTO, newStatus: string) => {
        setLoadingUser(true);
        setLoadingPharmacist(true);
        try {
            const userId = localStorage.getItem('userId');
            if (userId) {
                await UpdateInquiryStatus(record.id, newStatus);
                notification.success({
                    message: 'Update Successful',
                    description: 'The inquiry state has been updated successfully.',
                });

                // Fetch updated inquiries
                await fetchUserInquiries();
                await fetchPharmacistInquiries();
            }
        } catch (error) {
            console.error('Failed to update state:', error);
            notification.error({
                message: 'Update Failed',
                description: 'Failed to update state. Please try again.',
            });
        } finally {
            setLoadingUser(false);
            setLoadingPharmacist(false);
        }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'senderName',
            key: 'senderName',
            ...getColumnSearchProps('senderName'),
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            ...getColumnSearchProps('subject'),
        },
        {
            title: 'Message',
            dataIndex: 'message',
            key: 'message',
            ...getColumnSearchProps('message'),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'yellow';
                if (status === 'Resolved') {
                    color = 'green';
                } else if (status === 'OnProgress') {
                    color = 'blue';
                } else if (status === 'Pending') {
                    color = 'volcano';
                }
                return <Tag color={color}>{status.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Created Date',
            dataIndex: 'createdDate',
            key: 'createdDate',
            render: (date: string) => dayjs(date).format('DD MMM YYYY, HH:mm:ss'),
        },
        {
            title: 'Last Updated',
            dataIndex: 'lastUpdated',
            key: 'lastUpdated',
            render: (date: string) => dayjs(date).format('DD MMM YYYY, HH:mm:ss'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: InquiryResponseDTO) => {
                return (
                    <Space size="middle">
                        <Button
                            type="text"
                            icon={<MessageOutlined />}
                            onClick={() => navigate('/admin/chat', { state: { name: record.senderName, id: record.senderId } })}
                        />
                        <Dropdown
                            overlay={
                                <Menu>
                                    {record.status === "Pending" && (
                                        <>
                                            <Menu.Item key="onProgress">
                                                <Popconfirm
                                                    title="Are you sure to change state?"
                                                    onConfirm={() =>
                                                        handleChangeStatus(record, "OnProgress")
                                                    }
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button type="link">Investigate</Button>
                                                </Popconfirm>
                                            </Menu.Item>
                                            <Menu.Item key="resolved">
                                                <Popconfirm
                                                    title="Are you sure to change state?"
                                                    onConfirm={() =>
                                                        handleChangeStatus(record, "Resolved")
                                                    }
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button type="link">Resolve</Button>
                                                </Popconfirm>
                                            </Menu.Item>
                                        </>
                                    )}
                                    {record.status === "OnProgress" && (
                                        <Menu.Item key="resolved">
                                            <Popconfirm
                                                title="Are you sure to change state?"
                                                onConfirm={() => handleChangeStatus(record, "Resolved")}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button type="link">Resolve</Button>
                                            </Popconfirm>
                                        </Menu.Item>
                                    )}
                                </Menu>
                            }
                            placement="bottomLeft"
                            trigger={["click"]}
                        >
                            {record.status !== "Resolved" ? (
                                <Button type="text" icon={<EllipsisOutlined />} />
                            ) : (
                                <></>
                            )}
                        </Dropdown>
                    </Space>
                );
            },
        },
    ];

    return (
        <Card style={{ minHeight: '85vh' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1>Inquiries</h1>
                <hr style={{ border: '1px solid #ddd', margin: '8px 0' }} />
            </div>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Patient Inquiries" key="1">
                    <Card title="Patient Inquiries" style={{ textAlign: 'left' }}>
                        {loadingUser ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%'
                            }}>
                                <Spin size="large"/>
                            </div>
                        ) : userInquiries.length > 0 ? (
                            <Table columns={columns} dataSource={userInquiries} pagination={paginationConfig} rowKey="id" />
                        ) : (
                            <Empty description='No user inquiries' />
                        )}
                    </Card>
                </TabPane>
                <TabPane tab="Pharmacist Inquiries" key="2">
                    <Card title="Pharmacist Inquiries" style={{ textAlign: 'left' }}>
                        {loadingPharmacist ? (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%'
                            }}>
                                <Spin size="large"/>
                            </div>
                        ) : pharmacistInquiries.length > 0 ? (
                            <Table columns={columns} dataSource={pharmacistInquiries} pagination={paginationConfig} rowKey="id" />
                        ) : (
                            <Empty description='No pharmacist inquiries' />
                        )}
                    </Card>
                </TabPane>
            </Tabs>
        </Card>
    );
};
