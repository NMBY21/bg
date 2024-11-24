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
import {
  fetchCategory,
  DeleteCategory,
} from "store/slices/CategorySlice";
import Flex from "components/shared-components/Flex";
import { IMAGE_API_BASE_URL, IMAGE_FALLBACK_URL } from "configs/AppConfig";
 import CategoryForm from "./CategoryForm";
import CategoryEditForm from "./CategoryEditForm";
// import CategoryView from "./CategoryView";

export const CategoryList = () => {
  const dispatch = useDispatch();
  const [categorys, setCategorys] = useState([]);
  const [categoryProfileVisible, setProfile] = useState(false);
  const [selectedCategory, setselectedCategory] = useState(null);
  const categoryValue = useSelector((state) => state.category);
  const [formVisible, setFormVisible] = useState(false);
  const [categoryEditFormVisible, setEditFormVisible] = useState(false);
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
    dispatch(fetchCategory(payload));
  };

  const deleteCategory = (categoryId) => {
    var payload = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(DeleteCategory(categoryId))
      .unwrap()
      .then(() => dispatch(fetchCategory(payload)).unwrap());
  };

  const showCategoryProfile = (categoryInfo) => {
    setProfile(true);
    setselectedCategory(categoryInfo);
  };

  const closeCategoryEditForm = () => {
  setEditFormVisible(false);
    setselectedCategory(null);
  
  };

  const showCategoryEditForm = (categoryInfo) => {
    setEditFormVisible(true);
    setselectedCategory(categoryInfo);
   
  };

  const closeCategoryProfile = () => {
    setProfile(false);
    setselectedCategory(null);
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
      title: "Category Name",
      render: (elm, obj) => (
        <span style={{ textOverflow: "ellipsis", maxLines: 2 }}>
          {obj.categoryDescription[0].categoryName}
        </span>
      ),
    },
    {
      width: "45%",
      title: "Description",
      dataIndex: "description",
      render: (elm, obj) => (
        <span style={{ textOverflow: "ellipsis", maxLines: 2 }}>
          {obj.categoryDescription[0].description.substring(0, 130) + "..."}
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
          <Tooltip title="Edit Category">
            <Button
              type="primary"
              className="mr-2"
              icon={<FormOutlined />}
              onClick={() => {
                showCategoryEditForm(elm);
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
                showCategoryProfile(elm);
              }}
              size="small"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteCategory(elm.id);
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
              Add Category
            </Button>
          </div>
        </Flex>
        <div className="table-responsive">
          <Table
            columns={tableColumns}
            dataSource={categoryValue.Categorys}
            loading={categoryValue.loading}
            rowKey="id"
            size="small"
            pagination={false}
          />
          <br></br>
          <br></br>
          <Pagination
            loading={categoryValue.loading}
            current={pageIndex}
            total={categoryValue.metadata?.totalRecords}
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
        {/* {categoryProfileVisible && <CategoryView data={selectedCategory} visible={categoryProfileVisible} close={() => { closeCategoryProfile() }} />} */}
        {categoryEditFormVisible && <CategoryEditForm data={selectedCategory} visible={categoryEditFormVisible}    callbackFn={resetPageSize} close={() => { closeCategoryEditForm() }} />}

        {formVisible && (
          <CategoryForm
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

export default CategoryList;
