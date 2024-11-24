import React, { Component,useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { createRole, fetchRole } from "store/slices/RoleSlice";
import { fetchClient } from "store/slices/ClientSlice";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const RoleEdit = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const clientValue = useSelector(state => state.client)

	useEffect(() => {
		fetch();
	}, [])

	const fetch = () => {
		dispatch(fetchClient(2));
	}
	const handleSubmit = (values) => {
		console.log(props)
		var payload={
			"name": values.name,
			"description": values.description,
		}
		var filterpayload={
			"clientid":null,
			"status":2
			}
		//dispatch(createRole(payload)).unwrap().then(() => dispatch(fetchRole(filterpayload)).unwrap())
		//props.close()
		//form.resetFields();
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

				<h3 className="mt-2 mb-0">Update Role</h3>
			</div>
			<Divider dashed />
			<Form
				form={form}
				onFinish={handleSubmit}
				layout="vertical"
				name="client"
				initialValues={props.data}
			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24}>
						<Form.Item name="name" label="Role Name" >
							<Input />
						</Form.Item>
					</Col>

				

					<Col xs={24} sm={24} md={24}>
						<Form.Item  name="description" label="Description" >
							<Input  />
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

export default RoleEdit
