
import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd';
import  MediaService from 'services/MediaService'

const initialState = {
  loading: false,
  Medias: [],
  error: '',
  metadata:null
}

// Generates pending, fulfilled and rejected action types
export const fetchMedia = createAsyncThunk('Media/fetchMedias', (payload) => {
  return MediaService.getAll(payload)
})
export const createMedia = createAsyncThunk(
  "Media/createMedia",
   (data, { rejectWithValue }) => {
    try {
      return MediaService.save(data)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignMediaRole = createAsyncThunk(
  "Media/AssignMediaRole",
   (data, { rejectWithValue }) => {
    try {
      return MediaService.AssignMediaRole(data.id,data.roleid)
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateMedia = createAsyncThunk(
  "product/updateMedia",
  async (data, { rejectWithValue }) => {
    try {
      return MediaService.update(data)
      } catch (error) {
        return rejectWithValue(error.response.data.message);
      }
  }
);
export const DeleteMedia = createAsyncThunk(
  "Media/DeleteMedia",
    (id, { rejectWithValue }) => {
    try {
      return MediaService.deleteMedia(id);
      } catch (error) {
        return rejectWithValue("something went wrong try again");
      }
  }
);
export const MediaSlice = createSlice({
  name: 'Media',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchMedia.pending, state => {
      state.loading = true;
      state.Medias = [];
    })
    builder.addCase(fetchMedia.fulfilled, (state, action) => {
      state.loading = false
      state.Medias = action.payload.payload
      state.metadata=action.payload;
      state.error = ''
    })
    builder.addCase(fetchMedia.rejected, (state, action) => {
      state.loading = false
      state.Medias = []
      state.error = action.error.message
    })
    builder.addCase(createMedia.pending, state => {
      state.loading = true
    })
    builder.addCase(createMedia.fulfilled, (state, action) => {
      state.loading = false
      // state.Medias.unshift(action.payload)
      state.error = 'Something went wrong'
    })
    builder.addCase(createMedia.rejected, (state, action) => {
      state.loading = false
      // state.Medias = []
        state.error = 'Something went wrong'
    })
    builder.addCase(updateMedia.pending, state => {
      state.loading = true
    })
    builder.addCase(updateMedia.fulfilled, (state, action) => {
      state.loading = false
      state.Medias=[]
      state.error = 'Something went wrong'
    })
    builder.addCase(updateMedia.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(AssignMediaRole.pending, state => {
      state.loading = true
    })
    builder.addCase(AssignMediaRole.fulfilled, (state, action) => {
      state.loading = false
      state.error = 'Something went wrong'
    })
    builder.addCase(AssignMediaRole.rejected, (state, action) => {
      state.loading = false
        state.error = 'Something went wrong'
    })
    builder.addCase(DeleteMedia.pending, state => {
      state.loading = true
    })
    builder.addCase(DeleteMedia.fulfilled, (state, action) => {
       state.loading = false
   
    })
    builder.addCase(DeleteMedia.rejected, (state, action) => {
      state.loading = false
      state.Medias = []
      state.error = action.error.message
    })
  }
})
export default MediaSlice.reducer
