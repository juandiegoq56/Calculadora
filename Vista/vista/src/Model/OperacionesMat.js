
function calculadora(Operacion){  // Inicia la función calculadora
  let validation=validation1(Operacion); // Se asigna la función validacion a la variable.
  
  if(validation){                        // Se valida si cumple la condición.
    const Mjerarquia=['/','*'];          // Se asigna las mayores jerarquias.
    const mjerarquia=['+','-'];          // Se asigna las menores jerarquias.
    let operacion = Operacion.match(/\d+|[\+\-\*\/]/g); // Expresión regurar que busca concidencias de las operaciones matematicas.
    while(operacion.length>1){                          // Condición que asegura que solo quede una pocision en el string.
      while(operacion.some(element => element === '/' || element === '*')){    // Condición que nos asegura si en el string hay elemento / o * . 
    operacion.forEach((element,index) => { // Se realiza el ciclo for para recorrer el string.
      //validar operadores consecutivos
      if(Mjerarquia.includes(element)){    // Se verifica si hay elementos de la mayor jerarquia.
       if(element==='/'){                  // Se verifica si el elemento es un simbolo de division.
        if(operacion[index+1]==='-'){      // Se valida la división entre un numero negativo.
          operacion.splice(index+1,1)      // Borra el simbolo de resta.
          operacion[index+1]=parseFloat(operacion[index+1])*-1 // a la posicion donde estaba el simbolo de resta le asigna un valor real multiplicado por -1
        }
        let divi=division(parseFloat(operacion[index-1]),parseFloat(operacion[index+1])) // Una vez validado se pasa a realizar la operación invocando a la función división.
        operacion[index-1]=divi.toString()    // Se le asigna a la posicion del primer numero de la división el resultado de esta .
        operacion.splice(index,2)             // Se elimina la posición del simbolo división y el otro numero.
       
       }else if(element==='*'){               // Se valida si el elemento es un simbolo de multiplicaión.
        if(operacion[index+1]==='-'){         // Se valida si la siguiente posición es una resta.
          operacion.splice(index+1,1)         // Se elimina la posicion de la resta.
          operacion[index+1]=parseFloat(operacion[index+1])*-1  // Se multiplica por -1 el numero que estaba seguido de la resta, y se le asigna a la posicion donde estaba las resta.
        }
        let multi=multiplicaion(parseFloat(operacion[index-1]),parseFloat(operacion[index+1])) // Se realiza la multiplicación con ayuda de la función.
        operacion[index-1]=multi.toString()   // Se pone el valor en la posicion del primer numero.
        operacion.splice(index,2)             // Se elimina las otras dos posiciones.
       }
        
      } 
      
     
    });
  }
  operacion.forEach((element,index) => {    // Se recorre el string.
    //validar operadores consecutivos
    
    if(mjerarquia.includes(element)){      // Se valida la jerarquia.

      if(element==='+'){                  // se valida si es suma.
        let sum=suma(parseFloat(operacion[index-1]),parseFloat(operacion[index+1])) // se realiza la operación con ayuda de la función.
        operacion[index-1]=sum.toString() // Se le asigna el resultado a la posición del primer numero.
        operacion.splice(index,2)         // Se elimina la otras dos posiciones.
      }
      else if(element==='-'){             // Se valida si es resta.
        if (index===0){                   // Se valida el menos en la primer posición del string.
          operacion.shift()
          operacion[0]=parseFloat(operacion[0])*-1 // se asigna el valor real en la posición 0 *-1
        } else{
        let rest=resta(parseFloat(operacion[index-1]),parseFloat(operacion[index+1]))  // Se realiza la operación con ayuda de la función resta.
        operacion[index-1]=rest.toString() // Se asigna el resultado en la posicion del primer numero.
        operacion.splice(index,2)          // Se elimina las otras dos posiciones.
      }
    }
    }
   
  });
  }
   
    return operacion.toString()  // se retorna operación como string.

}
else{
  return false                 // Se retorna falso por si no se puede realizar la operación.
}
}

function validation1(Operacion){   // Dunción para validar operadores consecutivos.
  let valido=true;
  const operadores=['+','*','/'];  // operadores.
  if(operadores.includes(Operacion.split('')[0])){   // Verifica si los operadores estan en la primer posición del string.
    valido=false
    return valido
  }
  Operacion.split('').forEach((element,index) => {
    //validar operadores consecutivos
    if((operadores.includes(element)&& operadores.includes(Operacion[index+1]))){  // Valida operadores consecutivos.
      valido=false
      
    }
   
  });
  return valido
}

function division(num1,num2){   // Función dicisión
  if(num2!==0){                 
 return num1/num2
}else {
  return []
}
}
function multiplicaion(num1,num2){ // Función multiplicaión
 return num1*num2
} 
function suma(num1,num2){         //  Función suma
  return num1+num2
}
function resta(num1,num2){       // Función resta.
  return num1-num2
}
function borr(result){          // Funcion que borra la ultima posición de un string.
  if (result.length > 0) {      // Verifica que el string no sea NULL .
    result = result.substring(0, result.length - 1);  // Devuelve el string quitando la ulrima posición.
  }
  return result
}
function history1(history){
  return[history]  // Devuelve el historial.
  
}
function obtenerFecha() {   // obtiene la fecha en el formato DATETIME
const fecha = new Date(); // Crea un objeto Date, representando la fecha y hora actuales.
const anio = fecha.getFullYear(); // Obtiene el año de la fecha actual.
let mes = fecha.getMonth() + 1; // Obtiene el mes actual (de 0 a 11) y le suma 1 para que sea de 1 a 12.
mes = mes < 10 ? '0' + mes : mes; // Asegura que el mes tenga dos dígitos. Por ejemplo, convierte '3' en '03'.
let dia = fecha.getDate(); // Obtiene el día del mes actual.
dia = dia < 10 ? '0' + dia : dia; // Asegura que el día tenga dos dígitos. Por ejemplo, convierte '5' en '05'.

let horas = fecha.getHours(); // Obtiene las horas del momento actual.
horas = horas < 10 ? '0' + horas : horas; // Asegura que las horas tengan dos dígitos. Por ejemplo, convierte '9' en '09'.
let minutos = fecha.getMinutes(); // Obtiene los minutos del momento actual.
minutos = minutos < 10 ? '0' + minutos : minutos; // Asegura que los minutos tengan dos dígitos.
let segundos = fecha.getSeconds(); // Obtiene los segundos del momento actual.
segundos = segundos < 10 ? '0' + segundos : segundos; // Asegura que los segundos tengan dos dígitos.
const fechaFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`; // Formatea la fecha y hora en el formato 'AAAA-MM-DD HH:MM:SS'.
 return fechaFormateada;
}

export {calculadora,borr,history1,obtenerFecha}
  
  
  
  
