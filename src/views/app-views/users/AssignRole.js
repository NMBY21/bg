import React, { Component, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { createUser, fetchUser,AssignUserRole } from "store/slices/UserSlice";
import { fetchClient } from "store/slices/ClientSlice";
import { fetchRole } from "store/slices/RoleSlice";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const AssignRole = (props) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const clientValue = useSelector(state => state.client)
	const roleValue = useSelector(state => state.role)
	useEffect(() => {
		fetch();
	}, [])

	const fetch = () => {
		dispatch(fetchClient(2));
	}
	const handleSubmit = (values) => {
		 var payload={
		 		"id": props.data.id,
				"roleid": values.roleId,
 	}
		 	dispatch(AssignUserRole(payload)).unwrap().then(() => dispatch(fetchUser()).unwrap())
		props.close()
		form.resetFields();
	}
	const handleClientChange=(value)=>{
		var payload={
		"clientid":value,
		"status":2
		}
		dispatch(fetchRole(payload));
	
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

				<h3 className="mt-2 mb-0">Assign Role</h3>
				<p>
					
				<span className=" text-dark">Current Role: {props.data?.roles.length==0 ? "NONE" : props.data?.roles[0].role.name}</span>
					</p>
			</div>
			<Divider dashed />
			<Form form={form}
			 onFinish={handleSubmit}
				layout="vertical"
				name="user"
			>
				<Row gutter={16}>
					<Col xs={24} sm={24} md={24}>
						<Form.Item name="clientId" label="Select Client" >
							<Select
								className="w-100"
								placeholder="Select client"
								onChange={handleClientChange} >
								{clientValue.Clients?.map(elm => (
										<Option key={elm.id} value={elm.id}>{elm.clientName}</Option>
									))}
							</Select>
						</Form.Item>
					</Col>

					<Col xs={24} sm={24} md={24}>
						<Form.Item name="roleId" label="Select Role" >
							<Select
								className="w-100"
								placeholder="Select Role"
								disabled={roleValue.Roles.length==0}
								>

								{
									roleValue.Roles?.map(role => (
										<Option key={role.id} value={role.id}>{role.name}</Option>
									))
								}
							</Select>
						</Form.Item>
					</Col>
					{/* {...tailLayout} */}
					<Form.Item >
						<Button type="primary" htmlType="submit" disabled={roleValue.Roles.length==0}>
							Submit
						</Button>
					</Form.Item>

				</Row>
			</Form>
		</Drawer>
	</>)
};

export default AssignRole
