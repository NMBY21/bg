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
// import LookupView from './LookupView';
import { fetchLookup, DeleteLookup } from "store/slices/LookupSlice";
import Flex from "components/shared-components/Flex";
import LookupForm from "./LookupForm";
import LookupEdit from "./ManufacturerEdit";
import LookupView from "./LookupView";
// import LookupEdit from "./LookupEdit";

export const LookupList = () => {
  const dispatch = useDispatch();
  const [lookups, setLookups] = useState([]);
  const [lookupProfileVisible, setProfile] = useState(false);
  const [selectedLookup, setselectedLookup] = useState(null);
  const lookupValue = useSelector((state) => state.lookup);
  const [formVisible, setFormVisible] = useState(false);
  const [lookupEditVisible, setEditFormVisible] = useState(false);
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
    dispatch(fetchLookup(payload));
  };

  const deleteLookup = (lookupId) => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(DeleteLookup(lookupId))
      .unwrap()
      .then(() => dispatch(fetchLookup(payload)).unwrap());
  };

  const showLookupProfile = (lookupInfo) => {
    setProfile(true);
    setselectedLookup(lookupInfo);
  };

  const closeLookupEdit = () => {
    setEditFormVisible(false);
    setselectedLookup(null);
  };

  const showLookupEdit = (lookupInfo) => {
    setEditFormVisible(true);
    setselectedLookup(lookupInfo);
  };

  const closeLookupProfile = () => {
    setProfile(false);
    setselectedLookup(null);
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
      title: "Lookup Name",
      dataIndex: "lookupName",
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
          <Tooltip title="Edit Lookup">
            <Button
              type="primary"
              className="mr-2"
              icon={<FormOutlined />}
              onClick={() => {
                showLookupEdit(elm);
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
                showLookupProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteLookup(elm.id);
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
              Add Lookup
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={lookupValue.Lookups}
            loading={lookupValue.loading}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <br></br>
          <br></br>
          <Pagination
            loading={lookupValue.loading}
            current={pageIndex}
            total={lookupValue.metadata?.totalRecords}
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
        {lookupProfileVisible && <LookupView data={selectedLookup} visible={lookupProfileVisible} close={() => { closeLookupProfile() }} />}
			 {lookupEditVisible && <LookupEdit data={selectedLookup} visible={lookupEditVisible} close={() => { closeLookupEdit() }}  callbackFn={resetPageSize} />}
        {formVisible && (
          <LookupForm
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

export default LookupList;
