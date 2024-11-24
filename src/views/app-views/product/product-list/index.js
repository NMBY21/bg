import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Table, Select, Input, Button, Badge, Menu } from 'antd';
import ProductListData from "assets/data/product-list.data.json"
import { EyeOutlined, DeleteOutlined, SearchOutlined, PlusCircleOutlined } from '@ant-design/icons';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';
import Flex from 'components/shared-components/Flex'
import NumberFormat from 'react-number-format';
import { useNavigate } from "react-router-dom";
import utils from 'utils'
import { fetchProduct, DeleteProduct } from "store/slices/ProductSlice";
import { IMAGE_API_BASE_URL } from "configs/AppConfig";
const { Option } = Select

const getStockStatus = stockCount => {
	if(stockCount >= 10) {
		return <><Badge status="success" /><span>In Stock</span></>
	}
	if(stockCount < 10 && stockCount > 0) {
		return <><Badge status="warning" /><span>Limited Stock</span></>
	}
	if(stockCount === 0) {
		return <><Badge status="error" /><span>Out of Stock</span></>
	}
	return null
}

const categories = ['Cloths', 'Bags', 'Shoes', 'Watches', 'Devices']

const ProductList = () => {
	const navigate = useNavigate();
	const [list, setList] = useState(ProductListData)
	const [selectedRows, setSelectedRows] = useState([])
	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const [productProfileVisible, setProfile] = useState(false);
	const [selectedProduct, setselectedProduct] = useState(null);
	const productValue = useSelector((state) => state.product);
	const [formVisible, setFormVisible] = useState(false);
	const [productEditVisible, setEditFormVisible] = useState(false);
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
		dispatch(fetchProduct(payload));
	  };
	
	  const deleteProduct = (productId) => {
		var payload = {
			pageSize: pageSize,
			pageNumber: pageIndex,
		  };
		dispatch(DeleteProduct(productId))
		  .unwrap()
		  .then(() => dispatch(fetchProduct(payload)).unwrap());
	  };
	
	const dropdownMenu = row => (
		<Menu>
			<Menu.Item onClick={() => viewDetails(row)}>
				<Flex alignItems="center">
					<EyeOutlined />
					<span className="ml-2">View Details</span>
				</Flex>
			</Menu.Item>
			<Menu.Item onClick={() =>deleteProduct(row.id)}>
				<Flex alignItems="center">
					<DeleteOutlined />
					<span className="ml-2">{selectedRows.length > 0 ? `Delete (${selectedRows.length})` : 'Delete'}</span>
				</Flex>
			</Menu.Item>
		</Menu>
	);
	
	const addProduct = () => {
		navigate(`/getnet/ecommerce-management/system/products/add-product`)
	}
	
	const viewDetails = row => {
		// navigate(`/app/apps/syste/edit-product/${row.id}`)
	}
	
	const deleteRow = row => {
		const objKey = 'id'
		let data = list
		if(selectedRows.length > 1) {
			selectedRows.forEach(elm => {
				data = utils.deleteArrayRow(data, objKey, elm.id)
				setList(data)
				setSelectedRows([])
			})
		} else {
			data = utils.deleteArrayRow(data, objKey, row.id)
			setList(data)
		}
	}

	const tableColumns = [
		{
			width: "4%",
			title: "Nº",
			render: (value, item, index) => (
			  <span>{(pageIndex - 1) * 10 + index + 1}</span>
			),
		  },
		{
			title: 'Product',
			dataIndex: 'name',
			render: (_, record) => (
				<div className="d-flex">
					<AvatarStatus size={60} type="square" src={IMAGE_API_BASE_URL +record.productImages[0]?.image?.imageUrl} name={record.productName}/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
		},
		{
			title: 'Brand',
			dataIndex: 'brand',
			render: (_, record) => (
				<div className="d-flex">
					<p>{record.brand?.brandName} </p> 
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'category')
		},
		{
			title: 'Price',
			dataIndex: 'price',
			render: price => (
				<div>
					<NumberFormat
						displayType={'text'} 
						value={(Math.round(price* 100) / 100).toFixed(2)} 
						prefix={'ETB '} 
						thousandSeparator={true} 
					/>
				</div>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'price')
		},
		{
			title: 'Stock',
			dataIndex: 'quantity',
			sorter: (a, b) => utils.antdTableSorter(a, b, 'quantity')
		},
		{
			title: 'Status',
			dataIndex: 'quantity',
			render: quantity => (
				<Flex alignItems="center">{getStockStatus(quantity)}</Flex>
			),
			sorter: (a, b) => utils.antdTableSorter(a, b, 'stock')
		},
		{
			title: '',
			dataIndex: 'actions',
			render: (_, elm) => (
				<div className="text-right">
					<EllipsisDropdown menu={dropdownMenu(elm)}/>
				</div>
			)
		}
	];
	
	const rowSelection = {
		onChange: (key, rows) => {
			setSelectedRows(rows)
			setSelectedRowKeys(key)
		}
	};

	const onSearch = e => {
		const value = e.currentTarget.value
		const searchArray = e.currentTarget.value? list : ProductListData
		const data = utils.wildCardSearch(searchArray, value)
		setList(data)
		setSelectedRowKeys([])
	}

	const handleShowCategory = value => {
		if(value !== 'All') {
			const key = 'category'
			const data = utils.filterArray(ProductListData, key, value)
			setList(data)
		} else {
			setList(ProductListData)
		}
	}

	return (
		<Card>
			<Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
				<Flex className="mb-1" mobileFlex={false}>
					<div className="mr-md-3 mb-3">
						<Input placeholder="Search" prefix={<SearchOutlined />} onChange={e => onSearch(e)}/>
					</div>
					<div className="mb-3">
						<Select 
							defaultValue="All" 
							className="w-100" 
							style={{ minWidth: 180 }} 
							onChange={handleShowCategory} 
							placeholder="Category"
						>
							<Option value="All">All</Option>
							{
								categories.map(elm => (
									<Option key={elm} value={elm}>{elm}</Option>
								))
							}
						</Select>
					</div>
				</Flex>
				<div>
					<Button onClick={addProduct} type="primary" icon={<PlusCircleOutlined />} block>Add product</Button>
				</div>
			</Flex>
			<div className="table-responsive">
				<Table 
					columns={tableColumns} 
					dataSource={productValue.Products} 
					loading={productValue.loading}
					rowKey='id' 
					rowSelection={{
						selectedRowKeys: selectedRowKeys,
						type: 'checkbox',
						preserveSelectedRowKeys: false,
						...rowSelection,
					}}
				/>
			</div>
		</Card>
	)
}

export default ProductList
