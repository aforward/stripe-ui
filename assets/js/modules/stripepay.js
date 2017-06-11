import { Form } from "./form";

export var Stripepay = (function () {

  var entity = {};

  entity.popup = function()
  {
    Form.waiting(entity.btn);
    entity.invoiceData = {
      name: $("#invoiceName").val(),
      description: $("#invoiceDescription").val(),
      amount: parseFloat($("#invoiceAmount").val()) * 100,
      currency: $("#invoiceCurrency").val(),
    };
    entity.handler().open(entity.invoiceData);
    return false;
  }

  entity.handler = function() {
    var mode = entity.btn.data("mode");
    switch (mode) {
      case "charge":
        return entity.chargeHandler;
      case "customer":
        return entity.customerHandler;
      default:
        console.log("Unknown btn mode " + mode + " expected charge or customer");
        return null;
    }
  }

  entity.processToken = function(stripeToken) {
    $.ajax({
      type: "POST",
      url: "api/tokens",
      data: {token: {"stripe": stripeToken, "invoice": entity.invoiceData}},
    }).done(function() {
      Form.disabled(entity.btn);
    });
  }

  entity.attachEvents = function() {
    entity.form.submit(function() {
      return entity.popup();
    });

    entity.btn.click(function() {
      return entity.popup();
    });

    entity.chargeHandler = StripeCheckout.configure({
      key: $("#stripePkey").val(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: entity.processToken
    });

    // Thank you https://www.masteringmodernpayments.com/blog/using-stripe-checkout-for-subscriptions
    entity.customerHandler = StripeCheckout.configure({
      key: $("#stripePkey").val(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      panelLabel: "Subscribe",
      allowRememberMe: false,
      token: entity.processToken
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