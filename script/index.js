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
                               <h5 class="card-title d-flex justify-content-center">${nombre}</h5>
                               <a href="#" onClick="buy(${id})" class="btn btn-primary d-flex justify-content-center">BUY IT</a>
                               </div></div> `
    })
})

const buy = (e) => {
    // localStorage.setItem('id',e);
    // swal.fire({
    //     title: `${e}`,
    //     showConfirmButton: false,
    //     timer: 1000
    // })

console.log(e);
    id = e;
 }

shop.addEventListener('click', async() => {
    producto.innerHTML=''
    let rest = await fetch(acticulo)
    let data = await rest.json()
    let arregloBuscado = data.find(traer => traer.id == id)
    producto.innerHTML = `<div class="container">
    <div class="row">
      <div class="col-2 bg-primary">
        
      hola

      </div>
      <div class="col-5">
      <img src="${arregloBuscado.imagenPpal}" alt="">
      </div>
      <div class="col-5 bg-primary">
        3 of 3
      </div>
    </div>`
    
})