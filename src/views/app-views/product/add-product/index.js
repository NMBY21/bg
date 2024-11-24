import React, { Component, useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Steps, Button, Form, Input, Card, Row, Col, Tabs, Space } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import { fetchLanguage } from "store/slices/LanguageSlice";
import TabPane from "antd/es/tabs/TabPane";
import TextArea from "antd/es/input/TextArea";
import TextEditor from "components/components/TextEditor";
import ImageSelector from "components/components/ImageSelector";
const { Step } = Steps;

const ProductStep = ({ form, onValuesChange, language, staticValue }) => (
  <Form form={form} onValuesChange={onValuesChange} layout="vertical">
    <Row gutter={16}>
     
     
      <Col  xs={16} sm={16} md={16}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Card>
          <Col sm={24} md={24}>
            <Form.Item name="product" label="Product Name">
              <Input />
            </Form.Item>
            <Tabs defaultActiveKey="1">
              {language.Languages.map((item, index) => {
                return (
                  <TabPane
                    name={item.languageName}
                    tab={item.languageName}
                    key={item.id}
                    forceRender
                  >
                    <Form.List name={item.id} initialValue={staticValue}>
                      {(fields, { add, remove }) => {
                        return (
                          <div>
                            {fields.map((field) => (
                              <Space
                                key={field.key}
                                style={{ display: "flex", marginBottom: 8 }}
                                align="left"
                              >
                                <Row gutter={16}>
                                  <Col sm={24} md={24} xl={21} xs={24} xxl={24}>
                                    <Form.Item
                                      label={`Name in ${item.languageName}`}
                                      {...field}
                                      name={[field.name, "productName"]}
                                      fieldKey={[field.fieldKey, "productName"]}
                                      key={field.key}
                                      rules={
                                        item.id == 1
                                          ? [
                                              {
                                                required: true,
                                                message:
                                                  "Product Name is required",
                                              },
                                            ]
                                          : null
                                      }
                                    >
                                      <Input
                                        style={{
                                          float: "center",
                                          width: "100%",
                                        }}
                                        allowClear
                                        placeholder={`Product Name in ${item.languageName}`}
                                      />
                                    </Form.Item>
                                  </Col>

                                  <Col sm={24} md={24} xl={21} xs={24} xxl={24}>
                                    <Form.Item
                                      label={`Description in ${item.languageName}`}
                                      {...field}
                                      name={[field.name, "description"]}
                                      fieldKey={[field.fieldKey, "description"]}
                                      key={field.key}
                                      rules={
                                        item.id == 1
                                          ? [
                                              {
                                                required: true,
                                                message:
                                                  "Product Description is required",
                                              },
                                            ]
                                          : null
                                      }
                                    >
                                      <TextEditor />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Space>
                            ))}
                          </div>
                        );
                      }}
                    </Form.List>
                  </TabPane>
                );
              })}
            </Tabs>
          </Col>
        </Card>
        <div style={{ flex: 1 }}></div> {/* Empty div for equal height */}
        </div>
      </Col>

      <Col xs={8} sm={8} md={8}>
      
        <Card style={{ height: "96%" }}>
          {/* image card */}
          <Row gutter={12}>
            <Col xs={24} sm={24} md={24}>
              <ImageSelector />
            </Col>
          </Row>
        </Card>
        
      </Col>

      <Col xs={16} sm={16} md={16}>
        <Card>
          <Row gutter={12}>
            <Col xs={12} sm={12} md={12}>
              <Form.Item name="product" label="Price">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={12} sm={12} md={12}>
              <Form.Item name="product" label="Old Price">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Form.Item name="product" label="Cost Per Item">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={12} sm={12} md={12}>
              <Form.Item name="product" label="Tax Rate">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={12}>
              <Form.Item name="product" label="Quantity">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={12} sm={12} md={12}>
              <Form.Item name="product" label="Unit of Measure">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={8} sm={8} md={8}>
        <Card>
          <Row gutter={12}>
            <Col xs={24} sm={24} md={24}>
              <Form.Item name="product" label="Category">
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
              <Form.Item name="product" label="Brand">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24}>
              <Form.Item name="product" label="Tags">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  </Form>
);

const VariationStep = ({ form, onValuesChange }) => (
  <Form form={form} onValuesChange={onValuesChange}>
    <Form.Item name="variation1" label="Variation 1">
      <Input />
    </Form.Item>
    <Form.Item name="variation2" label="Variation 2">
      <Input />
    </Form.Item>
  </Form>
);

const AdvancedStep = ({ form, onValuesChange }) => (
  <Form form={form} onValuesChange={onValuesChange}>
    <Form.Item name="advanced1" label="Advanced 1">
      <Input />
    </Form.Item>
    <Form.Item name="advanced2" label="Advanced 2">
      <Input />
    </Form.Item>
  </Form>
);

const steps = [
  {
    title: "Product",
    content: ProductStep,
  },
  {
    title: "Variation",
    content: VariationStep,
  },
  {
    title: "Advanced",
    content: AdvancedStep,
  },
];

const AddProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const language = useSelector((state) => state.language);
  const staticValue = [{ productName: null, description: null }];
  const dispatch = useDispatch();
  useEffect(() => {
    fetch();
  }, []);

  const fetch = () => {
    dispatch(fetchLanguage());
  };

  const handleNext = () => {
    form.validateFields().then((values) => {
      setFormData({ ...formData, ...values });
      setCurrentStep(currentStep + 1);
    });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      const finalFormData = { ...formData, ...values };
      // Handle the final data as per your requirement
      console.log(finalFormData);
      // Redirect or perform any other action
      navigate("/success");
    });
  };

  const handleFormValuesChange = (_, allValues) => {
    setFormData({ ...formData, ...allValues });
  };

  return (
    <>
      {/* <Form
      layout="vertical"
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"

    > */}
      <PageHeaderAlt className="border-bottom">
        <div className="container-fluid">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            className="py-4"
          >
            <h2>Add Product</h2>
            <div>
              <Button className="ml-2">
                {/* <PlusOutlined /> */}
                <span>Cancel</span>
              </Button>
            </div>
          </Flex>
        </div>
      </PageHeaderAlt>

      <div className="my-4">
        <Card style={{ backgroundColor: "transparent" }}>
          <div>
            <Steps current={currentStep}>
              {steps.map((step) => (
                <Step key={step.title} title={step.title} />
              ))}
            </Steps>
          </div>
          <div style={{ marginTop: "24px" }}>
            <div>
              {React.createElement(steps[currentStep].content, {
                form,
                onValuesChange: handleFormValuesChange,
                language,
                staticValue,
              })}
            </div>
            <div>
              {currentStep > 0 && (
                <Button style={{ marginRight: "8px" }} onClick={handlePrev}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={handleNext}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button type="primary" onClick={handleFinish}>
                  Finish
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
      {/* </Form> */}
    </>
  );
};

export default AddProduct;
