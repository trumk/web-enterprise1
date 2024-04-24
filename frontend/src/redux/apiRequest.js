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
  getFacultyLoginFailed,
  getFacultyLoginStart,
  getFacultyLoginSuccess,
  getSelfFailed,
  getSelfStart,
  getSelfSuccess,
  getStatisticFailed,
  getStatisticStart,
  getStatisticSuccess,
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
  ascSortFailed,
  ascSortStart,
  ascSortSuccess,
  commentFailed,
  commentStart,
  commentSuccess,
  deleteContributionFailed,
  deleteContributionStart,
  deleteContributionSuccess,
  descSortFailed,
  descSortStart,
  descSortSuccess,
  editContributionFailed,
  editContributionStart,
  editContributionSuccess,
  getContributionByCoordinatorFailed,
  getContributionByCoordinatorStart,
  getContributionByCoordinatorSuccess,
  getContributionFailed,
  getContributionStart,
  getContributionSuccess,
  getContributionsByEventFailed,
  getContributionsByEventStart,
  getContributionsByEventSuccess,
  getContributionByGuestStart,
  getContributionByGuestSuccess,
  getContributionByGuestFailed,

  getContributionsFailed, 
  getContributionsStart, 
  getContributionsSuccess, 
  getExceptionFailed, 
  getExceptionStart, 
  getExceptionSuccess, 
  getNotificationsFailed, 
  getNotificationsStart, 
  getNotificationsSuccess, 
  publishFailed, 
  publishStart, 
  publishSuccess, 
  readNotificationFailed, 
  readNotificationStart, 
  readNotificationSuccess, 
  searchContributionFailed, 
  searchContributionStart, 
  searchContributionSuccess, 
  submitContributionFailed, 
  submitContributionStart,
  submitContributionSuccess,
  userContributionsFailed,
  userContributionsStart,
  userContributionsSuccess,
  getLandingContributionStart,
  getLandingContributionSuccess,
  getLandingContributionFailed
} from "./contributionSlice";
import { toast } from "react-toastify";

//const BACKEND_URL = "https://web-enterprise1.onrender.com";

//const BACKEND_URL = "https://web-enterprise1-xd0w.onrender.com";
const BACKEND_URL = "http://localhost:5000";

//auth
export const loginUser = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/login`, user);
    dispatch(loginSuccess(res.data));
    toast.success("Login successfully");
  } catch (err) {
    dispatch(loginFailed(err?.response?.data));
    toast.error(err.response.data);
  }
};

export const getFacultyLogin = () => async (dispatch) => {
  dispatch(getFacultyLoginStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/faculty/getFacultyLogin`);
    dispatch(getFacultyLoginSuccess(res.data));
  } catch (err) {
    dispatch(getFacultyLoginFailed(err));
  }
};

export const registerUser = async (user, dispatch, handleSuccess) => {
  dispatch(registerStart());
  try {
    await axios.post(`${BACKEND_URL}/register`, user);
    dispatch(registerSuccess());
    handleSuccess();
    toast.success("Register successfully");
  } catch (err) {
    dispatch(registerFailed());
    console.error(err);
    if (err.response) {
      switch (err.response.status) {
        case 400:
          toast.error("Bad request. Please check your input");
          break;
        case 401:
          toast.error("Unauthorized. Please check your credentials");
          break;
        case 409:
          toast.error("Conflict. User already exists");
          break;
        case 500:
          toast.error("Server error. Please try again later");
          break;
        default:
          toast.error("An error occurred. Please try again");
      }
    } else if (err.request) {
      toast.error("No response from server. Please try again");
    } else {
      toast.error("Error in setting up the request");
    }
  }
};
export const verifyAccount = async (otp, dispatch, navigate) => {
  dispatch(verifyStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/verify`, otp);
    dispatch(verifySuccess(res.data));
    toast.success("Account verified successfully");
    navigate("/login");
  } catch (err) {
    dispatch(verifyFailed());
    console.error(err);
  }
};

export const logout = async (dispatch, id, navigate, accessToken) => {
  console.log(accessToken); 
  console.log(typeof accessToken);
  dispatch(logoutStart());
  try {
    await axios.post(`${BACKEND_URL}/logout`, id, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(logoutSuccess());
    toast.success("Logout successfully");
    navigate("/login");
  } catch (err) {
    dispatch(logoutFailed());
    if (err.response) {
      toast.error(err.response.data);
    } else {
      console.error(err);
    }
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
    if (err.response) {
      toast.error(err.response.data);
    } else {
      console.error(err);
    }
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

export const setRole = (id, role, accessToken) => async (dispatch) => {
  dispatch(setRoleStart());
  try {
    const response = await axios.post(
      `${BACKEND_URL}/user/setRole/${id}`,
      role,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(setRoleSuccess(response.data));
  } catch (error) {
    dispatch(setRoleFailed());
    console.log(error)
  }
};

export const changeUserPassword = async (id, accessToken, password, dispatch, navigate) => {
  dispatch(changePasswordStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/changePassword/${id}`, password, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(changePasswordSuccess(res.data));
    toast.success("Change password successfully");
    navigate(`/user/${id}/profile`)
  } catch (err) {
    dispatch(changePasswordFailed());
    toast.error(err.response.data);
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
    toast.success("Edit profile successfully");
    navigate(`/user/${userId}/profile`)
  } catch (err) {
    dispatch(editProfileFailed());
    console.log(err)
    toast.error(err.response.data);
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
    toast.success("Join faculty successfully");
    navigate(`/faculty/${id}`)
  } catch (err) {
    dispatch(enrollFacultyFailed());
    toast.error(err.response.data);
    console.log(err)
  }
}

