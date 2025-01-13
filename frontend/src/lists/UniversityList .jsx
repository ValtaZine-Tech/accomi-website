// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button, Divider, Space, Table } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { Link } from 'react-router-dom';

const columns = [
    {
        title: 'University Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
        sorter: (a, b) => a.country.localeCompare(b.country),
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sortDirections: ['ascend', 'descend'],
    },
    {
        title: 'Contact',
        dataIndex: 'contact',
        key: 'contact',
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
        title: 'Action',
        key: 'action',
        render: () => (
            <Space size="middle">
                <Button
                    aria-label="Approve"
                    title="Approve"
                    icon={<EditOutlined />}
                    style={{
                        border: '1px solid #94cee9',
                        fontSize: '24px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '5px',
                        padding: '0',
                        backgroundColor: '#94cee9',
                        color: '#32637f',
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
    //     email: 'olympia@gmail.com',
    //     contact: '+256 777734332',
    //     country: 'Uganda',
    //     address: '123 Park Ave, Kampala',
    // },


    // Following the above structure you can populate the table or list

];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};



const onSearch = (value, _e, info) => console.log(info?.source, value);


const UniversityList = () => {
    return (
        <>
            <div>
                <Divider orientation="left" style={{
                    borderColor: '#fdb10e',
                }} >
                    <h2>University List</h2>
                </Divider>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 200, marginBottom: 30 }}>
                    <Search placeholder="search university..." onSearch={onSearch} enterButton />
                    <Link to="add-new">
                        <Button type='primary' style={{ padding: "0 30px", marginRight: 20, backgroundColor:'#111241' }}> <PlusOutlined /> Add New University </Button>
                    </Link>
                </div>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
        </>
    )
}

export default UniversityList
