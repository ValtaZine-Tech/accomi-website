// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Button, Divider, Space, Table, Tag } from 'antd'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';

const columns = [
    {
        title: 'Employee Name',
        dataIndex: 'name',
        key: 'name',
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
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
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
                    if (tag === 'in active') {
                        color = 'orange';
                    } else if (tag === 'active') {
                        color = 'green';
                    } else {
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
    //     name: 'Alvan Noah',
    //     email: 'alvannoah@gmail.com',
    //     contact:'+256 778779982',
    //     address: 'Kulambiro, Kampala',
    //     country: 'Uganda',
    //     role: 'Developer',
    //     tags: ['active'],
    // },

    // You know the drill by now hehehe
    
];

const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const onSearch = (value, _e, info) => console.log(info?.source, value);


const EmployeeList = () => {
    return (
        <>
            <div>
                <Divider orientation="left" style={{
                    borderColor: '#fdb10e',
                }} >
                    <h2>Employee Profiles</h2>
                </Divider>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',gap:200,marginBottom:30}}>
                <Search placeholder="search employee..." onSearch={onSearch} enterButton />
                <Button type='primary' style={{padding: "0 30px",marginRight:20, backgroundColor:'#111241'}}> <PlusOutlined/> Add New Employee </Button>
                </div>
                <Table columns={columns} dataSource={data} onChange={onChange} />
            </div>
        </>
    )
}

export default EmployeeList
