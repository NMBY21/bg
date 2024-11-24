
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message, notification } from 'antd';
import  BrandService from 'services/brandService'

const initialState = {
  loading: false,
  Brands: [],
  error: null,
  metadata:null
}

// Generates pending, fulfilled and rejected action types
export const fetchBrand = createAsyncThunk('Brand/fetchBrands', (payload) => {
  return BrandService.getAll(payload)
})
export const createBrand = createAsyncThunk(
  "Brand/createBrand",
   async (data, { rejectWithValue }) => {
    try {
      return await BrandService.save(data)
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const AssignBrandRole = createAsyncThunk(
  "Brand/AssignBrandRole",
   (data, { rejectWithValue }) => {
    try {
      return BrandService.AssignBrandRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateBrand = createAsyncThunk(
  "product/updateBrand",
  async (data, { rejectWithValue }) => {
    try {
      return BrandService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteBrand = createAsyncThunk(
  "Brand/DeleteBrand",
    (id, { rejectWithValue }) => {
    try {
      // message.success({ content: `Brand Deleted Successfully`, duration: 2 });
      return BrandService.deleteBrand(id);
      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const BrandSlice = createSlice({
  name: 'Brand',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchBrand.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchBrand.fulfilled, (state, action) => {
      state.loading = false
      state.Brands = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
     
    })
    builder.addCase(fetchBrand.rejected, (state, action) => {
      state.loading = false
      state.Brands = []
      state.error = action.error.message
    })
    builder.addCase(createBrand.pending, state => {
      state.loading = true
    })
    builder.addCase(createBrand.fulfilled, (state, action) => {
      state.loading = false
      // state.Brands.unshift(action.payload)
      state.error = ''
      debugger
      notification.success({
        message: 'Success',
        description:"Successfully inserted"
      })
    })
    .addCase(createBrand.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      notification.error({
        message: 'Error',
        description: 'An error occurred',
      });
    });
    builder.addCase(updateBrand.pending, state => {
      state.loading = true
    })
    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.loading = false
      state.Brands=[]
      state.error = 'Something went wrong'
    })
    builder.addCase(updateBrand.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignBrandRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignBrandRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignBrandRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteBrand.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteBrand.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteBrand.rejected, (state, action) => {
      state.loading = false
      state.Brands = []
      state.error = action.error.message
    })
  }
})
export default BrandSlice.reducer
