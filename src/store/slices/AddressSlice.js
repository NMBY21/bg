import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import AddressService from "services/AddressService";

const initialState = {
  loading: false,
  Addresss: [],
  SelectAddress: [],
  SelectLoading: false,
  error: "",
  metadata: null,
};

// Generates pending, fulfilled and rejected action types
export const fetchAddress = createAsyncThunk(
  "Address/fetchAddresss",
  (payload) => {
    return AddressService.getAll(payload);
  }
);
export const fetchAddressForSelect = createAsyncThunk(
  "Address/fetchAddressForSelect",
  () => {
    return AddressService.getallactive();
  }
);
export const createAddress = createAsyncThunk(
  "Address/createAddress",
  (data, { rejectWithValue }) => {
    try {
      return AddressService.save(data);
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const AssignAddressRole = createAsyncThunk(
  "Address/AssignAddressRole",
  (data, { rejectWithValue }) => {
    try {
      return AddressService.AssignAddressRole(data.id, data.roleid);
    } catch (error) {
      return rejectWithValue("something went wrong");
    }
  }
);
export const updateAddress = createAsyncThunk(
  "product/updateAddress",
  async (data, { rejectWithValue }) => {
    try {
      return AddressService.update(data);
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const DeleteAddress = createAsyncThunk(
  "Address/DeleteAddress",
  (id, { rejectWithValue }) => {
    try {
      // message.success({ content: `Address Deleted Successfully`, duration: 2 });
      return AddressService.deleteAddress(id);
    } catch (error) {
      return rejectWithValue("something went wrong try again");
    }
  }
);
export const AddressSlice = createSlice({
  name: "Address",
  initialState,
  extraReducers: (builder) => {
    //
    builder.addCase(fetchAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.Addresss = action.payload.payload;
      state.metadata = action.payload;
      state.error = "";
    });
    builder.addCase(fetchAddress.rejected, (state, action) => {
      state.loading = false;
      state.Addresss = [];
      state.error = action.error.message;
    });
    //
    //
    builder.addCase(fetchAddressForSelect.pending, (state) => {
      state.SelectLoading = true;
    });
    builder.addCase(fetchAddressForSelect.fulfilled, (state, action) => {
      state.SelectLoading = false;
      state.SelectAddress = action.payload.payload;
      state.error = "";
    });
    builder.addCase(fetchAddressForSelect.rejected, (state, action) => {
      state.SelectLoading = false;
      state.SelectAddress = [];
      state.error = action.error.message;
    });
    //
    builder.addCase(createAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.loading = false;
      // state.Addresss.unshift(action.payload)
      state.error = "Something went wrong";
    });
    builder.addCase(createAddress.rejected, (state, action) => {
      state.loading = false;
      // state.Addresss = []
      state.error = "Something went wrong";
    });
    builder.addCase(updateAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      state.loading = false;
      state.Addresss = [];
      state.error = "Something went wrong";
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
    builder.addCase(AssignAddressRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(AssignAddressRole.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
    builder.addCase(AssignAddressRole.rejected, (state, action) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
    builder.addCase(DeleteAddress.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(DeleteAddress.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(DeleteAddress.rejected, (state, action) => {
      state.loading = false;
      state.Addresss = [];
      state.error = action.error.message;
    });
  },
});
export default AddressSlice.reducer;
