"use client";

import styles from './BookCard.module.css';

const BASE_URL = 'http://localhost:3000'; // Url base de la api
const DEFAULT_IMAGE_URL = 'https://images.cdn1.buscalibre.com/fit-in/360x360/4f/f5/4ff51652234989c517f6a830567448f9.jpg';

export default function BookCard({ book, onEdit }: { book: any, onEdit: any }) {
    
    const imageUrl = book.imagen ? `${BASE_URL}${book.imagen}` : DEFAULT_IMAGE_URL;
    const isOutOfStock = book.cantidad === 0;

    // para manejar error en la carga de imagenes
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) =>{
        event.currentTarget.src = DEFAULT_IMAGE_URL;
    }

    return (
        <div className={styles.bookCard}
            onClick={() => onEdit(book)}
        >

            <div className={styles.bookContent}>

                {isOutOfStock && <p className={styles.outOfStock}>Out of Stock</p>}
                <h3 className={styles.bookTitle}>{book.titulo}</h3>

                <img 
                    src={imageUrl} 
                    alt={book.titulo} 
                    className={styles.bookImage}
                    onError={handleImageError}
                />
                    <p className={styles.bookAuthor}>De: {book.autor}</p>
                    <p className={styles.bookQuantity}>{book.cantidad} unidades</p>
            </div>
        </div>
    );
}