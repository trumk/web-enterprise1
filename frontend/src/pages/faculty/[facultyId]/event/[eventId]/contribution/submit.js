import React, { useState } from 'react'
import NavbarDefault from '../../../../../../components/navbar'
import {
  Typography,
  Input,
  Button,
  Card
} from '@material-tailwind/react'
import DefaultSidebar from '../../../../../../components/sidebar'
import { Editor } from '../../../../../../components/manage/editor'
import { ImageUp, X, FileUp, File } from 'lucide-react';
import { postContribution } from '../../../../../../redux/apiRequest'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Term } from '../../../../../Term'

export const SubmitContribution = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);
  const [message, setMessage] = useState('');
  const [isTermOpen, setIsTermOpen] = useState(false);

  const { facultyId, eventId } = useParams();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const event = useSelector((state) => state.event.event?.currentEvent);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(event.Event._id)
  const handleImageUpload = (e) => {
    setMessage("");
    let file = e.target.files;
    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]['type'];
      const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
      if (validImageTypes.includes(fileType)) {
        setImage([...image, file[i]]);
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
      const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (validFileTypes.includes(fileType)) {
        setFile([...file, selectedFiles[i]]);
      } else {
        setMessage("only .docx and .pdf accepted");
      }
    }
  };

  const removeImage = (i) => {
    setImage(image?.filter(x => x.name !== i));
  }

  const removeFile = (i) => {
    setFile(file?.filter(x => x.name !== i));
  }

  const contribution = new FormData()
  contribution.append('title', title);
  contribution.append('content', content);
  if (image.length > 0) {
    image.map((image, key) => {
      contribution.append('image', image)
    })
  };
  if (file.length > 0) {
    file.map((file, key) => {
      contribution.append('file', file)
    })
  };
  const handleSuccess = () => {
    setIsTermOpen(true);
  }
  contribution.append('eventID', event.Event._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postContribution(contribution, user.accessToken, handleSuccess));
  }
  const handleAccept = () => {
    setIsTermOpen(false);
    navigate(`/faculty/${facultyId}/event/${eventId}`);
  }
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full h-full">
          <Link to={`/faculty/${facultyId}/event/${eventId}`}><Button>Back</Button></Link>
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
                      {image.map((file, key) => {
                        return (
                          <div key={key} className="overflow-hidden relative">
                            <X onClick={() => { removeImage(file.name) }} className="mdi mdi-close absolute right-1 hover:opacity-0.7 cursor-pointer" />
                            <img className="h-20 w-20 rounded-md" src={URL.createObjectURL(file)} />
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
                        No attachments yet
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
                    {file.length > 0 && (
                      <div className="space-y-2">
                        {file.map((file, key) => (
                          <div
                            key={key}
                            className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                          >
                            <File className='h-4 w-4 mr-2 flex-shrink-0' />
                            <p className="text-xs line-clamp-1">
                              {file.name}
                            </p>
                            <button
                              onClick={() => removeFile(file.name)}
                              className="ml-auto hover:opacity-75 transition"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
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
      {isTermOpen && <Term onAccept={handleAccept} />}
    </>
  )
}
