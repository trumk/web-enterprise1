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
import { useNavigate, useParams } from 'react-router-dom'

export const SubmitContribution = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState([]);
  const [file, setFile] = useState([]);
  const [message, setMessage] = useState('');

  const user = useSelector((state) => state.auth.login?.currentUser);
  const faculty = useSelector((state) => state.faculty.faculty.currentFaculty);
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
  contribution.append('eventID', event.Event._id);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postContribution(faculty?.Faculty._id, event?.Event._id, contribution, user.accessToken, navigate));
  }
  // console.log(contribution.getAll('image'));
  // console.log(contribution.getAll('file'));
  // console.log(user.accessToken)
  return (
    <>
      <NavbarDefault />
      <div className="flex">
        <DefaultSidebar className="flex" />
        <div className="ml-5 w-full h-full">
          <div className='mt-10 flex flex-col items-center'>
            <Typography variant='h4'>
              Post New Contribution
            </Typography>
            <Card color="transparent" shadow={false}>
              <Typography color="gray" className="mt-1 font-normal">
                Share your contribution to others
              </Typography>
              <form className="mt-8 mb-2 max-w-screen sm:w-96" onSubmit={handleSubmit}>
                <div className="mb-1 flex flex-col gap-6">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Title
                  </Typography>
                  <Input
                    size="lg"
                    className="w-full !border-t-blue-gray-200 focus:!border-t-gray-900"
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
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Image
                  </Typography>
                  <div className='w-[800px] mt-2'>
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
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="mt-6" fullWidth onClick={handleSubmit}>
                  Submit
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
