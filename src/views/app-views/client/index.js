import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Select, Table, Input, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined,FormOutlined,SafetyOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import ClientView from './ClientView';
import { fetchClient, DeleteClient } from "store/slices/ClientSlice";
import Flex from 'components/shared-components/Flex';
import ClientForm from './ClientForm';
import AssignApiClaim from './AssignApiClaim';
import ClientEditForm from './ClientEditForm';


export const ClientList = () => {
	const dispatch = useDispatch();
	const [clients, setClients] = useState([]);
	const [clientProfileVisible, setProfile] = useState(false);
	const [selectedClient, setselectedClient] = useState(null);
	const clientValue = useSelector(state => state.client)
	const [formVisible, setFormVisible] = useState(false);
	const [assignclaimVisible, setClaimFormVisible] = useState(false);
	const [editformVisible, seteditFormVisible] = useState(false);
	const [selectedID, setSelectedId] = useState(null);
	useEffect(() => {
		fetch();
	}, [])


	const fetch = () => {
		//2==active record
		dispatch(fetchClient(2));
	}


	const deleteClient = (clientId) => {
		dispatch(DeleteClient(clientId)).unwrap().then(() => dispatch(fetchClient(2)).unwrap())
	}

	const showClientProfile = clientInfo => {
		setProfile(true)
		setselectedClient(clientInfo)
	};

	const closeClientProfile = () => {
		setselectedClient(null)
		setProfile(false)
	}

	const showClientedit  = clientInfo => {
		seteditFormVisible(true)
		setselectedClient(clientInfo)
	};

	const closeClientedit = () => {
		seteditFormVisible(false)
		setselectedClient(null)
	}

	const showAssignForm = (clientInfo,id) => {
		setSelectedId(id);
		setselectedClient(clientInfo)
		setClaimFormVisible(true)
		
	};
	const closeAssignForm = () => {
		setSelectedId(null);
		setClaimFormVisible(false)
		setselectedClient(null)
	}

	const showForm = () => {
		setFormVisible(true)
		// setselectedClient(clientInfo)
	};

	const closeForm = () => {
		
		setFormVisible(false)
		// setselectedClient(null)
	}

	
	const tableColumns = [
		{
			title: "Client Id",
			dataIndex: "clientId",
		},
		{
			title: "Client Name",
			dataIndex: "clientName",
		},
		{
			title: 'Description',
			dataIndex: 'description'
		},
		{
			title: 'Token Lifetime',
			dataIndex: 'accessTokenLifeTime'
		},


		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right d-flex justify-content-end">
					<Tooltip title="Edit Client">
						<Button type="primary" className="mr-2" icon={<FormOutlined />} onClick={() => {showClientedit(elm) }} size="small" />
					</Tooltip>
					<Tooltip title="Assign Api Claims">
						<Button type="primary" className="mr-2" icon={<SafetyOutlined />} onClick={() => {showAssignForm(elm,elm.id) }} size="small" />
					</Tooltip>
					<Tooltip title="View">
						<Button type="primary" className="mr-2" icon={<EyeOutlined />} onClick={() => { showClientProfile(elm) }} size="small" />
					</Tooltip>
					<Tooltip title="Delete">
						<Button danger icon={<DeleteOutlined />} onClick={() => { deleteClient(elm.id) }} size="small" />
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
						{/* <div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="Category"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div> */}
					</Flex>
					<div>
						<Button onClick={e=>showForm()}  type="primary" icon={<PlusCircleOutlined />} block>Add Client</Button>
					</div>
				</Flex>
				<div className="table-responsive">

					<Table
						columns={tableColumns}
						dataSource={clientValue.Clients}
						loading={clientValue.loading}
						rowKey='id'
						size="small"
					/>
				</div>
				
				{clientProfileVisible && <ClientView data={selectedClient} visible={clientProfileVisible} close={() => { closeClientProfile() }} /> }
				{formVisible && <ClientForm visible={formVisible} close={() => { closeForm() }} />}
				{editformVisible && <ClientEditForm data={selectedClient} visible={editformVisible} close={() => { closeClientedit() }} />}
				{assignclaimVisible && <AssignApiClaim id={selectedID} data={selectedClient} visible={assignclaimVisible} close={() => { closeAssignForm() }} />}
				
			</Card>
		</>
	)
};

export default ClientList;
