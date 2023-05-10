import { Timestamp } from 'firebase/firestore';

export type Book = {
    id: string,
    title: string,
    author: string,
    link: string,
    date: Timestamp,
    pages: number,
    sampul: string,
    ratings: number,
    sinopsis: string,
    review: string
};

export type AddBook = {
    title: string,
    author: string,
    link: string,
    date: Date,
    pages: number,
    sampul: string | null,
    ratings: number,
    sinopsis: string,
    review: string,
};

export type updateBook = {
    sampul?: string | null;
    title?: string | undefined;
    author?: string | undefined;
    pages?: number | undefined;
    date?: Date | undefined;
    link?: string | undefined;
    ratings?: number | undefined;
    sinopsis?: string | undefined;
    review?: string | undefined;
}


export type Props = {
    query: string;
}

export type FetcherAllBookType = () => Promise<Book[]>;

export type FetcherOneBookType = (id: string) => Promise<Book[]>;

export interface SourceObject {
    [key: string]: any;
}

export interface NewObject {
    [key: string]: any;
}

export interface ReadMoreProps {
    children: string;
    maxWords: number;
}

export interface ReadMoreQuillProps {
    text: string;
    maxWords: number;
}