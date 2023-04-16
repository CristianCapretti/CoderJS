/* La idea es crear una aplicacion para compra y venta de Cryptos
En esta version se podra
-Comprar solamente BTC
-Comprar con el monto que tiene guardado en la app, sino alcanza podra comprar con tarjeta
-Visualizar la cantidad de transacciones realizadas

A FUTURO
-Agregar interfaz grafica
-Posibilidad de comprar otras cryptos 
-Posibilidad de ver un listado de transacciones y aplicar filtros
-visualizacion de precios de btc
-loguin para operar
-Posibilidad de elegir si quiere pagar con el monto y luego con tarjeta
*/

//

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

//appInicio();