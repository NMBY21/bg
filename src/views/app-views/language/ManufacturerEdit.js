// import React, { Component,useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Select, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row } from 'antd';
// import { updateLookup, fetchLookup } from "store/slices/LookupSlice";
// import MediaComponent from 'components/components/MediaComponent';
// const layout = {
// 	labelCol: { span: 8 },
// 	wrapperCol: { span: 16 },
// };
// const tailLayout = {
// 	wrapperCol: { offset: 8, span: 16 },
// };

// const { Option } = Select;

// const LookupEdit = (props) => {
// 	const dispatch = useDispatch();
// 	const [form] = Form.useForm();
// 	const [formVisible, setFormVisible] = useState(false);

//   const [lookupTypeID, setlookupTypeID] = useState(1);

//   function handleChange(value) {
//     setlookupTypeID(value.value)
//   }
// 	const handleSubmit = (values) => {
// 	  var payload = {
// 		"id":props.data.id,
//       lookupName: values.lookupName,
//       lookupType: lookupTypeID,
//     };
//     var Fetchpayload = {
//       pageSize: 10,
//       pageNumber: 1,
//     };

		
// 		 dispatch(updateLookup(payload)).unwrap().then(() => dispatch(fetchLookup(Fetchpayload)).unwrap())
// 		 props.close()
//          props?.callbackFn()
// 		 form.resetFields();
// 	}
// 	const showForm = () => {
// 		setFormVisible(true);
// 	  };
	
// 	  const closeForm = () => {
// 		setFormVisible(false);
// 	  };
	
// 	return (<>
// 		<Drawer
// 			width={350}
// 			placement="right"
// 			onClose={props.close}
// 			closable={true}
// 			open={props.visible}
// 		>

// 			<div className="">

// 				<h3 className="mt-2 mb-0">Update Lookup</h3>
// 			</div>
// 			<Divider dashed />
// 			<Form form={form}
// 				onFinish={handleSubmit}
// 				layout="vertical"
// 				name="lookup"
// 				initialValues={props.data}
// 			>
// 				<Row gutter={16}>
				

// 					<Col xs={24} sm={24} md={24}>
// 						<Form.Item name="lookupName" label="Lookup Name" >
// 							<Input />
// 						</Form.Item>
// 					</Col>

// 					<Col xs={24} sm={24} md={24}>
//               <Form.Item
//                 name="lookupType"
//                 label="Lookup Type" >
//                 <Select labelInValue defaultValue={1}  onChange={handleChange}>
//                   <Option value={1}>Size</Option>
//                   <Option value={2}>Color</Option>
//                 </Select>
//               </Form.Item>
//             </Col>

//                 	<Form.Item {...tailLayout}>
// 						<Button type="primary" htmlType="submit">
// 							Submit
// 						</Button>
// 					</Form.Item>

// 				</Row>
// 			</Form>
			
// 		</Drawer>
// 	</>)
// };

// export default LookupEdit
