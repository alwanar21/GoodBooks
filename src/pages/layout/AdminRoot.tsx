import { Outlet } from 'react-router-dom'
import NavbarAdmin from '../../components/NavbarAdmin';

export default function AdminRoot() {
    return (
        <>
            <NavbarAdmin />
            <main>
                <Outlet />
            </main>
        </>
    )
}
