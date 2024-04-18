import { Button, Typography } from '@material-tailwind/react';
import React from 'react'

export const TablePagination = ({currentPage, setCurrentPage, itemsPerPage, totalItems}) => {
    const totalPages = Math.ceil(totalItems?.length / itemsPerPage);
    const goToNextPage = () => {
        setCurrentPage((page) => page + 1);
    };

    const goToPreviousPage = () => {
        setCurrentPage((page) => page - 1);
    };
    return (
        <>
            <Typography variant="small" color="blue-gray" className="font-normal">
                Page {currentPage} of {totalPages}
            </Typography>
            <div className="flex gap-2">
                <Button
                    onClick={goToPreviousPage}
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Button
                    onClick={goToNextPage}
                    variant="outlined"
                    size="sm"
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </>

    )
}
