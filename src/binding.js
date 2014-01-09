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

  Binding.prototype.$setupWatchers = function(){
    var that = this;

    for(var i = 0; i < this.$$nodeElements.length; i++) {
      if (this.$$nodeElements[i].nodeName === "INPUT" || this.$$nodeElements[i].nodeName === "TEXTAREA" || this.$$nodeElements[i].nodeName === "SELECT") {
        this.$$nodeElements[i].addEventListener("input", changeHandle, false);
      }
      else {
        this.$$nodeElements[i].addEventListener("change", changeHandle, false);
      }
    }

    function changeHandle(evt){
      var target = evt.target,
          value;

      if (target.nodeName === "INPUT" || target.nodeName === "TEXTAREA" || target.nodeName === "SELECT") {
        value = target.value;
      }
      else {
        value = target.textContent;
      }

      that.$updateValue(value);
    }
  };

  window.stik.Binding = Binding;
})();