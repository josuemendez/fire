//creates products list
function displayProds() {


};

$(".add-to-cart").click(function (event) {
    event.preventDefault();
    var lot = $(this).attr("data-lot");
    var width = Number($(this).attr("data-width"));
    var long = Number($(this).attr("data-long"));
    var first_pay = Number($(this).attr("data-first"));
    var m2 = Number($(this).attr("data-m2"));
    var main_price_m2 = Number($(this).attr("data-mainPriceM2"));
    var main_price = Number($(this).attr("data-mainPrice"));
    var list_price_m2 = Number($(this).attr("data-listPriceM2"));
    var list_price = Number($(this).attr("data-listPrice"));
    var main_deed = Number($(this).attr("data-mainDeed"));
    var main_deed_alt = Number($(this).attr("data-mainDeedAlt"));
    var list_deed = Number($(this).attr("data-listDeed"));
    var list_deed_alt = Number($(this).attr("data-listDeedAlt"));


    shoppingCart.addItemToCart(lot, width, long, m2, first_pay, main_price_m2, main_price, list_price_m2, list_price, main_deed, main_deed_alt, list_deed, list_deed_alt, 1);
    displayCart();
    loadPayTableF();
    loadPayTable20();
    loadPayTableMsi();
    loadPayTableOne();
    cartSummary();
});

$(".checkout-btn").click(function (event) {
    event.preventDefault();
    var deal = $(this).attr("data-deal");
    shoppingCart.addDeal(deal);
    window.location.href = "checkout.html";
})

//creates the lot shopping cart
function displayCart() {
    var cartArray = shoppingCart.listCart();
    var cartStatus = shoppingCart.countCart();
    var cartTitle = "<h2 class=" + 'orve-title' + ">Carrito de compras</h2>";
    $(document).ready(function () {
        if (cartStatus != 0) {
            var output = "<table class=" + 'table' + "><tbody><tr><th scope=" + 'col' + " class=" + 'text-left' + ">Lote</th><th scope=" + 'col' + ">Dimensiones</th><th scope=" + 'col' + ">Precio de lista</th><th scope=" + 'col' + ">Valor escrituras</th><th scope=" + 'col' + ">Precio final</th><th scope=" + 'col' + "></th></tr >";
            for (var i in cartArray) {
                output += "<tr><td scope=" + 'row' + "class=" + 'text-left' + ">" +
                    cartArray[i].lot +
                    "</td><td>" + cartArray[i].m2 +
                    " m2 (" + cartArray[i].width + " x " + cartArray[i].long +
                    ")<td>$" + cartArray[i].list_price +
                    "</td><td>$" + cartArray[i].list_deed +
                    " </td><td>$" + (cartArray[i].list_price + cartArray[i].list_deed) +
                    " </td><td><a class='delete-item danger' data-name='" + cartArray[i].lot + "'>Eliminar</a></td></tr>";

            }
            output += "</tbody></table>";
            $("#show-cart").html(cartTitle + output);
            //$("#count-cart").html(shoppingCart.countCart());
            //$("#total-cart").html(shoppingCart.totalCart());
            $("#pay-btn-f").prop("disabled", false);
            $("#pay-btn-20").prop("disabled", false);
            $("#pay-btn-msi").prop("disabled", false);
            $("#pay-btn-one").prop("disabled", false);
        } else {
            var output = "";
            $("#show-cart").html(output);
            $("#pay-btn-f").prop("disabled", true);
            $("#pay-btn-20").prop("disabled", true);
            $("#pay-btn-msi").prop("disabled", true);
            $("#pay-btn-one").prop("disabled", true);
        };
    });

};

//*********** start fill payment table by finance option *****************
//financiamiento orve
function loadPayTableF() {
    var cartStatus = shoppingCart.countCart();
    var pay = shoppingCart.totalCartF();
    var totalListPriceF = pay.totalListPriceF;
    var feeF = pay.feeF;
    var totalDeedF = pay.totalDeedF;
    var totalPayF = pay.totalPayF;
    var totalFirstPayF = pay.totalFirstPayF;
    var msi12F = pay.msi12F;
    var msi24F = pay.msi24F;

    $(document).ready(function () {
        if (cartStatus != 0) {
            $("#list-total-f").html(totalListPriceF);
            $("#op-fee-f").html(feeF);
            $("#deed-f").html(totalDeedF);
            $("#total-f").html(totalPayF);
            $("#first-pay-f").html(totalFirstPayF);
            $("#msi12-f").html(msi12F);
            $("#msi24-f").html(msi24F);
        } else {
            $("#list-total-f").html("—");
            $("#op-fee-f").html("—");
            $("#deed-f").html("—");
            $("#total-f").html("—");
            $("#first-pay-f").html("—");
            $("#msi12-f").html("—");
            $("#msi24-f").html("—");
        };
    });
};

