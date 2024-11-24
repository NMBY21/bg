
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  TaxService from 'services/TaxService'

const initialState = {
  loading: false,
  Taxs: [],
  error: '',
  metadata:null
}

// Generates pending, fulfilled and rejected action types
export const fetchTax = createAsyncThunk('Tax/fetchTaxs', (payload) => {
  return TaxService.getAll(payload)
})
export const createTax = createAsyncThunk(
  "Tax/createTax",
   (data, { rejectWithValue }) => {
    try {
      return TaxService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignTaxRole = createAsyncThunk(
  "Tax/AssignTaxRole",
   (data, { rejectWithValue }) => {
    try {
      return TaxService.AssignTaxRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateTax = createAsyncThunk(
  "product/updateTax",
  async (data, { rejectWithValue }) => {
    try {
      return TaxService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteTax = createAsyncThunk(
  "Tax/DeleteTax",
    (id, { rejectWithValue }) => {
    try {
      // message.success({ content: `Tax Deleted Successfully`, duration: 2 });
      return TaxService.deleteTax(id);
      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const TaxSlice = createSlice({
  name: 'Tax',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchTax.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchTax.fulfilled, (state, action) => {
      state.loading = false
      state.Taxs = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchTax.rejected, (state, action) => {
      state.loading = false
      state.Taxs = []
      state.error = action.error.message
    })
    builder.addCase(createTax.pending, state => {
      state.loading = true
    })
    builder.addCase(createTax.fulfilled, (state, action) => {
      state.loading = false
      // state.Taxs.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createTax.rejected, (state, action) => {
      state.loading = false
      // state.Taxs = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateTax.pending, state => {
      state.loading = true
    })
    builder.addCase(updateTax.fulfilled, (state, action) => {
      state.loading = false
      state.Taxs=[]
      state.error = 'Something went wrong'
    })
    builder.addCase(updateTax.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignTaxRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignTaxRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignTaxRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteTax.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteTax.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteTax.rejected, (state, action) => {
      state.loading = false
      state.Taxs = []
      state.error = action.error.message
    })
  }
})
export default TaxSlice.reducer
