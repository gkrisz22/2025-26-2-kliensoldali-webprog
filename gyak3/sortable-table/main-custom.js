/*
 * Feladat: Rendezhetó táblázat – autonóm egyedi elem (autonomous custom element)
 * HTMLElement-et terjeszti ki, így teljesen önálló <sortable-table> tagként használható,
 * amely tartalmazza a <table> struktúrát is.
 *
 * Tudnivalók:
 *  - Autonomous custom element: HTMLElement az alap, saját tagnevet kap (kötőjel kötelező).
 *  - Különbség a built-in változathoz: nem kell is="..." attribútum,
 *    de elveszítjük a natív <table> tulajdonságait (pl. közvetlen hozzáférés a .rows-hoz).
 *  - customElements.define()-nál nincs harmadik paraméter (extends), mert HTMLElement-ből öröklünk.
 *  - connectedCallback()-ben querySelectorAll-lal kérdezzük le a belső DOM-ot,
 *    mert this maga az egyedi elem, amely tartalmazza a <table>-t.
 */

class SortableTable extends HTMLElement  {
    
    constructor() {
        super()
    }

    connectedCallback() {
        console.log("SortableTable létrejött");

        this.thead = this.querySelector("thead");
        this.tbody = this.querySelector("tbody");
        this.sorok = this.tbody.querySelectorAll("tr"); 

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
        this.sorok.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = [];
            cells.forEach((cell) => {
                rowData.push(cell.innerText);
            })

            this.data.push(rowData);
        });
    }
}

customElements.define("sortable-table", SortableTable);