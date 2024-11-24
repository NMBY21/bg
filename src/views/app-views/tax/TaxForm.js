import React, { useState, Component } from "react";
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
import { createTax, fetchTax } from "store/slices/TaxSlice";
import MediaComponent from "components/components/MediaComponent";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const { Option } = Select;

const TaxForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formVisible, setFormVisible] = useState(false);
  const [taxTypeID, settaxTypeID] = useState(1);

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };
  function handleChange(value) {
    settaxTypeID(value.value)
  }
  const handleSubmit = (values) => {
    var payload = {
        tAxName: values.tAxName,
        category: taxTypeID,
        code:values.code,
        taxAmount:values.taxAmount
    };
    var Fetchpayload = {
      pageSize: 10,
      pageNumber: 1,
    };

    dispatch(createTax(payload))
      .unwrap()
      .then(() => dispatch(fetchTax(Fetchpayload)).unwrap());
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
          <h3 className="mt-2 mb-0">Add Tax</h3>
        </div>
        <Divider dashed />
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          name="tax"
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="tAxName"
                label="Tax Name"
                rules={[
                  {
                    required: true,
                    message: "Tax Name is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="code"
                label="Tax Code"
                rules={[
                  {
                    required: true,
                    message: "Tax Code is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="category"
                label="Tax Category" >
                <Select labelInValue defaultValue={1}  onChange={handleChange}>
                  <Option value={1}>Sales</Option>
                  <Option value={2}>Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="taxAmount"
                label="Tax Amount"
                
                rules={[
                  {
                    required: true,
                    message: "Tax Amount is required",
                  },
                ]}
              >
                <Input type="number" />
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

export default TaxForm;
