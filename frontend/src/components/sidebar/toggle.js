import { IconButton, Tooltip } from '@material-tailwind/react';
import { ArrowLeftToLine, ArrowRightToLine } from 'lucide-react';
import React, { useState } from 'react'

export const Toggle = () => {
    const [isExpand, setIsExpand] = useState(true);

    const toggleSidebar = () => {
        setIsExpand(!isExpand);
    }
    const label = isExpand ? "Collapse" : "Expand"
    return (
        <>
            {isExpand && (
                <Tooltip content={label} placement="right" animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}>
                    <IconButton variant="text" className="w-6 h-6" onClick={toggleSidebar}>
                        <ArrowLeftToLine />
                    </IconButton>
                </Tooltip>
            )}
            {!isExpand && (
                <Tooltip content={label} placement="right" animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}>
                    <IconButton variant="text" className="w-6 h-6" onClick={toggleSidebar}>
                        <ArrowRightToLine />
                    </IconButton>
                </Tooltip>
            )}
        </>
    )
}
