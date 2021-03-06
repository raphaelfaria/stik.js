describe("Courier", function(){
  it("#initialize", function(){
    var courier = new stik.Courier();

    expect(courier.$$subscriptions).toEqual({});
  });

  describe("#$receive", function(){
    it("should store one", function(){
      var courier, box, opener;

      box    = "new-item";
      opener = function(){};

      courier = new stik.Courier();

      courier.$receive(box, opener);

      expect(
        Object.keys(courier.$$subscriptions)[0]
      ).toEqual(box);

      expect(
        courier.$$subscriptions[box].length
      ).toEqual(1);

      expect(
        courier.$$subscriptions[box][0].$$opener
      ).toEqual(opener);
    });

    it("should store multiple boxes", function(){
      var courier, createBox, updateBox, opener;

      createBox    = "create-item";
      updateBox    = "updated-item";
      opener       = function(){};

      courier = new stik.Courier();

      courier.$receive(createBox, opener);
      courier.$receive(updateBox, opener);

      expect(
        Object.keys(courier.$$subscriptions)
      ).toEqual([createBox, updateBox]);

      expect(
        courier.$$subscriptions[createBox].length
      ).toEqual(1);

      expect(
        courier.$$subscriptions[updateBox].length
      ).toEqual(1);

      expect(
        courier.$$subscriptions[createBox][0].$$opener
      ).toEqual(opener);

      expect(
        courier.$$subscriptions[updateBox][0].$$opener
      ).toEqual(opener);
    });

    it("should return a function to allow removing the receiver", function(){
      var courier, box, opener, unsubscribe;

      box    = "new-item";
      opener = function(){};

      courier = new stik.Courier();

      unsubscribe = courier.$receive(box, opener);
      unsubscribe();

      expect(function(){
        courier.$send('new-item', {some: "data"});
      }).toThrow("no one is waiting for this message");
    });
  });

  describe("#$send", function(){
    it("should throw if no $receiver is register", function(){
      var courier;

      courier = new stik.Courier();

      expect(function(){
        courier.$send('new-item', {some: "data"});
      }).toThrow("no one is waiting for this message");
    });

    it("a text message", function(){
      var courier, message, receiver;

      message = "some message";
      receiver = jasmine.createSpy("receiver");

      courier = new stik.Courier();
      courier.$receive("new-message", receiver)
      courier.$send("new-message", message);

      expect(receiver).toHaveBeenCalledWith(message);
    });

    it("an object message", function(){
      var courier, message, receiver;

      message = {
        some: "super",
        deeply: {
          nested: "message"
        }
      };
      receiver = jasmine.createSpy("receiver");

      courier = new stik.Courier();
      courier.$receive("new-message", receiver)
      courier.$send("new-message", message);

      expect(receiver).toHaveBeenCalledWith(message);
    });
  });
});
