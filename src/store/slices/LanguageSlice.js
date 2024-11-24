
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  LanguageService from 'services/LanguageService'

const initialState = {
  loading: false,
  Languages: [],
  error: '',
  metadata:null
}

// Generates pending, fulfilled and rejected action types
export const fetchLanguage = createAsyncThunk('Language/fetchLanguages', () => {
  return LanguageService.getAll()
})
export const createLanguage = createAsyncThunk(
  "Language/createLanguage",
   (data, { rejectWithValue }) => {
    try {
      return LanguageService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignLanguageRole = createAsyncThunk(
  "Language/AssignLanguageRole",
   (data, { rejectWithValue }) => {
    try {
      return LanguageService.AssignLanguageRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateLanguage = createAsyncThunk(
  "product/updateLanguage",
  async (data, { rejectWithValue }) => {
    try {
      return LanguageService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteLanguage = createAsyncThunk(
  "Language/DeleteLanguage",
    (id, { rejectWithValue }) => {
    try {
      // message.success({ content: `Language Deleted Successfully`, duration: 2 });
      return LanguageService.deleteLanguage(id);
      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const LanguageSlice = createSlice({
  name: 'Language',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchLanguage.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchLanguage.fulfilled, (state, action) => {
      state.loading = false
      state.Languages = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchLanguage.rejected, (state, action) => {
      state.loading = false
      state.Languages = []
      state.error = action.error.message
    })
    builder.addCase(createLanguage.pending, state => {
      state.loading = true
    })
    builder.addCase(createLanguage.fulfilled, (state, action) => {
      state.loading = false
      // state.Languages.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createLanguage.rejected, (state, action) => {
      state.loading = false
      // state.Languages = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateLanguage.pending, state => {
      state.loading = true
    })
    builder.addCase(updateLanguage.fulfilled, (state, action) => {
      state.loading = false
      state.Languages=[]
      state.error = 'Something went wrong'
    })
    builder.addCase(updateLanguage.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignLanguageRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignLanguageRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignLanguageRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteLanguage.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteLanguage.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteLanguage.rejected, (state, action) => {
      state.loading = false
      state.Languages = []
      state.error = action.error.message
    })
  }
})
export default LanguageSlice.reducer
