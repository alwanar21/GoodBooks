import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Swal from "sweetalert2";

export default function NavbarAdmin() {

    const navigate = useNavigate();
    const handleLogout = () => {
        signOut(auth).then(() => {
            localStorage.removeItem('user');
            Swal.fire({
                icon: 'success',
                title: 'Logout Berhasil',
                text: 'Anda telah berhasil logout',
                confirmButtonText: 'OK'
            });
            navigate("/")
        }).catch((error) => {
            console.log(error);

        });
    };

    return (
        <div className="w-full bg-primary">
            <nav className="max-w-7xl mx-auto px-[16px] py-[13px] sm:px-[60px] sm:py-[18px] md:px-[80px] text-left flex flex-row justify-between ">
                <Link to="/admin" className="text-base sm:text-xl text-secondary">
                    Good<span className="font-medium">Books</span>
                </Link>
                <button onClick={handleLogout} className="text-secondary text-sm rounded-md px-3 py-1 border-2 border-secondary font-medium hover:bg-secondary hover:text-primary duration-75 ">logout</button>
            </nav>
        </div>
    )
}
