/*
 * Feladat: Egyedi web komponens Shadow DOM-mal – <shadow-button>
 * Egy gombot renderel, amelynek stílusai teljesen el vannak szigetelve
 * az oldal többi CSS-étől a Shadow DOM mechanizmus segítségével.
 *
 * Tudnivalók:
 *  - Shadow DOM: az elem saját, izolált DOM-fát kap (this.shadowRoot).
 *    Az itt definiált CSS nem szivárog ki, és a külső CSS sem szivárog be.
 *  - attachShadow({ mode: "open" }): létrehozza a shadow root-ot;
 *    "open" módban JavaScriptből kívülről is elérhető (this.shadowRoot).
 *  - A Shadow DOM-ba elemeket a shadowRoot.append()-del kell hozzáadni,
 *    nem this.append()-del – különben a fő DOM-ba kerülnek.
 *  - Stílust <style> tag programozott létrehozásával és innerHTML-lel adunk hozzá.
 */
class ShadowButton extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        this._createButton();


        this.styleTag = document.createElement("style");
        /*
            <style>
                button {
                    background-color: blue;
                }
            </style>
        */
       this.styleTag.innerHTML = `
            button {
                    background-color: blue;
            }
       `;

       this.shadowRoot.append(this.styleTag)

        this.shadowRoot.append(this.button);
    }

    disconnectedCallback() {

    }

    _createButton() {
        this.button = document.createElement("button");
        this.button.textContent = "From Shadow";
    }
}

customElements.define("shadow-button", ShadowButton);