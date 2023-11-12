// Como las operaciones con numeros y operador concatenado podemos hacer uso de la funcion eval para hacer los calculos.
function calculadora(Operacion){
  let validation=validation1(Operacion);
  
  if(validation){
    const Mjerarquia=['/','*'];
    const mjerarquia=['+','-'];
    let operacion = Operacion.match(/\d+|[\+\-\*\/]/g);
    while(operacion.length>1){
      while(operacion.some(element => element === '/' || element === '*')){
    operacion.forEach((element,index) => {
      //validar operadores consecutivos
      if(Mjerarquia.includes(element)){
       if(element==='/'){
        if(operacion[index+1]==='-'){
          operacion.splice(index+1,1)
          operacion[index+1]=parseFloat(operacion[index+1])*-1
        }
        let divi=division(parseFloat(operacion[index-1]),parseFloat(operacion[index+1]))
        operacion[index-1]=divi.toString()
        operacion.splice(index,2)
       
       }else if(element==='*'){
        if(operacion[index+1]==='-'){
          operacion.splice(index+1,1)
          operacion[index+1]=parseFloat(operacion[index+1])*-1
        }
        let multi=multiplicaion(parseFloat(operacion[index-1]),parseFloat(operacion[index+1]))
        operacion[index-1]=multi.toString()
        operacion.splice(index,2)
       }
        
      } 
      
     
    });
  }
  operacion.forEach((element,index) => {
    //validar operadores consecutivos
    
    if(mjerarquia.includes(element)){

      if(element==='+'){
        let sum=suma(parseFloat(operacion[index-1]),parseFloat(operacion[index+1]))
        operacion[index-1]=sum.toString()
        operacion.splice(index,2)
      }
      else if(element==='-'){
        if (index===0){
          operacion.shift()
          operacion[0]=parseFloat(operacion[0])*-1
        } else{

        
        let rest=resta(parseFloat(operacion[index-1]),parseFloat(operacion[index+1]))
        operacion[index-1]=rest.toString()
        operacion.splice(index,2)
      }
    }
    }
   
  });
  }
   
    return operacion.toString()

}
else{
  return false
}
}

function validation1(Operacion){
  let valido=true;
  const operadores=['+','*','/'];
  if(operadores.includes(Operacion.split('')[0])){
    valido=false
    return valido
  }
  Operacion.split('').forEach((element,index) => {
    //validar operadores consecutivos
    if((operadores.includes(element)&& operadores.includes(Operacion[index+1]))){
      valido=false
      
    }
   
  });
  return valido
}

function division(num1,num2){
  if(num2!==0){
 return num1/num2
}else {
  return []
}
}
function multiplicaion(num1,num2){
 return num1*num2
}
function suma(num1,num2){
  return num1+num2
}
function resta(num1,num2){
  return num1-num2
}
function borr(result){
  if (result.length > 0) {
    result = result.substring(0, result.length - 1);
  }
  return result
}
function history1(history,result){
  return[history]
  
}
function obtenerFecha() {
  const fecha = new Date();

  const anio = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;
  mes = mes < 10 ? '0' + mes : mes;
  let dia = fecha.getDate();
  dia = dia < 10 ? '0' + dia : dia;

  let horas = fecha.getHours();
  horas = horas < 10 ? '0' + horas : horas;
  let minutos = fecha.getMinutes();
  minutos = minutos < 10 ? '0' + minutos : minutos;
  let segundos = fecha.getSeconds();
  segundos = segundos < 10 ? '0' + segundos : segundos;

  const fechaFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

  return fechaFormateada;
}

export {calculadora,borr,history1,obtenerFecha}
  
  
  
  