export const getStatistic = (accessToken, time) => async (dispatch) => {
  dispatch(getStatisticStart());
  try {
    const res = await axios.post(
      `${BACKEND_URL}/contribution/statistic`, time,
      {
        headers: {
          token: `Bearer ${accessToken}`,
        },
      }
    );
    dispatch(getStatisticSuccess(res.data));
  } catch (err) {
    dispatch(getStatisticFailed());
    console.log(err);
  }
};

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
    console.log(err)
  }
}

// export const addFaculty = createAsyncThunk("faculty/add", async (facultyData, { getState, dispatch, navigate }) => {
//   dispatch(addFacultyStart());
//   try {
//     const { accessToken } = getState().auth.login.currentUser;
//     const response = await axios.post(
//       `${BACKEND_URL}/faculty/add`,
//       facultyData,
//       {
//         headers: {
//           token: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     dispatch(addFacultySuccess(response.data));
//     toast.success("Add faculty success")
//     navigate("/admin/faculty")
//     return response.data;
//   } catch (error) {
//     dispatch(addFacultyFailed());
//     console.log(error)
//     toast.error(error.response.data.error);
//     throw error;
//   }
// }
// );
export const addFaculty = (facultyData, accessToken, navigate) => async (dispatch)=>{
  dispatch(addFacultyStart());
  try{
    await axios.post(`${BACKEND_URL}/faculty/add`, facultyData, {
      headers: {
        token: `Bearer ${accessToken}`
      }
    })
    dispatch(addFacultySuccess());
    toast.success("Add faculty success")
    navigate("/admin/faculty")
  }catch(error){
    dispatch(addFacultyFailed());
    toast.error(error.response.data.error);
    console.log(error)
  }
}

