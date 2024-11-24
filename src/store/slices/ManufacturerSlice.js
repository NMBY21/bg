
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  ManufacturerService from 'services/ManufactutrerService'

const initialState = {
  loading: false,
  loadingmanufacturer: false,
  Manufacturers: [],
  Manufacturer: null,
  ManufacturerSelectList: [],
  error: '',
  metadata:null,
  loadingSelect:false
}

// Generates pending, fulfilled and rejected action types
export const fetchManufacturer = createAsyncThunk('Manufacturer/fetchManufacturers', (payload) => {
  return ManufacturerService.getAll(payload)
})

export const fetchManufacturerById = createAsyncThunk('Manufacturer/fetchManufacturerById', (id) => {
  return ManufacturerService.getById(id)
})
//to differentiate the states
export const fetchManufacturerSelectList = createAsyncThunk('Manufacturer/fetchManufacturerSelectList', (payload) => {
  return ManufacturerService.getAll(payload)
})

export const createManufacturer = createAsyncThunk(
  "Manufacturer/createManufacturer",
   (data, { rejectWithValue }) => {
    try {
      return ManufacturerService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignManufacturerRole = createAsyncThunk(
  "Manufacturer/AssignManufacturerRole",
   (data, { rejectWithValue }) => {
    try {
      return ManufacturerService.AssignManufacturerRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateManufacturer = createAsyncThunk(
  "product/updateManufacturer",
  async (data, { rejectWithValue }) => {
    try {
      return ManufacturerService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteManufacturer = createAsyncThunk(
  "Manufacturer/DeleteManufacturer",
    (id, { rejectWithValue }) => {
    try {
      return ManufacturerService.deleteManufacturer(id);
      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const ManufacturerSlice = createSlice({
  name: 'Manufacturer',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchManufacturer.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchManufacturer.fulfilled, (state, action) => {
      state.loading = false
      state.Manufacturers = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchManufacturer.rejected, (state, action) => {
      state.loading = false
      state.ManufacturerSelectList = []
      state.error = action.error.message
    })
    //
    builder.addCase(fetchManufacturerSelectList.pending, state => {
      state.loadingSelect = true
    })
    builder.addCase(fetchManufacturerSelectList.fulfilled, (state, action) => {
      state.loadingSelect = false
      state.ManufacturerSelectList = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchManufacturerSelectList.rejected, (state, action) => {
      state.loadingSelect = false
      state.ManufacturerSelectList = []
      state.error = action.error.message
    })
    //
     //
     builder.addCase(fetchManufacturerById.pending, state => {
      state.loadingmanufacturer = true
    })
    builder.addCase(fetchManufacturerById.fulfilled, (state, action) => {
      state.loadingmanufacturer = false
      state.Manufacturer = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchManufacturerById.rejected, (state, action) => {
      state.loadingmanufacturer = false
      state.Manufacturer = []
      state.error = action.error.message
    })
    //
    builder.addCase(createManufacturer.pending, state => {
      state.loading = true
    })
    builder.addCase(createManufacturer.fulfilled, (state, action) => {
      state.loading = false
      // state.Manufacturers.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createManufacturer.rejected, (state, action) => {
      state.loading = false
      // state.Manufacturers = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateManufacturer.pending, state => {
      state.loading = true
    })
    builder.addCase(updateManufacturer.fulfilled, (state, action) => {
      state.loading = false
      state.Manufacturers=[]
      state.Manufacturer=null;
      state.error = 'Something went wrong'
    })
    builder.addCase(updateManufacturer.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignManufacturerRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignManufacturerRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignManufacturerRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteManufacturer.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteManufacturer.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteManufacturer.rejected, (state, action) => {
      state.loading = false
      state.Manufacturers = []
      state.error = action.error.message
    })
  }
})
export default ManufacturerSlice.reducer
