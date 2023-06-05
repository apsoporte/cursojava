class Listados    
    {
        constructor(idProducto, nombreProducto, precioProducto)
            {               
                this.idProducto = idProducto;
                this.nombreProducto = nombreProducto;
                this.precioProducto = precioProducto;
            }
    }; 

const Productos = [];

if (localStorage.getItem('productos')) 
    {
        let producto = JSON.parse(localStorage.getItem('productos'));
        for (let i = 0; i < producto.length; i++) 
            {                   
                Productos.push(producto[i]);
                
            }
    }

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', (e) => 
    {
        e.preventDefault();
        agregarProducto();
    });

let precioTotal = 0;

function agregarProducto() 
    {              
        const nombreProducto = document.getElementById('producto').value;
        const precioProducto = parseInt(document.getElementById('precio').value);
        
        //Para colocarle el valor 0 a mi ID
        if(Productos.idProducto === undefined)
            {
                Productos.idProducto = 0;                 
            }
    
        //Controlo que no ingrese 2 veces el mismo PRODUCTO    
        for(const nombre of Productos)
            {
                if (nombre.nombreProducto === nombreProducto)
                    {   
                        alert("EL producto ingresado, ya existe");                        
                        formulario.reset();
                        document.getElementById('producto').focus();
                        localStorage.removeItem();
                    }
            }

        if(nombreProducto != "" && isNaN(nombreProducto) != false && precioProducto != "" && isNaN(precioProducto) != true)
            {           
                const idProducto = Productos.idProducto + 1;
                const nuevoProducto = new Listados(idProducto, nombreProducto, precioProducto);
                
                precioTotal = precioTotal + precioProducto;//Voy SUMANDO el total de los productos

                Productos.push(nuevoProducto);//Agrego los datos al Arreglo                
                Productos.idProducto = Productos.idProducto + 1;//Incremento el ID de mi ARREGLO                
                
                localStorage.setItem('productos', JSON.stringify(Productos));//Agrego al LocalStorage y lo convierto en Json                
            }
        else
            {
                alert("Ingrese por favor bien los datos");
                formulario.reset();
                document.getElementById('producto').focus();
            }        
        formulario.reset();//Reseteo el formulario y lo dejo en blanco
        document.getElementById('producto').focus();//Me posiciono nuevamente en el campo producto
    }

const contenedorProducto = document.getElementById('grid-Container');
const verProducto = document.getElementById('verProducto');
const nuevoTicket = document.getElementById('nuevoTicket');

verProducto.addEventListener('click', () => 
    {        
        mostrarProducto();
    });

nuevoTicket.addEventListener('click', () => 
    {        
        localStorage.clear(contenedorProducto);//Borrar nuestro STORAGE
        location. reload(); //Refresca la Pagina 
    });

function mostrarProducto() 
    {        
        contenedorProducto.innerHTML = '';//limpia la lista del DIV      
        tituloProducto();        //Crea los titulos de los Productos
        
        //Ingreso los productos a mi tabla
        Productos.forEach((producto) =>    
            {                   
                const divid = document.createElement('div');
                divid.innerHTML = `                                
                                <div>${producto.idProducto}</div>                                
                                `;                                
                contenedorProducto.appendChild(divid);

                const divNombre = document.createElement('div');
                divNombre.innerHTML = `                                
                                <div>${producto.nombreProducto}</div>                                
                                `;                                
                contenedorProducto.appendChild(divNombre);

                const divPrecio = document.createElement('div');
                divPrecio.innerHTML =   `                                                         
                                        <div>$ ${producto.precioProducto}</div>  
                                        `;      
                contenedorProducto.appendChild(divPrecio);
            });  
        trazoTotal();
    }

function tituloProducto()
    {
        const dividProducto = document.createElement('div');
        dividProducto.innerHTML =   `                                
                                Id:                                
                                <hr/>
                                `;
        contenedorProducto.appendChild(dividProducto);
        
        const divTitulo1 = document.createElement('div');
        divTitulo1.innerHTML =   `                                
                                Producto:                                
                                <hr/>
                                `;
        contenedorProducto.appendChild(divTitulo1);
        
        const divTitulo2 = document.createElement('div');
        divTitulo2.innerHTML =   `                                
                                Precio:                                
                                <hr/>
                                `;
        contenedorProducto.appendChild(divTitulo2);
    }

function trazoTotal()
    {        
        const dividTotal = document.createElement('div');
        dividTotal.innerHTML = `                        
                                    <hr/>
                               `;
        contenedorProducto.appendChild(dividTotal);

        const divtrazoProducto = document.createElement('div');
        divtrazoProducto.innerHTML = `                                         
                                        <hr/>
                                        Total:
                                   `;
        contenedorProducto.appendChild(divtrazoProducto);
        
        const divtrazoPrecio = document.createElement('div');
        divtrazoPrecio.innerHTML = `    
                                        <hr/>
                                        $ ${precioTotal}
                                   `;
        contenedorProducto.appendChild(divtrazoPrecio);     
    }