export const editFaculty = (id, faculty, accessToken, navigate) => async (dispatch) => {
  dispatch(editFacultyStart());
  try {
    const res = await axios.put(`${BACKEND_URL}/faculty/${id}`, faculty, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(editFacultySuccess(res.data));
    toast.success("Edit faculty success")
    navigate("/admin/faculty")
  }
  catch (error) {
    dispatch(editFacultyFailed(error.response.data))
    toast.error(error.response?.data.message)
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
    toast.success("Delete faculty success")
    navigate("/admin/faculty")
  } catch (error) {
    dispatch(deleteFacultyFailed());
    toast.error(error.response?.data.message)
    console.log(error);
  }
};

export const getAllEventsByFaculty = (id, accessToken) => async (dispatch) => {
  dispatch(getEventsByFacultyStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/event/${id}/events`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getEventsByFacultySuccess(res.data));
  } catch (err) {
    dispatch(getEventsByFacultyFailed());
    console.log(err);
  }
}


export const searchFaculty = (searchTerm, accessToken) => async (dispatch) => {
  dispatch(searchFacultyStart());
  try {
    const response = await axios.post(`${BACKEND_URL}/faculty/search`, {
      keyword: searchTerm,
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


export const addEvent = (accessToken, event, navigate) => async (dispatch) => {
  dispatch(addEventStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/event/create`, event, {
      headers: {
        token: `Bearer ${accessToken}`
      }
    });
    dispatch(addEventSuccess(res.data));
    toast.success("Add event success")
    navigate("/admin/event")
  } catch (error) {
    dispatch(addEventFailed(error.response.data));
    toast.error(error.response?.data.message)
    console.error(error);
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
    toast.success("Edit event success")
    navigate("/admin/event")
  }
  catch (error) {
    dispatch(editEventFailed(error.response.data))
    toast.error(error.response?.data.message)
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
    toast.success("Delete faculty success")
    navigate("/admin/event")
  } catch (error) {
    dispatch(deleteEventFailed());
    toast.error(error.response?.data.message)
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

export const postContribution = (contribution, accessToken, handleSuccess) => async (dispatch) => {
  dispatch(submitContributionStart());
  try {
    const res = await axios.post(`${BACKEND_URL}/contribution/submit`, contribution, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(submitContributionSuccess(res.data));
    toast.success("Contribution submitted successfully");
    handleSuccess();
  } catch (error) {
    dispatch(submitContributionFailed());
    console.error(error);
    toast.error(error.response.data);
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
    toast.success("Edit contribution successfully");
    navigate(`/myContribution`);
  } catch (error) {
    dispatch(editContributionFailed());
    toast.error(error.response.data);
    console.error(error);
  }
}

export const removeContribution = (id, accessToken) => async (dispatch) => {
  dispatch(deleteContributionStart());
  try {
    await axios.delete(`${BACKEND_URL}/contribution/delete/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteContributionSuccess());
    toast.success("Delete contribution successfully");
  } catch (err) {
    dispatch(deleteContributionFailed());
    toast.error(err.response.data);
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
    toast.success("Comment successfully");
  } catch (error) {
    dispatch(commentFailed());
    console.error(error);
    toast.error(error.response.data);
  }
}

export const publicContribution = (id, accessToken, navigate) => async (dispatch) => {
  dispatch(publishStart());
  try {
    await axios.post(`${BACKEND_URL}/contribution/public/${id}`, {}, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(publishSuccess());
    toast.success("Publish contribution successfully");
    navigate("/marketingCoordinator");
  } catch (err) {
    dispatch(publishFailed());
    toast.error(err.response.data);
    console.log(err);
  }
}

export const searchContribution = (searchTerm, accessToken) => async (dispatch) => {
  dispatch(searchContributionStart());
  try {
    const response = await axios.post(`${BACKEND_URL}/contribution/searchByTitle`, {
      keyword:searchTerm,
    }, {
      headers: {
        token: `Bearer ${accessToken}`, 
      },
    });
    dispatch(searchContributionSuccess(response.data));
  } catch (error) {
    dispatch(searchContributionFailed(error.message));
    console.log(error)
  }
};

export const sortAsc = (accessToken) => async (dispatch) => {
  dispatch(ascSortStart());
  try {
    const response = await axios.get(`${BACKEND_URL}/contribution/sort/asc`, {
      headers: {
        token: `Bearer ${accessToken}`, 
      },
    });
    dispatch(ascSortSuccess(response.data));
  } catch (error) {
    dispatch(ascSortFailed(error.message));
    console.log(error)
  }
};

export const sortDesc = (accessToken) => async (dispatch) => {
  dispatch(descSortStart());
  try {
    const response = await axios.get(`${BACKEND_URL}/contribution/sort/desc`, {
      headers: {
        token: `Bearer ${accessToken}`, 
      },
    });
    dispatch(descSortSuccess(response.data));
  } catch (error) {
    dispatch(descSortFailed(error.message));
    console.log(error)
  }
};

export const getExceptionContributions = (accessToken) => async (dispatch) => {
  dispatch(getExceptionStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/exception`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getExceptionSuccess(res.data));
  } catch (err) {
    dispatch(getExceptionFailed());
    console.log(err);
  }
}

export const getContributionByCoordinator = (accessToken) => async (dispatch) => {
  dispatch(getContributionByCoordinatorStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/getContributionByFaculty`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getContributionByCoordinatorSuccess(res.data));
  } catch (err) {
    dispatch(getContributionByCoordinatorFailed());
    console.log(err);
  }
}

export const getContributionByGuest = (accessToken) => async (dispatch) => {
  dispatch(getContributionByGuestStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/getContributionGuest`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getContributionByGuestSuccess(res.data));
  } catch (err) {
    dispatch(getContributionByGuestFailed());
    console.log(err);
  }
}

export const getAllNotifications = (accessToken) => async (dispatch) => {
  dispatch(getNotificationsStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/notifications`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getNotificationsSuccess(res.data));
  } catch (err) {
    dispatch(getNotificationsFailed());
    console.log(err);
  }
}

export const getOneNotification = (id, accessToken) => async (dispatch) => {
  dispatch(readNotificationStart());
  try {
    await axios.get(`${BACKEND_URL}/contribution/notification/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(readNotificationSuccess());
  } catch (err) {
    dispatch(readNotificationFailed());
    console.log(err);
  }
}

export const getContributionByLanding = () => async (dispatch) => {
  dispatch(getLandingContributionStart());
  try {
    const res = await axios.get(`${BACKEND_URL}/contribution/getContributionLanding`);
    dispatch(getLandingContributionSuccess(res.data));
  } catch (err) {
    dispatch(getLandingContributionFailed());
    console.log(err);
  }
}