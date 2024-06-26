import React, { useEffect, useState } from 'react';
import NavbarDefault from '../../../components/navbar';
import DefaultSidebar from '../../../components/sidebar';
import { useDispatch, useSelector } from "react-redux";
import { getAllContributions, searchContribution } from '../../../redux/apiRequest';
import { Card, CardFooter, Chip, Input, Typography } from "@material-tailwind/react";
import { IconButton } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { TablePagination } from '../../../components/manage/edit-pagination';

export const Contribution = () => {
    const contributions = useSelector((state) => state.contribution.contributions.allContributions);
    const filterContribution = useSelector((state) => state.contribution.searchContribution?.filterContribution);
    const user = useSelector((state) => state.auth.login?.currentUser);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const contributionsPerPage = 4
    const displayList = searchTerm !== "" ? filterContribution : contributions;
    const currentItems = displayList?.slice((currentPage - 1) * contributionsPerPage, currentPage * contributionsPerPage);

    useEffect(() => {
        if (user) {
            dispatch(getAllContributions(user.accessToken, dispatch));
        }
    }, [user, dispatch]);

    useEffect(() => {
        if (user && searchTerm !== "") {
            dispatch(searchContribution(searchTerm, user.accessToken));
        } else {
            dispatch({
                type: "SET_FILTER_CONTRIBUTION",
                payload: { filterContribution: [] }
            });
        }
    }, [searchTerm, user, dispatch]);

    return (
        <>
            <NavbarDefault />
            <div className="flex">
                <DefaultSidebar />
                <div className='ml-5 w-full'>
                <Typography variant="h3" className="mb-2 mt-4">Contributions</Typography>
                    <div className="flex items-center gap-2 mt-2">
                        <Input
                            type="text"
                            label="Search contributions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-1/3 mb-4"
                        />
                    </div>
                    <Card className="h-full w-full mt-5">
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Title
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Image
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Published
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            User
                                        </Typography>
                                    </th>
                                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            Actions
                                        </Typography>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems ? (
                                    currentItems.length > 0 ? (
                                        currentItems.map((contribution, index) => (
                                            <tr key={index}>
                                                <td className="p-4 border-b border-blue-gray-50 cursor-pointer hover:bg-gray-100">
                                                    <Link to={`/admin/contribution/${contribution._id}`}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {contribution.title}
                                                        </Typography>
                                                    </Link>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    {Array.isArray(contribution.image) && contribution.image.length > 0 && (
                                                        <img src={contribution.image[0]} alt="contribution" className='h-[80px]' />
                                                    )}
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <Chip
                                                    className={contribution.isPublic ? "w-24" : "w-32"}
                                                        variant="outlined"
                                                        value={contribution.isPublic ? "Published" : "Not Published"}
                                                        color={contribution.isPublic ? "green" : "red"}
                                                    />
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {contribution?.author?.firstName} {contribution?.author.lastName}
                                                    </Typography>
                                                </td>
                                                <td className="p-4 border-b border-blue-gray-50 w-20">
                                                    <div className="flex gap-2 items-center">
                                                        <Link to={`/admin/contribution/${contribution._id}`}> <IconButton variant="gradient" color="amber"><Info /></IconButton> </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="p-4">
                                                No contribution found
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-4">
                                            Loading...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                            <TablePagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                itemsPerPage={contributionsPerPage}
                                totalItems={displayList}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
