import { useSelector } from "react-redux";
import Header from "../components/auth/form-header";
import Login from "../components/auth/Login";
import NavbarDefault from "../components/navbar";


export default function LoginPage() {
    return (
        <>
            <NavbarDefault />
            <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <Header
                        heading="Login to your account"
                        paragraph="Don't have an account yet? "
                        linkName="Signup"
                        linkUrl="/signup"
                    />
                    <Login />
                </div>
            </div>
        </>
    )
}