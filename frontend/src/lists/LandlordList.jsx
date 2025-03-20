// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Divider, Space, Table, Tag, } from 'antd'
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import { BaseApiService } from '../utils/BaseApiService';



const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};




const LandlordList = () => {

    const [landlords, setLandlords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    const fetchLandlords = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await new BaseApiService("/property-owners")
                .getRequestWithJsonResponse({ offset: 0, limit: 100 });

            // Convert object response to array and transform data
            const landlordsArray = Object.values(response).map(owner => ({
                key: owner.id,
                id: owner.id,
                name: `${owner.user.firstName} ${owner.user.lastName}`,
                email: owner.user.primaryEmail,
                contact: owner.user.primaryPhone,
                username: owner.user.userName,
                countryName: owner.user.countryName,
                status: owner.recordStatus,
                roles: owner.user.roles.map(role => role.name),
                dateCreated: owner.dateCreated
            }));

            setLandlords(landlordsArray);

        } catch (error) {
            setError(error.message || 'Failed to fetch property owners');
            console.error('Fetch property owners error:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLandlords();
    }, [fetchLandlords]);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: 'Country',
            dataIndex: 'countryName',
            key: 'countryName',
            sorter: (a, b) => a.countryName.localeCompare(b.countryName),
        },
        {
            title: 'Status',
            key: 'status',
            render: (_, record) => (
                <Tag color={record.status === 'ACTIVE' ? 'green' : 'volcano'}>
                    {record.status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: 'Registration Date',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
            render: (date) => new Date(date).toLocaleDateString(),
            sorter: (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated),
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button
                        aria-label="Approve Account"
                        title="Approve Account"
                        icon={<CheckOutlined />}
                        style={{
                            border: 'none',
                            fontSize: '16px',
                            width: '30px',
                            height: '30px',
                            borderRadius: '5px',
                            padding: '0',
                            backgroundColor: '#d7e9f8',
                            color: '#4fa6d9',
                        }}
                    />
                    <Button
                        aria-label="Deny Account"
                        title="Deny Account"
                        icon={<CloseOutlined />}
                        style={{
                            border: 'none',
                            fontSize: '16px',
                            width: '30px',
                            height: '30px',
                            borderRadius: '5px',
                            padding: '0',
                            backgroundColor: '#f8d7da',
                            color: '#d9534f',
                        }}
                    />
                </Space>
            ),
        },
    ];

    const onSearch = (value) => {
        setSearchTerm(value.trim().toLowerCase());
    };

    const filteredLandlords = landlords.filter(landlord => {
        if (!searchTerm) return true;

        const searchFields = [
            landlord.name,
            landlord.email,
            landlord.countryName,
            landlord.status,
            landlord.roles?.join(' '), // Search in roles array
            new Date(landlord.dateCreated).toLocaleDateString() // Search in formatted date
        ];

        return searchFields.some(field =>
            field?.toLowerCase().includes(searchTerm)
        );
    });


    return (
        <>
            <div>
                <Divider orientation="left" style={{
                    borderColor: '#fdb10e',
                }} >
                    <h2>Landlord Profiles</h2>
                </Divider>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>Error: {error}</div>}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 200, marginBottom: 30 }}>
                    <Search
                        placeholder="Search by name, email, country..."
                        onSearch={onSearch}
                        onChange={(e) => onSearch(e.target.value)} // Optional: search as you type
                        enterButton
                        allowClear
                    />
                    <Link to="add-new">
                        <Button type='primary' style={{ padding: "0 30px", marginRight: 20, backgroundColor: '#111241' }}> <PlusOutlined /> Add New Landlord </Button>
                    </Link>
                </div>
                <Table
                    columns={columns}
                    dataSource={filteredLandlords}
                    loading={loading}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default LandlordList