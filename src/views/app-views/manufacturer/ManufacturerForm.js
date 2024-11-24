import React, { Component, useEffect ,useState} from "react";
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
  Tabs,
  Space,
  notification,
  message,
} from "antd";
import { forEach, remove } from "lodash";
import {
  createManufacturer,
  fetchManufacturer,
} from "store/slices/ManufacturerSlice";
import { fetchLanguage } from "store/slices/LanguageSlice";
import { fetchManufacturerSelectList } from "store/slices/ManufacturerSlice";
import MediaComponent from "components/components/MediaComponent";
const { TabPane } = Tabs;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

const { Option } = Select;
const { TextArea } = Input;

const ManufacturerForm = (props) => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [imageId,setImageid] =useState(null);
  const language = useSelector((state) => state.language);
  const manufacturerListValue = useSelector((state) => state.manufacturer);
  useEffect(() => {
    var payload = {
      pageSize: 0,
      pageNumber: 0,
    };
    fetch(payload);
  }, []);

  const fetch = (payload) => {
    dispatch(fetchLanguage());
    dispatch(fetchManufacturerSelectList(payload));
  };

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };


  const [form] = Form.useForm();
  const staticValue = [{ manufacturerName: null, description: null }];
  function constructs(obj) {
    console.log(obj);
    let manufacturerDescription = [];

    for (const key in obj) {
      if (key != "Image") {
        let manuD = {
          languageId: key,
          manufacturerName: obj[key][0]?.manufacturerName,
          description: obj[key][0]?.description,
        };
        if (manuD?.manufacturerName != null && manuD?.description != null) {  
          manufacturerDescription.push(manuD);
        }
      }
    }

    return manufacturerDescription;
  }
  const buildPayload = (values) => {
  
      var payload = {
        manufacturerDescription: constructs(values),
        imageId: 1,
      };
    return payload;
    
  
  };

  const handleSubmit = (values) => {
    form.validateFields().then((values) => {
      var payload = buildPayload(values);
      var Fetchpayload = {
        pageSize: 10,
        pageNumber: 1,
      };

      if(imageId==null){
        message.warning("Please select an image")
            }else{
payload.imageId=imageId;
      dispatch(createManufacturer(payload))
        .unwrap()
        .then(() => dispatch(fetchManufacturer(Fetchpayload)).unwrap());
      props.close();
      props?.callbackFn();
      form.resetFields();}
    });
  };

  return (
    <>
      <Drawer
        width={500}
        placement="right"
        onClose={props.close}
        closable={true}
        open={props.visible}
      >
        <div className="">
          <h3 className="mt-2 mb-0">Add Manufacturer</h3>
        </div>
        <Divider dashed />
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          name="manufacturer"
        >
          <Row gutter={16}>
            <Col sm={24} md={24}>
              <Tabs defaultActiveKey="1" >
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
                                    <Col
                                      sm={24}
                                      md={24}
                                      xl={21}
                                      xs={24}
                                      xxl={24}
                                    >
                                      <Form.Item
                                        label={`Name in ${item.languageName}`}
                                        {...field}
                                        name={[field.name, "manufacturerName"]}
                                        fieldKey={[
                                          field.fieldKey,
                                          "manufacturerName",
                                        ]}
                                        key={field.key}
                                        rules={
                                          item.id == 1
                                            ? [
                                                {
                                                  required: true,
                                                  message:
                                                    "Manufacturer Name is required",
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
                                          placeholder={`Manufacturer Name in ${item.languageName}`}
                                        />
                                      </Form.Item>
                                    </Col>

                                    <Col
                                      sm={24}
                                      md={24}
                                      xl={21}
                                      xs={24}
                                      xxl={24}
                                    >
                                      <Form.Item
                                        label={`Description in ${item.languageName}`}
                                        {...field}
                                        name={[field.name, "description"]}
                                        fieldKey={[
                                          field.fieldKey,
                                          "description",
                                        ]}
                                        key={field.key}
                                        rules={
                                          item.id == 1
                                            ? [
                                                {
                                                  required: true,
                                                  message:
                                                    "Manufacturer Description is required",
                                                },
                                              ]
                                            : null
                                        }
                                      >
                                        <TextArea
                                          style={{
                                            float: "center",
                                            width: "100%",
                                          }}
                                          allowClear
                                          placeholder={`Manufacturer Description in ${item.languageName}`}
                                        />
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

            <Col sm={24} md={24} xl={21} xs={24} xxl={24}>
              <Form.Item>
                <Button  onClick={(e) => showForm()} style={{ float: "center", width: "100%" }}>
                  Select Image
                </Button>
              </Form.Item>
            </Col>

            <Col sm={24} md={24} xl={21} xs={24} xxl={24}>
              <Form.Item>
                <Button 
                  type="primary"
                  htmlType="submit"
                  style={{ float: "right", width: "150px" }}
                >
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

{formVisible && (
          <MediaComponent
            visible={formVisible}
            close={() => {
              closeForm();
            }}
            setter={setImageid}
          />
        )}
      </Drawer>
    </>
  );
};

export default ManufacturerForm;
