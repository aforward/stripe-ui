import { Form } from "./form";

export var Stripepay = (function () {

  var entity = {};

  entity.toPennies = function(inDollars) {
    return Math.floor(parseFloat(inDollars) * 100);
  }

  entity.popup = function()
  {
    Form.waiting(entity.btn);
    entity.invoiceData = {
      name: $("#invoiceName").val(),
      description: $("#invoiceDescription").val(),
      amount: entity.toPennies($("#invoiceAmount").val()),
      currency: $("#invoiceCurrency").val(),
    };
    entity.handler().open(entity.invoiceData);
    return false;
  }

  entity.handler = function() {
    var mode = $("#stripeGo").data("mode");
    switch (mode) {
      case "charge":
        return entity.chargeHandler;
      case "customer":
        return entity.customerHandler;
      case "token":
        return entity.tokenHandler;
      default:
        console.log("Unknown mode " + mode + " expected charge or customer");
        return null;
    }
  }

  entity.postToken = function(mode, stripeToken, callbackFn) {
    $.ajax({
      type: "POST",
      url: "api/tokens",
      data: {
        token: {stripe: stripeToken, invoice: entity.invoiceData},
        mode: mode
      }
    }).done(function(token) {
      callbackFn(token);
    });
  }

  entity.attachEvents = function() {
    entity.form.submit(function() {
      return entity.popup();
    });

    entity.btn.click(function() {
      return entity.popup();
    });

    entity.tokenHandler = StripeCheckout.configure({
      key: $("#stripePkey").val(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(stripeToken) {
                entity.postToken("create", stripeToken, function(token){
                  console.log("TOKEN CREATED");
                  console.log(token);
                  $("#stripeToken").html(token.data.stripe.id)
                  Form.disabled(entity.btn);
                });
              }
    });

    entity.chargeHandler = StripeCheckout.configure({
      key: $("#stripePkey").val(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(stripeToken) {
                entity.postToken("process", stripeToken, function(token){
                  console.log("TOKEN CHARGED");
                  console.log(token);
                  Form.disabled(entity.btn);
                });
              }
    });

    // Thank you https://www.masteringmodernpayments.com/blog/using-stripe-checkout-for-subscriptions
    entity.customerHandler = StripeCheckout.configure({
      key: $("#stripePkey").val(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      panelLabel: "Subscribe",
      allowRememberMe: false,
      token: function(stripeToken) {
                entity.postToken("process", stripeToken, function(token){
                  console.log("CUSTOMER CREATED");
                  console.log(token);
                  Form.disabled(entity.btn);
                });
              }
    });

    window.addEventListener('popstate', function() {
      entity.handler().close();
      Form.ready(entity.btn);
    });
  }

  entity.run = function() {
    entity.form = $("#stripeForm");
    entity.btn = $("#stripeGo");
    entity.attachEvents();
  }

  return entity;
}());