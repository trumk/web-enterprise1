import { ListItem, ListItemPrefix } from '@material-tailwind/react'
import React from 'react'

export const NavItem = ({
    icon: Icon,
    label,
    href,
    isActive
}) => {
    
    return (
        <a href={href}>
        <ListItem className={isActive ? 'bg-gray-500' : ''}>
            <ListItemPrefix>
                <Icon className="h-5 w-5" />
            </ListItemPrefix>
            {label}
        </ListItem>
        </a>
    )
}
