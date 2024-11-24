import React, { useState,Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row, message } from 'antd';
import { createBrand, fetchBrand } from "store/slices/BrandSlice";
import MediaComponent from 'components/components/MediaComponent';
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 16 },
};

const { Option } = Select;

const BrandForm = (props) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [formVisible, setFormVisible] = useState(false);
	const [imageId,setImageid] =useState(null);

	const showForm = () => {
		setFormVisible(true);
	  };
	
	  const closeForm = () => {
		setFormVisible(false);
	  };

	  
	const handleSubmit = (values) => {
	var payload={
			"brandName": values.brandName,
			"slug": values.slug,
			"imageId": null,
		 
		}
		var Fetchpayload = {
			pageSize: 10,
			pageNumber: 1,
		  };
		  if(imageId==null){
			message.warning("Please select an image")
				}else{
	payload.imageId=imageId;
		dispatch(createBrand(payload)).unwrap().then(() => dispatch(fetchBrand(Fetchpayload)).unwrap())
		props.close()
		props?.callbackFn()
		form.resetFields();}
	}

	return (<>
		<Drawer
			width={350}
			placement="right"
			onClose={props.close}
			closable={true}
			open={props.visible}
		>

			<div className="">

				<h3 className="mt-2 mb-0">Add Brand</h3>
			</div>
			<Divider dashed />
			<Form form={form}
				onFinish={handleSubmit}
				layout="vertical"
				name="brand"
			>
				<Row gutter={16}>
					 <Col xs={24} sm={24} md={24}>
						<Form.Item name="brandName" label="Brand Name" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Form.Item name="slug" label="Slugs" >
							<Input />
						</Form.Item>
					</Col>

					<Col sm={24} md={24} xl={21} xs={24} xxl={24}>
              <Form.Item>
                <Button  onClick={(e) => showForm()} style={{ float: "center", width: "100%" }}>
                  Select Image
                </Button>
              </Form.Item>
            </Col>

					<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
							Submit
						</Button>
					</Form.Item>

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
	</>)
};

export default BrandForm
