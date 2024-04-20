import React, { useEffect, useState } from 'react'
import NavbarDefault from '../../../components/navbar'
import DefaultSidebar from '../../../components/sidebar'
import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { Editor } from '../../../components/manage/editor'
import { File, FileUp, ImageUp, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getOneContribution, modifyContribution } from '../../../redux/apiRequest'

export const EditContribution = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);
    const [file, setFile] = useState([]);
    const [message, setMessage] = useState('');

    const user = useSelector((state) => state.auth.login?.currentUser);
    const currentContribution = useSelector((state) => state.contribution.contribution.currentContribution);
    console.log(currentContribution)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (user && user.accessToken) {
            dispatch(getOneContribution(id, user.accessToken));
        }
    }, [dispatch, id, user]);
    useEffect(() => {
        if (currentContribution) {
            setTitle(currentContribution.title);
            setContent(currentContribution.content);
            setImage(currentContribution.image);
            setFile(currentContribution.file);
        }
    }, [currentContribution])
    
    const handleImageUpload = (e) => {
        setMessage("");
        let selectedFiles = e.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            const fileType = selectedFiles[i]['type'];
            const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'video/mp4'];
            if (validImageTypes.includes(fileType)) {              
                    setImage([...image, selectedFiles[i]]);
            } else {
                setMessage("Only image accepted");
            }
        }
    };

    const handleFileUpload = (e) => {
        setMessage("");
        let selectedFiles = e.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
            const fileType = selectedFiles[i]['type'];
            const validFileTypes = [
                'application/pdf', 
                'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ];
            if (validFileTypes.includes(fileType)) {
                setFile([...file, selectedFiles[i]]);
            } else {
                setMessage("only .docx, .pdf, .xls, .xlsx are accepted");
            }
        }
    };
    console.log(currentContribution)
    function removeImage(index) {
        let newImages = [...image];
        newImages.splice(index, 1);
        setImage(newImages);
    }

    function removeFile(index) {
        let newFiles = [...file];
        newFiles.splice(index, 1);
        setFile(newFiles);
    }
    function getFileNameFromUrl (url) {
        let parts = url.split('/');
        let encodedFileName = parts[parts.length - 1];
        let fileName = decodeURIComponent(encodedFileName);
        return fileName;
    }
    const contribution = new FormData()
    contribution.append('title', title);
    contribution.append('content', content);
    if (image.length > 0) {
        image.map((image, key) => {
            contribution.append('image', image)
            return null;
        })
    };
    if (file.length > 0) {
        file.map((file, key) => {
            contribution.append('file', file)
            return null;
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(modifyContribution(currentContribution._id, contribution, user.accessToken, navigate));
    }


    console.log();
    return (
        <>
            <NavbarDefault />
            <div className="flex">
                <DefaultSidebar className="flex" />
                <div className="ml-5 w-full h-full">
                    <Typography variant='h4' className='text-center'>
                        Post New Contribution
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal text-center">
                        Share your contribution to others
                    </Typography>
                    <div className="flex justify-center items-center">
                        <Card className='w-[900px] h-[700px] flex justify-center items-center'>
                            <form className="mt-8 mb-2 w-[800px] flex justify-between gap-10" onSubmit={handleSubmit}>
                                <div className="mb-1 flex flex-col gap-6">
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Title
                                    </Typography>
                                    <Input
                                        size="lg"
                                        className="w-[350px] !border-t-blue-gray-200 focus:!border-t-gray-900"
                                        labelProps={{
                                            className: "before:content-none after:content-none",
                                        }}
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Content
                                    </Typography>
                                    <Editor
                                        value={content}
                                        onChange={setContent}
                                        className="h-[300px] w-[350px]"
                                    />
                                </div>
                                <div className="mb-1 flex flex-col gap-6">
                                    <Typography variant="h6" color="blue-gray" className="-mb-5">
                                        Image
                                    </Typography>
                                   
                                    <div className='w-[800px]'>
                                        {message && <span>{message}</span>}
                                        <div className="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[400px]">
                                            <div className="m-4">
                                                <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">{message}</span>
                                                <div className="flex items-center justify-center w-full">
                                                    <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                        <div className="flex flex-col items-center justify-center pt-7">
                                                            <ImageUp />
                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                Select an image</p>
                                                        </div>
                                                        <input type="file" onChange={handleImageUpload} class="opacity-0" multiple="multiple" name="file[]" />
                                                    </label>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {image.map((url, key) => {
                                                        return (
                                                            <div key={key} className="overflow-hidden relative">
                                                                <X onClick={() => { removeImage(key) }} className="mdi mdi-close absolute right-1 hover:opacity-0.7 cursor-pointer" />
                                                                <img className="h-20 w-20 rounded-md" src={url} alt="" />
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                                        Files
                                    </Typography>
                                    <div className='w-[800px] mt-2'>
                                        {message && <span>{message}</span>}
                                        <div className="rounded-lg shadow-xl bg-gray-50 md:w-1/2 w-[400px]">
                                            <div>
                                                {file?.length === 0 && (
                                                    <p className="text-sm mt-2 text-slate-500 italic">
                                                        You deleted all attachments. You can add more files by clicking the button below.
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-center w-full">
                                                    <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                                                        <div className="flex flex-col items-center justify-center pt-7">
                                                            <FileUp />
                                                            <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                                                Select a file</p>
                                                        </div>
                                                        <input type="file" onChange={handleFileUpload} className="opacity-0" multiple="multiple" name="file[]" />
                                                    </label>
                                                </div>
                                                {file?.length > 0 && (
                                                    <div className="space-y-2">
                                                        {file?.map((file, key) => {
                                                        let fileName;
                                                        if (typeof file === 'object' && 'name' in file) {
                                                            fileName = file.name;
                                                        } else {
                                                            fileName = getFileNameFromUrl(file);
                                                        }
                                                        return (
                                                            <div
                                                                key={key}
                                                                className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                                                            >
                                                                <File className='h-4 w-4 mr-2 flex-shrink-0' />
                                                                <p className="text-xs line-clamp-1">
                                                                    {fileName}
                                                                </p>
                                                                <button
                                                                    onClick={() => removeFile(file.name)}
                                                                    className="ml-auto hover:opacity-75 transition"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        )})}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-center mr-[90px]">
                                            <Button className="mt-8" onClick={handleSubmit}>
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
