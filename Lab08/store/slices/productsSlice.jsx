import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await api.get("/products.json");
  const data = response.data || {};
  return Object.keys(data).map((id) => ({ id, ...data[id] }));
});

export const deleteProductAsync = createAsyncThunk(
  "products/delete",
  async (id) => {
    await api.delete(`/products/${id}.json`);
    return id;
  }
);

export const addProductAsync = createAsyncThunk(
  "products/add",
  async (product) => {
    const response = await api.post(`/products.json`, product);
    const id = response.data.name;
    return { id, ...product };
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    deleting: false,
    adding: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      })

      .addCase(deleteProductAsync.pending, (state) => {
        state.deleting = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (product) => product.id !== action.payload
        );
        state.deleting = false;
      })
      .addCase(deleteProductAsync.rejected, (state) => {
        state.deleting = false;
      })

      .addCase(addProductAsync.pending, (state) => {
        state.adding = true;
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.adding = false;
      })
      .addCase(addProductAsync.rejected, (state) => {
        state.adding = false;
      });
  },
});

export default productsSlice.reducer;
