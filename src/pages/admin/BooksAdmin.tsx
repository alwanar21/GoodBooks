import { useState } from "react"
import BookCardAdmin from "../../components/BookCardAdmin";
import { Link } from "react-router-dom";
// import { heroBg } from '../../assets/hero-bg.jpg'

export default function BooksAdmin() {
    const [query, setQuery] = useState<string>("")

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let timer: NodeJS.Timeout;
        const value = event.target.value;
        clearTimeout(timer!); // Membersihkan timer saat pengguna masih mengetik
        timer = setTimeout(() => {
            setQuery(value);
        }, 1000); // Menunda panggilan fungsi setQuery selama 1500 milidetik setelah pengguna selesai mengetik
    };
    return (
        <div className="">
            {/* hero section */}

            <div className="hero w-full bg-hero bg-cover relative h-[251px] sm:h-[300px] ">
                <div className="absolute bg-white/50 top-0 left-0 w-full h-full z-10"></div>
                <div className="z-20 flex flex-col justify-center items-center gap-6 text-center">
                    <p className=" text-secondary text-base w-[80%] sm:text-xl md:max-w-4xl">Temukan dunia yang penuh pengetahuan, Menjelajahi ide-ide baru melalui pandangan dan ulasan kami mengenai berbagai buku terbaik.</p>
                    <input
                        type="text"
                        placeholder="Insert title here..."
                        className="input w-full max-w-xs input-md z-20 bg-primary text-secondary rounded-full "
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <BookCardAdmin query={query} />

        </div >
    )
}
