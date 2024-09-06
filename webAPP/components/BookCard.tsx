"use client";

import styles from './BookCard.module.css';

const DEFAULT_IMAGE_URL = 'https://images.cdn1.buscalibre.com/fit-in/360x360/4f/f5/4ff51652234989c517f6a830567448f9.jpg';

export default function BookCard({ book, onEdit }: { book: any, onEdit: any }) {
    
    const imageUrl = book.imagen || DEFAULT_IMAGE_URL;

    return (
    <div className={styles.bookCard}
        onClick={() => onEdit(book)}
    >

        <div className={styles.bookContent}>
            <h3 className={styles.bookTitle}>{book.titulo}</h3>
            <img 
                src={imageUrl} 
                alt={book.titulo} 
                className={styles.bookImage}
            />
                <p className={styles.bookAuthor}>De: {book.autor}</p>
                <p className={styles.bookQuantity}>{book.cantidad} unidades</p>
        </div>
    </div>
    );
}