import React, { Component } from "react";
import { Avatar, Drawer, Divider, Tag, Image } from "antd";
import { RightCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { IMAGE_API_BASE_URL, IMAGE_FALLBACK_URL } from "configs/AppConfig";
export class TaxView extends Component {
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
        <Flex style={{ justifyContent: "left" }}>
          <span className="">
             <h3 className="mt-2 mb-0  text-center">{data?.tAxName}</h3>
          </span>
        </Flex>

        <Divider dashed />
        <div className="">
          <h6 className="text-muted text-uppercase mb-3">Tax details</h6>
          <p>
            <RightCircleOutlined />
            <span className="ml-3 text-dark">
              Tax Name: {data?.tAxName}
            </span>
          </p> <p>
            <RightCircleOutlined />
            <span className="ml-3 text-dark">Tax Code: {data?.code}</span>
          </p>
          <p>
            <RightCircleOutlined />
            <span className="ml-3 text-dark">Tax Category: {data?.category}</span>
          </p>
         
          <p>
            <RightCircleOutlined />
            <span className="ml-3 text-dark">Tax Amount: {data?.taxAmount}</span>
          </p>
          <p>
            <RightCircleOutlined />
            <span className="ml-3 mr-4">
              Status:
              {data?.recordStatus == 2 ? (
                <Tag className="ml-2" color="green">
                  {" "}
                  Active
                </Tag>
              ) : (
                <Tag className="ml-2" color="volcano">
                  {" "}
                  Inactive
                </Tag>
              )}
            </span>
          </p>
        </div>
      </Drawer>
    );
  }
}

export default TaxView;
