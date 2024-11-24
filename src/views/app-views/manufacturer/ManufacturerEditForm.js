import React, { useEffect, useState } from "react";
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
  fetchManufacturerById,
  updateManufacturer,
} from "store/slices/ManufacturerSlice";
import { fetchLanguage } from "store/slices/LanguageSlice";
import { fetchManufacturerSelectList } from "store/slices/ManufacturerSlice";
import MediaComponent from "components/components/MediaComponent";
import Loading from "components/shared-components/Loading";
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

const ManufacturerEditForm = (props) => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [imageId, setImageId] = useState(null);
  const language = useSelector((state) => state.language);
  const manufacturer = useSelector((state) => state.manufacturer);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchManufacturerById(props.data.id));
    dispatch(fetchLanguage());
  }, []);

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const processEditData = (languageId) => {
    const staticValue = [];
    var temp = manufacturer.Manufacturer?.manufacturerDescription?.find(
      (obj) => obj.languageId === languageId
    );
    staticValue.push(temp);
    return staticValue;
  };
  
  useEffect(() => {
    if (manufacturer.Manufacturer) {
      const initialValues = {};
      language.Languages.forEach((item) => {
        initialValues[item.id] = processEditData(item.id);
      });
      form.setFieldsValue(initialValues);
    }
  }, [manufacturer.Manufacturer]);


  function constructs(obj) {
    let manufacturerDescription = [];
    for (const key in obj) {
      if (key !== "Image") {
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
      id: props.data.id,
      data: {
        manufacturerDescription: constructs(values),
        imageId: manufacturer.Manufacturer.imageId,
      },
    };
    return payload;
  };

  const handleSubmit = (values) => {
    form.validateFields().then((values) => {
      var payload = {
        id: props.data.id,
        data: buildPayload(values),
      };

      var Fetchpayload = {
        pageSize: 10,
        pageNumber: 1,
      };

      if (payload.data.data.imageId == null) {
        message.warning("Please select an image");
      } else {
        if (imageId != null) {
          payload.data.data.imageId = imageId;
        }
        dispatch(updateManufacturer(payload))
          .unwrap()
          .then(() => dispatch(fetchManufacturer(Fetchpayload)).unwrap());
        form.resetFields();
      }
      props.close();
      props?.callbackFn();
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
          <h3 className="mt-2 mb-0">Update Manufacturer</h3>
        </div>
        <Divider dashed />
        {!manufacturer.loadingmanufacturer && !language.loading ? (
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            name="manufacturer"
          >
            {console.log(manufacturer.Manufacturer)}
            <Row gutter={16}>
              <Col sm={24} md={24}>
                <Tabs defaultActiveKey="1">
                  {language.Languages.map((item, index) => {
                    return (
                      <TabPane
                        name={item.languageName}
                        tab={item.languageName}
                        key={item.id}
                        forceRender
                      >
                        <Form.List
                          name={item.id}
                          initialValue={processEditData(item.id)}
                        >
                          {(fields, { add, remove }) => {
                            return (
                              <div>
                                {fields.map((field) => (
                                  <Space
                                    key={field.key}
                                    style={{
                                      display: "flex",
                                      marginBottom: 8,
                                    }}
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
                                            item.id === 1
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
                                            item.id === 1
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
                                            rows={8}
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
                  <Button
                    onClick={(e) => showForm()}
                    style={{ float: "center", width: "100%" }}
                  >
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
        ) : (
          <Loading></Loading>
        )}
        {formVisible && (
          <MediaComponent
            visible={formVisible}
            close={() => {
              closeForm();
            }}
            setter={setImageId}
          
          />
        )}
      </Drawer>
    </>
  );
};

export default ManufacturerEditForm;
