// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button, Divider, Space, Table, Tag } from 'antd'
import { CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'Property Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
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
        dataIndex: 'country',
        key: 'country',
        filters: [
            { text: 'USA', value: 'USA' },
            { text: 'Canada', value: 'Canada' },
            { text: 'UK', value: 'UK' },
            { text: 'Germany', value: 'Germany' },
        ],
        onFilter: (value, record) => record.country.indexOf(value) === 0,
        sorter: (a, b) => a.country.localeCompare(b.country),
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Status',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'pending') {
                        color = 'orange';
                    } else if (tag === 'denied') {
                        color = 'red';
                    } else if (tag === 'approved') {
                        color = 'green';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Button
                    aria-label="Approve"
                    title="Approve"
                    icon={<CheckOutlined />}
                    style={{
                        // border: '1px solid #4d7f32',
                        fontSize: '24px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '5px',
                        padding: '0',
                        backgroundColor: '#b8e994',
                        color: '#4d7f32',
                    }}
                />
                <Button
                    aria-label="Deny"
                    title="Deny"
                    icon={<CloseOutlined />}
                    style={{
                        // border: '1px solid #d9534f',
                        fontSize: '24px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '5px',
                        padding: '0',
                        backgroundColor: '#f8d7da',
                        color: '#d9534f',
                    }}
                />
                <Button
                    aria-label="Delete"
                    title="Delete"
                    icon={<DeleteOutlined />}
                    style={{
                        border: '1px solid #6c757d',
                        fontSize: '24px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '5px',
                        padding: '0',
                        backgroundColor: '#d6d8db',
                        color: '#6c757d',
                    }}
                />
            </Space>
        ),
    },
];

const data = [
    // {
    //     key: '1',
    //     name: 'Olympia Hostel',
    //     type: 'Hostel',
    //     country: 'USA',
    //     address: '123 Park Ave, New York',
    //     tags: ['approved'],
    // },


    // Use mapping to populate the data (Recommended)

];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);


const PropertyList = () => {
    return (
        <>
            <div>
                <Divider orientation="left" style={{
                    borderColor: '#fdb10e',
                }} >
                    <h2>Residence List</h2>
                </Divider>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 200, marginBottom: 30 }}>
                    <Search placeholder="search property..." onSearch={onSearch} enterButton />
                    <Link to="add-new">
                        <Button type='primary' style={{ padding: "0 30px", marginRight: 20, backgroundColor:'#111241', height: 40 }}> <PlusOutlined /> Add New Property </Button>
                    </Link>
                </div>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </div >
        </>
    )
}

export default PropertyList
