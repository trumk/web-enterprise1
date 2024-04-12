import axios from "axios";
import {
  changePasswordFailed,
  changePasswordStart,
  changePasswordSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
  verifyFailed,
  verifyStart,
  verifySuccess,
} from "./authSlice";
import {
  editProfileFailed,
  editProfileStart,
  editProfileSuccess,
  enrollFacultyFailed,
  enrollFacultyStart,
  enrollFacultySuccess,
  getSelfFailed,
  getSelfStart,
  getSelfSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  setRoleFailed,
  setRoleStart,
  setRoleSuccess,
} from "./userSlice";
import {
  getFacultiesStart,
  getFacultiesSuccess,
  getFacultiesFailed,
  getFacultyStart,
  getFacultySuccess,
  getFacultyFailed,
  addFacultyStart,
  addFacultyFailed,
  addFacultySuccess,
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
} from "./facultySlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { 
  editEventStart,
  editEventSuccess,
  editEventFailed,
  addEventFailed, 
  addEventStart, 
  addEventSuccess, 
  getEventFailed, 
  getEventStart, 
  getEventSuccess, 
  getEventsFailed, 
  getEventsStart, 
  getEventsSuccess,
  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailed, 
} from "./eventSlice";
import { 
  commentFailed,
  commentStart,
  commentSuccess,
  deleteContributionFailed,
  deleteContributionStart,
  deleteContributionSuccess,
  editContributionFailed,
  editContributionStart,
  editContributionSuccess,
  getContributionFailed,
  getContributionStart,
  getContributionSuccess,
  getContributionsByEventFailed,
  getContributionsByEventStart,
  getContributionsByEventSuccess,
  getContributionsFailed, 
  getContributionsStart, 
  getContributionsSuccess, 
  submitContributionFailed, 
  submitContributionStart,
  submitContributionSuccess,
  userContributionsFailed,
  userContributionsStart,
  userContributionsSuccess
} from "./contributionSlice";

const BACKEND_URL = "http://localhost:5503";
//auth
export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/login`, user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, handleSuccess) => {
  dispatch(registerStart());
  try {
    await axios.post(`${BACKEND_URL}/register`, user);
    dispatch(registerSuccess());
    handleSuccess();
  } catch (err) {
    dispatch(registerFailed());
  }
};
export const verifyAccount = async (otp, dispatch, navigate) => {
  dispatch(verifyStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/verify`, otp);
    dispatch(verifySuccess(res.data));
    navigate("/login");
  } catch (err) {
    dispatch(verifyFailed());
    console.error(err);
  }
};

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axios.post(`${BACKEND_URL}/logout`, id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed());
    console.error("Logout error:", err);
  }
};

export const getAllUsers = (accessToken) => async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/user/getAllUsers`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (err) {
    dispatch(getUsersFailed());
    console.log(err);
  }
};

export const getSelf = (id) => async (dispatch) => {
  dispatch(getSelfStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/user/${id}`);
    dispatch(getSelfSuccess(res.data));
  } catch (err) {
    dispatch(getSelfFailed());
    console.log(err)
  }
};

export const setRole = (id, role, accessToken, navigate) => async (dispatch) => {
  dispatch(setRoleStart());
  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/setRole/${id}`,
     role ,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(setRoleSuccess(response.data));
    navigate("/admin/user")
  } catch (error) {
    dispatch(setRoleFailed());
    console.log(error)
  }
};

export const changeUserPassword = async (id, accessToken, password, dispatch) => {
  dispatch(changePasswordStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/changePassword/${id}`, password, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(changePasswordSuccess(res.data));
  } catch (err) {
    dispatch(changePasswordFailed())
  }
}

export const editProfile = (id, userId, accessToken, profile, navigate) => async (dispatch) => {
  dispatch(editProfileStart())
  try {
    const res = await axios.put(`${BACKEND_URL}/user/${id}`, profile, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(editProfileSuccess(res.data));
    navigate(`/user/${userId}/profile`)
  } catch (err) {
    dispatch(editProfileFailed())
    console.log(err)
  }
}

export const joinFaculty = (id, accessToken, key, navigate) => async (dispatch) => {
  dispatch(enrollFacultyStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/faculty/enroll/${id}`, key, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(enrollFacultySuccess(res.data));
    navigate(`/faculty/${id}`)
  } catch (err) {
    dispatch(enrollFacultyFailed());
    console.log(err)
  }
}
//faculty
export const getAllFaculties = (accessToken) => async (dispatch) => {
  dispatch(getFacultiesStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/faculty/get`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getFacultiesSuccess(res.data));
  } catch (err) {
    dispatch(getFacultiesFailed());
  }
};

export const getOneFaculty = (id, accessToken) => async (dispatch) => {
  dispatch(getFacultyStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/faculty/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getFacultySuccess(res.data));
  }
  catch (err) {
    dispatch(getFacultyFailed())
  }
}

