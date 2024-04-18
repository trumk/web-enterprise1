import { createSlice } from "@reduxjs/toolkit";

const contributionSlice = createSlice({
  name: "contribution",
  initialState: {
    contributions: {
      allContributions: null,
      isFetching: false,
      error: false,
    },
    contribution: {
      currentContribution: null,
      isFetching: false,
      error: false,
    },
    submitContribution: {
      isFetching: false,
      error: false,
    },
    getContributionsByEvent: {
      contributions: null,
      isFetching: false,
      error: false,
    },
    userContributions: {
      contributions: null,
      isFetching: false,
      error: false,
    },
    editContribution: {
      currentContribution: null,
      isFetching: false,
      error: false,
    },
    deleteContribution: {
      isFetching: false,
      error: false,
    },
    comment: {
      isFetching: false,
      error: false,
    },
    publish: {
      isFetching: false,
      error: false,
    },
    searchContribution: {
      filterContribution: null,
      isFetching: false,
      error: false,
    },
    searchByName: {
      filterContribution: null,
      isFetching: false,
      error: false,
    },
    exception: {
      exceptionContributions: null,
      isFetching: false,
      error: false,
    }
  },
  reducers: {
    getContributionsStart: (state) => {
      state.contributions.isFetching = true;
    },
    getContributionsFailed: (state) => {
      state.contributions.isFetching = false;
      state.contributions.error = true;
    },
    getContributionsSuccess: (state, action) => {
      state.contributions.isFetching = false;
      state.contributions.allContributions = action.payload;
      state.contributions.error = false;
    },
    getContributionStart: (state) => {
      state.contribution.isFetching = true;
    },
    getContributionFailed: (state) => {
      state.contribution.isFetching = false;
      state.contribution.error = true;
    },
    getContributionSuccess: (state, action) => {
      state.contribution.isFetching = false;
      state.contribution.currentContribution = action.payload;
      state.contribution.error = false;
    },
    submitContributionStart: (state) => {
      state.submitContribution.isFetching = true;
    },
    submitContributionSuccess: (state) => {
      state.submitContribution.isFetching = false;
      state.submitContribution.error = false;
    },
    submitContributionFailed: (state) => {
      state.submitContribution.isFetching = false;
      state.submitContribution.error = true;
    },
    getContributionsByEventStart: (state) => {
      state.getContributionsByEvent.isFetching = true;
    },
    getContributionsByEventFailed: (state) => {
      state.getContributionsByEvent.isFetching = false;
      state.getContributionsByEvent.error = true;
    },
    getContributionsByEventSuccess: (state, action) => {
      state.getContributionsByEvent.isFetching = false;
      state.getContributionsByEvent.contributions = action.payload;
      state.getContributionsByEvent.error = false;
    },
    userContributionsStart: (state) => {
      state.userContributions.isFetching = true;
    },
    userContributionsFailed: (state) => {
      state.userContributions.isFetching = false;
      state.userContributions.error = true;
    },
    userContributionsSuccess: (state, action) => {
      state.userContributions.isFetching = false;
      state.userContributions.contributions = action.payload;
      state.userContributions.error = false;
    },
    editContributionStart: (state) => {
      state.editContribution.isFetching = true;
    },
    editContributionSuccess: (state, action) => {
      state.editContribution.currentContribution = action.payload;
      state.editContribution.isFetching = false;
      state.editContribution.error = false;
    },
    editContributionFailed: (state) => {
      state.editContribution.isFetching = false;
      state.editContribution.error = true;
    },
    deleteContributionStart: (state) => {
      state.deleteContribution.isFetching = true;
    },
    deleteContributionSuccess: (state) => {
      state.deleteContribution.isFetching = false;
      state.deleteContribution.error = false;
    },
    deleteContributionFailed: (state) => {
      state.deleteContribution.isFetching = false;
      state.deleteContribution.error = true;
    },
    commentStart: (state) => {
      state.comment.isFetching = true;
    },
    commentSuccess: (state) => {
      state.comment.isFetching = false;
      state.comment.error = false;
    },
    commentFailed: (state) => {
      state.comment.isFetching = false;
      state.comment.error = true;
    },
    publishStart: (state) => {
      state.publish.isFetching = true;
    },
    publishSuccess: (state) => {
      state.publish.isFetching = false;
      state.publish.error = false;
    },
    publishFailed: (state) => {
      state.publish.isFetching = false;
      state.publish.error = true;
    },
    searchContributionStart: (state) => {
      state.searchContribution.isFetching = true;
      state.searchContribution.error = false;
    },
    searchContributionSuccess: (state, action) => {
      state.searchContribution.isFetching = false;
      state.searchContribution.filterContribution = action.payload;
      state.searchContribution.error = false;
    },
    searchContributionFailed: (state) => {
      state.searchContribution.isFetching = false;
      state.searchContribution.error = true;
    },
    searchByNameStart: (state) => {
      state.searchByName.isFetching = true;
      state.searchByName.error = false;
    },
    searchByNameSuccess: (state, action) => {
      state.searchByName.isFetching = false;
      state.searchByName.filterContribution = action.payload;
      state.searchByName.error = false;
    },
    searchByNameFailed: (state) => {
      state.searchByName.isFetching = false;
      state.searchByName.error = true;
    },
    getExceptionStart: (state) => {
      state.exception.isFetching = true;
    },
    getExceptionSuccess: (state, action) => {
      state.exception.isFetching = false;
      state.exception.exceptionContributions = action.payload;
      state.exception.error = false;
    },
    getExceptionFailed: (state) => {
      state.exception.isFetching = false;
      state.exception.error = true;
    },
  },
});
export const {
  getContributionsStart,
  getContributionsFailed,
  getContributionsSuccess,
  getContributionStart,
  getContributionFailed,
  getContributionSuccess,
  submitContributionStart,
  submitContributionSuccess,
  submitContributionFailed,
  getContributionsByEventStart,
  getContributionsByEventFailed,
  getContributionsByEventSuccess,
  userContributionsStart,
  userContributionsFailed,
  userContributionsSuccess,
  editContributionStart,
  editContributionSuccess,
  editContributionFailed,
  deleteContributionStart,
  deleteContributionSuccess,
  deleteContributionFailed,
  commentStart,
  commentSuccess,
  commentFailed,
  publishStart,
  publishSuccess,
  publishFailed,
  searchContributionStart,
  searchContributionSuccess,
  searchContributionFailed,
  searchByNameStart,
  searchByNameSuccess,
  searchByNameFailed,
  getExceptionStart,
  getExceptionSuccess,
  getExceptionFailed,
} = contributionSlice.actions;
export default contributionSlice.reducer;
