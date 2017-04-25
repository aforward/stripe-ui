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
      currency: $("#invoiceCurrency").val()
    };
    entity.handler.open(entity.invoiceData);
    return false;
  }

  entity.attachEvents = function() {
    entity.form.submit(function() {
      return entity.popup();
    });

    entity.btn.click(function() {
      return entity.popup();
    });

    entity.handler = StripeCheckout.configure({
      key: $("#stripePkey").val(),
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: function(stripeToken) {
        $.ajax({
          type: "POST",
          url: "api/tokens",
          data: {token: {"stripe": stripeToken, "invoice": entity.invoiceData}},
        }).done(function() {
          Form.disabled(entity.btn);
        });
      }
    });

    window.addEventListener('popstate', function() {
      entity.handler.close();
      Form.ready(entity.btn);
    });
  }

  entity.run = function() {
    entity.form = $("#stripeForm");
    entity.btn = $("#stripePayNow");
    entity.attachEvents();
  }

  return entity;
}());