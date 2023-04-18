

//Cuadro de herramientas
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

let dineroCargadoEnCuenta=40000; //moneda en USD
let transacciones=0;
//alert("Bienvenido a la red mas segura de compra y venta de cryptos");


const listarCriptos=()=>{

    const listado=cryptos.map(crypto =>{
        return crypto.Nombre + " USD" + crypto.PrecioEnUSD;
    });
    comprarCryptos(listado);
}

const comprarCryptos=(listado)=>
{
    let ingresoValorCorrecto=false;
    let solicitarMonto=0;
    
    while(!ingresoValorCorrecto)
    {   
        
        let cryptoElegida=prompt("Seleccione la crypto que desea Comprar"+'\n\n'+listado.join('\n'));
        let solicitarMonto=Number(prompt("Ingrese el monto"));
        let buscarCrypto=cryptos.find(crypto => crypto.Nombre.toLowerCase()===cryptoElegida.toLowerCase());

        if(Number.isNaN(solicitarMonto) ||solicitarMonto ===0||!buscarCrypto)
            alert("Debe ingresar un campo valido, por favor vuelva a ingresar");
        else if(validarDineroEnCuenta(solicitarMonto, buscarCrypto.PrecioEnUSD))
            {
                ingresoValorCorrecto=true;
                alert("Su compra de $"+ solicitarMonto+" BTC fue realizada");
                transacciones ++;
            }
            else
            {
                utilizarTarjeta();
                ingresoValorCorrecto=true;
                alert("Su compra de $"+ solicitarMonto+" BTC fue realizada");
                transacciones ++;
                return true
            }
    }

}
 
const validarDineroEnCuenta=(monto, valorCrypto)=>
{
        if((dineroCargadoEnCuenta/valorCrypto)>= monto)
          {
            dineroCargadoEnCuenta=dineroCargadoEnCuenta-(valorCrypto*monto);
            return true;
          }        

        else
            return false;  

}

const utilizarTarjeta=()=>
{   
    let condicion=true;
    do
    {
        let pedirDatosTarjeta=Number(prompt("Ingrese numero de la tarjeta"));
        if(!Number.isNaN(pedirDatosTarjeta))
            condicion=false;
    }while(condicion)

}
const seguirOperando=()=>
{
    let seguirOper=confirm("Desea Seguir Operando?");
    if(seguirOper)
        return true;
    else
        return false;    
}
const mostrarCantidadTransacciones=()=>
{
    const confirmar=confirm("Desea ver la cantidad de transacciones realizadas");
    if(confirmar)
        alert("La cantidad de transacciones realizadas fueron "+ transacciones);

}

const appInicio=()=>{
    let seguirBucle=true;
    do{

        listarCriptos();
        if(seguirOperando())
            seguirBucle=true;
        else 
        {
            seguirBucle=false;
            mostrarCantidadTransacciones();
            alert("Gracias por confiar en nosotros.");
        }

    }while(seguirBucle);

   
}
////////////Desde aca interactuo con el DOM/////////////////////////////////////////
//appInicio();
//Variables
const cantidadDeCompra=document.getElementById("inputCoin");
const cryptoCantidadRecibe=document.getElementById("outpConvert")
const listaCryptosContidad= document.getElementById('listCoin');
const listCryptoRecibe=document.getElementById('listCoinRecive');

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


//Listar las cryptos que Recibe (en difinitva las que compra),
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

//notificacion de compra Exitosa

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


const compraExitosa = document.getElementById('comprarCrypto')

  compraExitosa.addEventListener('click', () => {
    notificarCompra('Transaccion procesada con exito', 'success')
  })


//LLamadas para Listar monedas en los Modals
listarModal(listaCryptosContidad,'C');//lista en cantidad
listarModal(listCryptoRecibe,'R');//lista en recibe



