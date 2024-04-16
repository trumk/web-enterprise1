import React from 'react'
import { useSelector } from 'react-redux';

export const ContributionsDashboard = () => {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const contributionData = useSelector((state) => state.contribution.getContributionsByEvent?.contributions);
  return (
    <div>ContributionsDashboard</div>
  )
}
