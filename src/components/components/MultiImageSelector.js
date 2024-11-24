import React, { Component, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Card, List, Image, Avatar, Drawer, Divider, Form, Input, Button, Checkbox, Col, Row, Modal, Pagination, message, Radio } from 'antd';
import { IMAGE_API_BASE_URL, IMAGE_FALLBACK_URL } from 'configs/AppConfig';
import Loading from "components/shared-components/Loading";
import { fetchMedia } from "store/slices/MediasSlice";
import { SearchOutlined, } from "@ant-design/icons";
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const { Option } = Select;
const { Meta } = Card;
const MultiImageSelector = (props) => {
    const dispatch = useDispatch();
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectedImages, setSelectedImages] = useState([]);
    const mediaValue = useSelector((state) => state.media);
    useEffect(() => {
        var payload = {
            pageSize: pageSize,
            pageNumber: pageIndex,
        };
        fetch(payload);
    }, []);

    const fetch = (payload) => {
        dispatch(fetchMedia(payload));
    };

    const handleSubmit = (values) => {
        if (selectedImages.length > 6) {
            message.error("More than 6 images are not allowed");
            return;
          }
        props.close();
        props.setter(selectedImages);
      };

    return (<>
        <Modal
            width={1000}
            placement="right"
            onClose={props.close}
            closable={true}
            open={props.visible}
            onOk={handleSubmit} onCancel={handleSubmit}
        >

            {/* <div className="">

                <h3 className="mt-2 mb-0">Select an Image</h3>
            </div> */}
            <Divider dashed />
            <Card>


                <Row gutter={16}>
                    <Col xs={24} sm={8} md={12}>
                        <div className="mr-md-3 mb-3">
                            <Input placeholder="Search" prefix={<SearchOutlined />} />
                        </div>
                    </Col>
                    <Col xs={24} sm={8} md={6}>
                        <div className="mr-md-3 mb-3">
                            <Button

                                icon={<SearchOutlined />}
                                block
                            >
                                Search Media
                            </Button>
                        </div>
                    </Col>

                </Row>

                <div style={{
                    margin: "auto",
                    justifyContent: "center",
                }}>


<Checkbox.Group
  name="Imagegroup"
  onChange={(selectedImageIds) => {
    setSelectedImages(selectedImageIds);
    if (selectedImageIds.length > 6) {
      message.warning("More than 6 images selected");
    }
  }}
  value={selectedImages}
>
                       
                        <List
                            loading={mediaValue.loading}
                            grid={{
                                gutter: 24,
                                span: 24,
                            }}
                            dataSource={mediaValue.Medias}
                            renderItem={(item) => (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                                        padding:"0px !important",
                                    }}>
                                    <List.Item>
                                        <Card
                                            style={{
                                                width: 140, 
                                                justifyContent: "center !important",
                                                background: "white",
                                                padding:"0px !important",
                                                margin: "10px",
                                            }}
                                            cover={

                                                <Avatar shape="square"
                                                    style={{
                                                        objectFit: "contain",
                                                        backgroundColor: "white",
                                                        justifyContent: "center",
                                                        margin: "10px",
                                                        padding:"0px !important",
                                                    }}
                                                    size={120}
                                                    src={
                                                        <Image preview={false}

                                                            src={IMAGE_API_BASE_URL + item.imageUrl} style={{
                                                                objectFit: "contain",
                                                                backgroundColor: "white"
                                                            }}

                                                        ></Image>
                                                    } onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = <Image preview={false}

                                                            src={IMAGE_FALLBACK_URL}></Image>
                                                    }} />
                                            }
                                            actions={[
                                                <Checkbox   disabled={selectedImages.length >= 6 && !selectedImages.includes(item)} style={{ width: "85%", color: "white" }} value={item}>
                                                  Select image
                                                </Checkbox>
                                              ]} > </Card>

                                    </List.Item>
                                </div>
                            )}
                        />
                    </Checkbox.Group>


                    <br></br>
                    <br></br>
                    <Pagination
                        loading={mediaValue.loading}
                        current={pageIndex}
                        total={mediaValue.metadata?.totalRecords}
                        onChange={(page, size) => {
                            setPageIndex(page);
                            setPageSize(size);
                            var payload = {
                                pageSize: size,
                                pageNumber: page,
                            };
                            { console.log(payload) }
                            fetch(payload);
                        }}
                    />
                </div>

            </Card>
        </Modal>
    </>)
};

export default MultiImageSelector
