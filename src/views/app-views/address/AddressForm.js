import React, { useState, Component,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Select,
  Avatar,
  Drawer,
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  Col,
  Row,
  message,
} from "antd";
import { createAddress, fetchAddress } from "store/slices/AddressSlice";
import { fetchAddressForSelect } from "store/slices/AddressSlice";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const { Option } = Select;

const AddressForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formVisible, setFormVisible] = useState(false);
  const [addressTypeID, setaddressTypeID] = useState(1);
  const [addressParentID, setaddressParentID] = useState(null);
  const addressValue = useSelector((state) => state.address);
  
  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    dispatch(fetchAddressForSelect());
  };
  
  const showForm = () => {
    setFormVisible(true);
  };


  const closeForm = () => {
    setFormVisible(false);
  };
  function handleChange(value) {
    setaddressTypeID(value.value)
  }
  function handleParentChange(value) {
    setaddressParentID(value)
  }
  
  const handleSubmit = (values) => {
    var payload = {
      addressName: values.addressName,
      addressType: addressTypeID,
      parentID:addressParentID
    };
    var Fetchpayload = {
      pageSize: 10,
      pageNumber: 1,
    };

    dispatch(createAddress(payload))
      .unwrap()
      .then(() => dispatch(fetchAddress(Fetchpayload)).unwrap());
    props.close();
    props?.callbackFn();
    form.resetFields();
  };

  return (
    <>
      <Drawer
        width={350}
        placement="right"
        onClose={props.close}
        closable={true}
        open={props.visible}
      >
        <div className="">
          <h3 className="mt-2 mb-0">Add Address</h3>
        </div>
        <Divider dashed />
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          name="address"
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="addressName"
                label="Address Name"
                rules={[
                  {
                    required: true,
                    message: "Address Name is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="addressType"
                label="Address Type" >
                <Select labelInValue defaultValue={1}  onChange={handleChange}>
                  <Option value={1}>Country</Option>
                  <Option value={2}>Region</Option>
                  <Option value={3}>City</Option>
                  <Option value={4}>SubCity</Option>
                  <Option value={5}>Kebele</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
            <Form.Item
              label="Select a Parent"
              name="parentID"
            >
                 <Select
       showSearch
       allowClear

       placeholder="Select a Parent"
       optionFilterProp="children"
       onChange={handleParentChange}
       bordered
       loading={addressValue.SelectLoading}
       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
     >

       {addressValue.SelectAddress?.map(address => (
										<Option key={address.id}>{address.addressName}</Option>
									))}
     </Select>
            </Form.Item>
            </Col>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Row>
        </Form>
        
      </Drawer>
    </>
  );
};

export default AddressForm;
