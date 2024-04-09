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
} = contributionSlice.actions;
export default contributionSlice.reducer;