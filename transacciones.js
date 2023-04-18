const table=document.getElementById('idTabla');
const transacciones=JSON.parse(localStorage.getItem('Transacciones'));
transacciones.forEach((transaccion)=>{
console.log("Estoy"+ transaccion.MontoenUSD);
    table.innerHTML+=`<tr>
                        <td>${transaccion.Moneda}</td>
                        <td>${transaccion.Monto}</td>
                        <td><i class="fa-solid fa-dollar-sign"></i>${transaccion.MontoenUSD} </td>
                        <td>${transaccion.Fecha}</td>
                    </tr>`

})

