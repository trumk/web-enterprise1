import NavbarDefault from "../../components/navbar"
import DefaultSidebar from "../../components/sidebar"

export const MarketingManagerPage = () =>{
    return(
        <>
        <NavbarDefault/>
        <div className="flex">
            <DefaultSidebar className="flex"/>
            <div className="ml-5 w-full">
                <p>Statistical</p>
            </div>
        </div>
        </>
    )
}