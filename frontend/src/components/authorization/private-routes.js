import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PrivateRoute = ({ element, userRole, path }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (userRole === 'admin') {
      // Admin can access all routes
    } else if (userRole === 'marketing manager') {
      if (path !== '/marketingManager' && path !== '/user') {
        navigate('/marketingManager');
      }
    } else if (userRole === 'marketing coordinator') {
      if (path !== '/marketingCoordinator' && path !== '/user') {
        navigate('/marketingCoordinator');
      }
    } else {
      if (path !== '/user') {
        navigate('/');
      }
    }
  }, [userRole, path, navigate]);

  return element;
};