import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React, { useState } from 'react';
import { Button, Container, Row, Col, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { calculadora,borr,history1,obtenerFecha } from './Model/OperacionesMat';
function App() {
    // inicio Controlador
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
   
    const addToInput = val => {
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
          setHistory(hi);
          setInput(result);
        }
      } catch (error) {
        setInput('Error');
      }
    };
    const borrar = () => {
      try {
        // Evalúa la expresión matemática ingresada
        let result = borr(input);
          setInput(result);
        
      } catch (error) {
        setInput('Error');
      }
    };
  
    const handleClear = () => {
      setInput('');
      setHistory([])
    };

    const historial = () => {
      const fechaFormateada = obtenerFecha();
      Axios.post('http://localhost:3001/create', {
        fecha_hora: fechaFormateada,
        operacion:history,
        resultado:input

      })
      .then(() => {
        alert('Operación guardada');
      })
      .catch((error) => {
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
      <Container className="mt-5">
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
        <Row className="mt-3">
          <Col>
            
            <Button variant="primary" onClick={() => addToInput('7')}>7</Button>
            <Button variant="primary" onClick={() => addToInput('8')}>8</Button>
            <Button variant="primary" onClick={() => addToInput('9')}>9</Button>
            <Button variant="warning" onClick={() => addToInput('-')}>-</Button>
          </Col>
        </Row>
        <Row className="mt-3">
        <Col>
            
            <Button variant="primary" onClick={() => addToInput('4')}>4</Button>
            <Button variant="primary" onClick={() => addToInput('5')}>5</Button>
            <Button variant="primary" onClick={() => addToInput('6')}>6</Button>
            <Button variant="warning" onClick={() => addToInput('+')}>+</Button>
          </Col>
        </Row>
        <Row className="mt-3">
        <Col>
            
            <Button variant="primary" onClick={() => addToInput('1')}>1</Button>
            <Button variant="primary" onClick={() => addToInput('2')}>2</Button>
            <Button variant="primary" onClick={() => addToInput('3')}>3</Button>
            <Button variant="warning" onClick={() => addToInput('*')}>*</Button>
          </Col>
        </Row>
        <Row className="mt-3">
        <Col>
            
           
            <Button variant="primary" onClick={() => addToInput('0')}>0</Button>
            <Button variant="danger" onClick={borrar}>x</Button>
            <Button variant="success" onClick={calcular}>=</Button>
            <Button variant="warning" onClick={() => addToInput('/')}>/</Button>
            
            
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
          <Button variant="success" onClick={historial}>Guardar</Button>
            
            <Button variant="danger" onClick={handleClear}>Clear</Button>
            
          </Col>
        </Row>
      </Container>
    );
  
}

export default App;
