let name = "Valaki";
let age:number;
age = 12;


let person:{ name: string, age: number, height?: number, weight: number | undefined};
person = {
    name: "Valaki",
    age: 20,
    weight: undefined
    //height: 170
}
person.name = "Béla";
person["name"] = "Péter";


console.log(person);

console.log("Hello from TypeScript");


type User = {
    username: string;
    email: string;
    password?: string;
}
const admin:User = {
    username: "admin",
    email: "admin@elte.hu"
};

console.log(admin);

interface Animal {
    name: "Cat" | "Dog" | "Tiger";
}

interface WildAnimal extends Animal {
    country: "Asia" | "Africa";
}

const tiger:WildAnimal = {
    name: "Tiger",
    country: "Asia"
}

console.log(typeof (tiger))

function add (a: number, b: number) : number {
    return a + b;
}

function div(a: number, b: number) : number | undefined {
    if(b === 0) {
        return undefined;
    }

    return a / b;
}