import React, { Component } from 'react';
import { Avatar, Drawer, Divider } from 'antd';
import {CalendarOutlined} from '@ant-design/icons';

export class ClientView extends Component {
	render() {
		const { data, visible, close } = this.props;
		return (
			<Drawer
				width={400}
				placement="right"
				onClose={close}
				closable={true}
				open={visible}>

				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">Client Info</h6>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Client Name: {data?.clientName}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Client Id: {data?.clientId}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Description: {data?.description}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Token LifeTime: {+data?.accessTokenLifeTime}</span>
					</p>
					<p>
						<CalendarOutlined />
						<span className="ml-3 text-dark">Refresh Token LifeTime: {+data?.refreshTokenLifeTime}</span>
					</p>
				</div>
				<div className="mt-5">
					<h6 className="text-muted text-uppercase mb-3">Api Claims</h6>
					<p>
						<span className="ml-3 text-dark">{data?.role}</span>
					</p>
				</div>
			</Drawer>
		)
	}
}

export default ClientView
