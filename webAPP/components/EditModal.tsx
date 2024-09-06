"use client";

import { useState } from 'react';
import styles from './EditModal.module.css';
import { error } from 'console';

export default function EditModal({ book, onClose, onSave }: { book: any, onClose: () => void, onSave: (updatedBook: any) => void }) {
    const [name, setName] = useState(book.titulo);
    const [quantity, setQuantity] = useState(book.cantidad);
    const [autor, setAutor] = useState(book.autor);
    const [editorial, setEditorial] = useState(book.editorial);
    const [description, setDescription] = useState(book.descripcion);
    

    const handleSave = async () => {
        const confirmSave = window.confirm('¿Estas seguro de que quieres guardar los cambios?')
        // Guardar los cambios (enviar los datos a la API).
        if(confirmSave){
            try{
                const response = await fetch(`http://localhost:3000/libros/actualizar/${book.id}`,{
                    method:'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        titulo: name,
                        cantidad: quantity,
                        autor: autor,
                        editorial: editorial,
                        descripcion: description,
                    }),
                });
                if(!response.ok){
                    throw new Error('Error al actualizar el libro');
                }
                const result = await response.json();
                console.log('Libro actualizado: ', result)
                onSave(result)
                onClose()

            }catch(error){
                console.error('Error al guardar los cambios: ',error)
            }
        }
    };

        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <h2>Editando: {name}</h2>

                    <label>Nombre:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />

                    <label>Cantidad:</label>
                    <input 
                        type="number" 
                        value={quantity} 
                        onChange={(e) => setQuantity(Number(e.target.value))} 
                    />

                    <label>Autor: </label>
                    <input 
                        type="text" 
                        value={autor} 
                        onChange={(e) => setAutor(e.target.value)} 
                    />

                    <label>Editorial: </label>                    
                    <input 
                        type="text" 
                        value={editorial} 
                        onChange={(e) => setEditorial(e.target.value)} 
                    />

                    <label>Descripcion: </label>                    
                    <textarea
                        className={styles.textarea}  
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />

                    <div>
                        <button 
                            className={styles.saveButton}
                            onClick={handleSave}>
                                Guardar
                        </button>
                        <button 
                            className={styles.cancelButton}
                            onClick={onClose}>
                                Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
}