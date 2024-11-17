import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

interface ItemsState {
  items: any[];
  selectedItem: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
};

// Fetch all items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await apiClient.get('/search/stays/filtered');
  console.log('Fetching items', response);
  return response.data;
});

// Fetch a single item by ID
export const fetchSingleItem = createAsyncThunk(
  'items/fetchSingleItem',
  async (id: number) => {
    const response = await apiClient.get(`/search/stays/${id}`);
    console.log('Fetching single item', response);
    return response.data;
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    getItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      state.selectedItem = item || null;
    },
    getAllItems: (state) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch items';
        state.loading = false;
      })
      .addCase(fetchSingleItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleItem.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedItem = action.payload;
        state.loading = false;
      })
      .addCase(fetchSingleItem.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch the item';
        state.loading = false;
      });
  },
});

export const { getItem, getAllItems } = itemsSlice.actions;

export default itemsSlice.reducer;
