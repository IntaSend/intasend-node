import Wallet from "./wallets";

interface Person {
    name: string,
    age: number
}
function greeter(person: Person) {
    console.log("Hello ", person.name, ", turning ", person.age, " years today")
}

const user: Person = { name: "Felix", age: 20 }
greeter(user)

const service: Wallet = {
    fund: function () {
        console.log("Funding")
    }
}

service.fund()
