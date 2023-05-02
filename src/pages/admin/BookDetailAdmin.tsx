import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { getOneBook, useDeleteDoc, useDeleteFile } from '../../hooks/UseCrud';

//components
import ErrorProcess from '../../components/ErrorProcess';
import EmptyState from '../../components/EmptyState';
import Loading from '../../components/Loading';




export default function BookDetailAdmin() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { deleteDocById } = useDeleteDoc();
    const { deleteFileByPath } = useDeleteFile();
    const { data, error, isLoading } = getOneBook(id ? id : '');

    const handleDelete = async (id: string | undefined, sampul: string): Promise<void> => {
        try {
            await Swal.fire({
                title: 'Konfirmasi Hapus',
                text: 'Apakah Anda yakin ingin menghapus data ini?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Hapus',
                cancelButtonText: 'Batal'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteDocById(id);
                    await deleteFileByPath(sampul);
                    await Swal.fire({
                        title: 'Berhasil',
                        text: 'Data berhasil dihapus',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                    navigate("/admin", { replace: true });
                } else {
                    await Swal.fire({
                        title: 'Batal Hapus',
                        text: 'Penghapusan data dibatalkan.',
                        icon: 'info',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'OK'
                    });
                }
            });
        } catch (error) {
            console.error(error);
            await Swal.fire({
                title: 'Terjadi Kesalahan',
                text: 'Gagal menghapus data buku.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        }
    };

    if (error) return <ErrorProcess />
    if (isLoading) return <Loading />


    return (
        <div className="w-full">
            {
                data ?
                    <div className="max-w-7xl mx-auto px-[16px] py-[24px] sm:px-[60px] sm:py-[18px] md:px-[80px]">
                        <h1 className="text-3xl my-12 listBook font-medium relative">Detail Buku</h1>
                        <div key={id} className="flex flex-col md:flex-row gap-6 md:gap-12 ">
                            <div className="flex flex-col gap-6 items-center md:w-1/4 ">
                                <figure className='max-w-[164px] max-h-[240px]'>
                                    <img src={data.sampul} alt="book-images" className='object-cover  min-h-[200px] sm:min-h-[240px]' />
                                </figure>
                            </div>
                            <div className="md:w-3/4 text-justify">
                                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-[18px] text-[#333333]">{data.title}</h3>
                                <h5 className="text-base sm:text-xl text-[#372213] font-light">by <span className="font-normal">{data.author}</span></h5>
                                <h5 className='text-base sm:text-xl  pt-2 pb-3 sm:pt-4 sm:pb-6'>Ratings :
                                    <span className='font-medium text-amber-300'> {data.ratings}/10</span>
                                </h5>
                                <div className='' dangerouslySetInnerHTML={{ __html: data.sinopsis }} />
                                <div className="mt-2">
                                    <div className='text-[#372213] text-sm sm:text-lg'>{data.pages} <span>Halaman</span></div>
                                    <div className='text-[#372213] text-sm sm:text-lg'>Pertama kali diterbitkan pada <span>{new Date(data.date.seconds * 1000).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span></div>
                                </div>
                                <div className="flex flex-row gap-4 mt-7 sm:mt-10">
                                    <Link to={"/admin/editBook/" + id} className="py-1 px-8 text-sm rounded-md sm:text-base sm:py-2 sm:px-12 sm:rounded-lg text-white bg-blue-400 hover:bg-blue-500 duration-150">Edit</Link>
                                    <button onClick={() => handleDelete(id, data.sampul)} className="py-1 px-8 text-sm rounded-md sm:text-base sm:py-2 sm:px-12 sm:rounded-lg text-white bg-red-400 hover:bg-red-500 duration-150">hapus</button>
                                </div>
                            </div>
                        </div>
                    </div> :
                    <div>
                        <EmptyState />
                        <div className='text-center'>
                            <Link className='text-white font-medium w-24  text-sm bg-[#409D69] py-2 px-7 hover:bg-[#2D7C50] duration-300' to="/admin">Back to home</Link>
                        </div>
                    </div>
            }

        </div>
    )
}
