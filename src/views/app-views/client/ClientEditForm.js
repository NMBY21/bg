import React, { Component ,useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { createClient, fetchClient, updateClient } from "store/slices/ClientSlice";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const ClientEditForm = (props) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const [initial, setInitial] = useState(props.data);

	const handleSubmit = (values) => {
	var payload={
		"data":values,
		"id":props.data.id
	  }
		  dispatch(updateClient(payload)).unwrap().then(() => dispatch(fetchClient(2)).unwrap())
		  props.close()
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

				<h3 className="mt-2 mb-0">Update Client</h3>
			</div>
			<Divider dashed />
			<Form form={form}
				onFinish={handleSubmit}
				layout="vertical"
				name="client"
				initialValues={initial}

			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24}>
						<Form.Item name="clientName" label="Client Name" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Form.Item name="description" label="description" >
							<Input />
						</Form.Item>
					</Col>
					<Col xs={24} sm={12} md={12}>
						<Form.Item name="accessTokenLifeTime" label="TokenLifeTime" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={12} md={12}>
						<Form.Item name="refreshTokenLifeTime" label="RefreshTokenLifeTime" >
							<Input />
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

export default ClientEditForm
