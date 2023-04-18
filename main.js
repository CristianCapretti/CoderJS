

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
////////////Desde aca interactuo con el DOM
//appInicio();
const inputCoin=document.getElementById("inputCoin");
const outpConvert=document.getElementById("outpConvert")
const listModal=document.getElementById("listCoin");
const convertCoin=inputCoin.addEventListener('input',(e)=>{
    if(e.target.value==='')
        outpConvert.innerText=0;
    else
        outpConvert.innerText=e.target.value;   
})
const listCrypto=()=>{
    listModal.innerHTML="";
    cryptos.forEach((coin)=> {    
        
    if(coin.Profit)
    listModal.innerHTML+=` <button type="button" class="list-group-item list-group-item-action" data-bs-dismiss="modal">
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
        listModal.innerHTML+=` <button type="button" class="list-group-item list-group-item-action" data-bs-dismiss="modal">
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
       
    );

}


const listGroup = document.getElementById('listCoin');
const selectedCoin=listGroup.addEventListener('click', function(event) {
    const selectedItem = event.target.closest('button');
  
  if (selectedItem) {
    const titleCoinElement = selectedItem.querySelector('.titleCoin');
    const titleCoin = titleCoinElement.innerText;
    const crypto=cryptos.find(crypto=> crypto.Nombre===titleCoin);
    insertCointSelected(crypto);
    changeMessage(crypto);
  }
});

const insertCointSelected=(crypto)=>
{
    const selectCoin=document.getElementById('selectedCoin');
    selectCoin.innerHTML=`<div class="col-sm-5 col-lg-5 ">
                            <img src="${crypto.Logo}" alt="${crypto.Nombre}" class="icon">
                         </div>
                         <div class="col-sm-5 col-lg-7">
                            <p class="icon">${crypto.Nombre}</p>
                         </div>`;
}
const changeMessage=(crypto)=>{
    const messagePrice=document.getElementById('messagePrice');
    messagePrice.innerHTML=`<p class="underline-dotted" data-bs-toggle="tooltip" data-bs-title="Recordar que el precio de la criptomoneda fluctua constantemente.">Precio estimado 1 ${crypto.Nombre} = USD${crypto.PrecioEnUSD}</p>`; 
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

listCrypto();




