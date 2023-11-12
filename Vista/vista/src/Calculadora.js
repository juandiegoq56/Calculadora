import './calculadora.css';// Importar estilos
import Axios from 'axios'; //Importar axios para comunicarse con el servidor atraves de el protocolo HTTP
import React, { useState } from 'react';// Importar React
import { Button, Container, Row, Col, FormControl } from 'react-bootstrap'; // Importar Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';// Importa librerias de Bootstrap
import { calculadora,borr,history1,obtenerFecha } from './Model/OperacionesMat'; // Llama las funciones del Model
function App1() {
    // inicio Controlador
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
   
    const addToInput = val => { //concatena los caracteres ingresados en el input
      setInput(prevInput => prevInput + val);
    };
  
    const calcular = () => {
      try {
        // Evalúa la expresión matemática ingresada
        let result = calculadora(input);
        let hi= history1(input,result)
        if(!result){
          alert('Ingrese Operación Valida')
          setInput('');
        }else{
          setHistory(hi); //actualiza el historial
          setInput(result);// actualiza la entrada
        }
      } catch (error) {
        setInput('Error'); //manejo de errores
      }
    };
    const borrar = () => {
      try {
        // Evalúa la expresión matemática ingresada
        let result = borr(input);
          setInput(result);
        
      } catch (error) {
        setInput('Error'); // manejo de errores
      }
    };
  // limpia la entrada del input
    const handleClear = () => {
      setInput('');
      setHistory([])
    };
    // Envia la operación y el resultado a la API para posteriormente envialos a la BD
    const historial = () => {
      const fechaFormateada = obtenerFecha();
      Axios.post('http://localhost:3001/create', {
        fecha_hora: fechaFormateada,
        operacion:history,
        resultado:input
      })
      .then(() => {
        alert('Operación guardada'); // Mensaje avisando el envio de los datos
      }).catch((error) => {          // Manejo de errores
        console.log('Error al registrar:', error);
        if (error.response) {
          // Imprimir detalles específicos del error de la respuesta
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          // Imprimir detalles específicos del error de la solicitud
          console.log(error.request);
        } else {
          // Error inesperado
          console.log('Error', error.message);
        }
      });
    };
    
    // fin controlador
    return (
      <div className='cal'>
        <div className='cen'>
        <div className='con1'>
      <Container className="mt-5">
      <div className='input1'>
        <Row>
          <Col xs={3}>
            <FormControl
              type="text"
              value={input}
              placeholder="Enter an expression"
              readOnly
            />
          </Col>
        </Row>
        </div>
        <Row className="mt-3">
          <Col>
            
            <Button variant="primary" className="addMargin" onClick={() => addToInput('7')}>7</Button> {/*Los botones de numeros y operaciones invocando las respectivas funciones */}
            <Button variant="primary" className="addMargin" onClick={() => addToInput('8')}>8</Button>
            <Button variant="primary" className="addMargin"  onClick={() => addToInput('9')}>9</Button>
            <Button variant="warning" className="addMargin" onClick={() => addToInput('-')}>-</Button>
          </Col>
        </Row>
        <Row className="mt-3">
        <Col>
            
            <Button variant="primary" className="addMargin" onClick={() => addToInput('4')}>4</Button>
            <Button variant="primary" className="addMargin" onClick={() => addToInput('5')}>5</Button>
            <Button variant="primary" className="addMargin" onClick={() => addToInput('6')}>6</Button>
            <Button variant="warning" className="addMargin" onClick={() => addToInput('+')}>+</Button>
           
          </Col>
        </Row>
        <Row className="mt-3">
        <Col>
            <Button variant="primary" className="addMargin" onClick={() => addToInput('1')}>1</Button>
            <Button variant="primary" className="addMargin" onClick={() => addToInput('2')}>2</Button>
            <Button variant="primary" className="addMargin" onClick={() => addToInput('3')}>3</Button>
            <Button variant="warning" onClick={() => addToInput('*')}>*</Button>
        </Col>
        </Row>

        <Row className="mt-3">
        <Col>
            
           
            <Button variant="primary" className="addMargin" onClick={() => addToInput('0')}>0</Button>
            <Button variant="danger"  className="addMargin" onClick={borrar}>x</Button>
            <Button variant="success" className="addMargin" onClick={calcular}>=</Button> {/*Boton para calcular las operacaiones */}
            <Button variant="warning" className="addMargin" onClick={() => addToInput('/')}>/</Button>
            
            
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
          <Button variant="success" className="addMargin" onClick={historial}>Guardar</Button> {/*Boton para guardar la operación y resultado que desee el usuario*/ }
            
            <Button variant="danger" className="addMargin" onClick={handleClear}>Clear</Button>{/*Boton para limpiar el input de operaciones o resultados */}
            
          </Col>
        </Row>
       
      </Container>
      </div>  
      </div>
      </div>
    );
  
}

export default App1;
