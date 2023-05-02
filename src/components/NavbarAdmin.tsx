import { Link } from "react-router-dom";

export default function NavbarAdmin() {

    return (
        <div className="w-full bg-primary">
            <nav className="max-w-7xl mx-auto px-[16px] py-[13px] sm:px-[60px] sm:py-[18px] md:px-[80px] text-left flex flex-row justify-between ">
                <Link to="/admin" className="text-base sm:text-xl text-secondary">
                    Good<span className="font-medium">Books</span>
                </Link>
                <button className="text-secondary text-sm rounded-md px-3 py-1 border-2 border-secondary font-medium hover:bg-secondary hover:text-primary duration-75 ">logout</button>
            </nav>
        </div>
    )
}
