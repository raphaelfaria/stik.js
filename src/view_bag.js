(function(){
  var bindingKey = "data-bind";

  function ViewBag(template){
    this.$$template = template;
    this.$$bindings = {};
  }

  ViewBag.prototype.$fieldsToBind = function(){
    if (this.$$template.getAttribute(bindingKey)) {
      return [this.$$template];
    }

    return this.$$template.querySelectorAll(
      "[" + bindingKey + "]"
    );
  };

  ViewBag.prototype.$render = function(dataSet){
    var fields, dataToBind;

    fields = this.$fieldsToBind();

    for (var i = 0; i < fields.length; i++) {
      dataToBind = fields[i].getAttribute(bindingKey);

      if (dataSet[dataToBind]) {
        fields[i].textContent = dataSet[dataToBind];
      }
    }
  };

  ViewBag.prototype.$set = function(property, value){
    if(!this.$$bindings[property]) {
      this.$$bindings[property] = new window.stik.Binding(
        property, value, this.$findElements(property)
      );
    }
    else {
      this.$$bindings[property].$updateValue(value);
    }
  };

  ViewBag.prototype.$findElements = function(property){
    return this.$$template.querySelectorAll("[" + bindingKey + "=" + property + "]");
  };

  window.stik.ViewBag = ViewBag;
})();