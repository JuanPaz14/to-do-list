import {useRef, useState} from "react"
import Todo from "./Todo"
import './todoApp.css'
export default function TodoApp(){
    
    const[title,setTitle]=useState("hola");
    const[todos,setTodos]=useState([]);
    const inputRef= useRef()

   

    function handleChange(e){ //manejar cambios del input
        const value = e.target.value;
        setTitle(value)
    }

    function handleSubmit(e){//manejar cambios del envio 
        e.preventDefault();//quitar comportamiento por defecto

        const newTodo ={ // se crea un objeto
            id: crypto.randomUUID(),
            title: title,
            completed:false
        }
        const temp = [...todos]; //se crea una copia del array todos
        temp.unshift(newTodo) // se agrega el objeto creado
        setTodos(temp);
       inputRef.current.value=""; //se limpia el input
    } 
    
    function handleUpdate(id,value){//manejo actualizacion 
        const temp=[...todos];//crea una copia de el arreeglo todos 
        const item=temp.find(item=>item.id===id); //busca el id en el objeto
        item.title=value;//se reestablece el titulo del objeto encontrado
        setTodos(temp);//y se restablece el array de objetos todos 
    }

    function handleDelete(id){ // manejar eliminado
        const temp = todos.filter(item=>item.id !== id); //se filtra el array de objetos buscando todos menos uno
        setTodos(temp);  //se restablece el array de objetos
    }
    return (
        <div className="todoContainer">
            <form className="todoCreateForm" onSubmit={handleSubmit}>
                <input onChange={handleChange} className="todoInput" ref={inputRef}/>
                <button onClick={handleSubmit} className="buttonCreate">create todo</button>
            </form>
            <div className="todosContainer">
                {
                    todos.map(item=>( //funcion map para recorrer el arreglo 
                        <Todo item={item} onUpdate={handleUpdate} onDelete={handleDelete}/> //componente todo
                    ))
                }
            </div>
        </div>
    );
}