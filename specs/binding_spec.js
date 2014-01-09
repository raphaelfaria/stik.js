describe("Binding", function(){
  // describe("#initialize", function(){
  //   it("when ok", function(){
  //     var binding, property, nodeElements, value;

  //     property     = "name";
  //     value        = "Anakin";
  //     nodeElements = [
  //       new DOMParser().parseFromString(
  //         '<span data-bind="name"></span>', "text/xml"
  //       ).firstChild
  //     ];

  //     binding = new stik.Binding(property, value, nodeElements);

  //     expect(binding.$$property).toEqual(property);
  //     expect(binding.$$value).toEqual(value);
  //     expect(binding.$$nodeElements).toEqual(nodeElements);
  //     expect(binding.$$nodeElements[0].textContent).toEqual("Anakin");
  //   });
  // });

  // describe("#$updateValue", function(){
  //   it("with one Node", function(){
  //     var binding, nodeElements;

  //     nodeElements = [
  //       new DOMParser().parseFromString(
  //         '<span data-bind="name"></span>', "text/xml"
  //       ).firstChild
  //     ];

  //     binding = new stik.Binding("name", "", nodeElements);
  //     binding.$updateValue("Darth");

  //     expect(binding.$$value).toEqual("Darth");
  //     expect(nodeElements[0].textContent).toEqual("Darth");
  //   });
  // });

  describe("#watchers", function(){
    it("watch input", function(){
      var binding, nodeElements;

      nodeElements = [
        new DOMParser().parseFromString(
          '<input type="text" data-bind="name">', "text/xml"
        ).firstChild,
        new DOMParser().parseFromString(
          '<span data-bind="name"></span>', "text/xml"
        ).firstChild
      ];

      binding = new stik.Binding("name", "", nodeElements);
      nodeElements[0].value = "Darth";

      console.info('\n');
      console.info(nodeElements[0].value);
      console.info('\n');

      expect(binding.$$value).toEqual("Darth");
      expect(nodeElements[1].textContent).toEqual("Darth");
    });
  });
});