//financiamiento 20 dias
function loadPayTable20() {
    var cartStatus = shoppingCart.countCart();
    var pay = shoppingCart.totalCart20();
    var totalListPrice20 = pay.totalListPrice20;
    var fee20 = pay.fee20;
    var totalDeed20 = pay.totalDeed20;
    var totalPay20 = pay.totalPay20;
    var totalFirstPay20 = pay.totalFirstPay20;
    var msi1220 = pay.msi1220;
    var msi2420 = pay.msi2420;

    $(document).ready(function () {
        if (cartStatus != 0) {
            $("#list-total-20").html(totalListPrice20);
            $("#op-fee-20").html(fee20);
            $("#deed-20").html(totalDeed20);
            $("#total-20").html(totalPay20);
            $("#first-pay-20").html(totalFirstPay20);
            $("#msi12-20").html(msi1220);
            $("#msi24-20").html(msi2420);
        } else {
            $("#list-total-20").html("—");
            $("#op-fee-20").html("—");
            $("#deed-20").html("—");
            $("#total-20").html("—");
            $("#first-pay-20").html("—");
            $("#msi12-20").html("—");
            $("#msi24-20").html("—");
        };
    });
};

//financiamiento meses sin intereses
function loadPayTableMsi() {
    var cartStatus = shoppingCart.countCart();
    var pay = shoppingCart.totalCartMsi();
    var totalListPriceMsi = pay.totalListPriceMsi;
    var feeMsi = pay.feeMsi
    var totalDeedMsi = pay.totalDeedMsi;
    var totalPayMsi = pay.totalPayMsi;
    var totalFirstPayMsi = pay.totalFirstPayMsi;
    var msi12Msi = pay.msi12Msi;
    var msi24Msi = pay.msi24Msi;

    $(document).ready(function () {
        if (cartStatus != 0) {
            $("#list-total-msi").html(totalListPriceMsi);
            $("#op-fee-msi").html(feeMsi);
            $("#deed-msi").html(totalDeedMsi);
            $("#total-msi").html(totalPayMsi);
            $("#first-pay-msi").html(totalFirstPayMsi);
            $("#msi12-msi").html(msi12Msi);
            $("#msi24-msi").html(msi24Msi);
        } else {
            $("#list-total-msi").html("—");
            $("#op-fee-msi").html("—");
            $("#deed-msi").html("—");
            $("#total-msi").html("—");
            $("#first-pay-msi").html("—");
            $("#msi12-msi").html("—");
            $("#msi24-msi").html("—");
        };
    });
};

//Pago en una sola exibicion
function loadPayTableOne() {
    var cartStatus = shoppingCart.countCart();
    var pay = shoppingCart.totalCartOne();
    var totalListPriceOne = pay.totalListPriceOne;
    var feeOne = pay.feeOne
    var totalDeedOne = pay.totalDeedOne;
    var totalPayOne = pay.totalPayOne;
    var totalFirstPayOne = pay.totalFirstPayOne;
    var msi12One = pay.msi12One;
    var msi24One = pay.msi24One;

    $(document).ready(function () {
        if (cartStatus != 0) {
            $("#list-total-one").html(totalListPriceOne);
            $("#op-fee-one").html(feeOne);
            $("#deed-one").html(totalDeedOne);
            $("#total-one").html(totalPayOne);
            $("#first-pay-one").html(totalFirstPayOne);
            $("#msi12-one").html(msi12One);
            $("#msi24-one").html(msi24One);
        } else {
            $("#list-total-one").html("—");
            $("#op-fee-one").html("—");
            $("#deed-one").html("—");
            $("#total-one").html("—");
            $("#first-pay-one").html("—");
            $("#msi12-one").html("—");
            $("#msi24-one").html("—");
        };
    });
};
//*********** end fill payment table by finance option *****************

