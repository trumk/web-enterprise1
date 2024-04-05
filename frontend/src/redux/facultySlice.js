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
    addFaculty: {
      isFetching: false,
      error: false,
    },
    editFaculty: {
      currentFaculty: null,
      isFetching: false,
      error: false,
    },
    deleteFaculty: { 
      isFetching: false,
      error: false,
    },
    searchFaculty: { 
      filterFaculty: null,
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
    addFacultyStart: (state) => {
      state.addFaculty.isFetching = true;
      state.addFaculty.error = false;
    },
    addFacultySuccess: (state) => {
      state.addFaculty.isFetching = false;
      state.addFaculty.error = false;
    },
    addFacultyFailed: (state) => {
      state.addFaculty.isFetching = false;
      state.addFaculty.error = true;
    },
    editFacultyStart: (state) => {
      state.editFaculty.isFetching = true;
      state.editFaculty.error = false;
    },
    editFacultySuccess: (state) => {
      state.editFaculty.isFetching = false;
      state.editFaculty.error = false;
    },
    editFacultyFailed: (state) => {
      state.editFaculty.isFetching = false;
      state.editFaculty.error = true;
    },
    deleteFacultyStart: (state) => { 
      state.deleteFaculty.isFetching = true;
      state.deleteFaculty.error = false;
    },
    deleteFacultySuccess: (state) => { 
      state.deleteFaculty.isFetching = false;
      state.deleteFaculty.error = false;
    },
    deleteFacultyFailed: (state) => { 
      state.deleteFaculty.isFetching = false;
      state.deleteFaculty.error = true;
    },
    searchFacultyStart: (state) => {
      state.searchFaculty.isFetching = true;
      state.searchFaculty.error = false;
    },
    searchFacultySuccess: (state, action) => {
      state.searchFaculty.isFetching = false;
      state.searchFaculty.filterFaculty = action.payload;
      state.searchFaculty.error = false;
    },
    searchFacultyFailed: (state) => {
      state.searchFaculty.isFetching = false;
      state.searchFaculty.error = true
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
  addFacultyStart,
  addFacultySuccess,
  addFacultyFailed,
  editFacultyStart,
  editFacultySuccess,
  editFacultyFailed,
  deleteFacultyStart,
  deleteFacultySuccess,
  deleteFacultyFailed,
  searchFacultyStart,
  searchFacultySuccess,
  searchFacultyFailed
} = facultySlice.actions;
export default facultySlice.reducer;
