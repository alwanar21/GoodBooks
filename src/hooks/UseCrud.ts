import useSWR from 'swr';
import { collection, getDocs, getDoc, doc, deleteDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase'
import { AddBook, Book, FetcherAllBookType, FetcherOneBookType, NewObject, SourceObject, updateBook } from './Types';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

export const getAllBooks = (): { data: Book[] | undefined, error: Error | undefined, isLoading: boolean } => {
    const fetcher: FetcherAllBookType = async () => {
        const data: Book[] = [];
        const querySnapshot = await getDocs(collection(db, 'books'));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() } as Book);
        });
        return data;
    };

    const { data, error, isValidating } = useSWR<Book[]>("books", fetcher);
    const isLoading = !data && !error && isValidating;

    return { data, error, isLoading };
};



export const getOneBook = (id: string): { data: Book | undefined, error: Error | undefined, isLoading: boolean } => {
    const fetcher: FetcherOneBookType = async (id: string) => {
        const data: Book[] = [];
        const docRef = doc(db, `books/${id}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            data.push({ ...docSnap.data() } as Book);
        } else {
            console.log("No such document!");
        }
        return data;
    };

    const { data, error, isValidating } = useSWR<Book[]>(id, fetcher);
    const isLoading = !data && !error && isValidating;

    return { data: data?.[0], error, isLoading };
};


export const useDeleteDoc = () => {

    const deleteDocById = async (id: string | undefined) => {
        try {
            await deleteDoc(doc(db, `books/${id}`));
            console.log("data berhasil dihapus");
        } catch (error) {
            console.error(error);
        }
    };

    return { deleteDocById };
};

//delete file
export const useDeleteFile: any = () => {
    const deleteFileByPath = async (path: string) => {
        const desertRef = ref(storage, path);
        try {
            await deleteObject(desertRef)
            console.log("gambar berhasil dihapus");
        } catch (error) {
            console.error(error);
        }
    };

    return { deleteFileByPath };
};

export const useImageUploader = () => {

    const uploadFile = async (image: File) => {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        return url ? url : null;
    };

    return uploadFile;
};

export const useAddBook = () => {
    const myUUID: string = uuidv4();
    const addBook = async (bookData: AddBook) => {
        try {
            await setDoc(doc(db, "books", uuidv4()), bookData);
        } catch (err) {
            console.error(err);
        }
    };

    return { addBook };
};

export const useUpdateBook = () => {
    const updateBook = async (id: string | undefined, bookData: updateBook) => {
        try {
            await updateDoc(doc(db, "books", id!), bookData)
        } catch (err) {
            console.error(err);
        }
    };

    return { updateBook };
};

export function getValidInput(source: NewObject): NewObject {
    const newObj: NewObject = {};

    for (let key in source) {
        if (source[key] !== undefined && source[key] !== null && source[key] !== "") {
            newObj[key] = source[key];
        }
    }

    return newObj;
}