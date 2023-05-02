import { Link } from "react-router-dom"
import { FC } from "react";
import { Props } from "../hooks/Types";
import { getAllBooks } from "../hooks/UseCrud";

// components
import Loading from "./Loading";
import EmptyState from "./EmptyState";
import ErrorProcess from "./ErrorProcess";

const BookCardUser: FC<Props> = ({ query }) => {

    const { data, error, isLoading } = getAllBooks();
    const filteredBook = data && data.filter(book => book.title.toLowerCase().includes(query.toLowerCase()));

    if (error) return <ErrorProcess />
    if (isLoading) return <Loading />

    return (
        <div className="w-full">
            <div className="max-w-7xl mx-auto px-[16px] py-[13px] sm:px-[60px] sm:py-[18px] md:px-[80px]">
                <div className="listBook text-2xl text-secondary font-medium relative">Daftar Buku</div>
                {filteredBook && filteredBook?.length > 0 ? (
                    <div className="lg:grid lg:grid-cols-2 flex flex-col lg:flex-row gap-6 my-8 ">
                        {data.filter((book) => book.title.toLowerCase().includes(query.toLowerCase())).map(book => (
                            <div className="flex flex-row " key={book.id}>
                                <figure className="max-w-[120px]">
                                    <img src={book.sampul} alt="" className="object-cover  min-w-[120px]  h-[180px]" />
                                </figure>
                                <div className="p-3 flex flex-col">
                                    <h3 className="text-base sm:text-xl font-bold  text-[#333333]">{book.title}</h3>
                                    <h5 className="text-[10px] sm:text-xs text-[#372213] font-light">by <span className="font-normal">{book.author}</span></h5>
                                    <h5 className='text-base sm:text-xl  mt-1 '>rating : <span className='font-medium text-amber-300'>{book.ratings} /10</span></h5>
                                    <div className="flex gap-3 items-center self-start  mt-auto">
                                        <Link to={book.link} target="_blank" className="text-white font-medium text-sm bg-[#409D69] py-1 px-7 hover:bg-[#2D7C50] duration-300">Link Pembelian</Link>
                                        <Link to={"/book/" + book.id} className="text-secondary font-medium no-underline hover:underline hover:text-black duration-300">More Info</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState />

                )}
            </div>
        </div>
    )
}

export default BookCardUser;
