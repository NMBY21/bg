
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  UserService from 'services/userService'

const initialState = {
  loading: false,
  Users: [],
  error: ''

}

// Generates pending, fulfilled and rejected action types
export const fetchUser = createAsyncThunk('user/fetchUsers', () => {
  return UserService.getAll()
})
export const createUser = createAsyncThunk(
  "User/createUser",
   (data, { rejectWithValue }) => {
    try {
      return UserService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignUserRole = createAsyncThunk(
  "User/AssignUserRole",
   (data, { rejectWithValue }) => {
    try {
      return UserService.AssignUserRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateUser = createAsyncThunk(
  "product/updateUser",
  async (data, { rejectWithValue }) => {
    try {
      return UserService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteUser = createAsyncThunk(
  "User/DeleteUser",
    (id, { rejectWithValue }) => {
    try {
      // message.success({ content: `User Deleted Successfully`, duration: 2 });
      return UserService.deleteUser(id);
      

      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const UserSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false
      state.Users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false
      state.Users = []
      state.error = action.error.message
    })
    builder.addCase(createUser.pending, state => {
      state.loading = true
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false
      // state.Users.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false
      // state.Users = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateUser.pending, state => {
      state.loading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false
      state.Users=[]
      state.error = 'Something went wrong'
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignUserRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignUserRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignUserRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteUser.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteUser.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteUser.rejected, (state, action) => {
      state.loading = false
      state.Users = []
      state.error = action.error.message
    })
  }
})
export default UserSlice.reducer
