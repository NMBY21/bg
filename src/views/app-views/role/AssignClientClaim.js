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
const AssignClientClaim = (props) => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const clientValue = useSelector(state => state.client)
	const rolesList = useSelector(state => state.role)
	useEffect(() => {
		fetch();
	}, [])

	const fetch = () => {
		dispatch(fetchClientById(props.data.clientId));//all client claims
		dispatch(fetchRoleById(props.id)); //default
	}
	const handleSubmit = (values) => {
		var data = {
			"name": props.data.name,
			"description": props.data.description,
			"clientId": props.data.clientId,
			"claims": values.clientClaims.map((values) => (parseInt(values)))
		}

		var payload = {
			"data": data,
			"id": props.id
		}
		var rolepayload={
			"clientid":null,
			"status":2
			}
		dispatch(updateRole(payload)).unwrap().then(() => dispatch(fetchRole(rolepayload)).unwrap())
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
				<h3 className="mt-2 mb-0">Manage Role Privelages</h3>
			</div>
			<Divider dashed />
			<Form form={form} onFinish={handleSubmit} layout="vertical" name="client" >
				<Row gutter={16}>
					{!clientValue.loadingclaims &&
						<Col className="gutter-row" span={24}>
							<Form.Item
								label="Client Api Claims"
								name="clientClaims"
								rules={[{ required: true }]}>
								<Select 
								defaultValue={rolesList.Role?.roleClaims?.map(claim => (claim.clientAPIResource.id.toString()
									))}
									mode="multiple"
									allowClear
									style={{ width: '100%' }}
									placeholder="Please select Api Claim"
									maxTagCount={22}>
									{clientValue.Client?.clientApiResources?.map(claim => (
										<Option key={claim.id}>{claim.apiClaim.claim}</Option>
									))}
								</Select>
							</Form.Item>
						</Col>}
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

export default AssignClientClaim
