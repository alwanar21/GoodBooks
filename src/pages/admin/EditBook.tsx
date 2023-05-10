// import ReactQuill from 'react-quill';
import ReactQuill from 'react-quill-v2.0';
import { useState } from "react"
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { getOneBook, getValidInput, useDeleteFile, useImageUploader, useUpdateBook } from '../../hooks/UseCrud';
import Swal from 'sweetalert2';

const schema = yup.object({
    title: yup.string().typeError("field harus berupa string"),
    author: yup.string().typeError("field harus berupa string"),
    pages: yup.number().typeError('input harus berupa angka').transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
        .test('isNumber', 'Input harus berupa angka', (value) => !value || !isNaN(value)),
    date: yup.date().typeError('field harus berupa tanggal').transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
        .test('isValidDate', 'Input harus berupa tanggal', (value) => {
            if (!value) {
                return true;
            }
            const date = new Date(value);
            return !isNaN(date.getTime());
        })
        .test('isBeforeToday', 'Tanggal tidak boleh melebihi tanggal hari ini', (value) => {
            if (!value) {
                return true;
            }
            const date = new Date(value);
            const today = new Date();
            return date <= today;
        }),
    link: yup.string().typeError("field harus berupa string"),
    ratings: yup.number().typeError('input harus berupa angka').min(1, "input harus sama dengan atau lebih dari 1")
        .max(10, "harus sama dengan atau kurang dari 10").transform((value, originalValue) => (originalValue.trim() === '' ? undefined : value))
        .test('isNumber', 'Input harus berupa angka', (value) => !value || !isNaN(value)),
    sinopsis: yup.string().typeError("field harus berupa string"),
    review: yup.string().typeError("field harus berupa string"),
}).required();
type FormData = yup.InferType<typeof schema>;


export default function EditBook() {
    const { id } = useParams<{ id: string }>();
    const [images, setImages] = useState<File | undefined>(undefined);
    const navigate = useNavigate();
    const { data: oneData } = getOneBook(id ? id : '');

    const uploadImage = useImageUploader();
    const { updateBook } = useUpdateBook();
    const { deleteFileByPath } = useDeleteFile();

    const { control, register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: FormData) => {
        try {
            const result = await Swal.fire({
                title: "Konfirmasi",
                text: "Apakah kamu yakin ingin memperbarui data buku ini?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Ya",
                cancelButtonText: "Tidak",
            });

            if (result.isConfirmed) {
                if (images) {
                    const imageUrl = await uploadImage(images);
                    const bookData = {
                        ...data,
                        sampul: imageUrl,
                    };
                    const validData = getValidInput(bookData);
                    if (Object.keys(validData).length > 0) {
                        await updateBook(id, validData);
                        await deleteFileByPath(oneData?.sampul);
                        await Swal.fire({
                            title: 'Berhasil',
                            text: 'Data berhasil diupdate',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                        console.log("berhasil");
                        reset()
                        setImages(undefined)
                        navigate(`/admin/book/${id}`, { replace: true });
                    } else {
                        await Swal.fire({
                            title: "Terjadi Kesalahan",
                            text: "Tidak ada data yang akan diperbarui.",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                } else {
                    const bookData = {
                        ...data,
                        sampul: "",
                    };
                    const validData = getValidInput(bookData);
                    if (Object.keys(validData).length > 0) {
                        await updateBook(id, validData);
                        await Swal.fire({
                            title: 'Berhasil',
                            text: 'Data berhasil diupdate',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                        console.log("berhasil");
                        reset()
                        setImages(undefined)
                        navigate(`/admin/book/${id}`, { replace: true });
                    } else {
                        await Swal.fire({
                            title: "Terjadi Kesalahan",
                            text: "Tidak ada data yang akan diperbarui.",
                            icon: "error",
                            confirmButtonText: "OK",
                        });
                    }
                }


            } else if (result.dismiss === Swal.DismissReason.cancel) {
                await Swal.fire({
                    title: "Dibatalkan",
                    text: "Update data buku dibatalkan.",
                    icon: "info",
                    confirmButtonText: "OK",
                });
            }
        } catch (error) {
            console.error(error);
            await Swal.fire({
                title: "Terjadi Kesalahan",
                text: "Gagal memperbarui data buku.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };


    return (

        <div className="bg-white min-h-screen max-w-7xl mx-auto p-4  md:p-8 mb-6 px-[16px] py-[13px] sm:px-[60px] sm:py-[18px] md:px-[80px]">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="text-gray-600">
                    <p className="font-medium text-lg">Ubah Informasi Buku</p>
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
                                name="sampul"
                                id="sampul"
                                className=" border mt-1 rounded  w-full bg-gray-50 file-input file-input-bordered h-10"
                                accept=".png, .jpg, .jpeg"
                                multiple={false}
                                onChange={(e) => setImages(e.target.files?.[0])}
                            />
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
                        <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                                <button className="bg-[#409D69]  hover:bg-[#2D7C50] duration-300 text-white font-bold py-2 px-4 rounded">
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
