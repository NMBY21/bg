import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import {
	MobileOutlined,
	MailOutlined,
	UserOutlined,
	CalendarOutlined,
} from '@ant-design/icons';

export class UserView extends Component {
	render() {
		const { data, visible, close } = this.props;
		return (
			<Drawer
				width={400}
				placement="right"
				onClose={close}
				closable={true}
				open={visible}
			>
				<div className="">
					<Avatar size={80} icon={<UserOutlined />} />
					<h3 className="mt-2 mb-0">{data?.username}</h3>
					<span className="text-muted">{data?.firstName + " " + data?.lastName}</span>
				</div>
				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">Account details</h6>
					<p>
						<UserOutlined />
						<span className="ml-3 text-dark">Username: {data?.username}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Name: {data?.firstName + " " + data?.lastName}</span>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">CONTACT</h6>
					<p>
						<MobileOutlined />
						<span className="ml-3 text-dark">{data?.phoneNumber}</span>
					</p>
					<p>
						<MailOutlined />
						<span className="ml-3 text-dark">{data?.email ? data?.email : '-'}</span>
					</p>

				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">Status</h6>
					<p>
						<UserOutlined />
						<span className="ml-3 text-dark">Status: {data?.recordStatus == 2 ? 'ACTIVE' : 'DEACTIVEATED'}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">SuperAdmin: {data?.isSuperAdmin == true ? 'YES' : 'NO'}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Locked: {data?.isAccountLocked == true ? 'YES' : 'NO'}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Last Login: {data?.lastLoginDateTime}</span>
					</p>
				</div>
			</Drawer>
		)
	}
}

export default UserView
