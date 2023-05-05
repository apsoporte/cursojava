/*ALGORITMO CON CONDICIONAL*/

let nombre = prompt("Ingrese por favor su nombre:");

if (nombre != "" && isNaN(nombre)=== true )
    {    
        const NOTA =parseInt (prompt("Ingrese la nota del exámen por favor:"));

        if (NOTA >= 1 && NOTA <= 10)
            {
                if (NOTA >= 6 && NOTA <=9)
                    {
                        alert(`${nombre}, aprobaste el exámen!!!!`);
                    }
                else if (NOTA === 10)
                    {
                            alert(`Felicitaciones ${nombre}, obtuviste una exámen perfecto!!!!!!!!`);
                    }
                    else
                        {
                            alert(`${nombre}, lo sinto, debes rendir nuevamente el exámen`);
                        }
            }
        else
            {
                alert("La nota ingresada es incorrecta, vuelva a ingresa sus datos")
            }
        }
    else
        {
            alert("Ingrese su nombre por favor:")
        }


/*ALGORITMO UTILIZANDO UN CICLO*/

let tiro = 0;
let numero= parseInt(prompt("Elija un numero del 1 al 50:"));

while(numero >=1 && numero <=50)
    {
        tiro++;
        if (numero === 22)
            {
                alert(`Felcitaciones!!!! El numero ${numero}, es el correcto`);           
                break;
            }
        else
            {
                alert("El numero ingresado no es el correcto");
                numero= parseInt(prompt("Elija un numero del 1 al 50:"));
            }
    }
    alert(`Para ganar el acertijo ud realizo ${tiro} intentos!!!!!`);

/*ALGORITMO UTILIZANDO FUNCION*/

let opcion = parseInt(prompt("Desea comprar o vender dolares? 1-comprar  2-vender"));

while (parseInt(opcion) === 1 || parseInt(opcion) === 2)
    {
        if(parseInt(opcion) === 1)
            {
                function convertir (num1, num2)
                    {     
                        let resultado = num1 * num2;    
                        return resultado;
                    }

                    let cambio = parseInt(prompt("Valor de compra del dolar al dia de hoy:"));
                    let dinero = parseInt(prompt(" Cuantos dolares desea comprar?"));
                    importe = convertir(cambio,dinero);
                    alert(`Para comprar U$S ${dinero}, Ud debe abonar $ ${importe}.
                        Muchas Gracias!!!!`); 
                    break;
            }
        else
            {
                function convertir (num1, num2)
                    {     
                        let resultado = num1 * num2;    
                        return resultado;
                    }

                    let cambio = parseInt(prompt("Valor de venta del dolar al dia de hoy:"));
                    let dinero = parseInt(prompt(" Quye cantidad desea Ud. vender?"));
                    importe = convertir(cambio,dinero);
                    alert(`Por la venta de los U$S ${dinero}, Ud recibira la suma de $ ${importe}.
                        Muchas Gracias!!!!!!`); 
                    break;
            }
    }