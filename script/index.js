let producto = document.getElementById('collecttion')
let shop = document.getElementById('shop')
let coleccion = document.getElementById('productos')
let acticulo = 'http://localhost:4000/articulos'
let id = 0;


coleccion.addEventListener('click', async () => {
    producto.innerHTML=''
    let rest = await fetch(acticulo)
    let data = await rest.json() 
    data.forEach(pes => {
       const {nombre, imagenPpal, id} = pes;
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

console.log(e);
    id = e;
 }

shop.addEventListener('click', async () => {
    producto.innerHTML='<strong>Buy Products - Empty</strong>'
    let rest = await fetch(acticulo)
    let data = await rest.json()
    let arregloBuscado = data.find(traer => traer.id == id)
    let imagenPpal = arregloBuscado.imagenPpal;
    let imagen1 = arregloBuscado.imagen1;
    let imagen2 = arregloBuscado.imagen2;
  
    producto.innerHTML = `
    <div class="container">

    <div class="row">

      <div class="col-2">

        <a href="#" onClick="change('${imagenPpal}')" class="d-flex justify-content-center">
            <img style="width:100px" src="${imagenPpal}" alt="">
        </a>

         <a href="#" onClick="change('${imagen1}')" class="d-flex justify-content-center mt-3">
            <img style="width:100px" src="${imagen1}" alt="">
        </a>
            
        <a href="#" onClick="change('${imagen2}')" class="d-flex justify-content-center mt-3">
            <img style="width:100px" src="${imagen2}" alt="">
        </a>

      </div>

      <div class="col-5">

        <img id="imageChange" style="width:80%" src="${imagenPpal}" alt="">

      </div>

      <div class="col-5">
        <strong><h3 class="d-flex justify-content-left">${arregloBuscado.nombre}</h3></strong>
        <h5 class="d-flex justify-content-left">$ ${arregloBuscado.precio}.00</h5>
        <a href="#" onClick="buyNow(${id})" class="btn btn-dark d-flex justify-content-center">ADD TO CART</a>
        <a href="#" onClick="Car(${id})" class="btn btn-primary d-flex justify-content-center mt-2">BUY IT NOW</a>
        <span class="d-flex justify-content-left mt-2"> ${arregloBuscado.descripcion}</span>
      </div>
      
    </div>`
    
})

const change = (p) => {
    document.getElementById('imageChange').setAttribute('src', p);
}