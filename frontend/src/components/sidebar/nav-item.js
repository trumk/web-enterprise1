import { ListItem, ListItemPrefix } from '@material-tailwind/react'
import { Users } from 'lucide-react'
import React, { useState } from 'react'

export const NavItem = ({
    icon: Icon,
    label
}) => {
    const [isExpand, setIsExpand] = useState(true);
    return (
        <ListItem>
            <ListItemPrefix>
                {isExpand ? (
                    <Icon className="h-5 w-5 mr-2" />
                ): (
                    <Icon className="h-5 w-5 mr-0" />
                )}
            </ListItemPrefix>
            {isExpand && (
            <span>
              {label}
            </span>
          )}
        </ListItem>
    )
}
