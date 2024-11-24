import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Select,
  Table,
  Input,
  Tag,
  Tooltip,
  message,
  Button,
  Pagination,
  Divider,
  Avatar,
  Image,
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FormOutlined,
  SafetyOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
// import ManufacturerView from './ManufacturerView';
import {
  fetchManufacturer,
  DeleteManufacturer,
} from "store/slices/ManufacturerSlice";
import Flex from "components/shared-components/Flex";
import { IMAGE_API_BASE_URL, IMAGE_FALLBACK_URL } from "configs/AppConfig";
import ManufacturerForm from "./ManufacturerForm";
import ManufacturerEditForm from "./ManufacturerEditForm";
import ManufacturerView from "./ManufacturerView";

export const ManufacturerList = () => {
  const dispatch = useDispatch();
  const [manufacturers, setManufacturers] = useState([]);
  const [manufacturerProfileVisible, setProfile] = useState(false);
  const [selectedManufacturer, setselectedManufacturer] = useState(null);
  const manufacturerValue = useSelector((state) => state.manufacturer);
  const [formVisible, setFormVisible] = useState(false);
  const [manufacturerEditFormVisible, setEditFormVisible] = useState(false);
  const [roleformVisible, setassignRoleFormVisible] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    fetch(payload);
  }, []);

  const fetch = (payload) => {
    dispatch(fetchManufacturer(payload));
  };

  const deleteManufacturer = (manufacturerId) => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(DeleteManufacturer(manufacturerId))
      .unwrap()
      .then(() => dispatch(fetchManufacturer(payload)).unwrap());
  };

  const showManufacturerProfile = (manufacturerInfo) => {
    setProfile(true);
    setselectedManufacturer(manufacturerInfo);
  };

  const closeManufacturerEditForm = () => {
  setEditFormVisible(false);
    setselectedManufacturer(null);
  
  };

  const showManufacturerEditForm = (manufacturerInfo) => {
    setEditFormVisible(true);
    setselectedManufacturer(manufacturerInfo);
   
  };

  const closeManufacturerProfile = () => {
    setProfile(false);
    setselectedManufacturer(null);
  };

  const showForm = () => {
    setFormVisible(true);
  };

  const closeForm = () => {
    setFormVisible(false);
  };

  const tableColumns = [
    {
      width: "4%",
      title: "Nº",
      render: (value, item, index) => (
        <span>{(pageIndex - 1) * 10 + index + 1}</span>
      ),
    },
    {
      width: "10%",
      title: "Image",
      dataIndex: "imageUrl",
      render: (elm, obj) => (
        <Avatar
          shape="square"
          size={100}
          style={{ background: "white" }}
          icon={
            <Image
              style={{ objectFit: "contain" }}
              src={IMAGE_API_BASE_URL + obj.image.imageUrl}
              loading="lazy"
              fallback={IMAGE_FALLBACK_URL}
            />
          }
        />
      ),
    },
    {
      width: "20%",
      title: "Manufacturer Name",
      // dataIndex: "manufacturerDescription[0]",
      render: (elm, obj) => (
        <span style={{ textOverflow: "ellipsis", maxLines: 2 }}>
          {obj.manufacturerDescription[0].manufacturerName}
        </span>
      ),
    },
    {
      width: "45%",
      title: "Description",
      dataIndex: "description",
      render: (elm, obj) => (
        <span style={{ textOverflow: "ellipsis", maxLines: 2 }}>
          {obj.manufacturerDescription[0].description.substring(0, 130) + "..."}
        </span>
      ),
    },
    {
      width: "20%",
      title: "Status",
      dataIndex: "recordStatus",
      render: (text, obj) => (
        <span>
          {obj.recordStatus == 2 ? (
            <Tag color="green">Active</Tag>
          ) : (
            <Tag color="volcano">Inactive</Tag>
          )}
        </span>
      ),
    },

    {
      title: "",
      dataIndex: "actions",
      render: (_, elm) => (
        <div className="text-right d-flex justify-content-end">
          <Tooltip title="Edit Manufacturer">
            <Button
              type="primary"
              className="mr-2"
              icon={<FormOutlined />}
              onClick={() => {
                showManufacturerEditForm(elm);
              }}
              size="small"
            />
          </Tooltip>

          <Tooltip title="View">
            <Button
              type="primary"
              className="mr-2"
              icon={<EyeOutlined />}
              onClick={() => {
                showManufacturerProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteManufacturer(elm.id);
              }}
              size="small"
            />
          </Tooltip>
        </div>
      ),
    },
  ];
  const resetPageSize = () => {
    setPageIndex(1);
    setPageSize(10);
  };
  return (
    <>
      <Card>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          mobileFlex={false}
        >
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              <Input placeholder="Search" prefix={<SearchOutlined />} />
            </div>
          </Flex>
          <div>
            <Button
              onClick={(e) => showForm()}
              type="primary"
              icon={<PlusCircleOutlined />}
              block
            >
              Add Manufacturer
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={manufacturerValue.Manufacturers}
            loading={manufacturerValue.loading}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <br></br>
          <br></br>
          <Pagination
            loading={manufacturerValue.loading}
            current={pageIndex}
            total={manufacturerValue.metadata?.totalRecords}
            onChange={(page, size) => {
              setPageIndex(page);
              setPageSize(size);
              var payload = {
                pageSize: size,
                pageNumber: page,
              };
              fetch(payload);
            }}
          />
        </div>
        {manufacturerProfileVisible && <ManufacturerView data={selectedManufacturer} visible={manufacturerProfileVisible} close={() => { closeManufacturerProfile() }} />}
        {manufacturerEditFormVisible && <ManufacturerEditForm data={selectedManufacturer} visible={manufacturerEditFormVisible}    callbackFn={resetPageSize} close={() => { closeManufacturerEditForm() }} />}

        {formVisible && (
          <ManufacturerForm
            visible={formVisible}
            close={() => {
              closeForm();
            }}
            callbackFn={resetPageSize}
          />
        )}
      </Card>
    </>
  );
};

export default ManufacturerList;
