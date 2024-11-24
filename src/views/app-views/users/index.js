import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Select, Table, Input, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined,FormOutlined,SafetyOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import UserView from './UserView';
import { fetchUser, DeleteUser } from "store/slices/UserSlice";
import Flex from 'components/shared-components/Flex';
import UserForm from './UserForm';
import AssignRole from './AssignRole';
import UserEdit from './UserEdit';

export const UserList = () => {
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [userProfileVisible, setProfile] = useState(false);
	const [selectedUser, setselectedUser] = useState(null);
	const userValue = useSelector(state => state.user)
	const [formVisible, setFormVisible] = useState(false);
	const [userEditVisible, setEditFormVisible] = useState(false);
	const [roleformVisible, setassignRoleFormVisible] = useState(false);
	useEffect(() => {
		fetch();
	}, [])


	const fetch = () => {
		dispatch(fetchUser());
	}


	const deleteUser = (userId) => {
		dispatch(DeleteUser(userId)).unwrap().then(() => dispatch(fetchUser()).unwrap())
	}

	const showUserProfile = userInfo => {
		setProfile(true)
		setselectedUser(userInfo)
	};

	const closeUserEdit = () => {
		setEditFormVisible(false)
		setselectedUser(null)
	}


	const showUserEdit = userInfo => {
		setEditFormVisible(true)
		setselectedUser(userInfo)
	};

	const closeUserProfile = () => {
		setProfile(false)
		setselectedUser(null)
	}

	const showForm = () => {
		setFormVisible(true)
	};

	const closeForm = () => {
		setFormVisible(false)
	}

	const showRoleForm = userInfo => {
		setassignRoleFormVisible(true)
		setselectedUser(userInfo)
	};

	const closeRoleForm = () => {
		setassignRoleFormVisible(false)
		setselectedUser(null)
	}
	
	const tableColumns = [

		{
			title: "Full Name",
			dataIndex: "fullname",
			render: (text, record) => (
				<span>{record.firstName} {record.lastName}</span>
			)
		},
		{
			title: 'Username',
			dataIndex: 'username'
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Phone',
			dataIndex: 'phoneNumber',
		},

		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="Edit User">
						<Button type="primary" className="mr-2" icon={<FormOutlined />} onClick={() => {showUserEdit(elm) }} size="small" />
					</Tooltip>
					<Tooltip title="Assign Role">
						<Button type="primary" className="mr-2" icon={<SafetyOutlined />} onClick={() => {showRoleForm(elm,elm.id) }} size="small" />
					</Tooltip>
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { showUserProfile(elm) }} size="small" />
					</Tooltip>
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined />} onClick={() => { deleteUser(elm.id) }} size="small" />
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
					</Flex>
					<div>
						<Button onClick={e => showForm()} type="primary" icon={<PlusCircleOutlined />} block>Add User</Button>
					</div>
				</Flex>
				<div className="table-responsive">

					<Table
						columns={tableColumns}
						dataSource={userValue.Users}
						loading={userValue.loading}
						rowKey='id'
						size="small"
					/>
				</div>
				{userProfileVisible && <UserView data={selectedUser} visible={userProfileVisible} close={() => { closeUserProfile() }} />}
				{userEditVisible && <UserEdit data={selectedUser} visible={userEditVisible} close={() => { closeUserEdit() }} />}
				{roleformVisible &&	<AssignRole data={selectedUser} visible={roleformVisible} close={() => { closeRoleForm() }} />}
				{formVisible &&	<UserForm visible={formVisible} close={() => { closeForm() }} />}
			</Card>
		</>
	)
};

export default UserList;
