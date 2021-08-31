let producto = document.getElementById('profile')
let profile = document.getElementById('profile-tab')

profile.addEventListener('click', () =>{

    producto.innerHTML='';
    producto.innerHTML += `<div class="container card" style="width: 18rem;" id="cardProducto">
                        <img src="${img}"
                        class="card-img-top mt-3" alt="...">
                        <div class="card-body">
                        <h5 class="card-title d-flex justify-content-center">${title}</h5>
                        <a href="#" data-id="${id}" onClick="buy()" class="btn btn-primary d-flex justify-content-center">BUY IT</a>
                        </div></div> 
    `
})

