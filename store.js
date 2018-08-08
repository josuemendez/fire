 $(".add-to-cart").click(function (event) {
     event.preventDefault();
     var lot = $(this).attr("data-lot");
     var width = Number($(this).attr("data-width"));
     var long = Number($(this).attr("data-long"));
     var price = Number($(this).attr("data-price"));
     var deed = Number($(this).attr("data-deed"));
     var first_pay = Number($(this).attr("data-first"));
     var discount = Number($(this).attr("data-disc"));

     shoppingCart.addItemToCart(lot, price, deed, width, long, first_pay, discount, 1);
     displayCart();
     loadPayTable();
     cartSummary();
 });

 $("#clear-cart").click(function (event) {
     shoppingCart.clearCart();
     displayCart();
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
             var output = "<table><tbody><tr><th class=" + 'text-left' + ">Lote</th><th>Dimensiones</th><th>Precio de lista</th><th>Valor escrituras</th><th>Precio final</th><th></th></tr >";
             for (var i in cartArray) {
                 output += "<tr><td class=" + 'text-left' + ">" +
                     cartArray[i].lot +
                     "</td><td>" + (cartArray[i].width * cartArray[i].long) +
                     " m2 (" + cartArray[i].width + " x " + cartArray[i].long +
                     ")<td>$" + cartArray[i].price +
                     "</td><td>$" + cartArray[i].deed +
                     " </td><td>$" + (cartArray[i].price + cartArray[i].deed) +
                     " </td><td><a class='delete-item' data-name='" + cartArray[i].lot + "'>Eliminar</a></td></tr>";

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

 //fill payment table
 function loadPayTable() {
     //var cartArray = shoppingCart.listCart();
     var cartStatus = shoppingCart.countCart();
     var pay = shoppingCart.totalCart();
     var totalListPrice = pay.totalListPrice;
     var fee = pay.fee;
     var totalDeed = pay.totalDeed;
     var totalPay = pay.totalPay;
     var totalFirstPay = pay.totalFirstPay
     var msi12 = pay.msi12;
     var msi24 = pay.msi24;

     $(document).ready(function () {
         if (cartStatus != 0) {
             $("#list-total-f").html(totalListPrice);
             $("#op-fee-f").html(fee);
             $("#deed-f").html(totalDeed);
             $("#total-f").html(totalPay);
             $("#first-pay-f").html(totalFirstPay);
             $("#msi12-f").html(msi12);
             $("#msi24-f").html(msi24);
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

 // checkout summary //
 function cartSummary() {
     var payPlan = shoppingCart.loadDeal();
     var cartArray = shoppingCart.listCart();
     var cartStatus = shoppingCart.countCart();
     var cartTitle = "<h2 class=" + 'orve-title' + ">Resumen del pedido</h2>";
     $(document).ready(function () {
         if (cartStatus != 0) {
             var payTotal = 0;
             var output = "<table><tbody><tr><th class=" + 'text-left' + ">Producto</th><th>Descripción</th><th></th></tr >";
             for (var i in cartArray) {
                 var payTotal = payTotal + cartArray[i].first_pay;
                 output += "<tr><td class=" + 'text-left' + ">Lote " +
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
     loadPayTable();
     cartSummary();
 });



 //****** Shopping Cart Functions********//

 var shoppingCart = {};
 shoppingCart.cart = [];
 shoppingCart.holdDeal = [];

 shoppingCart.Item = function (lot, price, deed, width, long, first_pay, discount, count) {
     this.lot = lot
     this.price = price
     this.deed = deed
     this.width = width
     this.long = long
     this.first_pay = first_pay
     this.discount = discount
     this.count = count
 };

 shoppingCart.addItemToCart = function (lot, price, deed, width, long, first_pay, discount, count) {
     for (var i in this.cart) {
         if (this.cart[i].lot === lot) {
             alert("Este lote ya está en su carrito!");
             /*this.cart[i].count += count;
              this.saveCart();*/
             return;
         }
     }
     var item = new this.Item(lot, price, deed, width, long, first_pay, discount, count);
     this.cart.push(item);
     this.saveCart();
 };

 shoppingCart.removeItemFromCart = function (lot) { //remueve un item 
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
 };

 shoppingCart.removeItemFromCartAll = function (lot) { //remueve todos los items con ese nombre 
     for (var i in this.cart) {
         if (this.cart[i].lot === lot) {
             this.cart.splice(i, 1);
             break;
         }
     }
     this.saveCart();
 };

 shoppingCart.clearCart = function () {
     this.cart = [];
     this.saveCart();
 };

 shoppingCart.countCart = function () { //-> regresa el total de articulos 
     var totalCount = 0;
     for (var i in this.cart) {
         totalCount += this.cart[i].count;
     }
     return totalCount
 };

 shoppingCart.totalCart = function () { //-> regresa el total de costo 
     var totalListPrice = 0;
     var totalDeed = 0;
     var totalFirstPay = 0;

     for (var i in this.cart) {
         totalListPrice += this.cart[i].price;
         totalDeed += this.cart[i].deed;
         totalFirstPay += this.cart[i].first_pay;
     }

     var fee = 500;
     var totalPay = totalListPrice + totalDeed + fee;
     var msi12 = (totalPay - totalFirstPay) / 12;
     var msi24 = (totalPay - totalFirstPay) / 24;

     return {
         totalListPrice: totalListPrice.toFixed(2),
         fee: fee.toFixed(2),
         totalDeed: totalDeed.toFixed(2),
         totalPay: totalPay.toFixed(2),
         totalFirstPay: totalFirstPay.toFixed(2),
         msi12: msi12.toFixed(2),
         msi24: msi24.toFixed(2)

     };
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

 shoppingCart.saveCart = function () {
     localStorage.setItem("orveShoppingCart", JSON.stringify(this.cart));
 };

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

 shoppingCart.addDeal = function (deal) {
     this.clearDeal();
     console.log(deal);
     var deal = new this.Deal(deal);
     this.holdDeal.push(deal);
     this.saveDeal();
 };

 shoppingCart.saveDeal = function () {
     localStorage.setItem("orveDeal", JSON.stringify(this.holdDeal));
 };

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

 shoppingCart.loadCart();
 //shoppingCart.loadDeal();
 //shoppingCart.dealCalc();
 shoppingCart.totalCart();
 displayCart();
 loadPayTable();
 cartSummary();
 checkoutPayment();