// checkout summary //
function cartSummary() {
    var payPlan = shoppingCart.loadDeal();
    var cartArray = shoppingCart.listCart();
    var cartStatus = shoppingCart.countCart();
    var cartTitle = "<h2 class=" + 'orve-title' + ">Resumen del pedido</h2>";
    $(document).ready(function () {
        if (cartStatus != 0) {
            var payTotal = 0;
            var output = "<table class=" + 'table' + "><tbody><tr><th scope=" + 'col' + " class=" + 'text-left' + ">Producto</th><th scope=" + 'col' + ">Descripción</th><th scope=" + 'col' + "></th></tr >";
            for (var i in cartArray) {
                var payTotal = payTotal + cartArray[i].first_pay;
                output += "<tr><td scope=" + 'row' + " class=" + 'text-left' + ">Lote " +
                    cartArray[i].lot +
                    "</td><td>Anticipo $" + cartArray[i].first_pay +
                    "</td><td><a class='delete-item' data-name='" + cartArray[i].lot + "'>Eliminar</a></td></tr>";

            }
            output += " <tr><td class=" + 'text-left' + ">Plan de Pago</td><td>" + payPlan + "</td><td></td></tr> <tr><td class=" + 'text-left' + "><label>Total a Pagar</label></td><td><label>$" + payTotal + ".00</label></td><td></td></tr>  </tbody></table>";
            $("#cart-summary").html(cartTitle + output);
            $("#payment").prop("disabled", false);
        } else {
            var output = "";
            $("#cart-summary").html(output);
            $("#payment").prop("disabled", true);
        };
    });
};

// Pyapal payment form 
function checkoutPayment() {
    //var payPlan = shoppingCart.loadDeal();
    var cartArray = shoppingCart.listCart();
    var cartStatus = shoppingCart.countCart();
    var account = "koller16-facilitator@gmail.com";
    $(document).ready(function () {
        if (cartStatus != 0) {
            var payForm = "<form action=" + 'https://www.sandbox.paypal.com/cgi-bin/webscr' + " method=" + 'post' + "> <input type = " + 'hidden' + " name = " + 'cmd' + " value = " + '_cart' + " ><input type = " + 'hidden' + " name = " + 'upload' + " value = " + '1' + " ><input type = " + 'hidden' + " name = " + 'business' + " value = " + account + "><input type = " + 'hidden' + " name = " + 'currency_code' + " value = " + 'MXN' + "><input type = " + 'hidden' + " name = " + 'no_shipping' + " value = " + '1' + "><input type = " + 'hidden' + " name = " + 'return' + " value = " + 'https://www.orangebits.com.mx/demo/orve/thanks.html' + ">";
            for (var i in cartArray) {
                //var payTotal =+ cartArray[i].price;
                var y = +i + 1;
                payForm += "<input type=" + 'hidden' + " name=" + 'item_name_' + y + " value=" + 'Lote-' + cartArray[i].lot + "><input type=" + 'hidden' + " name=" + 'amount_' + y + " value=" + cartArray[i].price + ">";
            }
            payForm += "<button type=" + 'submit' + " id=" + 'payment' + ">Pagar</button></form>";
            $("#pay-form").html(payForm);
        } else {
            var payForm = "aqui va un boton para regresar";
            $("#pay-form").html(payForm);
        };
    });
};

