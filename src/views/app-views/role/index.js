import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Select, Table, Input, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined,FormOutlined,SafetyOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
// import RoleView from './RoleView';
import { fetchRole, DeleteRole } from "store/slices/RoleSlice";
import Flex from 'components/shared-components/Flex';
 import RoleForm from './RoleForm';
 import AssignClientClaim from './AssignClientClaim';
 import { fetchClient } from "store/slices/ClientSlice";
import RoleEdit from './RoleEdit';
import RoleView from './RoleView';
 const { Option } = Select;
export const RoleList = () => {
	const dispatch = useDispatch();
	const [roles, setRoles] = useState([]);
	const [roleProfileVisible, setProfile] = useState(false);
	const [selectedRole, setselectedRole] = useState(null);
	const roleValue = useSelector(state => state.role)
	const [formVisible, setFormVisible] = useState(false);
	const [roleeditVisible, setRoleEditVisible] = useState(false);
	const [assignclaimVisible, setClaimFormVisible] = useState(false);
	const clientValue = useSelector(state => state.client)
	const [selectedID, setSelectedId] = useState(null);
	useEffect(() => {
		fetch();
	}, [])


	const fetch = () => {
		var payload={
			"clientid":null,
			"status":2
			}
		dispatch(fetchClient(2));
		dispatch(fetchRole(payload));
		
	}

	const handleClientChange=(value)=>{
var payload={
"clientid":value,
"status":2
}
dispatch(fetchRole(payload));
	}

	const deleteRole = (roleId) => {
		var payload={
			"clientid":null,
			"status":2
			}
		dispatch(DeleteRole(roleId)).unwrap().then(() => dispatch(fetchRole(payload)).unwrap())
	}

	const showRoleProfile = (roleInfo,id) => {
		setProfile(true)
		setselectedRole(roleInfo)
		setSelectedId(roleInfo.id);
	};

	const closeRoleProfile = () => {
		setProfile(false)
		setselectedRole(null)
		setSelectedId(null)
	}

	const showRoleEdit = roleInfo => {
		setRoleEditVisible(true)
		setselectedRole(roleInfo)
	};

	const closeRoleEdit = () => {
		setRoleEditVisible(false)
		setselectedRole(null)
	}

	const showAssignForm = (roleInfo,id) => {
		setSelectedId(id);
		setselectedRole(roleInfo)
		setClaimFormVisible(true)
		
	};
	const closeAssignForm = () => {
		setSelectedId(null);
		setClaimFormVisible(false)
		setselectedRole(null)
	}

	const showForm = () => {
		setFormVisible(true)
		// setselectedRole(roleInfo)
	};

	const closeForm = () => {
		
		setFormVisible(false)
		// setselectedRole(null)
	}

	const tableColumns = [
		{
			title: "Named",
			dataIndex: "name",
		},
		{
			title: 'Description',
			dataIndex: 'description'
		},
		{
			title: 'Client',
			dataIndex:  ["client","clientName"] 
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					{/* <Tooltip title="Edit Role">
						<Button type="primary" className="mr-2" icon={<FormOutlined />} onClick={() => {showRoleEdit(elm) }} size="small" />
					</Tooltip> */}
					<Tooltip title="Assign Api Claims">
						<Button type="primary" className="mr-2" icon={<SafetyOutlined />} onClick={() => {showAssignForm(elm,elm.id) }} size="small" />
					</Tooltip>
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { showRoleProfile(elm) }} size="small" />
					</Tooltip>
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined />} onClick={() => { deleteRole(elm.id) }} size="small" />
					</Tooltip>

				</div>
			)
		}
	];
	return (
		<>
			<Card >
				<Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
					<Flex className="mb-1" mobileFlex={false}>
						<div className="mr-md-3 mb-3">
							<Input placeholder="Search" prefix={<SearchOutlined />} />
						</div>
						<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleClientChange} 
							placeholder="filter by client"
						>
							<Option value={null}>All</Option>
							{
								clientValue.Clients?.map(elm => (
									<Option key={elm.id} value={elm.id}>{elm.clientName}</Option>
								))
							}
						</Select>
					</div>
					</Flex>
					<div>
						<Button onClick={e=>showForm()}  type="primary" icon={<PlusCircleOutlined />} block>Add Role</Button>
					</div>
				</Flex>
				<div className="table-responsive">

					<Table
						columns={tableColumns}
						dataSource={roleValue.Roles}
						loading={roleValue.loading}
						rowKey='id'
						size="small"
					/>
				</div>
				{roleProfileVisible && <RoleView data={selectedRole} visible={roleProfileVisible} close={() => { closeRoleProfile() }} />}
				{roleeditVisible && <RoleEdit id={selectedID} data={selectedRole} visible={roleeditVisible} close={() => { closeRoleEdit() }} /> }
				{formVisible && <RoleForm visible={formVisible} close={() => { closeForm() }} /> }
				{assignclaimVisible && <AssignClientClaim id={selectedID} data={selectedRole} visible={assignclaimVisible} close={() => { closeAssignForm() }} />}
				
			</Card>
		</>
	)
};

export default RoleList;
