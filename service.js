"use strict";
exports.__esModule = true;
function greeter(person) {
    console.log("Hello ", person.name, ", turning ", person.age, " years today");
}
var user = { name: "Felix", age: 20 };
greeter(user);
var service = {
    fund: function () {
        console.log("Funding");
    }
};
service.fund();
