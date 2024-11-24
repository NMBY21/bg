import React, { useState } from "react";
import { Modal, Button, Avatar, message, Row, Col } from "antd";
import { PlusOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import MultiImageSelector from "./MultiImageSelector";
import { IMAGE_API_BASE_URL } from "configs/AppConfig";

const ImageSelector = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  // const [imageId, setImageid] = useState([]);
  const [imageId, setImageid] = useState([]);
  const [formVisible, setFormVisible] = useState(false);

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    console.log(imageId);
    setFormVisible(false);
  };

  const handleUploadClick = () => {
    // Perform any other desired actions
  };

  const handlePreview = (image) => {
    setPreviewImage(IMAGE_API_BASE_URL + image.imageUrl);
    setPreviewOpen(true);
    setPreviewTitle(image.name);
  };

  const handleRemove = (image) => {
    const updatedImageList = imageId.filter((item) => item.uid !== image.uid);
    setImageid(updatedImageList);
  };

  const handleCancel = () => {
    setPreviewOpen(false);
  };

  const handleAvatarMouseEnter = (image) => {
    image.hover = true;
    setImageid([...imageId]);
  };

  const handleAvatarMouseLeave = (image) => {
    image.hover = false;
    setImageid([...imageId]);
  };

  const renderAvatars = () => {
    return imageId.map((image) => (
      <div
        key={image.uid}
        style={{
          display: "inline-block",
          position: "relative",
          marginRight: "10px",
        }}
        onMouseEnter={() => handleAvatarMouseEnter(image)}
        onMouseLeave={() => handleAvatarMouseLeave(image)}
      >
        <Avatar
          size={150}
          shape="square"
          src={IMAGE_API_BASE_URL + image.imageUrl}
          style={{ cursor: "pointer" }}
          onClick={() => handlePreview(image)}
        />
        {image.hover && (
          <>
            <DeleteOutlined
              style={{
                position: "absolute",
                top: "2px",
                right: "2px",
                fontSize: "16px",
                color: "#ff4d4f",
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(image);
              }}
            />
            <EyeOutlined
              style={{
                position: "absolute",
                bottom: "2px",
                right: "2px",
                fontSize: "16px",
                color: "#1890ff",
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                handlePreview(image);
              }}
            />
          </>
        )}
      </div>
    ));
  };

  return (
    <>
      <div>
        {renderAvatars()}
        <label htmlFor="upload-input">
          <Avatar
            icon={<PlusOutlined />}
            style={{
              marginRight: "10px",
              cursor: "pointer",
              border: "1px dashed #ccc",
            }}
            onClick={(e) => showForm()}
          />
        </label>
      </div>

      <Modal
        visible={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        {previewImage && (
          <img
            alt={previewTitle}
            style={{ width: "100%", maxHeight: "500px" }}
            src={previewImage}
          />
        )}
      </Modal>

      {formVisible && (
        <MultiImageSelector
          visible={formVisible}
          close={() => {
            closeForm();
          }}
          setter={setImageid}
        />
      )}
    </>
  );
};

export default ImageSelector;