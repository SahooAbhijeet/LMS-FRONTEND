import { IoMenu } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";

const HomeLayout = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //for checking if user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

    //for displaying your actions according to role
    const role =  useSelector((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = "auto";
    }

    function hideDrawer() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;

        const drawerSide = document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width = 0        
    }

    function handleLogOut(e) {
        e.preventDefault();

        navigate("/");
    }

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative ">
                        <IoMenu
                        onClick={changeWidth}
                        size={"32px"}
                        className="font-bold text-white m-6" 
                        
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-100 text-base-content realtive">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle 
                                size={24}
                                />
                            </button>
                        </li>

                        <li>
                            <Link to="/"> Home </Link>
                        </li>
                         {isLoggedIn && role == 'ADMIN' && (
                            <li>
                                <Link to="/admin/dashboard"> ADMIN DASHBOARD </Link>
                            </li>
                         )}
                        <li>
                            <Link to="/courses"> All Courses </Link>
                        </li>
                        <li>
                            <Link to="/contact"> Contact Us </Link>
                        </li>
                        <li>
                            <Link to="/about"> About Us </Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="absolute bottom-4 w-[90%]">
                            <div className="w-full flex items-center justify-center">
                                <button className="bg-purple-800 btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link to="/login"> Login</Link>
                                </button>
                                <button className="bg-pink-600 btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link to="/login"> Signup </Link>
                                </button>
                            </div>
                            </li>
                        )}

                            {isLoggedIn && (
                            <li className="absolute bottom-4 w-[90%]">
                            <div className="w-full flex items-center justify-center">
                                <button className="bg-purple-800 btn-primary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link to="/user/profile"> Profile </Link>
                                </button>
                                <button className="bg-pink-600 btn-secondary px-4 py-1 font-semibold rounded-md w-full">
                                    <Link onClick={handleLogOut}> LogOut </Link>
                                </button>
                            </div>
                            </li>
                        )}
                    </ul>
                </div>

            </div>

            {children}

            <Footer />
        </div>
    )
}
export default HomeLayout