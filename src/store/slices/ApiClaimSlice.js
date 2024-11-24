
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  ClientService from 'services/clientService'

const initialState = {
  loading: false,
  ApiClaims: [],
  error: ''

}

export const fetchApiClaim = createAsyncThunk('apiclaim/fetchApiClaims', () => {
  return ClientService.getAllApiClaims()
})
export const ApiClaimSlice = createSlice({
  name: 'apiclaim',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchApiClaim.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchApiClaim.fulfilled, (state, action) => {
      state.loading = false
      state.ApiClaims = action.payload
      state.error = ''
    })
    builder.addCase(fetchApiClaim.rejected, (state, action) => {
      state.loading = false
      state.ApiClaims = []
      state.error = action.error.message
    })
  }
})
export default ApiClaimSlice.reducer
