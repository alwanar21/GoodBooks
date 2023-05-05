import { useContext, useEffect, useState } from "react"
import { Resolver, useForm } from "react-hook-form";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { User } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import Swal from "sweetalert2";

type FormValues = {
    email: string;
    password: string;
};


export default function LoginAdmin() {
    const [isPassword, setIsPassword] = useState(true)
    const [typePassword, setTypePassword] = useState("password")
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const navigate = useNavigate()

    //show & hide password
    const showPassword = () => {
        setIsPassword(!isPassword)
        if (typePassword === "password") {
            setTypePassword("text")
        } else {
            setTypePassword("password")
        }
    }
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;
    useEffect(() => {
        if (savedUser) {
            navigate("/admin")
        }
    }, []);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
    const onSubmit = handleSubmit((data) => {

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                // Signed in

                const user = userCredential.user;
                localStorage.setItem("user", JSON.stringify(user));
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil',
                    text: 'Selamat datang di goodBooks',
                    confirmButtonText: 'OK'
                });
                navigate("/admin")
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                    text: 'Periksa kembali email dan password Anda',
                    confirmButtonText: 'OK'
                });
                const errorCode: string = error.code;
                const errorMessage: string = error.message;
            });

        console.log(data)
    });


    return (
        <>
            <div className="mx-auto max-w-screen-xl sm:my-36 px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg sm:px-8">
                    <h1 className="text-2xl font-bold sm:text-3xl">Selamat Datang </h1>
                    <p className="mt-1 text-gray-500 font-medium">
                        di GoodBooks -
                    </p>
                </div>
                <form onSubmit={onSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
                    <div>
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm focus:border-primary"
                                placeholder="Enter email"
                                // {...register("email", { required: true })}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Invalid email"
                                    }
                                })}

                            />
                            {errors.email && <p role="alert" className="text-red-400 text-sm pl-3 mt-1">{errors.email.message}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={typePassword}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter password"
                                {...register("password", { required: true })}
                            />
                            <span className="absolute inset-y-0 end-0 grid place-content-center px-4" onClick={showPassword}>
                                {isPassword ? <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                </svg>}

                            </span>
                            {errors.password?.type === 'required' && <p role="alert" className="text-red-400 text-sm pl-3 mt-1">Password is required</p>}
                        </div>
                    </div>
                    <div className="flex flex-row-reverse">
                        <button
                            type="submit"
                            className="inline-block rounded-lg bg-[#409D69]  hover:bg-[#2D7C50] duration-300 px-5 py-3 text-sm font-medium text-white "
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}
