//creates products list
displayProds();
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

         var outputInfo = "<div class=" + 'lot-info' + "><div class='" + 'hide' + " " + 'none' + "'><div class=" + 'row' + "><div class=" + 'col-6' + "><label>M2</label><p>—</p></div><div class=" + 'col-6' + "><label>Medidas</label><p>—</p></div></div><div class=" + 'row' + "><div class=" + 'col-6' + "><label>Precio del lote</label><p>—</p></div><div class=" + 'col-6' + "><label>Valor escrituras</label><p>—</p></div></div><div class=" + 'row' + "><div class='" + 'lot-total' + " " + 'col-6' + "'><label>Precio final</label><p>—</p></div><div class=" + 'col-6' + "></div></div><div><button type=" + 'button' + " disabled>Agregar al carrito</button></div></div></div >";
         $(json.objects).each(function (index, info) {
             var status = info.values[3].name;
             outputInfo += "<div class=" + 'lot-info' + "><div class='" + 'hide' + " " + info.values[2] + "'><div class=" + 'row' + "><div class=" + 'col-6' + "><label>M2</label><p>" + info.values[16] + "</p></div><div class=" + 'col-6' + "><label>Medidas</label><p>" + info.values[9] + " x " + info.values[10] + "</p></div></div><div class=" + 'row' + "><div class=" + 'col-6' + "><label>Precio del lote</label><p>" + info.values[20] + "</p></div><div class=" + 'col-6' + "><label>Valor escrituras</label><p>" + info.values[23] + "</p></div></div><div class=" + 'row' + "><div class='" + 'lot-total' + " " + 'col-6' + "'><label>Precio final</label><p>" + (info.values[20] + info.values[23]) + "</p></div><div class=" + 'col-6' + "></div></div><div>";

             if (status == 'vendido') {
                 outputInfo += "<button type=" + 'button' + " disabled>Agregar al carrito</button></div></div></div >";
             } else {

                 outputInfo += " <button type=" + 'button' + " class=" + 'addCart' + " data-id='" + info.id + "' data-lot='" + info.values[2] + "' data-width='" + info.values[9] + "' data-long='" + info.values[10] + "' data-m2='" + info.values[16] + "' data-first='" + info.values[14] + "' data-mainPriceM2='" + info.values[17] + "' data-mainPrice='" + info.values[18] + "' data-listPriceM2='" + info.values[19] + "' data-listPrice='" + info.values[20] + "' data-mainDeed='" + info.values[21] + "' data-mainDeedAlt='" + info.values[22] + "' data-listDeed='" + info.values[23] + "' data-listDeedAlt='" + info.values[24] + "'>Agregar al carrito</button></div></div></div > "

             }
         });
         outputInfo += "<div class=" + 'lot-link' + "><a href=" + '#' + ">Conoce las formas de pago</a></div>";

         $("#productInfo").html(outputInfo);

     });
 };

$(document).ready(function () {
    setTimeout(function () {
        //Dynamic option menu 
        $(document).on('change', '.lot-toggle', function () {
            var target = $(this).data('target');
            var show = $("option:selected", this).data('show');
            $(target).children().addClass('hide');
            $(show).removeClass('hide');
        });
        $(document).ready(function () {
            $('.lot-toggle').trigger('change');
        });
        //end dynamic option menu
    }, 200);
});