"use client";
import React, { useState, useEffect } from "react";
import BookCard from '../components/BookCard';
import EditModal from '../components/EditModal';
import styles from './page.module.css'
import Image from "next/image";


interface Book{
  id: number;
  titulo: string;
  cantidad: number;
  autor: string;
  editorial: string;
  descripcion: string;
  imagen: string;
}

export default function HomePage(){
  const [books, setBooks]               = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal]       = useState(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false); // Estado para el modal de agregar
  const [loading, setLoading]           = useState<boolean>(true);

  // filtros
  const [searchParams, setSearchParams] = useState({
    titulo: '',
    autor: '',
    editorial: '',
    disponible: ''
  });



  const fetchBooks = async (params: any) => {
    setLoading(true);
    // Funcion para obtener 
    try{
      const query = new URLSearchParams(params).toString();
      console.log("prueba de query: " + params.titulo)
      const response = await fetch(`http://localhost:3000/libros/mostrar?${query}`,{
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


  useEffect(() =>{
    fetchBooks(searchParams);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    fetchBooks(searchParams);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log("prueba de cambio de valor: "+ name + " " + value);
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditBook = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  }

  const updateBookInState  = (updatedBook: Book) => {
    setBooks((prevB) =>
      prevB.map((book) => 
        book.id === updatedBook.id ? updatedBook : book  
      )
    );
  };

  const addBookToState = (newBook: any) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
  }

  const removeBookFromState = (bookID: number ) =>{
    setBooks((prevBooks) => prevBooks.filter(
      (book) => book.id !== bookID));
  }

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowAddModal(true);
  }

  return(
    <div>
      <header className={styles.header}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
        <form onSubmit={
          handleSearch
        } className="">
          <input
            type="text"
            name="titulo"
            placeholder="Buscar título"
            value={searchParams.titulo}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <input
            type="text"
            name="autor"
            placeholder="Buscar autor"
            value={searchParams.autor}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <input 
            type="text"
            name="editorial"
            placeholder="Buscar editorial"
            value={searchParams.editorial}
            onChange={handleInputChange}
            className={styles.searchInput}
          />
          <select
            name="disponible"
            value={searchParams.disponible}
            onChange={handleInputChange}
            className={styles.searchInput}
          >
            <option value="">Todos</option>
            <option value="true">Disponibles</option>
            <option value="false">No disponbiles</option>
          </select>
          <button type="submit" className={styles.searchButton}> Buscar </button>
        </form>
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

      {/* Modal para editar libros */}
      {showModal && selectedBook && (
        <EditModal 
          book={selectedBook} 
          onClose={() => setShowModal(false)} 
          onSave={(updatedBook) => {
            if(updatedBook === null && selectedBook){
              removeBookFromState(selectedBook.id);//borrar libro
            }else{
              updateBookInState(updatedBook); //actualizar libro
            }
            setShowModal(false); 
          }}// actualizar libro
        />
      )}
      {/* modal para agregar libros */}
      {showAddModal && (
        <EditModal 
          onClose={() => setShowAddModal(false)} 
          onSave={(newBook) => {
            addBookToState(newBook);
            setShowAddModal(false); 
          }}// actualizar libro
          isAdding={true}
        />
      )}

      {/* Boton add */}
      <button 
        className={styles.floatingButton} 
        onClick={handleAddBook}>
        +
      </button>
    </div>
  )

}