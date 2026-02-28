/*
 * Feladat: Beépített elem kiterjesztése – <a is="confirm-link">
 * Navigálás előtt confirm() párbeszédablakot jelenít meg.
 * Ha a felhasználó visszautasítja, az alapértelmezett navigáció megakadályozható.
 *
 * Tudnivalók:
 *  - Customized built-in element: meglévő HTML elemet (HTMLAnchorElement) terjesztünk ki,
 *    ezért HTML-ben az is="confirm-link" attribútummal kell használni: <a is="confirm-link">.
 *  - customElements.define() harmadik paramétere: { extends: "a" } – ez adja meg az alap elemet.
 *  - e.preventDefault(): megakadályozza az alapértelmezett böngésző-viselkedést (itt: a navigálást).
 *  - confirm(): szinkron blokkoló párbeszéd, igaz/hamis értékkel tér vissza.
 *  - Az eseménykezelőt itt NEM kell .bind(this)-szel ellátni, mert openLink
 *    nem hivatkozik this-re – de általánosan ajánlott odafigyelni rá.
 */
class ConfirmLink extends HTMLAnchorElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // this: a tag
        // click eventre -> confirm, hogy átirányítson-e (ha Cancel, akkor e.preventDefault())

        this.addEventListener("click", this.openLink);

    }


    disconnectedCallback() {
        this.removeEventListener("click", this.openLink);

    }

    openLink(e) {
        if(!confirm("Megnyitod?")) {
            e.preventDefault();
        }

        console.log("this" + this)
    }

    // Nem használt metódus: confirm() visszatérési értékének kezelésére mutat példát
    confirmMe() {
        const result = confirm("Hello");
        if(result) {
            console.log("OK")
        }
        else {
            console.log("Mégsem");
        }

        // e.preventDefault();
    }


} 

customElements.define("confirm-link", ConfirmLink, { extends: "a"});