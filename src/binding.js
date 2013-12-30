(function() {

  var bindingKey = "data-bind";

  function Binding(binding, elements){
    this.$$bind = binding;
    this.$$elements = elements;
  }

  window.stik.Binding = Binding;
})();



// $viewBag.$set("item1", 12);

// data-bind="item1" // item1 + elements
// data-bind="item2" // item2 + elements

// $set = function(key, value){
//   this.bindings[key].update(value);
// }

// $update = function(value) {
//   for elements.update(value)
// }