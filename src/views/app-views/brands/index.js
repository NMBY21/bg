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
import BrandView from './BrandView';
import { fetchBrand, DeleteBrand } from "store/slices/BrandSlice";
import Flex from "components/shared-components/Flex";
 import BrandForm from './BrandForm';
import BrandEdit from "./BrandEdit";

export const BrandList = () => {
  const dispatch = useDispatch();
  const [brands, setBrands] = useState([]);
  const [brandProfileVisible, setProfile] = useState(false);
  const [selectedBrand, setselectedBrand] = useState(null);
  const brandValue = useSelector((state) => state.brand);
  const [formVisible, setFormVisible] = useState(false);
  const [brandEditVisible, setEditFormVisible] = useState(false);
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
    dispatch(fetchBrand(payload));
  };

  const deleteBrand = (brandId) => {
	var payload = {
		pageSize: pageSize,
		pageNumber: pageIndex,
	  };
    dispatch(DeleteBrand(brandId))
      .unwrap()
      .then(() => dispatch(fetchBrand(payload)).unwrap());
  };

  const showBrandProfile = (brandInfo) => {
    setProfile(true);
    setselectedBrand(brandInfo);
  };

  const closeBrandEdit = () => {
    setEditFormVisible(false);
    setselectedBrand(null);
  };

  const showBrandEdit = (brandInfo) => {
    setEditFormVisible(true);
    setselectedBrand(brandInfo);
  };

  const closeBrandProfile = () => {
    setProfile(false);
    setselectedBrand(null);
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
      title: "Brand Name",
      dataIndex: "brandName",
    },
    { width: "20%", title: "Slug", dataIndex: "slug" },
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
          <Tooltip title="Edit Brand">
            <Button
              type="primary"
              className="mr-2"
              icon={<FormOutlined />}
              onClick={() => {
                showBrandEdit(elm);
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
                showBrandProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteBrand(elm.id);
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
  }
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
              Add Brand
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={brandValue.Brands}
            loading={brandValue.loading}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <br></br>
          <br></br>
          <Pagination
		  
            loading={brandValue.loading}
            current={pageIndex}
            total={brandValue.metadata?.totalRecords}
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
        {brandProfileVisible && <BrandView data={selectedBrand} visible={brandProfileVisible} close={() => { closeBrandProfile() }} />}
			 {brandEditVisible && <BrandEdit data={selectedBrand} visible={brandEditVisible} close={() => { closeBrandEdit() }}  callbackFn={resetPageSize} />}
				{formVisible &&	<BrandForm visible={formVisible} close={() => { closeForm() }} callbackFn={resetPageSize} />}
				
      </Card>
    </>
  );
};

export default BrandList;
