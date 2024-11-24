import React, { Component } from 'react';
import {Avatar,Drawer, Divider,Image, Tag } from 'antd';
import {RightCircleOutlined,QuestionCircleOutlined} from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import { IMAGE_API_BASE_URL, IMAGE_FALLBACK_URL } from 'configs/AppConfig';
export class ManufacturerView extends Component {
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
                    <Flex style={{justifyContent: 'center'}}>
				<span className="">
                <Avatar
              shape="square"
              size={150}
              style={{
                display: "flex",
                justifyContent: "center",
                background: "white",
              }}
              icon={
                <Image
                  style={{
                    objectFit: "contain",
                    background: "white",
                    height: "150px",
                    width: "150px",
                    objectFit: "fit",
                  }}
                  src={IMAGE_API_BASE_URL + data?.image?.imageUrl}
                  fallback={IMAGE_FALLBACK_URL}
                />
              }
            />
					<h3 className="mt-2 mb-0  text-center">{data?.manufacturerDescription[0]?.manufacturerName}</h3>
				</span>
                </Flex>


				<Divider dashed />
				<div className="">
					<h6 className="text-muted text-uppercase mb-3">Manufacturer details</h6>
					<p>
					<RightCircleOutlined />
						<span className="ml-3 text-dark">Manufacturer: {data?.manufacturerDescription[0]?.manufacturerName}</span>
					</p>
					<p style={{textAlign: "justify"}}>
					<RightCircleOutlined />
						<span className="ml-3 text-dark">Description: {data?.manufacturerDescription[0]?.description}</span>
					</p>
					<p>
					<RightCircleOutlined />
						<span className="ml-3 mr-4">Status: 

          {data?.manufacturerDescription[0]?.recordStatus == 2 ? (
            <Tag className="ml-2" color="green">  Active</Tag>
          ) : (
            <Tag className="ml-2" color="volcano">  Inactive</Tag>
          )}

						</span>
					</p>
</div>
			</Drawer>
		)
	}
}

export default ManufacturerView
