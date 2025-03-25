import React, { useEffect, useState } from 'react';
import { Card as AntCard, Row, Col, Button as AntButton, Input, message, Checkbox, Modal, Form, Space, Table } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LayoutNew from '../Layout';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  StockOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import EditForm from './EditItem';
import AddressList from './Address';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

function ItemDetails() {
  const [showDiscounts, setShowDiscounts] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Destructure values and provide default values if undefined
  const { subtotal = 0, discount = 0, total = 0, items } = location.state || {};
  
  const [isNewModalVisible, setIsNewModalVisible] = useState(false);
  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
 
  useEffect(() => {
    if (items) {
      console.log('Subtotal:', subtotal);
      console.log('Discount:', discount);
      console.log('Total:', total);
      console.log('Items:', items);
    }
  }, [subtotal, discount, total, items]);

  
  const getFetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/items/item');
      if (response.data.success) {
        setShowDiscounts(response.data.data);
      }
    } catch (error) {
      message.error('Failed to fetch data');
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/items/item_delete/${id}`);
      if (response.data.success) {
        getFetchData();
        message.success('Item deleted successfully!');
      }
    } catch (error) {
      message.error('Failed to delete item');
    }
  };

  const filterData = (searchKey) => {
    const filteredData = showDiscounts.filter((item) =>
      item && item.emaill.toLowerCase().includes(searchKey.toLowerCase())
    );
    setShowDiscounts(filteredData);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    form.setFieldsValue(item);
    setIsModalVisible(true);
  };

  const handleUpdate = async (values) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/items/item_update`, {
        ...values,
        id: editingItem._id,
      });
      if (response.data.success) {
        message.success('Item updated successfully!');
        setIsModalVisible(false);
        getFetchData();
      }
    } catch (error) {
      message.error('Failed to update item');
    }
  };

  const handleNewModalOpen = () => {
    setIsNewModalVisible(true);
  };

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `Rs ${text}`,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text) => `Rs ${text}`,
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => (
        <img
          src={`http://localhost:3000/Images/${text}`}
          alt="Item"
          style={{
            width: '60px',
            height: '60px',
            objectFit: 'contain',
          }}
        />
      ),
    },
  ];

  return (
    <div>
      <Space
        style={{
          background: '#001529',
          color: 'white',
          padding: '12px',
          borderRadius: '8px',
          justifyContent: 'space-between',
          display: 'flex',
          marginTop:'50px'
        }}
      >
        <Space>
          <StockOutlined style={{ fontSize: '24px', marginRight: '8px', marginTop: '15px' }} />
          <Title level={2} style={{ fontSize: '24px', marginTop: '8px', color: 'white' }}>
            Delivery Details
          </Title>
        </Space>
      </Space>

      <div
        style={{
          marginBottom: '16px',
          display: 'flex',
          justifyContent: 'center', // Center the button
        }}
      >
        <AntButton
          type="primary"
          style={{ color: 'white' }}
          onClick={handleNewModalOpen}
        >
          <EditOutlined /> Select the Delivery Address
        </AntButton>
      </div>

      <Container>
        <ContentContainer>
          <Table
            dataSource={items}
            columns={columns}
            pagination={false}
            rowKey="_id" // Adjust to your unique identifier
            style={{ flexGrow: 1 }}
          />

          <RightBox>
            <h3 style={{ textAlign: 'center' }}>Order Summary</h3>
            {selectedItemDetails && (
              <div style={{ marginLeft: '30px' }}>
                <p><strong>Selected Address:</strong> {selectedItemDetails.emaill}</p>
                <p>Name: {selectedItemDetails.fnamee} {selectedItemDetails.lnamee}</p>
                <p>Address: {selectedItemDetails.address}</p>
                <p>Phone: {selectedItemDetails.p_nbb}</p>
                <p>Zip Code: {selectedItemDetails.zipcode}</p>
              </div>
            )}

            <SummaryCard>
              <p style={{ textAlign: 'right' }}>Subtotal: Rs {subtotal}</p>
              <p style={{ textAlign: 'right' }}>Discount: Rs {discount}</p>
              <div style={{ color: '#06D001', fontWeight: 'bold', textAlign: 'right' }}>
                <p>Total: Rs {total}</p>
              </div>
              <SummaryFooter>
                <AntButton type="primary" style={{ width: '100%' }} onClick={() => navigate('/package')}>
                  Proceed
                </AntButton>
              </SummaryFooter>
            </SummaryCard>
          </RightBox>
        </ContentContainer>

        {/* Modal for Editing Item */}
        <Modal
          title="Edit Item"
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={800}
        >
          <EditForm form={form} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <AntButton
              type="primary"
              onClick={() => {
                form
                  .validateFields()
                  .then((values) => {
                    handleUpdate(values);
                  })
                  .catch((info) => {
                    console.log('Validate Failed:', info);
                  });
              }}
            >
              Submit
            </AntButton>
          </div>
        </Modal>

        {/* New Modal */}
        <Modal
          title="New Modal"
          open={isNewModalVisible}
          onCancel={() => setIsNewModalVisible(false)}
          footer={null}
        >
          <AddressList
            items={showDiscounts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectedCardId={selectedCardId}
            setSelectedCardId={setSelectedCardId}
            searchKey={searchKey} // Pass search key
            setSearchKey={setSearchKey} // Pass setter function
          />
          <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
            <AntButton 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => navigate('/home')} 
              style={{ marginBottom: '12px' }}
            >
              Add New Delivery Address
            </AntButton>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <AntButton onClick={() => setIsNewModalVisible(false)}>Close</AntButton>

            <AntButton 
              type="primary" 
              onClick={() => {
                const selectedItem = showDiscounts.find(item => item._id === selectedCardId);
                if (selectedItem) {
                  setSelectedItemDetails(selectedItem);
                }
                setIsNewModalVisible(false);
              }}
            >
              Confirm Address
            </AntButton>
          </div>
        </Modal>
      </Container>
    </div>
  );
}

export default ItemDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  margin-top: 20px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const RightBox = styled.div`
  width: 300px; /* Adjust the width as needed */
  margin-left: 20px; /* Adjust for spacing */
  padding: 16px;
  background-color: #f9f9f9;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
`;

const SummaryCard = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 16px;
  margin-top: 20px;
`;

const SummaryFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;
