//creates products list
displayProds();
displayInfo();
 function displayProds() {
     $.getJSON('https://api.hubapi.com/hubdb/api/v1/tables/697778/rows?portalId=2795955', function (json) {
         var outputSelect = "<select class=" + 'lot-toggle' + " data-target=" + '.lot-info' + "><option value=" + 'none' + " data-show=" + '.none' + ">Selecciona un lote</option>";
         $(json.objects).each(function (index, prod) {
             var status = prod.values[3].name;
             if (status == 'vendido') {
                 outputSelect += "<option value='" + prod.values[2] + "'data-show='" + '.' + prod.values[2] + "'>" + prod.values[2] + " - Vendido</option>";
             } else {
                 outputSelect += "<option value='" + prod.values[2] + "'data-show='" + '.' + prod.values[2] + "'>" + prod.values[2] + "</option>";
             }
         });
         outputSelect += "</select>";

         $("#productSelect").html(outputSelect);

     });
 };
 function displayInfo() {
     $.getJSON('https://api.hubapi.com/hubdb/api/v1/tables/697778/rows?portalId=2795955', function (json) {
         var outputInfo = "<div class=" + 'lot-info' + "><div class='" + 'hide' + " " + 'none' + "'><div class=" + 'row' + "><div class=" + 'col-6' + "><label>M2</label><p>—</p></div><div class=" + 'col-6' + "><label>Medidas</label><p>—</p></div></div><div class=" + 'row' + "><div class=" + 'col-6' + "><label>Precio del lote</label><p>—</p></div><div class=" + 'col-6' + "><label>Valor escrituras</label><p>—</p></div></div><div class=" + 'row' + "><div class='" + 'lot-total' + " " + 'col-6' + "'><label>Precio final</label><p>—</p></div><div class=" + 'col-6' + "></div></div><div><button type=" + 'button' + " disabled>Agregar al carrito</button></div></div></div >";
         $(json.objects).each(function (index, prod) {
             var status = prod.values[3].name;
             outputInfo += "<div class=" + 'lot-info' + "><div class='" + 'hide' + " " + prod.values[2] + "'><div class=" + 'row' + "><div class=" + 'col-6' + "><label>M2</label><p>" + prod.values[16] + "</p></div><div class=" + 'col-6' + "><label>Medidas</label><p>" + prod.values[9] + " x " + prod.values[10] + "</p></div></div><div class=" + 'row' + "><div class=" + 'col-6' + "><label>Precio del lote</label><p>" + prod.values[20] + "</p></div><div class=" + 'col-6' + "><label>Valor escrituras</label><p>" + prod.values[23] + "</p></div></div><div class=" + 'row' + "><div class='" + 'lot-total' + " " + 'col-6' + "'><label>Precio final</label><p>" + (prod.values[20] + prod.values[23]) + "</p></div><div class=" + 'col-6' + "></div></div><div>";

             if (status == 'vendido') {
                 outputInfo += "<button type=" + 'button' + " disabled>Agregar al carrito</button></div></div></div >";
             } else {

                 outputInfo += " <button type=" + 'button' + " class=" + 'addCart' + " data-id='" + prod.id + "' data-lot='" + prod.values[2] + "' data-width='" + prod.values[9] + "' data-long='" + prod.values[10] + "' data-m2='" + prod.values[16] + "' data-first='" + prod.values[14] + "' data-mainPriceM2='" + prod.values[17] + "' data-mainPrice='" + prod.values[18] + "' data-listPriceM2='" + prod.values[19] + "' data-listPrice='" + prod.values[20] + "' data-mainDeed='" + prod.values[21] + "' data-mainDeedAlt='" + prod.values[22] + "' data-listDeed='" + prod.values[23] + "' data-listDeedAlt='" + prod.values[24] + "'>Agregar al carrito</button></div></div></div > "

             }
         });
         outputInfo += "<div class=" + 'lot-link' + "><a href=" + '#' + ">Conoce las formas de pago</a></div>";

         $("#productInfo").html(outputInfo);

     });
 };
//end creates products list