export const addFaculty = createAsyncThunk("faculty/add", async (facultyData, { getState, dispatch }) => {
  dispatch(addFacultyStart());
  try {
    const { accessToken } = getState().auth.login.currentUser;
    const response = await axios.post(
      `${BACKEND_URL}/faculty/add`,
      facultyData,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(addFacultySuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(addFacultyFailed());
    console.error(error);
    throw error;
  }
}
);

export const editFaculty = (id, faculty, accessToken, navigate) => async (dispatch) => {
  dispatch(editFacultyStart());
  try {
    const res = await axios.put(`${BACKEND_URL}/faculty/${id}`, faculty, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(editFacultySuccess(res.data));
    navigate("/admin/faculty")
  }
  catch (error) {
    dispatch(editFacultyFailed())
    console.log(error)
  }
}

export const deleteFaculty = (id, accessToken, navigate) => async (dispatch) => {
  dispatch(deleteFacultyStart());
  try {
    await axios.delete(`${BACKEND_URL}/faculty/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteFacultySuccess());
    navigate("/admin/faculty")
  } catch (error) {
    dispatch(deleteFacultyFailed());
    console.log(error);
  }
};

export const getAllEventsByFaculty = (id, accessToken) => async (dispatch) => {
  dispatch(getEventsByFacultyStart());
  try{
    const res = await axios.get(`${BACKEND_URL}/event/${id}/events`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getEventsByFacultySuccess(res.data));
  } catch(err) {
    dispatch(getEventsByFacultyFailed());
    console.log(err);
  }
}


export const searchFaculty = (searchTerm, accessToken) => async (dispatch) => {
  dispatch(searchFacultyStart());
  try {
    const response = await axios.post(`${BACKEND_URL}/faculty/search`, {
      keyword:searchTerm,
    }, {
      headers: {
        token: `Bearer ${accessToken}`, 
      },
    });
    dispatch(searchFacultySuccess(response.data));
  } catch (error) {
    dispatch(searchFacultyFailed(error.message));
    console.log(error)
  }
};

//event
export const getAllEvents = (accessToken) => async (dispatch) => {
  dispatch(getEventsStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/event/events`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getEventsSuccess(res.data));
  } catch (err) {
    dispatch(getEventsFailed());
  }
};
export const addEvent = (accessToken, event) => async (dispatch) => {
  dispatch(addEventStart());
  try {
    await axios.post(`${BACKEND_URL}/event/create`, event, {
      headers: {
        token: `Bearer ${accessToken}`
      }
    });
    dispatch(addEventSuccess());
  } catch (error) {
    dispatch(addEventFailed());
    console.error(error);
    throw error;
  }
}

export const getOneEvent = (id, accessToken) => async (dispatch) => {
  dispatch(getEventStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/event/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getEventSuccess(res.data));
  }
  catch (err) {
    dispatch(getEventFailed())
    console.log(err)
  }
}

export const editEvent = (id, event, accessToken, navigate) => async (dispatch) => {
  dispatch(editEventStart());
  try {
    const res = await axios.put(`${BACKEND_URL}/event/update/${id}`, event, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(editEventSuccess(res.data));
    navigate("/admin/event")
  }
  catch (error) {
    dispatch(editEventFailed())
    console.log(error)
  }
}

export const deleteThisEvent = (id, accessToken, navigate) => async (dispatch) => {
  dispatch(deleteEventStart());
  try {
    await axios.delete(`${BACKEND_URL}/event/delete/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteEventSuccess());
    navigate("/admin/event")
  } catch (error) {
    dispatch(deleteEventFailed());
    console.log(error);
  }
}

//contribution
export const getAllContributions = (accessToken) => async (dispatch) => {
  dispatch(getContributionsStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/getAllContributions`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getContributionsSuccess(res.data));
  } catch (err) {
    dispatch(getContributionsFailed());
  }
};

export const getOneContribution = (id, accessToken) => async (dispatch) => {
  dispatch(getContributionStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getContributionSuccess(res.data));
  }
  catch (err) {
    dispatch(getContributionFailed())
    console.log(err)
  }
}

export const allContributionsByEventData = (id, accessToken) => async (dispatch) => {
  dispatch(getContributionsByEventStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/getAllContributionsByEvent/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getContributionsByEventSuccess(res.data));
  } catch (err) {
    dispatch(getContributionsByEventFailed());
    console.log(err);
  }
}

export const postContribution = (facultyId, eventId, contribution, accessToken, navigate) => async (dispatch) => {
  dispatch(submitContributionStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/contribution/submit`, contribution, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(submitContributionSuccess(res.data));
    navigate(`/faculty/${facultyId}/event/${eventId}`);
  } catch (error) {
    dispatch(submitContributionFailed());
    console.error(error);
  }
}

export const getContributionsByUser = (accessToken) => async (dispatch) => {
  dispatch(userContributionsStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/getMyContribution`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(userContributionsSuccess(res.data));
  } catch (err) {
    dispatch(userContributionsFailed());
    console.log(err);
  }
}

export const modifyContribution = (id, contribution, accessToken, navigate) => async (dispatch) => {
  dispatch(editContributionStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/contribution/edit/${id}`, contribution, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(editContributionSuccess(res.data));
    navigate(`/userContribution`);
  } catch (error) {
    dispatch(editContributionFailed());
    console.error(error);
  }
}

export const removeContribution = (id, accessToken) => async (dispatch) => {
  dispatch(deleteContributionStart());
  try{
    await axios.delete(`${BACKEND_URL}/contribution/delete/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteContributionSuccess());
  } catch (err) {
    dispatch(deleteContributionFailed());
    console.log(err);
  }
}

export const commentContribution = (id, comment, accessToken) => async (dispatch) => {
  dispatch(commentStart())
  try {
    await axios.post(`${BACKEND_URL}/contribution/comment/${id}`, comment, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(commentSuccess());
  } catch (error) {
    dispatch(commentFailed());
    console.error(error);
  }
}