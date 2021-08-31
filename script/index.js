let producto = document.getElementById('profile')
let profile = document.getElementById('profile-tab')
let acticulo = 'http://localhost:4000/articulos'



profile.addEventListener('click', async () => {

    let rest = await fetch(acticulo)
    let data = await rest.json() 
    console.log(data);

    data.forEach(pes => {
       const {nombre, imagenPpal, id} = pes;
       producto.innerHTML += `<div class="container card" style="width: 18rem;" id="cardProducto">
                               <img src="${imagenPpal}" class="card-img-top mt-3" alt="...">
                               <div class="card-body">
                               <h5 class="card-title d-flex justify-content-center">${nombre}</h5>
                               <a href="#" data-id="${id}" onClick="buy()" class="btn btn-primary d-flex justify-content-center">BUY IT</a>
                               </div></div> 
       `

    })
})

