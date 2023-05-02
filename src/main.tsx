import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

//layout
import AdminRoot from "./pages/layout/AdminRoot";
import UserRoot from "./pages/layout/UserRoot";

//pages
import NotFound from "./pages/NotFound";
import LoginAdmin from "./pages/LoginAdmin";
import AddBook from "./pages/admin/AddBook";
import EditBook from "./pages/admin/EditBook";
import BooksUser from "./pages/user/BooksUser";
import BookDetailUser from "./pages/user/BookDetailUser";
import BooksAdmin from "./pages/admin/BooksAdmin";
import BookDetailAdmin from "./pages/admin/BookDetailAdmin";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={< UserRoot />} >
        <Route index element={< BooksUser />} />
        <Route path="book/:id" element={<BookDetailUser />} />
      </Route>
      <Route path="admin" element={<AdminRoot />} >
        <Route index element={<BooksAdmin />} />
        <Route path="book/:id" element={<BookDetailAdmin />} />
        <Route path="addBook" element={<AddBook />} />
        <Route path="editBook/:id" element={<EditBook />} />
      </Route>
      <Route path="login" element={<LoginAdmin />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,

)
