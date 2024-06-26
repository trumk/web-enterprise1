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
    getEventsByFaculty: {
      filterEvent: null,
      isFetching: false,
      error: false
    },
    searchFaculty: { 
      filterFaculty: null,
      isFetching: false,
      error: false,
    },
    msg:"",
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
    addFacultySuccess: (state, action) => {
      state.addFaculty.isFetching = false;
      state.addFaculty.error = false;
      state.msg = action.payload;
    },
    addFacultyFailed: (state, action) => {
      state.addFaculty.isFetching = false;
      state.addFaculty.error = true;
      state.msg = action.payload;
    },
    editFacultyStart: (state) => {
      state.editFaculty.isFetching = true;
      state.editFaculty.error = false;
    },
    editFacultySuccess: (state, action) => {
      state.editFaculty.isFetching = false;
      state.editFaculty.error = false;
      state.msg = action.payload;
    },
    editFacultyFailed: (state, action) => {
      state.editFaculty.isFetching = false;
      state.editFaculty.error = true;
      state.msg = action.payload;
    },
    deleteFacultyStart: (state) => { 
      state.deleteFaculty.isFetching = true;
      state.deleteFaculty.error = false;
    },
    deleteFacultySuccess: (state, action) => { 
      state.deleteFaculty.isFetching = false;
      state.deleteFaculty.error = false;
      state.msg = action.payload;
    },
    deleteFacultyFailed: (state, action) => { 
      state.deleteFaculty.isFetching = false;
      state.deleteFaculty.error = true;
      state.msg = action.payload;
    },
    getEventsByFacultyStart: (state) => {
      state.getEventsByFaculty.isFetching = true;
    },
    getEventsByFacultySuccess: (state, action) => {
      state.getEventsByFaculty.filterEvent = action.payload
      state.getEventsByFaculty.isFetching = false;
      state.getEventsByFaculty.error = false;
    },
    getEventsByFacultyFailed: (state) => {
      state.getEventsByFaculty.isFetching = false;
      state.getEventsByFaculty.error = true;
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
  getEventsByFacultyStart,
  getEventsByFacultySuccess,
  getEventsByFacultyFailed,
  searchFacultyStart,
  searchFacultySuccess,
  searchFacultyFailed
} = facultySlice.actions;
export default facultySlice.reducer;
