var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
    }
    Greeter.prototype.greet = function () {
        return this.greeting + "!!!";
    };
    return Greeter;
})();
Greeter = Greeter;
;