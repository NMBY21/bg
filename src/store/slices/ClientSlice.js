
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  ClientService from 'services/clientService'

const initialState = {
  loading: false,
  loadingclaims:false,
  Clients: [],
  Client: null,
  error: ''

}

export const fetchClient = createAsyncThunk('client/fetchClients', (status) => {
  return ClientService.getAll(status)
})

export const fetchClientById = createAsyncThunk('client/fetchClientById', (id) => {
  return ClientService.getbyID(id)
})

export const createClient = createAsyncThunk(
  "Client/createClient",
   (data, { rejectWithValue }) => {
    try {
      return ClientService.save(data)

    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateClient = createAsyncThunk(
  "product/updateClient",
   (payload,{ rejectWithValue }) => { 
    
    try {
      return ClientService.update(payload.data,payload.id)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteClient = createAsyncThunk(
  "Client/DeleteClient",
    (id, { rejectWithValue }) => {
    try {
       return ClientService.deleteClient(id);
      message.success({ content: `Client Deleted Successfully`, duration: 2 });

      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const ClientSlice = createSlice({
  name: 'client',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchClient.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.loading = false
      state.Clients = action.payload
      state.error = ''
    })
    builder.addCase(fetchClient.rejected, (state, action) => {
      state.loading = false
      state.Client = []
      state.error = action.error.message
    })
    builder.addCase(fetchClientById.pending, state => {
      state.loadingclaims = true
      
    })
    builder.addCase(fetchClientById.fulfilled, (state, action) => {
      state.loadingclaims = false
      state.Client = action.payload
      state.error = ''
    })
    builder.addCase(fetchClientById.rejected, (state, action) => {
      state.loadingclaims = false
      state.Client = null
      state.error = action.error.message
    })
    builder.addCase(createClient.pending, state => {
      state.loading = true
    })
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.loading = false
      // state.Clients.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createClient.rejected, (state, action) => {
      state.loading = false
      // state.Clients = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateClient.pending, state => {
      state.loading = true
    })
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.loading = false
      // state.Clients = state.Clients.filter((_) => _.id !== action.payload.id);
      // state.Clients.unshift(action.payload);
    //   state.Clients = action.payload
      state.error = ''
    })
    builder.addCase(updateClient.rejected, (state, action) => {
      state.loading = false
      // state.Clients = []
      state.error = action.error.message
    })
    builder.addCase(DeleteClient.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteClient.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteClient.rejected, (state, action) => {
      state.loading = false
      state.Clients = []
      state.error = action.error.message
    })
  }
})
export default ClientSlice.reducer