$("#show-cart, #cart-summary").on("click", ".delete-item", function (event) {
    var name = $(this).attr("data-name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
    loadPayTableF();
    loadPayTable20();
    loadPayTableMsi();
    loadPayTableOne();
    cartSummary();
});



//****** Shopping Cart Functions********//

var shoppingCart = {};
shoppingCart.cart = [];
shoppingCart.holdDeal = [];

shoppingCart.Item = function (lot, width, long, m2, first_pay, main_price_m2, main_price, list_price_m2, list_price,  main_deed, main_deed_alt, list_deed, list_deed_alt, count) {   
    this.lot = lot
    this.width = width
    this.long = long
    this.m2 = m2
    this.first_pay = first_pay
    this.main_price_m2 = main_price_m2
    this.main_price = main_price
    this.list_price_m2 = list_price_m2
    this.list_price = list_price
    this.main_deed = main_deed
    this.main_deed_alt = main_deed_alt
    this.list_deed = list_deed
    this.list_deed_alt = list_deed_alt
    this.count = count
};

shoppingCart.addItemToCart = function (lot, width, long, m2, first_pay, main_price_m2, main_price, list_price_m2, list_price, main_deed, main_deed_alt, list_deed, list_deed_alt, count) {
    for (var i in this.cart) {
        if (this.cart[i].lot === lot) {
            alert("Este lote ya está en su carrito!");
            return;
        }
    }

    for (var i in this.cart) {
        if (this.cart[i].price >= price) {
            console.log(this.cart[i]);
            deed = altDeed;
            console.log("deed es: " + deed + " altDeed es: " + altDeed + " mainDeed es: " + mainDeed);
        } else {
            console.log("entre al else");
            deed = mainDeed;
        }
    }
    var item = new this.Item(lot, width, long, m2, first_pay, main_price_m2, main_price, list_price_m2, list_price, main_deed, main_deed_alt, list_deed, list_deed_alt, count);
    this.cart.push(item);
    this.saveCart();
};

/*shoppingCart.removeItemFromCart = function (lot) { //remueve un item 
    for (var i in this.cart) {
        if (this.cart[i].lot === lot) {
            this.cart[i].count--;
            if (cart[i].count === 0) { // elimina el item de cart por completo si llega a 0 la cantidad 
                this.cart.splice(i, 1);
            }
            break;
        }
    }
    this.saveCart();
};*/

shoppingCart.removeItemFromCartAll = function (lot) { //remueve todos los items con ese nombre 
    for (var i in this.cart) {
        if (this.cart[i].lot === lot) {
            this.cart.splice(i, 1);
            break;
        }
    }
    this.saveCart();
};

/*shoppingCart.clearCart = function () {
    this.cart = [];
    this.saveCart();
};*/

shoppingCart.countCart = function () { //-> regresa el total de articulos 
    var totalCount = 0;
    for (var i in this.cart) {
        totalCount += this.cart[i].count;
    }
    return totalCount
};

shoppingCart.totalCartF = function () { //-> regresa el total de costo 
    var totalListPriceF = 0;
    var totalDeedF = 0;
    var totalFirstPayF = 0;

    for (var i in this.cart) {
        totalListPriceF += this.cart[i].price;
        totalDeedF += this.cart[i].deed;
        totalFirstPayF += this.cart[i].first_pay;
    }

    var feeF = 500;
    var totalPayF = totalListPriceF + totalDeedF + feeF;
    var msi12F = (totalPayF - totalFirstPayF) / 12;
    var msi24F = (totalPayF - totalFirstPayF) / 24;

    return {
        totalListPriceF: totalListPriceF.toFixed(2),
        feeF: feeF.toFixed(2),
        totalDeedF: totalDeedF.toFixed(2),
        totalPayF: totalPayF.toFixed(2),
        totalFirstPayF: totalFirstPayF.toFixed(2),
        msi12F: msi12F.toFixed(2),
        msi24F: msi24F.toFixed(2)

    };
};

shoppingCart.totalCart20 = function () { //-> regresa el total de costo 
    var totalListPrice20 = 0;
    var totalDeed20 = 0;
    var totalFirstPay20 = 0;

    for (var i in this.cart) {
        totalListPrice20 += this.cart[i].price;
        totalDeed20 += this.cart[i].deed;
        totalFirstPay20 += this.cart[i].first_pay;
    }

    var fee20 = 0;
    var totalPay20 = totalListPrice20 + totalDeed20 + fee20;
    var msi1220 = 0;
    var msi2420 = 0;

    return {
        totalListPrice20: totalListPrice20.toFixed(2),
        fee20: fee20.toFixed(2),
        totalDeed20: totalDeed20.toFixed(2),
        totalPay20: totalPay20.toFixed(2),
        totalFirstPay20: totalFirstPay20.toFixed(2),
        msi1220: msi1220.toFixed(2),
        msi2420: msi2420.toFixed(2)

    };
};

shoppingCart.totalCartMsi = function () { //-> regresa el total de costo 
    var totalListPriceMsi = 0;
    var totalDeedMsi = 0;
    var totalFirstPayMsi = 0;

    for (var i in this.cart) {
        totalListPriceMsi += this.cart[i].price;
        totalDeedMsi += this.cart[i].deed;
        totalFirstPayMsi += this.cart[i].first_pay;
    }

    var feeMsi = 0;
    var totalPayMsi = totalListPriceMsi + totalDeedMsi + feeMsi;
    var msi12Msi = 0;
    var msi24Msi = 0;

    return {
        totalListPriceMsi: totalListPriceMsi.toFixed(2),
        feeMsi: feeMsi.toFixed(2),
        totalDeedMsi: totalDeedMsi.toFixed(2),
        totalPayMsi: totalPayMsi.toFixed(2),
        totalFirstPayMsi: totalFirstPayMsi.toFixed(2),
        msi12Msi: msi12Msi.toFixed(2),
        msi24Msi: msi24Msi.toFixed(2)

    };
};

shoppingCart.totalCartOne = function () { //-> regresa el total de costo 
    var totalListPriceOne = 0;
    var totalDeedOne = 0;
    var totalFirstPayOne = 0;

    for (var i in this.cart) {
        totalListPriceOne += this.cart[i].price;
        totalDeedOne += this.cart[i].deed;
        totalFirstPayOne += this.cart[i].first_pay;
    }

    var feeOne = 0;
    var totalPayOne = totalListPriceOne + totalDeedOne + feeOne;
    var msi12One = 0;
    var msi24One = 0;

    return {
        totalListPriceOne: totalListPriceOne.toFixed(2),
        feeOne: feeOne.toFixed(2),
        totalDeedOne: totalDeedOne.toFixed(2),
        totalPayOne: totalPayOne.toFixed(2),
        totalFirstPayOne: totalFirstPayOne.toFixed(2),
        msi12One: msi12One.toFixed(2),
        msi24One: msi24One.toFixed(2)

    };
};

shoppingCart.listProducts = function () {

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://api.hubapi.com/hubdb/api/v1/tables/697778/rows?portalId=2795955', true);
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            var prods = [];
            data.objects.forEach(products => {
                // Log each product info

                var lot = products.values[2];
                var status = products.values[3].name;
                var width = products.values[9];
                var long = products.values[10];
                var price = products.values[11];
                var deed = products.values[12]
                var deed_alt = products.values[15]
                var disc = products.values[13];
                var firstPay = products.values[14];
            });
        } else {
            console.log('Error connecting to HubDB API');
        }
    }

    // Send request
    //request.send();
    //return prods;
};

