
export var Form = {
  waiting: function(obj) {
    obj.removeClass("disabled");
    obj.addClass("waiting");
    obj.removeClass("ready");
  },

  ready: function(obj) {
    obj.removeClass("disabled");
    obj.removeClass("waiting");
    obj.addClass("ready");
  },

  disabled: function(obj) {
    obj.addClass("disabled");
    obj.removeClass("waiting");
    obj.removeClass("ready");

  }


}