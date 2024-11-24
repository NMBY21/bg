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
// import LanguageView from './LanguageView';
import { fetchLanguage, DeleteLanguage } from "store/slices/LanguageSlice";
import Flex from "components/shared-components/Flex";
import LanguageView from "./LanguageView";
// import LanguageForm from "./LanguageForm";
// import LanguageEdit from "./ManufacturerEdit";
// import LanguageView from "./LanguageView";
// import LanguageEdit from "./LanguageEdit";

export const LanguageList = () => {
  const dispatch = useDispatch();
  const [languages, setLanguages] = useState([]);
  const [languageProfileVisible, setProfile] = useState(false);
  const [selectedLanguage, setselectedLanguage] = useState(null);
  const languageValue = useSelector((state) => state.language);
  const [formVisible, setFormVisible] = useState(false);
  const [languageEditVisible, setEditFormVisible] = useState(false);
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
    dispatch(fetchLanguage(payload));
  };

  const deleteLanguage = (languageId) => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(DeleteLanguage(languageId))
      .unwrap()
      .then(() => dispatch(fetchLanguage(payload)).unwrap());
  };

  const showLanguageProfile = (languageInfo) => {
    setProfile(true);
    setselectedLanguage(languageInfo);
  };

  const closeLanguageEdit = () => {
    setEditFormVisible(false);
    setselectedLanguage(null);
  };

  const showLanguageEdit = (languageInfo) => {
    setEditFormVisible(true);
    setselectedLanguage(languageInfo);
  };

  const closeLanguageProfile = () => {
    setProfile(false);
    setselectedLanguage(null);
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
      title: "Language Name",
      dataIndex: "languageName",
    },  {
      width: "10%",
      title: "Short Code",
      dataIndex: "languageShortCode",
    },
    {
      width: "40%",
      title: "Description",
      dataIndex: "languageDescription",
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
          <Tooltip title="Edit Language">
            <Button
              type="primary"
              className="mr-2"
              icon={<FormOutlined />}
              onClick={() => {
                showLanguageEdit(elm);
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
                showLanguageProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteLanguage(elm.id);
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
              Add Language
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={languageValue.Languages}
            loading={languageValue.loading}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <br></br>
          <br></br>
          <Pagination
            loading={languageValue.loading}
            current={pageIndex}
            total={languageValue.metadata?.totalRecords}
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
        {languageProfileVisible && <LanguageView data={selectedLanguage} visible={languageProfileVisible} close={() => { closeLanguageProfile() }} />}
			 {/* {languageEditVisible && <LanguageEdit data={selectedLanguage} visible={languageEditVisible} close={() => { closeLanguageEdit() }}  callbackFn={resetPageSize} />}
        {formVisible && (
          <LanguageForm
            visible={formVisible}
            close={() => {
              closeForm();
            }}
            callbackFn={resetPageSize}
          />
        )} */}
      </Card>
    </>
  );
};

export default LanguageList;
