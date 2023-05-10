// import ReactQuill from 'react-quill';
import ReactQuill from 'react-quill-v2.0';
import { useState } from "react"
import 'react-quill/dist/quill.snow.css';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { v4 as uuidv4 } from 'uuid';
import { useAddBook, useImageUploader } from '../../hooks/UseCrud';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    title: yup.string().required("field harus diisi"),
    author: yup.string().required("field harus diisi"),
    // sampul: yup.mixed().required("gambar harus disisipkan"),
    pages: yup.number().typeError('input harus berupa angka').positive().integer("input harus bilangan positif").required(),
    date: yup.date().typeError('field harus diisi').required("field harus diisi"),
    link: yup.string().required("field harus diisi"),
    ratings: yup.number().typeError('input harus berupa angka').positive().integer().min(1, "input harus sama dengan atau lebih dari 1")
        .max(10, "harus sama dengan atau kurang dari 10").required('input harus berupa angka'),
    sinopsis: yup.string().required("field harus diisi"),
    review: yup.string().required("field harus diisi"),
}).required();
type FormData = yup.InferType<typeof schema>;

export default function AddBook() {
    const [errorImage, setErrorImage] = useState<string>("")
    const [images, setImages] = useState<File | undefined>(undefined);
    const navigate = useNavigate();
    const myUUID: string = uuidv4();
    const uploadImage = useImageUploader();
    const { addBook } = useAddBook();
    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormData) => {

        if (images) {
            try {
                const imageUrl = await uploadImage(images);
                console.log("ini datang" + imageUrl);
                const bookData = {
                    ...data,
                    sampul: imageUrl
                };
                console.log(bookData);
                await addBook(bookData);
                console.log("berhasil");
                reset()
                setImages(undefined)
                navigate("/admin", { replace: true });
                Swal.fire({
                    icon: 'success',
                    title: 'Data berhasil disimpan',
                    showConfirmButton: false,
                    timer: 1500
                })
            } catch (error) {
                console.error(error);
            }
        } else {
            setErrorImage("field ini harus diisi")
        }
    };

    return (

        <div className="bg-white min-h-screen max-w-7xl mx-auto p-4  md:p-8 mb-6 px-[16px] py-[13px] sm:px-[60px] sm:py-[18px] md:px-[80px]">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                    <p className="font-medium text-lg">Tambah daftar Buku</p>
                    <p>Silahkan isi form input yang tersedia</p>
                </div>
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div className="md:col-span-5">
                            <label htmlFor="judul_buku">Judul Buku</label>
                            <input
                                type="text"
                                id="judul_buku"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                defaultValue=""
                                placeholder="Insert title book here"
                                {...register("title")}
                            />
                            <p className='mt-1 text-red-400'>{errors.title?.message}</p>
                        </div>
                        <div className="md:col-span-5">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                id="author"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                defaultValue=""
                                placeholder="Insert author here"
                                {...register("author")}
                            />
                            <p className='mt-1 text-red-400'>{errors.author?.message}</p>
                        </div>
                        <div className="md:col-span-3">
                            <label htmlFor="sampul">Sampul buku</label>
                            <input
                                type="file"
                                id="sampul"
                                className=" border mt-1 rounded  w-full bg-gray-50 file-input file-input-bordered h-10"
                                accept=".png, .jpg, .jpeg"
                                multiple={false}
                                onChange={(e) => setImages(e.target.files?.[0])}
                            />
                            {errorImage && <p className='mt-1 text-red-400'>{errorImage}</p>}
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="link">Link pembelian</label>
                            <input
                                type="text"
                                id="link"
                                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                defaultValue=""
                                placeholder=""
                                {...register("link")}
                            />
                            <p className='mt-1 text-red-400'>{errors.link?.message}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="halaman">Jumlah halaman</label>
                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                <input
                                    id="halaman"
                                    type='number'
                                    placeholder="halaman"
                                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                    defaultValue=""
                                    {...register("pages")}
                                />
                            </div>
                            <p className='mt-1 text-red-400'>{errors.pages?.message}</p>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="terbit">Tanggal terbit</label>
                            <div className="">
                                <input
                                    type="date"
                                    id="terbit"
                                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                    placeholder=""
                                    defaultValue=""
                                    {...register("date")}
                                />
                            </div>
                            <p className='mt-1 text-red-400'>{errors.date?.message}</p>
                        </div>
                        <div className="md:col-span-1">
                            <label htmlFor="rating">Ratings </label>
                            <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                                <input
                                    id="rating"
                                    type="number"
                                    placeholder="0"
                                    className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                                    defaultValue=""
                                    {...register("ratings")}
                                />
                            </div>
                            <p className='mt-1 text-red-400'>{errors.ratings?.message}</p>
                        </div>
                        <div className='w-full h-80 md:col-span-5'>
                            <label htmlFor="sinopsis">Sinopsis </label>
                            <Controller
                                name="sinopsis"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <ReactQuill
                                            className="h-60 border-gray-200 mt-1"
                                            theme="snow"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <p className='mt-1 text-red-400'>{errors.sinopsis?.message}</p>
                        <div className='w-full h-80 md:col-span-5'>
                            <label htmlFor="review">Review </label>
                            <Controller
                                name="review"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <ReactQuill
                                            className="h-60 border-gray-200 mt-1"
                                            theme="snow"
                                            value={value}
                                            onChange={onChange}
                                        />
                                    </>
                                )}
                            />
                        </div>
                        <p className='mt-1 text-red-400'>{errors.review?.message}</p>
                        <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                                <button type='submit' className="bg-[#409D69]  hover:bg-[#2D7C50] duration-300 text-white font-bold py-2 px-4 rounded">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
