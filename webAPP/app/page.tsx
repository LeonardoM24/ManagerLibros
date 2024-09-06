"use client";
import { useState, useEffect } from "react";
import BookCard from '../components/BookCard';
import EditModal from '../components/EditModal';
import styles from './page.module.css'
import Image from "next/image";


export default function HomePage(){
  const [books, setBooks] = useState<any[]>([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);


  const fetchBooks = async () => {
    setLoading(true);
    // Funcion para obtener 
    try{
      const response = await fetch('http://localhost:3000/libros/mostrar',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = await response.json();
      setBooks(data);
    } catch (error){
      console.error("Error al obtener los libros:",error)
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMoreBooks();
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() =>{
    fetchBooks();
  }, []);

  const loadMoreBooks = () => {
    // infinite scroll
  };

  const handleEditBook = (book: any) => {
    setSelectedBook(book);
    setShowModal(true);
  }

  const updateBookInState  = async (updatedBook: any) => {
    setBooks((prevB) =>
      prevB.map((book) => 
        book.id === updatedBook.id ? updatedBook : book  
      )
    );
  };


  return(
    <div>
      <header className={styles.header}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
        <input  type="text" placeholder="Buscar libros..."
                className={styles.searchInput}/>
      </header>

      <main className={styles.booksGrid}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} onEdit={handleEditBook} />
        ))}

        {/* 
        <button onClick={loadMoreBooks} className={styles.loadMoreButton}>
          Cargar más libros
        </button>
        */}
      </main>

      {showModal && selectedBook && (
        <EditModal 
          book={selectedBook} 
          onClose={() => setShowModal(false)} 
          onSave={(updatedBook) => {
            updateBookInState(updatedBook);
            setShowModal(false); 
          }}// actualizar libro
        />
      )}
    </div>
  )

}