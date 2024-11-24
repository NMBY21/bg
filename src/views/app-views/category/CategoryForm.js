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
  createCategory,
  fetchCategory,
} from "store/slices/CategorySlice";
import { fetchLanguage } from "store/slices/LanguageSlice";
import { fetchCategorySelectList } from "store/slices/CategorySlice";
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

const CategoryForm = (props) => {
  const dispatch = useDispatch();
  const [formVisible, setFormVisible] = useState(false);
  const [imageId,setImageid] =useState(null);
  const language = useSelector((state) => state.language);
  const categoryListValue = useSelector((state) => state.category);
  const [categoryParentID, setcategoryParentID] = useState(0);
  useEffect(() => {
    var payload = {
      pageSize: 0,
      pageNumber: 0,
    };
    fetch(payload);
  }, []);

  function handleParentChange(value) {
    setcategoryParentID(value)
  }

  const fetch = (payload) => {
    dispatch(fetchLanguage());
    dispatch(fetchCategorySelectList());
  };

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };


  const [form] = Form.useForm();
  const staticValue = [{ categoryName: null, description: null }];
  function constructs(obj) {
    console.log(obj);
    let categoryDescription = [];

    for (const key in obj) {
      if (key != "Image") {
        let manuD = {
          languageId: key,
          categoryName: obj[key][0]?.categoryName,
          description: obj[key][0]?.description,
        };
        if (manuD?.categoryName != null && manuD?.description != null) {  
          categoryDescription.push(manuD);
        }
      }
    }

    return categoryDescription;
  }
  const buildPayload = (values) => {
  
      var payload = {
        categoryDescription: constructs(values),
        imageId: 1,
        parentId: categoryParentID,
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
      dispatch(createCategory(payload))
        .unwrap()
        .then(() => dispatch(fetchCategory(Fetchpayload)).unwrap());
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
          <h3 className="mt-2 mb-0">Add Category</h3>
        </div>
        <Divider dashed />
        <Form
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
          name="category"
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
                      style={{width:"100%"}}
                    >
                      <Form.List name={item.id} initialValue={staticValue}>
                        {(fields, { add, remove }) => {
                          return (
                            <div>
                              {fields.map((field) => (
                                // <Space
                                //   key={field.key}
                                //   style={{ display: "flex", marginBottom: 8 }}
                                //   align="left"
                                // >
                                  <Row gutter={16}>
                                    <Col
                                xs={24} sm={24} md={24} lg={24}
                                    >
                                      <Form.Item
                                        label={`Name in ${item.languageName}`}
                                        {...field}
                                        name={[field.name, "categoryName"]}
                                        fieldKey={[
                                          field.fieldKey,
                                          "categoryName",
                                        ]}
                                        key={field.key}
                                        rules={
                                          item.id == 1
                                            ? [
                                                {
                                                  required: true,
                                                  message:
                                                    "Category Name is required",
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
                                          placeholder={`Category Name in ${item.languageName}`}
                                        />
                                      </Form.Item>
                                    </Col>

                                    <Col
                                   xs={24} sm={24} md={24} lg={24}
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
                                                    "Category Description is required",
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
                                          placeholder={`Category Description in ${item.languageName}`}
                                        />
                                      </Form.Item>
                                    </Col>

                                  </Row>
                          //</Space>
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
            <Col xs={24} sm={24} md={24}>
            <Form.Item
              label="Select a Parent"
              name="parentId"
            >
                 <Select
       showSearch
       allowClear

       placeholder="Select a Parent"
       optionFilterProp="children"
       onChange={handleParentChange}
       bordered
       loading={categoryListValue.loadingSelect}
       filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
     >

       {categoryListValue.CategorySelectList?.map(category => (
										<Option value={category?.id} key={category?.id}>{category.categoryDescription[0]?.categoryName}</Option>
									))}
     </Select>
            </Form.Item>
            </Col>
            <Col  xs={24} sm={24} md={24}>
              <Form.Item>
                <Button  onClick={(e) => showForm()} style={{ float: "center", width: "100%" }}>
                  Select Image
                </Button>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={24}>
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

export default CategoryForm;
