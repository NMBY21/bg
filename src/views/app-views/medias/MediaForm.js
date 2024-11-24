import React, { Component,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row ,Upload} from 'antd';
import { createMedia, fetchMedia } from "store/slices/MediasSlice";
import {UploadOutlined
  } from "@ant-design/icons";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 4, span: 16 },
};

const { Option } = Select;

const MediaForm = (props) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [selectedFile, setSelectedFile] = useState(null);

	const handleSubmit = (values) => {	
	const formData = new FormData();
    formData.append("ImageName", values.imageName);
	formData.append("file", selectedFile);
		
		var Fetchpayload = {
			pageSize: 12,
			pageNumber: 1,
		  };
		dispatch(createMedia(formData)).unwrap().then(() => dispatch(fetchMedia(Fetchpayload)).unwrap())
		props.close()
		props?.callbackFn()
		form.resetFields();
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

				<h3 className="mt-2 mb-0">Add Media</h3>
			</div>
			<Divider dashed />
			<Form form={form}
				onFinish={handleSubmit}
				layout="vertical"
				name="media"
			>
				<Row gutter={16}>
					 <Col xs={24} sm={24} md={24}>
						<Form.Item name="imageName" label="Image Name" >
							<Input required />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Form.Item name="file" label="Image" >			
			<Input required  type="file" name='file' id='file' accept='image/*'  value={selectedFile}
         	onChange={(e) => setSelectedFile(e.target.files[0])} />  
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
	</>)
};

export default MediaForm
