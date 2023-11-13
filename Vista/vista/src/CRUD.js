import React, { useEffect, useState } from 'react'; // Importar React
import Axios from 'axios'; //Importar axios para comunicarse con el servidor atraves de el protocolo HTTP
import "./historial.css";// Importar estilos

const Datos = () => {
  // Inicio del controlador
  const [data, setData] = useState([]);//obtener datos de entrada
  const [editingId, setEditingId] = useState(null); // almacenar id a editar
  const [editedData, setEditedData] = useState({ operacion: '', resultado: '' });// almacena datos editados en la input habilitada para guardarlos despues.

  useEffect(() => {   // se utiliza hook de react para actualizar los datos de los componentes.
    const fetchData = async () => {          //obtenemos los datos de manera asíncrona
      try {
        const response = await Axios.get('http://localhost:3001/datos'); //conexión con la Api para traer los datos atraves del metodo GET.
        setData(response.data);// almacena los datos en data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  const refresh = async () => {   // Se utiliza para actualizar los datos y refrescar vista.
    try {
      const response = await Axios.get('http://localhost:3001/datos'); // conecta a la API para traer los datos con el metodo GET
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handleEdit = (id, operacion, resultado) => { // habilita la input en la tabla para la edición
    setEditingId(id); // Establecer el ID del dato a editar
    setEditedData({ operacion, resultado }); // Establecer los valores a editar
    
  };

  const handleSave = (id) => {
    const editedItem = editedData
    // Formatear la fecha y hora actual en el formato que MySQL acepta
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    // Actualizar el campo fecha_hora con la fecha formateada
    editedItem.fecha_hora = currentDate;
    Axios.patch(`http://localhost:3001/update/${id}`, editedItem) // Conexión con la base de datos para editar datos atraves del metodo PATCH
      .then(response => {
        console.log("Cambios guardados en el servidor:", response.data);
        setEditingId(null); // Finalizar el modo de edición
         refresh();
      }).catch(error => {
        console.error('Error al guardar los cambios:', error);
        
      });
     
  };
  const handleDelete = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`) //conexión con API para eliminar datos con el metodo PUT.
      .then(response => {
        console.log("Dato eliminado del servidor:", response.data);
        // Actualizar la lista de datos después de eliminar
        const newData = data.filter(item => item.id !== id);
        setData(newData);
      })
      .catch(error => {
        console.error('Error al eliminar el dato:', error);
        // Manejar el error, mostrar un mensaje al usuario, etc.
      });
  };

  const handleInputChange = (e, field) => { //trae los valores de la Input y los va actualizando a traves de onchange.
    const value = e.target.value;// trae el valor de la imput 
    console.log(e)
    setEditedData(prevState => ({  // actuliza y concatena la Input
      ...prevState,
      [field]: value
    }));
    
  };
  // Fin del controlador
  return (
    <div className='editar'>
      <div>
        <h1> Historial</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Operación</th>
              <th>Resultado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>
                  {editingId === dato.id ? (
                    <input value={editedData.operacion} onChange={(e) => handleInputChange(e, 'operacion')} />
                  ) : (
                    dato.operacion
                  )}
                </td>
                <td>
                  {editingId === dato.id ? (
                    <input value={editedData.resultado} onChange={(e) => handleInputChange(e, 'resultado')} />
                  ) : (
                    dato.resultado
                  )}
                </td>
                <td>
                  {editingId === dato.id ? (
                    <button onClick={() => handleSave(dato.id)}>Guardar</button>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(dato.id, dato.operacion, dato.resultado)}>Editar</button>
                      <button onClick={() => handleDelete(dato.id)}>Eliminar</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> 
  );
};

export default Datos;
