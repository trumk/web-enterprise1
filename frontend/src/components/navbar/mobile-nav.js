import { Typography } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const MobileNavItem = ({
    icon: Icon,
    label,
    href
}) => {
    return (
        <Link to={href}>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="flex items-center gap-x-2 p-1 font-medium"
        >
            <Icon className="h-5 w-5" />
            

            <a href="#" className="flex items-center">
                {label}
            </a>
        </Typography>
        </Link>
    )
}
