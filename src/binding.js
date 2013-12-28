window.stik || (window.stik = {});

(function() {

  var bindingKey = "data-bind";

  function Binding(template){
    this.$$template = template;
    this.$$bind = {};
    this.$$elements = {};

    this.$setup();
  }

  Binding.prototype.$setAll = function() {
    for (var prop in this.$$bind) {
      if (this.$$bind.hasOwnProperty(prop)) {
        this.$setOne(prop);
      }
    }
  }

  Binding.prototype.$setOne = function(prop) {
    for(var i = 0; i < this.$$elements[prop].length; i++) {
      if(this.$$elements[prop][i].nodeName === "INPUT" || this.$$elements[prop][i].nodeName === "TEXTAREA") {
        this.$$elements[prop][i].value = this.$$bind[prop];
      }
      else {
        this.$$elements[prop][i].textContent = this.$$bind[prop];
      }
    }
  }

  Binding.prototype.$set = function(val) {
    if(!val) {
      this.$setAll();
    }
    else {
      this.$setOne(val);
    }
  };

  Binding.prototype.$setup = function(){
    var elements = this.$$template.querySelectorAll("[" + bindingKey + "]");

    for(var i = 0; i < elements.length; i++) {
      var attr = elements[i].getAttribute(bindingKey);
      if(!this.$$bind[attr])
        this.$$bind[attr] = "";
    }
    for (var prop in this.$$bind) {
      if (this.$$bind.hasOwnProperty(prop)) {
        this.$$elements[prop] = this.$$template.querySelectorAll("[" + bindingKey + "=" + prop + "]");
      }
    }
  };

  stik.Binding = Binding;
})();