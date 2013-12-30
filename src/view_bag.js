(function(){
  var bindingKey = "data-bind";

  function ViewBag(template){
    this.$$template = template;
    this.$bindingSetup();
  }

  ViewBag.prototype.$fieldsToBind = function(){
    if (this.$$template.getAttribute(bindingKey)) {
      return [this.$$template];
    }

    return this.$$template.querySelectorAll(
      "[" + bindingKey + "]"
    );
  };

  ViewBag.prototype.$bindingSetup = function(){
    var allElements = this.$fieldsToBind(),
        bind = {},
        sortedElements = {};


    for(var i = 0; i < allElements.length; i++) {
      var attr = allElements[i].getAttribute(bindingKey);
      if(!bind[attr])
        bind[attr] = "";
    }

    this.$binding = new window.stik.Binding(bind, sortedElements);

    for (var prop in bind) {
      if (bind.hasOwnProperty(prop)) {
        this.$binding.$$elements[prop] = this.$$template.querySelectorAll("[" + bindingKey + "=" + prop + "]");
      }
    }

  };

  ViewBag.prototype.$set = function(val) {
    if(!val) {
      this.$setAllBindings();
    }
    else {
      this.$setOneBinding(val);
    }
  };

  ViewBag.prototype.$setAllBindings = function() {
    for (var prop in this.$binding.$$bind) {
      if (this.$binding.$$bind.hasOwnProperty(prop)) {
        this.$setOneBinding(prop);
      }
    }
  }

  ViewBag.prototype.$setOneBinding = function(prop) {
    for(var i = 0; i < this.$binding.$$elements[prop].length; i++) {
      if(this.$binding.$$elements[prop][i].nodeName === "INPUT" || this.$binding.$$elements[prop][i].nodeName === "TEXTAREA") {
        this.$binding.$$elements[prop][i].value = this.$binding.$$bind[prop];
      }
      else {
        this.$binding.$$elements[prop][i].textContent = this.$binding.$$bind[prop];
      }
    }
  }

  ViewBag.prototype.$updateBind = function(prop, value) {
    this.$binding.$$bind[prop] = value;
  };

  window.stik.ViewBag = ViewBag;
})();