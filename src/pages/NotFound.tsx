import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {

    return (
        <>
            {/* component */}
            <main className="h-screen w-full flex flex-col justify-center items-center bg-primary">
                <h1 className="text-8xl md:text-9xl font-extrabold text-secondary tracking-widest">404</h1>
                <div className="bg-primary px-2 text-sm rounded ">
                    Page Not Found
                </div>
                <button className="mt-5">
                    <a className="relative inline-block text-sm font-medium text-secondary group active:text-orange-500 focus:outline-none focus:ring">
                        <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-secondary group-hover:translate-y-0 group-hover:translate-x-0" />
                        <span className="relative block px-8 py-3 bg-primary border border-current">
                            <Link to="/">Home</Link>
                        </span>
                    </a>
                </button>
            </main>
        </>
    )
}
