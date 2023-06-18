let lista = document.getElementById("itemContenedor")

fetch("./data.json")
	.then(response => response.json())
	.then(data =>
		{
			lista.innerHTML = '';
			data.forEach(product => 
				{
					const div = document.createElement('div');
					div.innerHTML = `		
							<div class="item">
								<figure>
									<img src="${product.scrImagen}" alt="${product.altImagen}"/>
								</figure>				
								<div class="producto">
									<h3>${product.nombreProducto}</h3>
									<p class="precio">$${product.precioProducto}</p>
									<button class="botonCarrito">Añadir al carrito</button>
								</div>
							</div>
						`;
					lista.append(div);	
				})
			});

class Listados    
    {
        constructor(idProducto, nombreProducto, precioProducto)
            {               
                this.idProducto = idProducto;
                this.nombreProducto = nombreProducto;
                this.precioProducto = precioProducto;
            }
    }; 

let productos = [];

if (localStorage.getItem('product')) 
    {
        let producto = JSON.parse(localStorage.getItem('product'));
        for (let i = 0; i < producto.length; i++) 
            {                   
                productos.push(producto[i]);             
            }		
    }

//Aca tomamos todo el DIV Contenedor de mi icono CARRITO en el HTML
const botonCarrito = document.querySelector('.container-cart-icon');
//Aca tomamos todo el DIV Contenedor de mi icono CANTIDAD en el HTML
const productoContenedor = document.querySelector('.productoContenedor');

//Al hacer click en el CARRITO aparecen los datos o desaparecen
botonCarrito.addEventListener('click', () => 
	{
		productoContenedor.classList.toggle('carrito');
	});
	
// Variable de arreglos de Productos para agregar al CARRITO
const mostrarCarrito = document.querySelector('.mostrarCarrito');
const totalaPagar = document.querySelector('.totalaPagar');
const totalCarrito = document.querySelector('.totalCarrito');
const contadorProducto = document.querySelector('#contador-productos');

//variable para eliminar los item al carrito
const eliminarItem = document.querySelector('.eliminarItem');
// Lista de todos los contenedores de productos
const itemContenedor = document.querySelector('#itemContenedor');

// Para determinar que PRODUCTO se ingreso al nuestro CARRITO
itemContenedor.addEventListener('click', e => 
	{
		//Para identificar que clicleamos en el boton segun su clase botonCarrito. Devuelve true		
		if (e.target.classList.contains('botonCarrito')) 
			{
				const product = e.target.parentElement;//Retrocede y me trae el DIV seleccionado    	       		
				const infoProduct = 
					{
						cantidadProducto: 1,
						nombreProducto: product.querySelector('h3').textContent,
						precioProducto: product.querySelector('p').textContent,
					};
				const exits = productos.some(product => 
								product.nombreProducto === infoProduct.nombreProducto);

				if (exits) 
					{
						const products = productos.map(product => 
							{
								if (product.nombreProducto === infoProduct.nombreProducto) 
									{
										product.cantidadProducto++;									
										return product;
									} 
								else 
									{										
										return product;
									}
							});

						productos = [...products];
					} 
				else 
					{
						productos = [...productos, infoProduct];
					}
				verCarrito();
			}
	});

// Para eliminar lo productos del carrito	
eliminarItem.addEventListener('click', e => 
	{
		if (e.target.classList.contains('icon-close')) 
			{
				const product = e.target.parentElement;
				const nombreProducto = product.querySelector('p').textContent;
				productos = productos.filter(product => product.nombreProducto !== nombreProducto);
				Swal.fire({
						position: 'center',
						icon: 'success',						
						text: 'Productos eliminado del carrito!!!',
						showConfirmButton: false,
						timer: 1500
					});
				verCarrito();
			}
	});

// Esta funcion la utilizamos para MOSTRAR los productos agregados al CARRITO
const verCarrito = () => 
	{
		if (!productos.length) 
			{
				mostrarCarrito.classList.remove('carritoVacio');
				eliminarItem.classList.add('carritoVacio');
				totalCarrito.classList.add('carritoVacio');
				localStorage.setItem('product', JSON.stringify(productos));
			} 
		else 
			{
				mostrarCarrito.classList.add('carritoVacio');
				eliminarItem.classList.remove('carritoVacio');
				totalCarrito.classList.remove('carritoVacio');
				localStorage.setItem('product', JSON.stringify(productos));
			}

	 	// Limpiamos el CARRITO para mostrar los productos comprados
		eliminarItem.innerHTML = '';

		let total = 0;
		let contadorItem = 0;

		productos.forEach(product => 
			{
				const containerProduct = document.createElement('div');
				containerProduct.classList.add('productoCarrito');
				containerProduct.innerHTML = `
					<div class="infoProductoCarrito">
						<span class="cantidad-producto-carrito">${product.cantidadProducto}</span>
						<p class="titulo-producto-carrito">${product.nombreProducto}</p>
						<span class="precio-producto-carrito">${product.precioProducto}</span>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="icon-close"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				`;
				eliminarItem.append(containerProduct);

				total =	total + parseInt(product.cantidadProducto * product.precioProducto.slice(1));
				contadorItem = contadorItem + product.cantidadProducto;						
			});
		
		totalaPagar.innerText = `$ ${total}`;
		contadorProducto.innerText = contadorItem;		
	};

// Hago la llamada al Boton PAGAR y limpiamos el STORAGE
pagarProducto.addEventListener('click', () => 
    {   
		//Para saber si tengo o no productos en el CARRITO
		let item = document.getElementById("contador-productos").innerText;	
		if(item === "0" )
			{
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'No hay productos en el carrito!!!',
					showConfirmButton: false					
				});
				setInterval("location.reload()",1500);//Refresca la pagina
				localStorage.clear(productos);//Borrar nuestro STORAGE
			}
		else
			{
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Felicitaciones por la compra!!!!!',
					showConfirmButton: false,					
				});		
				setInterval("location.reload()",1500);//Refresca la pagina
				localStorage.clear(productos);//Borrar nuestro STORAGE				
			}				
    });