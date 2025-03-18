import { useCallback, useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Button, Divider, Image, Space, Table, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';
import { BaseApiService } from '../utils/BaseApiService';
import { images } from '../assets/assets';



const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);


const PropertyList = () => {

    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProperties = useCallback(async () => {
        const searchParameters = { offset: 0, limit: 100 };
        try {
            setLoading(true);
            const response = await new BaseApiService("/properties")
                .getRequestWithJsonResponse(searchParameters);
            console.log("API Response:", response);
            setProperties(response.map(prop => ({ ...prop, key: prop.id })));
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);

    const handleDelete = async (propertyId) => {
        try {
            await new BaseApiService(`/properties/${propertyId}`).deleteRequest();
            setProperties(prev => prev.filter(prop => prop.id !== propertyId));
        } catch (error) {
            setError(error.message);
        }
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'images',
            key: 'image',
            render: (_, record) => (
                <Image
                    width={50}
                    height={50}
                    src={record.images?.path?.[0] || images.defaultProperty}
                    // alt="Property"
                    onError={(e) => {
                        e.target.src = images.defaultProperty;
                        e.target.alt = "Fallback property image";
                    }}
                    style={{ borderRadius: 4 }}
                />
            ),
        },
        {
            title: 'Property Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => <a>{record.propertyName}</a>,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            filters: [
                { text: 'Hotel', value: 'Hotel' },
                { text: 'Hostel', value: 'Hostel' },
                { text: 'Apartment', value: 'Apartment' },
            ],
            onFilter: (value, record) => record.type.indexOf(value) === 0,
            sorter: (a, b) => a.type.localeCompare(b.type),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Country',
            dataIndex: 'countryName',
            key: 'country',
            // filters: [
            //     { text: 'USA', value: 'USA' },
            //     { text: 'Canada', value: 'Canada' },
            //     { text: 'UK', value: 'UK' },
            //     { text: 'Germany', value: 'Germany' },
            // ],
            // onFilter: (value, record) => record.country.indexOf(value) === 0,
            // sorter: (a, b) => a.country.localeCompare(b.country),
            // sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Availability',
            key: 'availabilityStatus',
            dataIndex: 'availabilityStatus',
            // render: (record) => {
            //     let color = record.availabilityStatus === 'available' ? 'geekblue' : 'red';
            //     return (
            //         <Tag color={color}>
            //             {record.availabilityStatus.toCamelCase()}
            //         </Tag>
            //     );
            // },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        aria-label="Edit Property"
                        title="Edit Property"
                        icon={<EditOutlined />}
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
                        aria-label="Delete Property"
                        title="Delete Property"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
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

    return (
        <>
            <div>
                <Divider orientation="left" style={{
                    borderColor: '#fdb10e',
                }} >
                    <h2>My Property List</h2>
                </Divider>
                {error && <div style={{ color: 'red', marginBottom: 16 }}>Error: {error}</div>}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 200, marginBottom: 30 }}>
                    <Search placeholder="search property..." onSearch={onSearch} enterButton />
                    <Link to="add-new">
                        <Button type='primary' style={{ padding: "0 30px", marginRight: 20, backgroundColor: '#111241', height: 40 }}> <PlusOutlined /> Add New Property </Button>
                    </Link>
                </div>
                <Table
                    columns={columns}
                    dataSource={properties}
                    loading={loading}
                    onChange={onChange}
                />
            </div >
        </>
    )
}

export default PropertyList
