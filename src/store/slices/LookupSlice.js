
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  LookupService from 'services/lookupService'

const initialState = {
  loading: false,
  Lookups: [],
  error: '',
  metadata:null
}

// Generates pending, fulfilled and rejected action types
export const fetchLookup = createAsyncThunk('Lookup/fetchLookups', (payload) => {
  return LookupService.getAll(payload)
})
export const createLookup = createAsyncThunk(
  "Lookup/createLookup",
   (data, { rejectWithValue }) => {
    try {
      return LookupService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignLookupRole = createAsyncThunk(
  "Lookup/AssignLookupRole",
   (data, { rejectWithValue }) => {
    try {
      return LookupService.AssignLookupRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateLookup = createAsyncThunk(
  "product/updateLookup",
  async (data, { rejectWithValue }) => {
    try {
      return LookupService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteLookup = createAsyncThunk(
  "Lookup/DeleteLookup",
    (id, { rejectWithValue }) => {
    try {
      // message.success({ content: `Lookup Deleted Successfully`, duration: 2 });
      return LookupService.deleteLookup(id);
      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const LookupSlice = createSlice({
  name: 'Lookup',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchLookup.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchLookup.fulfilled, (state, action) => {
      state.loading = false
      state.Lookups = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchLookup.rejected, (state, action) => {
      state.loading = false
      state.Lookups = []
      state.error = action.error.message
    })
    builder.addCase(createLookup.pending, state => {
      state.loading = true
    })
    builder.addCase(createLookup.fulfilled, (state, action) => {
      state.loading = false
      // state.Lookups.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createLookup.rejected, (state, action) => {
      state.loading = false
      // state.Lookups = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateLookup.pending, state => {
      state.loading = true
    })
    builder.addCase(updateLookup.fulfilled, (state, action) => {
      state.loading = false
      state.Lookups=[]
      state.error = 'Something went wrong'
    })
    builder.addCase(updateLookup.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignLookupRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignLookupRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignLookupRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteLookup.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteLookup.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteLookup.rejected, (state, action) => {
      state.loading = false
      state.Lookups = []
      state.error = action.error.message
    })
  }
})
export default LookupSlice.reducer
