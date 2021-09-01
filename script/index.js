let producto = document.getElementById('collecttion')
let shop = document.getElementById('shop')
let coleccion = document.getElementById('productos')
let canvas = document.getElementById('offcanvasExample')

let car = document.getElementById('car')
let acticulo = 'http://localhost:4000/articulos';
let cosasCompradas = 'http://localhost:4001/carrito';
let id = 0;


coleccion.addEventListener('click', async () => {
    producto.innerHTML = ''
    let rest = await fetch(acticulo)
    let data = await rest.json()
    data.forEach(pes => {
        const { nombre, imagenPpal, id } = pes;
        producto.innerHTML += `<div class="container card" style="width: 14rem;" id="cardProducto">
                               <img src="${imagenPpal}" class="card-img-top mt-3" alt="...">
                               <div class="card-body">
                               <h5 class="card-title d-flex justify-content-center"><strong>${nombre}</strong></h5>
                               <a href="#" onClick="buy(${id})" class="btn btn-primary d-flex justify-content-center">BUY IT</a>
                               </div>
                               `
    })
})

const buy = (e) => {

    swal.fire({
        title: 'Product added in shop',
        showConfirmButton: false,
        timer: 1200
    })
    id = e;
}

shop.addEventListener('click', async () => {
    producto.innerHTML = '<strong>Buy Products - Empty</strong>'
    let rest = await fetch(acticulo)
    let data = await rest.json()
    let arregloBuscado = data.find(traer => traer.id == id)
    let imagenPpal = arregloBuscado.imagenPpal;
    let imagen1 = arregloBuscado.imagen1;
    let imagen2 = arregloBuscado.imagen2;

    producto.innerHTML = `<div class="container">
                          <div class="row">
                          <div class="col-2">
                          <a href="#" onClick="change('${imagenPpal}')" class="d-flex justify-content-center">
                          <img style="width:100px" src="${imagenPpal}" alt=""></a>
                          <a href="#" onClick="change('${imagen1}')" class="d-flex justify-content-center mt-3">
                          <img style="width:100px" src="${imagen1}" alt=""></a>
                          <a href="#" onClick="change('${imagen2}')" class="d-flex justify-content-center mt-3">
                          <img style="width:100px" src="${imagen2}" alt=""></a>
                          </div>
                          <div class="col-5">
                          <img id="imageChange" style="width:80%" src="${imagenPpal}" alt=""></div>
                          <div class="col-5">
                          <strong><h3 class="d-flex justify-content-left">${arregloBuscado.nombre}</h3></strong>
                          <h5 class="d-flex justify-content-left">$ ${arregloBuscado.precio}.00</h5>
                          <span class="d-flex mt-4">Size</span>
                          <div class="d-flex mt-3">
                          <a Style="text-decoration: none; color:black;" href="#" class="d-row p-3">S</a>
                          <a Style="text-decoration: none; color:black;" href="#" class="d-row p-3">M</a>
                          <a Style="text-decoration: none; color:black;" href="#" class="d-row p-3">L</a>
                          <a Style="text-decoration: none; color:black;" href="#" class="d-row p-3">XL</a>
                          <a Style="text-decoration: none; color:black;" href="#" class="d-row p-3">XXL</a>
                          </div>
                          <a href="#" onClick="Car(${id})" class="btn btn-dark d-flex justify-content-center mt-4">ADD TO CART</a>
                          <a href="#" onClick="buyNow(${id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" class="btn btn-primary d-flex justify-content-center mt-2">BUY IT NOW</a>
                          <span class="d-flex justify-content-left mt-2"> ${arregloBuscado.descripcion}</span></div></div>`

})

const change = (p) => {
    document.getElementById('imageChange').setAttribute('src', p);
}

