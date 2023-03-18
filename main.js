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

let dineroCargadoEnCuenta=4000; //moneda en USD
let valorBTC=2000;
let transacciones=0;
alert("Bienvenido a la red mas segura de compra y venta de cryptos");


const comprarBtc=()=>
{
    let ingresoValorCorrecto=false;
    let solicitarMonto=0;
    while(!ingresoValorCorrecto)
    {
        solicitarMonto=Number(prompt("Cuanto BTC desea comprar ?"));
        if(Number.isNaN(solicitarMonto) ||solicitarMonto ===0)
            alert("Debe ingresar un campo valido, por favor vuelva a ingresar");
        else if(validarDineroEnCuenta(solicitarMonto))
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
 
const validarDineroEnCuenta=(monto)=>
{
        if((dineroCargadoEnCuenta/valorBTC)>= monto)
          {
            console.log(valorBTC/dineroCargadoEnCuenta);
            dineroCargadoEnCuenta=dineroCargadoEnCuenta-(valorBTC*monto);
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

        comprarBtc();
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

appInicio();