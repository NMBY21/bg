import React, { Component,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { updateBrand, fetchBrand } from "store/slices/BrandSlice";
import MediaComponent from 'components/components/MediaComponent';
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const BrandEdit = (props) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [formVisible, setFormVisible] = useState(false);
  const [imageId, setImageId] = useState(null);
	const handleSubmit = (values) => {
	var payload={
			"id":props.data.id,
            "brandName": values.brandName,
			"slug": values.slug,
			"imageId": props.data.imageId,
		 
		}
        var Fetchpayload = {
			pageSize: 10,
			pageNumber: 1,
		  };
		  if (imageId != null) {
			payload.imageId = imageId;
		  }
		 dispatch(updateBrand(payload)).unwrap().then(() => dispatch(fetchBrand(Fetchpayload)).unwrap())
		 props.close()
         props?.callbackFn()
		 form.resetFields();
	}
	const showForm = () => {
		setFormVisible(true);
	  };
	
	  const closeForm = () => {
		setFormVisible(false);
	  };
	
	return (<>
		<Drawer
			width={350}
			placement="right"
			onClose={props.close}
			closable={true}
			open={props.visible}
		>

			<div className="">

				<h3 className="mt-2 mb-0">Update Brand</h3>
			</div>
			<Divider dashed />
			<Form form={form}
				onFinish={handleSubmit}
				layout="vertical"
				name="brand"
				initialValues={props.data}
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
                  <Button
                    onClick={(e) => showForm()}
                    style={{ float: "center", width: "100%" }}
                  >
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
            setter={setImageId}
          
          />
        )}
		</Drawer>
	</>)
};

export default BrandEdit
