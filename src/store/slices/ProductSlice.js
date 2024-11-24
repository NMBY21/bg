
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  ProductService from 'services/ProductService'

const initialState = {
  loading: false,
  loadingproduct: false,
  Products: [],
  Product: null,
  ProductSelectList: [],
  error: '',
  metadata:null,
  loadingSelect:false
}

// Generates pending, fulfilled and rejected action types
export const fetchProduct = createAsyncThunk('Product/fetchProducts', (payload) => {
  return ProductService.getAll(payload)
})

export const fetchProductById = createAsyncThunk('Product/fetchProductById', (id) => {
  return ProductService.getById(id)
})
//to differentiate the states
export const fetchProductSelectList = createAsyncThunk('Product/fetchProductSelectList', (payload) => {
  return ProductService.getAll(payload)
})

export const createProduct = createAsyncThunk(
  "Product/createProduct",
   (data, { rejectWithValue }) => {
    try {
      return ProductService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignProductRole = createAsyncThunk(
  "Product/AssignProductRole",
   (data, { rejectWithValue }) => {
    try {
      return ProductService.AssignProductRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data, { rejectWithValue }) => {
    try {
      return ProductService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteProduct = createAsyncThunk(
  "Product/DeleteProduct",
    (id, { rejectWithValue }) => {
    try {
      return ProductService.deleteProduct(id);
      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const ProductSlice = createSlice({
  name: 'Product',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false
      state.Products = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false
      state.ProductSelectList = []
      state.error = action.error.message
    })
    //
    builder.addCase(fetchProductSelectList.pending, state => {
      state.loadingSelect = true
    })
    builder.addCase(fetchProductSelectList.fulfilled, (state, action) => {
      state.loadingSelect = false
      state.ProductSelectList = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchProductSelectList.rejected, (state, action) => {
      state.loadingSelect = false
      state.ProductSelectList = []
      state.error = action.error.message
    })
    //
     //
     builder.addCase(fetchProductById.pending, state => {
      state.loadingproduct = true
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.loadingproduct = false
      state.Product = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.loadingproduct = false
      state.Product = []
      state.error = action.error.message
    })
    //
    builder.addCase(createProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false
      // state.Products.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false
      // state.Products = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false
      state.Products=[]
      state.Product=null;
      state.error = 'Something went wrong'
    })
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignProductRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignProductRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignProductRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteProduct.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteProduct.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteProduct.rejected, (state, action) => {
      state.loading = false
      state.Products = []
      state.error = action.error.message
    })
  }
})
export default ProductSlice.reducer
