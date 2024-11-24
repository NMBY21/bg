
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message, notification } from 'antd';
import  CategoryService from 'services/CategoryService'

const initialState = {
  loading: false,
  loadingcategory: false,
  Categorys: [],
  Category: null,
  CategorySelectList: [],
  error: '',
  metadata:null,
  loadingSelect:false
}

// Generates pending, fulfilled and rejected action types
export const fetchCategory = createAsyncThunk('Category/fetchCategorys', (payload) => {
  return CategoryService.getAll(payload)
})

export const fetchCategoryById = createAsyncThunk('Category/fetchCategoryById', (id) => {
  return CategoryService.getById(id)
})
//to differentiate the states
export const fetchCategorySelectList = createAsyncThunk('Category/fetchCategorySelectList', () => {
  return CategoryService.getForSelect()
})

export const createCategory = createAsyncThunk(
  "Category/createCategory",
   (data, { rejectWithValue }) => {
    try {
      return CategoryService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignCategoryRole = createAsyncThunk(
  "Category/AssignCategoryRole",
   (data, { rejectWithValue }) => {
    try {
      return CategoryService.AssignCategoryRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateCategory = createAsyncThunk(
  "product/updateCategory",
  async (data, { rejectWithValue }) => {
    try {
      return CategoryService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteCategory = createAsyncThunk(
  "Category/DeleteCategory",
    async (id, { rejectWithValue }) => {
    try {
      return await CategoryService.deleteCategory(id);
      } catch (error) {
        return rejectWithValue(error || "something went wrong try again");
      }
  }
);
export const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchCategory.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false
      state.Categorys = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false
      state.CategorySelectList = []
      state.error = action.payload.response.data.errors[0]
      notification.error({
       message: 'Error Occured',
       description : action.payload.response.data.errors[0]
     })
    })
    //
    builder.addCase(fetchCategorySelectList.pending, state => {
      state.loadingSelect = true
    })
    builder.addCase(fetchCategorySelectList.fulfilled, (state, action) => {
      state.loadingSelect = false
      state.CategorySelectList = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchCategorySelectList.rejected, (state, action) => {
      state.loadingSelect = false
      state.CategorySelectList = []
      state.error = action.payload.response.data.errors[0]
      notification.error({
       message: 'Error Occured',
       description : action.payload.response.data.errors[0]
     })
    })
    //
     //
     builder.addCase(fetchCategoryById.pending, state => {
      state.loadingcategory = true
    })
    builder.addCase(fetchCategoryById.fulfilled, (state, action) => {
      state.loadingcategory = false
      state.Category = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchCategoryById.rejected, (state, action) => {
      state.loadingcategory = false
      state.Category = []
      state.error = action.payload.response.data.errors[0]
      notification.error({
       message: 'Error Occured',
       description : action.payload.response.data.errors[0]
     })
    })
    //
    builder.addCase(createCategory.pending, state => {
      state.loading = true
    })
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.loading = false
      // state.Categorys.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.response.data.errors[0]
      notification.error({
       message: 'Error Occured',
       description : action.payload.response.data.errors[0]
     })
    })
    builder.addCase(updateCategory.pending, state => {
      state.loading = true
    })
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.loading = false
      state.Categorys=[]
      state.Category=null;
      state.error = null
    })
    builder.addCase(updateCategory.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.response.data.errors[0]
      notification.error({
       message: 'Error Occured',
       description : action.payload.response.data.errors[0]
     })
    })
    builder.addCase(AssignCategoryRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignCategoryRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = null
    })
    builder.addCase(AssignCategoryRole.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.response.data.errors[0]
      notification.error({
       message: 'Error Occured',
       description : action.payload.response.data.errors[0]
     })
    })
    builder.addCase(DeleteCategory.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteCategory.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteCategory.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.response.data.errors[0]
       notification.error({
        message: 'Error Occured',
        description : action.payload.response.data.errors[0]
      })
    })
  }
})
export default CategorySlice.reducer
