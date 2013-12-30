(function(){

  var bindingKey = "data-bind";

  function Binding(property, value, nodeElements){
    this.$$property     = property;
    this.$$value        = value;
    this.$$nodeElements = nodeElements;

    this.$setupWatchers();
    this.$updateDOM();
  }

  Binding.prototype.$updateValue = function(value){
    this.$$value = value;
    this.$updateDOM();
  };

  Binding.prototype.$updateDOM = function(){
    for(var i = 0; i < this.$$nodeElements.length; i++) {
      if(this.$$nodeElements[i].nodeName === "INPUT" || this.$$nodeElements[i].nodeName === "TEXTAREA") {
        this.$$nodeElements[i].value = this.$$value;
      }
      else {
        this.$$nodeElements[i].textContent = this.$$value;
      }
    }
  };

  window.stik.Binding = Binding;
})();