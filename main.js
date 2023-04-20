/* Hasta el momento 
-Compra de Cryptos con USD o cualquier crypto
-Listado de Transacciones
-Dialogo de confirmacion

Proximo
-Monto Disponible USD y Crypto
-Formulario Loguin
-Logout
-Registro
-Pago con Tarjeta de Debito

*/



//Cuadro de herramientas, js para utilizar los toolTip de Boostrap
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

//Variables

const cantidadDeCompra=document.getElementById("inputCoin");
const cryptoCantidadRecibe=document.getElementById("outpConvert")
const listaCryptosContidad= document.getElementById('listCoin');
const listCryptoRecibe=document.getElementById('listCoinRecive');

//LocalStorage
//Seteo mi lista de transacciones para persistir e ir agregando
//Pregunto si ya esta cargada mi lista de transacciones, sino la carga
//la lista de transacciones la tengo a modo de tener algun dato cargado en pantalla
if(!localStorage.getItem('Transacciones')){
    const misTransacciones=JSON.stringify(transaccionesData);
    localStorage.setItem('Transacciones', misTransacciones);
}
//Calcular precio en los inputs
const convertirMoneda=cantidadDeCompra.addEventListener('input',(e)=>{
    if(e.target.value==='')
        cryptoCantidadRecibe.innerText=0;
    else
    {   
        cryptoCantidadRecibe.innerText=calcularTotal(e.target.value);
    }
         

    });

const calcularTotal=(valorCantidad)=>{
        const cryptoCantidad=document.getElementById('selectedCoin');
        const moneda=cryptoCantidad.querySelector('p');
        const cryptoUsadaParaCompra=cryptos.find(crypto=>crypto.Nombre===moneda.textContent);
        const cryptoRecibe=document.getElementById('selectedCoinRecibe');
        const monedaRecibe=cryptoRecibe.querySelector('p');
        const cryptoRecibeValor=cryptos.find(crypto=>crypto.Nombre===monedaRecibe.textContent);
        
        const totalEnUsdCantidad=cryptoUsadaParaCompra.PrecioEnUSD*valorCantidad;
        return totalFinal=totalEnUsdCantidad/cryptoRecibeValor.PrecioEnUSD;

    }
/* 
    Lista monedas en los Modal, dependiendo "element" es donde ingresa los datos, si es en el modal Cantidad, lista todas las monedas
    si es en el modal Recibe no lista USD. Ademas tambien pregunta por su Profit para saber si el porcentaje va como verde o Rojo
*/
const listarModal =(element, cantidadORecibe) =>{
    element.innerHTML="";
    cryptos.forEach((coin)=> {    
    if(cantidadORecibe==='C')
    {
        ingresarElementoAlModal(coin,element);
    } 
    else{
        if(coin.Nombre!='USD')
        {   
            ingresarElementoAlModal(coin,element);
        }
    }  
       
        
})

}
//Ingresa los elementos en el Modal
const ingresarElementoAlModal=(coin, element)=>{
    if(coin.Profit)
        element.innerHTML+=` <button type="button" class="list-group-item list-group-item-action" data-bs-dismiss="modal">
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-lg-2">
                                                    <img src="${coin.Logo}" alt="btc" class="img-fluid imgList">
                                                </div>  
                                                <div class="col-lg-6">
                                                    <div class="titleCoin">${coin.Nombre}</div>
                                                    <div class="descriptionCoin">${coin.Descripcion}</div>
                                                </div>
                                                <div class="col-lg-4">
                                                    <div class="last24">${coin.PrecioEnUSD}</div>
                                                    <p class="porcentColor">${coin.Porcentaje}</p>
                                                </div>        
                                            </div>     
                                        </div>
                                    </button>`;
            
    else
        element.innerHTML+=` <button type="button" class="list-group-item list-group-item-action" data-bs-dismiss="modal">
                                <div class="container-fluid">
                                     <div class="row">
                                         <div class="col-lg-2">
                                             <img src="${coin.Logo}" alt="btc" class="img-fluid imgList">
                                        </div>  
                                        <div class="col-lg-6">
                                             <div class="titleCoin">${coin.Nombre}</div>
                                             <div class="descriptionCoin">${coin.Descripcion}</div>
                                        </div>
                                         <div class="col-lg-4">
                                            <div class="last24">${coin.PrecioEnUSD}</div>
                                            <p class="porcentColorLow">${coin.Porcentaje}</p>
                                         </div>        
                                    </div>     
                                </div>
                            </button>`;
}
//Ingresa la crypto deseada con la que opera, tambien ingresa un tipo de cambio en el html
const seleccionarCrytoCantidad=listaCryptosContidad.addEventListener('click', function(event) {
    const selectedItem = event.target.closest('button');
  
  if (selectedItem) {
    const titleCoinElement = selectedItem.querySelector('.titleCoin');
    const titleCoin = titleCoinElement.innerText;
    const crypto=cryptos.find(crypto=> crypto.Nombre===titleCoin);
    const monedaSeleccionada=document.getElementById('selectedCoin');
    insertarCryptoCantidad(crypto, monedaSeleccionada);
    cambiarMensajeTipoDeCambio(crypto);
  }
});


