import NavbarDefault from "../components/navbar/index";
import nnk from "../components/assets/nnk.png";
import htqn from "../components/assets/htqn.png";
import nxt from "../components/assets/nxt.png";
import bhn from "../components/assets/bhn.png";
import nbt from "../components/assets/nbt.png";
import nvd from "../components/assets/nvd.png";
import { FacebookIcon, Twitch } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Landing() {
  const teamInfomation = [
    {
      name: "Nguyen Nam Khanh",
      role: "Tester",
      avatar: nnk,
      contact: "https://www.facebook.com/khanh.nguyennam.1809",
    },
    {
      name: "Ho Thi Quynh Nga",
      role: "Backend Developer, Database Design",
      avatar: htqn,
      contact: "https://www.facebook.com/q.nga552003",
    },
    {
      name: "Nguyen Xuan Trung",
      role: "Scrum Master, Frontend Developer",
      avatar: nxt,
      contact: "https://www.facebook.com/profile.php?id=100020309471987",
    },
    {
      name: "Bui Hai Nam",
      role: "Business Analyst, Quality Analyst",
      avatar: bhn,
      contact: "https://www.youtube.com/watch?v=K859p1HjYr8",
    },
    {
      name: "Nguyen Van Du",
      role: "Backend Developer",
      avatar: nvd,
      contact: "https://www.facebook.com/profile.php?id=100021912072295"
    },
    {
      name: "Nguyen Ba Thanh",
      role: "Frontend Developer, UI/UX Design",
      avatar: nbt,
      contact: "https://www.facebook.com/profile.php?id=100039495064006"
    }
  ]
    return (
      <>
        <NavbarDefault />
        <main>
          <div className="relative pt-16 pb-32 flex content-center items-center justify-center"
              style={{
                minHeight: "75vh"
              }}>
            <div className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage: "url('https://www.visitgreenwich.org.uk/imageresizer/?image=%2Fdmsimgs%2FUniversity_of_Greenwich_Profile_image_Jan_2023_2020756971.jpg&action=ProductDetailProFullWidth&fbclid=IwZXh0bgNhZW0CMTAAAR1qQCggGuV6JfDCRfNDUqrdmDQJ-CrOO1taH2pR_IlxS6kEyAfxOdebWXM_aem_AZ_ndxrWLuth4TnwCVM51S5D257h5_imJ5Xw6KVNFRRbyv09CArVGeI0QK0e4Z22PABTZkeCVC7NvAW1j0pHRkZn')"
                }}>
              <span id="blackOverlay" className="w-full h-full absolute opacity-75 bg-black"></span>
            </div>
            <div className="container relative mx-auto">
                <div className="items-center flex flex-wrap">
                  <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                    <div className="pr-12">
                      <h1 className="text-white font-semibold text-5xl">
                      Empowering Students, Inspiring Contributions!
                      </h1>
                      <p className="mt-4 text-lg text-gray-300">
                      Join our platform where students shape the future through meaningful engagement and collaborative efforts
                      </p>
                      <Link to="/login"><Button variant="outlined" color="white">Get Started</Button></Link>
                    </div>
                  </div>
  
                </div>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
              style={{ height: "70px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-300 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </div>
                
  
   <section className="pb-20 bg-gray-300 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-xl font-semibold">Awarded Agency</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Divide details about your product or agency work into parts. A paragraph describing a feature will be enough.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Free Revisions
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-green-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold">
                      Verified Company
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      Write a few lines about each one. A paragraph describing a feature will be enough. Keep you user engaged!
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
          <section className="pt-20 pb-48">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center text-center mb-24">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold">
                    Here are our team members
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap">
                {
                  teamInfomation.map((team, index) => (
                    <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                  <div className="px-6">
                    <img
                      alt="..."
                      src={team.avatar}
                      className="shadow-lg rounded-full max-w-full mx-auto"
                      style={{ maxWidth: "120px" }}
                    />
                    <div className="pt-6 text-center">
                      <h5 className="text-xl font-bold">
                        {team.name}
                      </h5>
                      <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                        {team.role}
                      </p>
                      <div className="mt-6">
                        <button
                          className="bg-blue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                        >
                          <a target="_blank" href={team.contact}><FacebookIcon/></a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </div>
          </section>
  
          <section className="pb-20 relative block bg-gray-900">
            <div
              className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
              style={{ height: "80px" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-gray-900 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
  
            <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
              <div className="flex flex-wrap text-center justify-center">
                <div className="w-full lg:w-6/12 px-4">
                  <h2 className="text-4xl font-semibold text-white">
                    Post contributions
                  </h2>
                  <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                    Put the potentially record low maximum sea ice extent tihs year down to low ice.
                    According to the National Oceanic and Atmospheric Administration, Ted, Scambos.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap mt-12 justify-center">
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                  <h6 className="text-xl mt-5 font-semibold text-white">
                    Excelent Services
                  </h6>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-poll text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Grow your market
                  </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                </div>
                <div className="w-full lg:w-3/12 px-4 text-center">
                  <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                    <i className="fas fa-lightbulb text-xl"></i>
                  </div>
                  <h5 className="text-xl mt-5 font-semibold text-white">
                    Launch time
                  </h5>
                  <p className="mt-2 mb-4 text-gray-500">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
        </main>
      </>
    );
  }