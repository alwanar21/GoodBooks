import { Link } from "react-router-dom";


export default function Navbar() {

    return (
        <div className="w-full bg-primary">
            <nav className="max-w-7xl mx-auto px-[16px] py-[13px] sm:px-[60px] sm:py-[18px] md:px-[80px] text-left">
                <Link to="/" className="text-base sm:text-xl text-secondary">
                    Good<span className="font-medium">Books</span>
                </Link>
            </nav>
        </div>
    )
}
