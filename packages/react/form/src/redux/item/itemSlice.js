import {createSelector, createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: {},
    selectedItem:{},
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        updateSliceItem: (state, action) => {
            const newItem = action.payload.data;
            const sliceType = action.payload.sliceType;

            // 1. Check if the sliceType key exists in the plain object
            if (!state.items[sliceType]) {
                // 2. If not, initialize it with an empty array
                state.items[sliceType] = [];
            }

            // 3. Access the array using plain object bracket notation
            const sliceItems = state.items[sliceType];

            // Find the item index in the array
            const existingItemIndex = sliceItems.findIndex(
                item => {
                    return newItem.id && item.id === newItem.id
                }
            );

            if (existingItemIndex !== -1) {
                // Update the existing item
                sliceItems[existingItemIndex] = newItem;
            } else {
                // Push a new item
                sliceItems.push(newItem);
            }
        },
        selectSliceItem(state, action) {
            const sliceType = action.payload.sliceType;
            // Uses plain object bracket notation, which is correct and serializable.
            state.selectedItem[sliceType] = action.payload.data;
        },
        deleteSliceItem(state, action) {
            const sliceType = action.payload.sliceType;
            const itemToDelete = action.payload.data;

            // Check if the array exists before trying to filter it.
            if (state.items[sliceType]) {
                // Use bracket notation to access the array and reassign the key's value
                // with the filtered array.
                state.items[sliceType] = state.items[sliceType].filter(
                    item => item.id !== itemToDelete.id
                );
            }
        }
    },
})

const selectAllItems = (state) => state.item.items;
const getSliceType = (state, sliceType) => sliceType;
export const selectAllItemsBySliceType= () =>
    createSelector(
        [selectAllItems, getSliceType],
        (items, sliceType) => {
            console.log("Selecting items for sliceType:", sliceType, items);

            // Use standard object property access (items[sliceType])
            // instead of the Map methods (.has() and .get()).

            // 1. Check if the property exists using standard JS existence check
            if (items[sliceType]) {
                // 2. Return the value (the array of items)
                return items[sliceType];
            }

            // 3. Return a default empty array if the sliceType hasn't been initialized
            return [];
        }
    );


const getSelectedItem = (state) => state.item.selectedItem;


export const getSelectedItemBySliceType=()=>
    createSelector(
        [getSelectedItem, getSliceType],
        (item, sliceType) => {
            console.log("Selecting item for sliceType:", sliceType+' selectedItem');
            if (item[sliceType]) {
                return item[sliceType];
            } return {};
        }
    );

export const { updateSliceItem,selectSliceItem,deleteSliceItem } = itemSlice.actions
export default itemSlice.reducer