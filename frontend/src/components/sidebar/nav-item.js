import { ListItem, ListItemPrefix } from '@material-tailwind/react'
import React from 'react'
import { Link } from 'react-router-dom'

export const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive
}) => {
    
    return (
        <Link to={href}>
        <ListItem className={isActive ? "bg-purple-200 hover:bg-purple-300" : ''}>
            <ListItemPrefix>
                <Icon className="h-5 w-5" />
            </ListItemPrefix>
            {label}
        </ListItem>
        </Link>
    )
}
