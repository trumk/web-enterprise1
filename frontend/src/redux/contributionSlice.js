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
    }
},
);
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
} = contributionSlice.actions;
export default contributionSlice.reducer;