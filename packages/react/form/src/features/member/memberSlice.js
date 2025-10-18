import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    members: [],
    selectedMember:{},
}

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        updateMember: (state, action) => {
            const newMember = action.payload;
            const existingMemberIndex = state.members.findIndex(
                member => {
                    return member.id === newMember.id
                }
            );
            if (existingMemberIndex !== -1) {
                // 2. EDIT (Update): If the member exists (index is not -1)
                // Since Redux Toolkit/Immer is used, this direct assignment is safe.

                state.members[existingMemberIndex] = newMember;
            } else {
                // 3. ADD (Insert): If the member does not exist
                state.members.push(newMember);
            }
        },
        selectMember(state, action) {
            state.selectedMember = action.payload;
        },
        deleteMember(state, action) {
            const memberToDelete = action.payload;
            state.members = state.members.filter(
                member => member.id !== memberToDelete.id
            );
        }
    },
})

export const selectAllMembers = (state) => state.member.members;
export const getSelectedMember = (state) => state.member.selectedMember;
export const { updateMember,selectMember,deleteMember } = memberSlice.actions
export default memberSlice.reducer