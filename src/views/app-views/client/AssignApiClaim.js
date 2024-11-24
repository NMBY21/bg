import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
import { createClient, fetchClient, fetchClientById,updateClient } from "store/slices/ClientSlice";
import { fetchApiClaim } from "store/slices/ApiClaimSlice";
const layout = {
	labelCol: { span: 8 },
	wrapperCol: { span: 16 },
};
const tailLayout = {
	wrapperCol: { offset: 8, span: 16 },
};

const { Option } = Select;

const AssignApiClaim = (props) => {
	const dispatch = useDispatch();
	const [form] = Form.useForm();
	const ApiclaimsList = useSelector(state => state.apiclaim)
	const clientValue = useSelector(state => state.client)
	useEffect(() => {
		fetch();
	}, [])

	const fetch = () => {
		dispatch(fetchClientById(props.id));
		dispatch(fetchApiClaim());
	}

	const handleSubmit = (values) => {
	
		var data={
			"clientName": props.data.clientName,
			"clientId": props.data.clientId,
			"clientSecret":props.data.clientSecret,
			"description": props.data.description,
			"accessTokenLifeTime": props.data.accessTokenLifeTime,
			"refreshTokenLifeTime": props.data.refreshTokenLifeTime,
			"apiClaims": values.apiClaims.map((values) => (parseInt(values)))
		  }
	
		  var payload={
			"data":data,
			"id":props.id
		  }
		  dispatch(updateClient(payload)).unwrap().then(() => dispatch(fetchClient(2)).unwrap())
		  props.close()
		  form.resetFields();
	}

	return (<>
		<Drawer
			width={600}
			placement="right"
			onClose={props.close}
			closable={true}
			open={props.visible}
		>
			<div className="">
			<h3 className="mt-2 mb-0">Assign Apiclaims</h3>
			</div>
			<Divider dashed />
			<Form
			    form={form}
				onFinish={handleSubmit}
				layout="vertical"
				name="client"
			>
				<Row gutter={16}>
				{!clientValue.loadingclaims &&
				<Col className="gutter-row" span={24}>
						<Form.Item
							label="Client Api Claims"
							name="apiClaims"
							rules={[{ required: true }]}
						>

							<Select
								defaultValue={clientValue.Client?.clientApiResources?.map(claim => (
									claim.apiClaimId.toString()
								))}
								// loading={}
								mode="multiple"
								allowClear
								style={{ width: '100%' }}
								placeholder="Please select Api Claim"
								maxTagCount={22}
							>

								{ApiclaimsList.ApiClaims.map(claim => (
									<Option key={claim.id}>{claim.claim}</Option>
								))}

							</Select>
						</Form.Item>
					</Col>
}
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

export default AssignApiClaim
