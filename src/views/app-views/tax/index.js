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
import { fetchTax, DeleteTax } from "store/slices/TaxSlice";
import Flex from "components/shared-components/Flex";
import TaxView from "./TaxView";
 import TaxForm from "./TaxForm";
 import TaxEdit from "./TaxEdit";

export const TaxList = () => {
  const dispatch = useDispatch();
  const [taxs, setTaxs] = useState([]);
  const [taxProfileVisible, setProfile] = useState(false);
  const [selectedTax, setselectedTax] = useState(null);
  const taxValue = useSelector((state) => state.tax);
  const [formVisible, setFormVisible] = useState(false);
  const [taxEditVisible, setEditFormVisible] = useState(false);
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
    dispatch(fetchTax(payload));
  };

  const deleteTax = (taxId) => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(DeleteTax(taxId))
      .unwrap()
      .then(() => dispatch(fetchTax(payload)).unwrap());
  };

  const showTaxProfile = (taxInfo) => {
    setProfile(true);
    setselectedTax(taxInfo);
  };

  const closeTaxEdit = () => {
    setEditFormVisible(false);
    setselectedTax(null);
  };

  const showTaxEdit = (taxInfo) => {
    setEditFormVisible(true);
    setselectedTax(taxInfo);
  };

  const closeTaxProfile = () => {
    setProfile(false);
    setselectedTax(null);
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
      width: "20%",
      title: "Tax Name",
      dataIndex: "tAxName",
    },  {
      width: "20%",
      title: "Tax Amount",
      dataIndex: "taxAmount",
    },
    {
      width: "20%",
      title: "Tax Code",
      dataIndex: "code",
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
          <Tooltip title="Edit Tax">
            <Button
              type="primary"
              className="mr-2"
              icon={<FormOutlined />}
              onClick={() => {
                showTaxEdit(elm);
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
                showTaxProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteTax(elm.id);
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
              Add Tax
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={taxValue.Taxs}
            loading={taxValue.loading}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <br></br>
          <br></br>
          <Pagination
            loading={taxValue.loading}
            current={pageIndex}
            total={taxValue.metadata?.totalRecords}
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
        {taxProfileVisible && <TaxView data={selectedTax} visible={taxProfileVisible} close={() => { closeTaxProfile() }} />}
			 {taxEditVisible && <TaxEdit data={selectedTax} visible={taxEditVisible} close={() => { closeTaxEdit() }}  callbackFn={resetPageSize} />}
        {formVisible && (
          <TaxForm
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

export default TaxList;
