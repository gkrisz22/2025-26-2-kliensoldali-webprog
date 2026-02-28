/*
 * Feladat: Egyedi web komponens – <char-count-input>
 * Egy beviteli mező aktuális karakterszámát jeleníti meg valós időben,
 * a gyerekként elhelyezett <input> maxlength attribútuma alapján.
 *
 * Tudnivalók:
 *  - Autonomous custom element: HTMLElement-et terjesztünk ki, saját tagnevet kapunk.
 *  - customElements.define("tag-nev", Osztaly) regisztrálja az elemet a böngészőben.
 *  - connectedCallback(): fut, amikor az elem bekerül a DOM-ba – itt inicializálunk.
 *  - disconnectedCallback(): fut, amikor az elem kikerül a DOM-ból – itt takarítunk.
 *  - .bind(this): eseménykezelőknél szükséges, hogy a metóduson belül a `this`
 *    az osztálypéldányra mutasson, ne a DOM elemre.
 *    FIGYELEM: .bind() mindig új függvényreferenciát ad vissza, ezért
 *    removeEventListener-hez a bound függvényt külön kell tárolni!
 */

class CharCountInput extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        console.log("ok");

        this.input = this.querySelector("input");


        if(!this.input) { // ha nincs input
            return;
        }

        // this.input.getAttribute("maxLength")  | max-length = maxLength
        this.maxlength = this.input.getAttribute("maxLength") || 99;
        console.log("MaxLength: ", this.maxlength);

        this.createDiv();

        this.appendChild(this.div);

        this.input.addEventListener("input", this.onInput.bind(this))
        
    }

    disconnectedCallback() {
        // .bind(this) új referenciát ad vissza, ezért ugyanazt a bound függvényt kellene tárolni az eltávolításhoz
         this.input.removeEventListener("input", this.onInput.bind(this))
    }

    onInput(e) {
        // e.target lesz az <input> // e = event, esemény
        const currentLength = e.target.value.length;

        console.log("Jelenlegi hossz: " + currentLength);
        this.div.innerText = `${currentLength}/${this.maxlength}`;

    }

    createDiv() {
        this.div = document.createElement("div");
        this.div.classList.add("char-counter");
        this.div.innerText = `0/${this.maxlength}`;
    }
}

customElements.define("char-count-input", CharCountInput);