////Ingresa la crypto que recibe en el DIV
const seleccionarCryptoRecibe=listCryptoRecibe.addEventListener('click',(e)=>{
    const selectedItem = e.target.closest('button');
  
    if (selectedItem) {
      const titleCoinElement = selectedItem.querySelector('.titleCoin');
      const titleCoin = titleCoinElement.innerText;
      const crypto=cryptos.find(crypto=> crypto.Nombre===titleCoin);
      const monedaSeleccionada=document.getElementById('selectedCoinRecibe');
      insertarCryptoCantidad(crypto, monedaSeleccionada);
    }
})

//Dada una crypto y un selector, Ingresa los datos de la crypto en el selector.
const insertarCryptoCantidad=(crypto,select)=>
{
    select.innerHTML=`<div class="col-sm-5 col-lg-5 ">
                            <img src="${crypto.Logo}" alt="${crypto.Nombre}" class="icon">
                         </div>
                         <div class="col-sm-5 col-lg-7">
                            <p class="icon">${crypto.Nombre}</p>
                         </div>`;
    cryptoCantidadRecibe.innerText=calcularTotal(cantidadDeCompra.value);
                       
}
//Recibe un objeto del tipo crypto y cambia el mensaje de tipo de cambio en el index.js
const cambiarMensajeTipoDeCambio=(crypto)=>{
    const messagePrice=document.getElementById('messagePrice');
    messagePrice.innerHTML=`<p class="underline-dotted" data-bs-toggle="tooltip" data-bs-title="Recordar que el precio de la criptomoneda fluctua constantemente.">Precio estimado 1 ${crypto.Nombre} = USD${crypto.PrecioEnUSD}</p>`; 
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

//Funcionalidades de Ejecutar compra, notificacion de compra exitosa y agrega la transaccion al listado de transacciones
const compraExitosa = document.getElementById('comprarCrypto')

const notificarCompra=(message, type)=>{
    const alertPlaceholder = document.getElementById('alert')
    const wrapper = document.createElement('div')
     wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)

}

compraExitosa.addEventListener('click', () => {
   
    
        aceptarCompra.addEventListener('click', ()=>{
            const cryptoRecibe=document.getElementById('selectedCoinRecibe');
            const monedaRecibe=cryptoRecibe.querySelector('p');
            const cryptoRecibeValor=cryptos.find(crypto=>crypto.Nombre===monedaRecibe.textContent);
            const totalenUSD=cryptoCantidadRecibe.textContent*cryptoRecibeValor.PrecioEnUSD;

            const nuevaTransaccion={ 
            Moneda:cryptoRecibeValor.Nombre,
            Monto:cryptoCantidadRecibe.textContent,
            MontoenUSD:totalenUSD,
            Fecha:obtenerFechaDeHoy()}
            const transacciones=JSON.parse(localStorage.getItem('Transacciones'));
            transacciones.push(nuevaTransaccion);
            localStorage.setItem('Transacciones', JSON.stringify(transacciones));    
            notificarCompra('Transaccion procesada con exito', 'success');

        })
        cancelarCompra.addEventListener('click',()=>{
            notificarCompra('Su compra fue cancelada','warning');
        })
    
    //else{
        //notificarCompra('Debe ingresar un valor en cantidad','danger');
    //}
        
    

    
    
  })


  const obtenerFechaDeHoy=()=>{
    const hoy = new Date();
    const dia = hoy.getDate();
    const mes = hoy.getMonth() + 1; // los meses en JavaScript empiezan en 0
    const anio = hoy.getFullYear();
    const formato = `${dia}/${mes}/${anio}`;
    return formato;
  }

//LLamadas para Listar monedas en los Modals
listarModal(listaCryptosContidad,'C');//lista en cantidad
listarModal(listCryptoRecibe,'R');//lista en recibe



