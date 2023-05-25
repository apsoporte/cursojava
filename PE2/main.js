//Creo la clase para mis Productos
class Productos
    {
        constructor(nombre, precio)
            {
                this.nombre = nombre;
                this.precio = precio;
            }
    }

//Creo mi array vacio y voy agregando los productos a medida que voy comprando
const lista=[];

let nombre = String(prompt("Producto a comprar?"));
let precio = parseInt(prompt("Ingrese su precio"));
let dato = "";

//Controla que ningun datos ingresados sean vacio, caso contrario imprime el ticket
while(nombre != "" && isNaN(nombre) != false || isNaN(precio) != true)
    {           
        if(nombre === "" || isNaN(nombre) === false && isNaN(precio) != true) // Para conocer que dato ingresa vacio
            {
                dato = "nombre";                
            }
        else
            {
                dato = "precio";                
            }

        if (nombre != "" && isNaN(nombre) != false && isNaN(precio) != true) //Si ingresa bien los datos, hace la carga en el Array
            {
                const item = new Productos(nombre, precio);    
                lista.push(item);                        
                nombre = prompt("Producto a comprar?");
                precio = parseInt(prompt("Ingrese su precio"));
            }
        else if (dato === "nombre")//Para repreguntar el dato o campo que ingreso vacio
            {
                nombre = prompt("Ingrese producto a comprar");
            }
            else    
                {
                    precio = parseInt(prompt("Ingrese el precio del producto"));
                }     
    }
//Hago la impresion de los productos comprados
document.write("Los productos comprados son: <br>");

//Recorro el array con los productos comprado y hago la suma total de la compra
total = 0;
lista.forEach((item) => 
    {
        document.write(`${item.nombre}: $${item.precio}<br>`);
        total = total + item.precio;        
    });
//Hago la impresion del gasto total de los productos comprados
document.write(`Total de su compra: $${total}<br><br>`);

//Creo nuevamento un Array con los datos del Iva por producto.
document.write("El IVA por productos es: <br>");
lista.map((item) => 
    {
        iva = item.precio * 0.21;                        
        document.write(`${item.nombre}: $${iva}<br>`);        
    });
//Hago la impresion del iva total de los productos comprados.
totalIva = total *0.21;
document.write(`Total de IVA de la compra: $${totalIva}`);