import { Outlet } from 'react-router-dom'
import Navbar from "../../components/Navbar";

export default function UserRoot() {
    return (
        <div className='h-full'>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
