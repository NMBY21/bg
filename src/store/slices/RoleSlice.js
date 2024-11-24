
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  RoleService from 'services/roleService'
import ClientService from 'services/clientService';

const initialState = {
  loading: false,
  loadingclaims:false,
  Roles: [],
  Role: null,
  error: ''

}

export const fetchRole = createAsyncThunk('role/fetchRoles', (payload) => {
  return RoleService.getAll(payload.status,payload.clientid)
})

export const fetchRoleById = createAsyncThunk('role/fetchRoleById', (id) => {
  return ClientService.getAllRolebyId(id)
})

export const createRole = createAsyncThunk(
  "Role/createRole",
   (data, { rejectWithValue }) => {
    try {
      return RoleService.save(data)

    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateRole = createAsyncThunk(
  "product/updateRole",
   (payload,{ rejectWithValue }) => { 
    
    try {
      return RoleService.update(payload.data,payload.id)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteRole = createAsyncThunk(
  "Role/DeleteRole",
    (id, { rejectWithValue }) => {
    try {
       return RoleService.deleteRole(id);

      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const RoleSlice = createSlice({
  name: 'role',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchRole.pending, state => {
      state.loading = true
      state.Roles=[]
    })
    builder.addCase(fetchRole.fulfilled, (state, action) => {
      state.loading = false
      state.Roles = action.payload
      state.error = ''
    })
    builder.addCase(fetchRole.rejected, (state, action) => {
      state.loading = false
      state.Roles = []
      state.error = action.error.message
    })
    builder.addCase(fetchRoleById.pending, state => {
      state.loadingclaims = true
      
    })
    builder.addCase(fetchRoleById.fulfilled, (state, action) => {
      state.loadingclaims = false
      state.Role = action.payload
      state.error = ''
    })
    builder.addCase(fetchRoleById.rejected, (state, action) => {
      state.loadingclaims = false
      state.Role = null
      state.error = action.error.message
    })
    builder.addCase(createRole.pending, state => {
      state.loading = true
    })
    builder.addCase(createRole.fulfilled, (state, action) => {
      state.loading = false
      // state.Roles.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createRole.rejected, (state, action) => {
      state.loading = false
      // state.Roles = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateRole.pending, state => {
      state.loading = true
    })
    builder.addCase(updateRole.fulfilled, (state, action) => {
      state.loading = false
      // state.Roles = state.Roles.filter((_) => _.id !== action.payload.id);
      // state.Roles.unshift(action.payload);
    //   state.Roles = action.payload
      state.error = ''
    })
    builder.addCase(updateRole.rejected, (state, action) => {
      state.loading = false
      // state.Roles = []
      state.error = action.error.message
    })
    builder.addCase(DeleteRole.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteRole.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteRole.rejected, (state, action) => {
      state.loading = false
      state.Roles = []
      state.error = action.error.message
    })
  }
})
export default RoleSlice.reducer
