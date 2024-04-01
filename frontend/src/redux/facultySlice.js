import { createSlice } from "@reduxjs/toolkit";
const facultySlice = createSlice({
    name: "faculty",
    initialState: {
        faculties: {
            allFaculties: null,
            isFetching: false,
            error: false,
        },
        faculty: {
            currentFaculty: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getFacultiesStart: (state) => {
            state.faculties.isFetching = true;
        },
        getFacultiesSuccess: (state, action) => {
            state.faculties.isFetching = false;
            state.faculties.allFaculties = action.payload;
            state.faculties.error = false;
        },
        getFacultiesFailed: (state) => {
            state.faculties.isFetching = false;
            state.faculties.error = true;
        },
        getFacultyStart: (state) => {
            state.faculty.isFetching = true;
        },
        getFacultySuccess: (state, action) => {
            state.faculty.isFetching = false;
            state.faculty.currentFaculty = action.payload;
            state.faculty.error = false;
        },
        getFacultyFailed: (state) => {
            state.faculty.isFetching = false;
            state.faculty.error = true;
        },
    },
    
});
export const {
    getFacultiesStart,
    getFacultiesSuccess,
    getFacultiesFailed,
    getFacultyStart,
    getFacultySuccess,
    getFacultyFailed,
}=facultySlice.actions;
export default facultySlice.reducer;