window.stik || (window.stik = {});

(function() {

  var bindingKey = "data-bind";

  function Binding(value, elements){
    this.value = value;
    this.elements = elements;

    this.$setupWatchers()
  }

  Binding.prototype.$set = function(value){
    for (this.elements) {
      textContent = value
    }
  };

  Binding.prototype.$setupWatchers = function(){
    for (elements) {
      if elm is input {
        this.$setupValueWatcher(elm, updateValue);
      }
      else {
        this.$setupSimpleWatcher(elm);
      }
    }
  };
});

bind[teste] = {value: x,
               elements: [input1, input2]
            }
obj = $viewBag.$bind({
  teste: "valor"
})
obj.set("teste", "valorNovo");
obj.teste # valorNovo

$bind

getElements(data=bing= teste)

new Binding(property, elms)