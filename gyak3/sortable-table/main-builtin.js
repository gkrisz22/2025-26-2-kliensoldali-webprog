/*
 * Feladat: Rendezhetó táblázat – beépített egyedi elem (customized built-in)
 * Kiterjeszti a natív HTMLTableElement-et, így a böngésző alapvető táblázat-funkcionalitása megmarad.
 * HTML-ben <table is="sortable-table"> szintaxissal használható.
 *
 * Tudnivalók:
 *  - Customized built-in element: HTMLTableElement-et terjesztünk ki (extends "table").
 *  - Az is="sortable-table" attribútum jelzi a böngészőnek, melyik osztályt kell példányosítani.
 *  - Safari nem támogatja natívan a customized built-in elemeket – polyfill szükséges!
 *  - connectedCallback() / disconnectedCallback(): az elem DOM-ba/DOM-ból való bekerülésekor fut.
 *  - .bind(this) removeEventListener-hez: ugyanazt a referenciát kell tárolni,
 *    ezért a bound verziót el kellene menteni (ismert bug ebben a kódban).
 */

class SortableTable extends HTMLTableElement  {
    
    constructor() {
        super()
    }

    connectedCallback() {
        console.log("SortableTable létrejött");

        this.thead = this.querySelector("thead");
        this.tbody = this.querySelector("tbody");
        this.trows = this.tbody.querySelectorAll("tr"); 

        this.data = [];
        this.initTable();

        this.thead.addEventListener("click", this.onHeaderClick.bind(this))
    }

    disconnectedCallback() {
        console.log("SortableTable eltávolítódott");
        this.thead.removeEventListener("click", this.onHeaderClick.bind(this));
    }


    // A fejlécre kattintás eseménykezelője, ami elvégzi a rendezést a this.data alapján, majd újrarendereli a táblázatot
    onHeaderClick(event) {
        // A this.* undefined-t ad? -> Használd a .bind(this)-t függvényhíváskor (általában eseménykezelőknél csak)
        console.log("Fejlécre kattintottál")
        if(event.target.matches("th")) {
            //console.log(event.target)
            const colIndex = event.target.cellIndex;
            this.data.sort((a, b) => (a[colIndex] < b[colIndex] ? -1 : 1));
            this.tbody.innerHTML = this.renderTable();
        }

    }

    // A táblázatot renderelő függvény, a this.data alapján generálja újra a táblázat tartalmát
    renderTable() {
        return this.data.map((row) => `<tr>
            ${row.map((cell) => `<td>${cell}</td>`).join("")}
        </tr>`).join("");
    }


    // Begyűjtjük a táblázat adatait
    initTable() {
        this.trows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = [];
            cells.forEach((cell) => {
                rowData.push(cell.innerText);
            })

            this.data.push(rowData);
        });
    }
}

customElements.define("sortable-table", SortableTable, { extends: "table"});