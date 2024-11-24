import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { fetchClientById } from "store/slices/ClientSlice";
import { fetchRoleById, updateRole, fetchRole } from "store/slices/RoleSlice";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;
const RoleView = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const clientValue = useSelector(state => state.client)
	const rolesList = useSelector(state => state.role)
	useEffect(() => {
		fetch();
	}, [])

	const fetch = () => {
		dispatch(fetchClientById(props.data.clientId));//all client claims
		dispatch(fetchRoleById(props.data.id)); //default
	}
	const handleSubmit = (values) => {

		props.close()
		form.resetFields();
	}

	return (<>
		<Drawer
			width={600}
			placement="right"
			onClose={props.close}
			closable={true}
			open={props.visible}>
			<div className="">
				<h3 className="mt-2 mb-0">View Role</h3>
				<Divider dashed />
					<p>
						
						<span className="ml-3 text-dark">Role Name: {props.data?.name}</span>
					</p>
					
					<p>
						
						<span className="ml-3 text-dark">Description: {props.data?.description}</span>
					</p>
					<p>
						
						<span className="ml-3 text-dark">Client Id: {props.data?.clientId}</span>
					</p>

			</div>
			<Divider dashed />
			<Form form={form}  layout="vertical" name="client" >
				<Row gutter={16}>
					{!clientValue.loadingclaims &&
						<Col className="gutter-row" span={24}>
							<Form.Item
								label="Role Claims"
								name="clientClaims"
								>
								<Select 
								 disabled={true}
								defaultValue={rolesList.Role?.roleClaims?.map(claim => (claim.clientAPIResource.id.toString()
									))}
									mode="multiple"
									allowClear
									style={{ width: '100%' }}
									placeholder="Role Has No Claims"
									>
									{clientValue.Client?.clientApiResources?.map(claim => (
										<Option key={claim.id}>{claim.apiClaim.claim}</Option>
									))}
								</Select>
							</Form.Item>
						</Col>}
				
				</Row>
			</Form>
		</Drawer>
	</>)
};

export default RoleView
