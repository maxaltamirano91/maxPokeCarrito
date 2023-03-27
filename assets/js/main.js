/*
	Fractal by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/



(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');
		else {

			breakpoints.on('>medium', function() {
				$body.removeClass('is-mobile');
			});

			breakpoints.on('<=medium', function() {
				$body.addClass('is-mobile');
			});

		}

	// Scrolly.
		$('.scrolly')
			.scrolly({
				speed: 1500
			});

})(jQuery);



const banner = document.getElementById("banner");

setTimeout(() => {
  banner.innerHTML="";
},5000);



class Producto {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
    this.cantidad = 1;
    
  }
}

const gohan = new Producto(1, "Gohan", 850, "/images/gohan.jpg");
const maki = new Producto(2, "Maki", 700, "/images/maki.jpg");
const ramen = new Producto(3, "Ramen", 1020, "/images/ramen.jpg");
const sushi = new Producto(4, "Sushi", 999, "/images/sushi.jpg");
const postre1 = new Producto(5, "Frutilla" , 350 , "/images/frutilla.jpg");
const postre2 = new Producto(6, "Chocolate" , 370 , "/images/chocolate.jpg");
const postre3 = new Producto(7, "Helado " , 250 , "/images/helado.jpg");
const postre4 = new Producto(8, "Torta" , 370 , "/images/torta.jpg");
const coca = new Producto(9, "Coca-Cola" , 200 , "/images/coca.jpg");
const jugo = new Producto(10, "Naranja" , 300 , "/images/naranja.jpg");
const agua = new Producto(11, "Agua" , 370 , "/images/agua.jpg");

const productos = [gohan, maki, ramen, sushi, postre1, postre2, postre3, postre4, coca, jugo, agua];

let carrito = [];




console.log(productos);

const divContenedor = document.getElementById("divContenedor");

// MOSTRAR PRODUCTOS EN STOCK
productos.forEach((producto) => {
  const divMostrarProducto = document.createElement("div");
  divMostrarProducto.className = "caja";
  divMostrarProducto.innerHTML = `<div class="card" style="width: 18rem;">
                                  <img src=" ${producto.img} " class=" maxpoke " alt="...">
                                  <div class="card-body">	
                                   <h5 class="card-text">${producto.nombre}</h5>
                                   <p class="card-text">Precio: $${producto.precio}</p>
                                   <button  class="btn btn-primary" id = "boton${producto.id}">Añadir al Carrito</button>
                                  </div>
                                  </div>`;



  divContenedor.appendChild(divMostrarProducto);

  //Agregar productos al carrito: 

  const boton = document.getElementById(`boton${producto.id}`);
  boton.addEventListener("click", () => {
    agregarAlCarrito(producto.id);
  });
});

//FUNCION AGREGAR AL CARRITO


const agregarAlCarrito = (id) => {
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    const producto = productos.find((producto) => producto.id === id);
    carrito.push(producto);
    
  }
  console.log(carrito);
  calcularTotal();

  localStorage.setItem("carrito", JSON.stringify(carrito));

};







//////////////////////////////////////////mostrar carrito ////////////////////////////

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
})

const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = "";
  carrito.forEach(producto => {
      const card = document.createElement("div");
      card.innerHTML = `
              <div class = "card" >
                     
                  <div class = "card-final" >
                      <h3 class="nombre"> ${producto.nombre} </h3>
                      <p class="precio">  $ ${producto.precio} </p>
                      <p class="cantidad"> cantidad ${producto.cantidad} </p>
                      <button class = "btn btn-primary" id="eliminar${producto.id}" > Eliminar</button>
                  </div>
              </div>`



      contenedorCarrito.appendChild(card);




      
      //Eliminar productos del carrito: 

      const boton = document.getElementById(`eliminar${producto.id}`);
      boton.addEventListener("click", () => {
          eliminarproducto(producto.id);
      })
  })
  calcularTotal();
}

//////////////////////////////////////////Eliminar producto ////////////////////////////


const eliminarproducto = (id) => {
  const producto = carrito.find(producto => producto.id === id)
  const guia = carrito.indexOf(producto);
  carrito.splice(guia,1);
  mostrarCarrito();

  //LocalStorage: 
  localStorage.setItem("carrito", JSON.stringify(carrito));
}



const limpiarcarrito = () => {
  
}


//VACIAR CARRITO


const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
  eliminarCarrito();
});

const eliminarCarrito = () => {
  carrito = [];
  mostrarCarrito();
}



//////////////////////////////////////////Ver total ////////////////////////////




const total = document.getElementById("total");

const calcularTotal = () => {
    let pagototal = 0; 
    carrito.forEach( producto => {
        pagototal += producto.precio * producto.cantidad;
        
    })
    total.innerHTML = `$${pagototal}`;
}





if(localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"));
}