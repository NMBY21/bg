import React, { Component } from 'react'
import { UserOutlined, LockOutlined, CreditCardOutlined, BellOutlined ,ZoomOutOutlined,MoneyCollectOutlined,PayCircleOutlined,GlobalOutlined} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, Route, Navigate, useLocation, Routes } from 'react-router-dom';
import InnerAppLayout from 'layouts/inner-app-layout';
import ChangePassword from './ChangePassword';
import LookupList from '../lookups';
import TaxList from '../tax';
import AddressList from '../address';
import LanguageList from '../language';

const url = '/getnet/ecommerce-management/system/setting'

const MenuItem = ({icon, path, label}) => {

	return (
		<>
			{icon}
			<span>{label}</span>
			<Link to={`${url}/${path}`} />
		</>
	)
}

const SettingOption = () => {

	const location = useLocation();

	const locationPath = location.pathname.split('/')

	const currentpath = locationPath[locationPath.length - 1]

	return (
		<Menu
			mode="inline"
			selectedKeys={[currentpath]}
			items={[
				{
					key: 'lookups',
					label: <MenuItem label="Lookups" icon={<ZoomOutOutlined />} path="lookups" />
				},
				{
					key: 'tax',
					label: <MenuItem label="Tax" icon={<MoneyCollectOutlined />} path="tax" />
				},
				{
					key: 'address',
					label: <MenuItem label="Address" icon={<PayCircleOutlined />} path="address" />
				},
				{
					key: 'languages',
					label: <MenuItem label="Languages" icon={<GlobalOutlined />} path="languages" />
				},
				{
					key: 'change-password',
					label: <MenuItem label="Change Password" icon={<LockOutlined />} path="change-password" />
				},
			]}
		/>
	);
};

const SettingContent = () => {

	return (
		<Routes>
			<Route path="lookups" element={<LookupList />} />
			<Route path="tax" element={<TaxList />} />
			<Route path="address" element={<AddressList />} />
			<Route path="languages" element={<LanguageList />} />
			<Route path="change-password" element={<ChangePassword />} />
			<Route path="*" element={<Navigate to="lookups" replace />} />
		</Routes>
	)
}

export class Setting extends Component {
	render() {
		return (
			<InnerAppLayout 
				sideContentWidth={320}
				sideContent={<SettingOption />}
				mainContent={<SettingContent />}
			/>
    	);
	}
}

export default Setting
