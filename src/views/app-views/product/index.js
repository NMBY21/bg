import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Product = () => (
	<Routes>
		<Route path="*" element={<Navigate to="product-list" replace />} />
	</Routes>
);

export default Product

