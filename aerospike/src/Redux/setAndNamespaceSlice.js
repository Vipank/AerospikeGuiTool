import { createSlice } from "@reduxjs/toolkit";

export const setNamespaceSlice = createSlice({
	name: "counter",
	initialState: {
		selectedNamespace: "test",
		namespaceList: ["test"],
		setList: [],
		selectedSet: "",
	},
	reducers: {
		setNamespaceList: (state, action) => {
			state.namespaceList = action.payload;
		},
		setSlectedNamespace: (state, action) => {
			state.selectedNamespace = action.payload;
		},
		setSetList: (state, action) => {
			state.setList = action.payload;
		},
		setSlectedSet: (state, action) => {
			state.selectedSet = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setNamespaceList, setSlectedNamespace, setSetList, setSlectedSet } = setNamespaceSlice.actions;

export default setNamespaceSlice.reducer;
