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
} from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  FormOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import { fetchAddress, DeleteAddress } from "store/slices/AddressSlice";
import Flex from "components/shared-components/Flex";
import AddressView from "./AddressView";
 import AddressForm from "./AddressForm";
import AddressEdit from "./AddressEdit";

export const AddressList = () => {
  const dispatch = useDispatch();
  const [addresss, setAddresss] = useState([]);
  const [addressProfileVisible, setProfile] = useState(false);
  const [selectedAddress, setselectedAddress] = useState(null);
  const addressValue = useSelector((state) => state.address);
  const [formVisible, setFormVisible] = useState(false);
  const [addressEditVisible, setEditFormVisible] = useState(false);
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
    dispatch(fetchAddress(payload));
  };

  const deleteAddress = (addressId) => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(DeleteAddress(addressId))
      .unwrap()
      .then(() => dispatch(fetchAddress(payload)).unwrap());
  };

  const showAddressProfile = (addressInfo) => {
    setProfile(true);
    setselectedAddress(addressInfo);
  };

  const closeAddressEdit = () => {
    setEditFormVisible(false);
    setselectedAddress(null);
  };

  const showAddressEdit = (addressInfo) => {
    setEditFormVisible(true);
    setselectedAddress(addressInfo);
  };

  const closeAddressProfile = () => {
    setProfile(false);
    setselectedAddress(null);
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
      width: "60%",
      title: "Address Name",
      dataIndex: "addressName",
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
          <Tooltip title="Edit Address">
            <Button
              type="primary"
              className="mr-2"
              icon={<FormOutlined />}
              onClick={() => {
                showAddressEdit(elm);
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
                showAddressProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteAddress(elm.id);
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
              Add Address
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={addressValue.Addresss}
            loading={addressValue.loading}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <br></br>
          <br></br>
          <Pagination
            loading={addressValue.loading}
            current={pageIndex}
            total={addressValue.metadata?.totalRecords}
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
        {addressProfileVisible && <AddressView data={selectedAddress} visible={addressProfileVisible} close={() => { closeAddressProfile() }} />}
			 {addressEditVisible && <AddressEdit data={selectedAddress} visible={addressEditVisible} close={() => { closeAddressEdit() }}  callbackFn={resetPageSize} />}
        {formVisible && (
          <AddressForm
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

export default AddressList;
