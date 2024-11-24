import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { createUser, fetchUser } from "store/slices/UserSlice";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const UserForm = (props) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const handleSubmit = (values) => {
	var payload={
			"username": values.userName,
			"email": values.email,
			"firstName": values.firstName,
			"lastName": values.lastName,
			"password": values.password,
			"isSuperAdmin":values.isSuperAdmin,
			"isAccountLocked": false,
			"phoneNumber": values.phoneNumber
		 
		}
		dispatch(createUser(payload)).unwrap().then(() => dispatch(fetchUser()).unwrap())
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

				<h3 className="mt-2 mb-0">Add User</h3>
			</div>
			<Divider dashed />
			<Form form={form}
				onFinish={handleSubmit}
				layout="vertical"
				name="user"
			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24}>
						<Form.Item name="userName" label="Username" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={12} md={12}>
						<Form.Item name="firstName" label="Firstname" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={12} md={12}>
						<Form.Item name="lastName" label="Lastname" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Form.Item name="email" label="email" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Form.Item name="phoneNumber" label="Phone" >
							<Input />
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Form.Item
							label="Password"
							name="password"
							rules={[{ required: true, message: 'Please input your password!' }]}
						>
							<Input.Password />
						</Form.Item>
					</Col>


					<Col xs={24} sm={24} md={24}>
						<Form.Item label="Is SuperAdmin" name="isSuperAdmin" >
							<Select defaultValue={false}  >
								<Option value={true}>YES</Option>
								<Option value={false}>NO</Option>
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
	</>)
};

export default UserForm