async function buyNow(id) {

    let rest = await fetch(acticulo);
    let data = await rest.json()
    let arregloBuscado = data.find(traer => traer.id == id)
    canvas.innerHTML = '';
    canvas.innerHTML += `<div class="offcanvas-header">
                        <h5 class="offcanvas-title" id="offcanvasExampleLabel"></h5>
                        <button type="button" class="btn-close text-reset float-end" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">

                        <div class="container">
                        <div class="row">
                        <div class="col-9">
                        <div class="card mt-3 border-0" style="max-width: 240px; max-height: 140px;">
                        <div class="row g-0">
                        <div class="col-md-4">
                        <img src="${arregloBuscado.imagenPpal}" style="height: 80%; width: 100%"
                            class="img-fluid rounded-start border-0 mt-1 ms-1" alt="...">
                        </div>
                        <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${arregloBuscado.nombre}</h5>
                            <p class="card-text">$ ${arregloBuscado.precio}.00</p>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        <div class="col mt-4 text-center">
                        <input type="number" value="1" min="0" max="4"style="width: 60%">
                        <hr class="mt-4 text-dark">
                        <a href="#" id="shop" Style="text-decoration: none; color:black;"><strong>Remove</strong> </a>
                        </div>
                        </div>
                        </div>
                        <div class="container mt-4">
                        <div class="row">
                        <div class="col">
                        <strong>Subtotal</strong>
            
                        </div>
                        <div class="col d-flex justify-content-center me-0">$ ${arregloBuscado.precio}.00
                        </div>
                        </div>
                        <a href="#" onclick="comprado()" class="btn btn-primary d-flex justify-content-center mt-4 p-3"><strong>CHECK OUT</strong></a>
                        </div>`
}

function comprado() {
    swal.fire({
        title: 'Purchase Confirmed',
        showConfirmButton: true,
        confirmButtonText: 'Accept',
        background: `rgba(238, 114, 52 )`
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload()
        }
    })
}

car.addEventListener('click', async () => {

    let rest = await fetch(cosasCompradas);
    let data = await rest.json()
    let pagar = Object.values(data).reduce((acc, { cantidad, precio }) => acc + cantidad * Number(precio), 0)
    let cantidad = Object.values(data).reduce((acc, { cantidad }) => acc + cantidad, 0)
    producto.innerHTML = '';
    producto.innerHTML = `<div class="container mt-4">
                          <table class="table">
                          <thead class="table-dark">
                          <tr>
                          <th scope="col m-0">Referencia</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Precio</th>
                          <th scope="col">Cantidad</th>
                          </tr>
                          </thead>
                          <tbody id="cosas">
                          </tbody>
                          <tfoot>
                          <td scope="row" class="m-4 fs-3"> <a  class="btn btn-warning" onclick="yaaaa()">Buy</a> <a  class="btn btn-danger" onclick="limpiar()">Limpiar Carrito</a></td><td></td><td>$ ${pagar}.00</td><td>${cantidad}</td>
                          </tfoot>
                          </table>
                          </div>`
    let pintarCarro = document.getElementById('cosas')
    data.forEach(traer => {
        const { nombre, imagenPpal, precio, } = traer;
        pintarCarro.innerHTML += `<td scope="row"><img style="height: 20%; width: 20%"  src="${imagenPpal}" alt=""> </td><td>${nombre}</td><td>${precio}</td><td>${1}</td>`
    })


})

async function Car(elementos) {
    let rest = await fetch(acticulo);
    let data = await rest.json()
    let comprado = data.find(traer => traer.id == elementos)
    // cosasCompradas

    await fetch(cosasCompradas, {
        method: 'POST',
        body: JSON.stringify({
            nombre: comprado.nombre,
            imagenPpal: comprado.imagenPpal,
            precio: comprado.precio,
            cantidad: 1
        }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })
}
function yaaaa(){
    swal.fire({
        title: 'Purchase Confirmed',
        showConfirmButton: true,
        confirmButtonText: 'Accept',
        background: `rgba(238, 114, 52 )`
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload()
        }
    })
}