shoppingCart.listCart = function () {
    var cartCopy = [];
    for (var i in this.cart) {
        var item = this.cart[i];
        var itemCopy = {};
        for (var p in item) {
            itemCopy[p] = item[p];
        }
        itemCopy.total = (item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
    }
    return cartCopy;
};

// crea base de datos local para guardar el carrito de compras
shoppingCart.saveCart = function () {
    localStorage.setItem("orveShoppingCart", JSON.stringify(this.cart));
};

//carga el carrito de compras de la base de datos local
shoppingCart.loadCart = function () {
    this.cart = JSON.parse(localStorage.getItem("orveShoppingCart"));
    if (this.cart === null) {
        this.cart = [];
    }
};


//guarda tipo de financiamiento
shoppingCart.Deal = function (deal) {
    this.deal = deal
};

//guarda la opcion de pago que selecciono el cliente
shoppingCart.addDeal = function (deal) {
    this.clearDeal();
    console.log(deal);
    var deal = new this.Deal(deal);
    this.holdDeal.push(deal);
    this.saveDeal();
};

//crea la base de datos para guardar el financiamiento seleccionado
shoppingCart.saveDeal = function () {
    localStorage.setItem("orveDeal", JSON.stringify(this.holdDeal));
};

//guarda el financiamiento seleccionado
shoppingCart.getDeal = function () {
    var holdDealCopy = [];
    for (var i in this.holdDeal) {
        var deal = this.holdDeal[i];
        var dealCopy = {};
        for (var p in deal) {
            dealCopy[p] = deal[p];
        }
        dealCopy.value = holdDeal.deal;
        holdDealCopy.push(dealCopy);
    }
    return holdDealCopy;
};

//carga el financiamiento seleccionado
shoppingCart.loadDeal = function () {
    this.holdDeal = JSON.parse(localStorage.getItem('orveDeal'));
    if (this.holdDeal === null) {
        this.holdDeal = [];
        console.log("loadDeal es null");
    } else {
        console.log("este es el loadDeal " + this.holdDeal[0].deal);
        this.selectedDeal = this.holdDeal[0].deal;
    };
    return this.selectedDeal;
};


shoppingCart.dealCalc = function () {
    if (this.holdDeal[0].deal === "Financiamiento Orve") {
        console.log("soy: Financiamiento Orve")
    };
    console.log("soy: otra cosa")
};


shoppingCart.clearDeal = function () {
    this.holdDeal = [];
    this.saveDeal();
};
//deal end

shoppingCart.listProducts();
shoppingCart.loadCart();
//shoppingCart.loadDeal();
//shoppingCart.dealCalc();
shoppingCart.totalCartF();
loadPayTableF();
shoppingCart.totalCart20();
loadPayTable20();
shoppingCart.totalCartMsi();
loadPayTableMsi();
shoppingCart.totalCartOne();
loadPayTableOne();
displayCart();
cartSummary();
checkoutPayment();