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
import { createLookup, fetchLookup } from "store/slices/LookupSlice";
import MediaComponent from "components/components/MediaComponent";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const { Option } = Select;

const LookupForm = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formVisible, setFormVisible] = useState(false);
  const [lookupTypeID, setlookupTypeID] = useState(1);

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };
  function handleChange(value) {
    setlookupTypeID(value.value)
  }
  const handleSubmit = (values) => {
    var payload = {
      lookupName: values.lookupName,
      lookupType: lookupTypeID,
    };
    var Fetchpayload = {
      pageSize: 10,
      pageNumber: 1,
    };

    dispatch(createLookup(payload))
      .unwrap()
      .then(() => dispatch(fetchLookup(Fetchpayload)).unwrap());
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
          <h3 className="mt-2 mb-0">Add Lookup</h3>
        </div>
        <Divider dashed />
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          name="lookup"
        >
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="lookupName"
                label="Lookup Name"
                rules={[
                  {
                    required: true,
                    message: "Lookup Name is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              <Form.Item
                name="lookupType"
                label="Lookup Type" >
                <Select labelInValue defaultValue={1}  onChange={handleChange}>
                  <Option value={1}>Size</Option>
                  <Option value={2}>Color</Option>
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

export default LookupForm;
