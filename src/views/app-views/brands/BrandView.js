import React, { Component } from "react";
import { Avatar, Drawer, Divider, Tag, Image } from "antd";
import { RightCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Flex from "components/shared-components/Flex";
import { IMAGE_API_BASE_URL, IMAGE_FALLBACK_URL } from "configs/AppConfig";
export class BrandView extends Component {
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
        <Flex style={{ justifyContent: "center" }}>
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

            <h3 className="mt-2 mb-0  text-center">{data?.brandName}</h3>
          </span>
        </Flex>

        <Divider dashed />
        <div className="">
          <h6 className="text-muted text-uppercase mb-3">Brand details</h6>
          <p>
            <RightCircleOutlined />
            <span className="ml-3 text-dark">
              Brand Name: {data?.brandName}
            </span>
          </p>
          <p>
            <RightCircleOutlined />
            <span className="ml-3 text-dark">Slug: {data?.slug}</span>
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

export default BrandView;
