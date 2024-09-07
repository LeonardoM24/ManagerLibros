"use client";

import { useState } from 'react';
import styles from './EditModal.module.css';
import { error } from 'console';

export default function EditModal({ 
    book, 
    onClose, 
    onSave, 
    isAdding = false
}: { 
    book?: any, 
    onClose: () => void, 
    onSave: (updatedBook: any) => void, 
    isAdding?: boolean 
}) {
    const [name, setName] = useState(book?.titulo || '');
    const [quantity, setQuantity] = useState(book?.cantidad || 0);
    const [autor, setAutor] = useState(book?.autor || '');
    const [editorial, setEditorial] = useState(book?.editorial || '');
    const [description, setDescription] = useState(book?.descripcion || '');
    const [img, setImg] = useState(book?.imagen || '');

    const handleSave = async () => {
        let errorMSJ : string = 'Error al actualizar el libro';
        let msj : string = '¿Estas seguro de que quieres guardar los cambios?';
        if(isAdding){
            msj      = '¿Estas seguro que quieres agregar este libro?';
            errorMSJ = 'Error al agregar el libro';
        }
        const confirmSave = window.confirm(msj)
        // Guardar los cambios (enviar los datos a la API).
        if(confirmSave){
            try{

                let apiCall : string = 'http://localhost:3000/libros/crear';
                let method : string = 'POST';
                if(!isAdding){
                    apiCall = `http://localhost:3000/libros/actualizar/${book.id}`;
                    method  = 'PUT';
                }
                const response = await fetch(apiCall,{
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        titulo: name,
                        cantidad: quantity,
                        autor: autor,
                        editorial: editorial,
                        descripcion: description,
                        imagen: img,
                    }),
                });
                if(!response.ok){
                    throw new Error(errorMSJ);
                }
                const result = await response.json();
                console.log('Libro actualizado/guardado: ', result)
                onSave(result)
                onClose()

            }catch(error){
                window.alert(`Error al guardar los cambios: ${error}`);
                console.error('Error al guardar los cambios: ',error);
            }
        }

    };

    const handleDelete = async () => {
        let errorMSJ : string = 'Error al borrar el libro';
        let confirmMsj : string = "¿Seguro que quieres borrar el libro?";
        const confirmDel = window.confirm(confirmMsj);

        if(confirmDel){
            try{
                let id = null;
                if(!isAdding){
                    id = book.id;
                }
                let apiCall : string = `http://localhost:3000/libros/borrar/${id}`;
                let method : string = 'DELETE';

                const response = await fetch(apiCall,{
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if(!response.ok){
                    throw new Error(errorMSJ);
                }
                const result = await response.json();
                console.log('Libro borrado: ', result);
                onSave(null);
                onClose();
            }catch (error){
                window.alert(`Error al guardar los cambios: ${error}`);
                console.error('Error al guardar los cambios: ',error);
            }
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>{isAdding ? 'Agregar Libro' : `Editando: ${name}`}</h2>
                <label>Titulo:</label>
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
                    min="0"
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
                        {isAdding ? 'Agregar' : 'Guardar'}
                    </button>
                    <button 
                        className={styles.cancelButton}
                        onClick={onClose}>
                            Cancelar
                    </button>
                    <button
                        className={styles.deleteButton}
                        onClick={handleDelete}>
                            Borrar
                    </button>
                </div>
            </div>
        </div>
    );
}