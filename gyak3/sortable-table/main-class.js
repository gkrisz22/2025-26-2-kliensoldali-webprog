/*
 * Feladat: Rendezhetó táblázat – osztály alapú megközelítés
 * Ugyanaz a logika, mint a funkcionális változatban, de egy JS osztályba szervezve.
 * Ez nem web komponens: az osztályt kézzel kell példányosítani és átadni a DOM elemet.
 *
 * Tudnivalók:
 *  - Osztály (class): az összetartozó adatokat és metódusokat egységbe foglalja.
 *  - constructor(table): a DOM elemet kívülről kapja meg paraméterként (dependency injection).
 *  - .bind(this): addEventListener-nél kötelező, ha a callback-ben this-t használunk,
 *    különben az esemény kontextusában a this a DOM elemre mutatna, nem az osztálypéldányra.
 *  - Különbség a web komponenshez képest: nincs connectedCallback/disconnectedCallback,
 *    az életciklust manuálisan kell kezelni.
 */

class SortableTable {
    constructor(table) {
        this.table = table;
        this.thead = table.querySelector("thead");
        this.tbody = table.querySelector("tbody");
        this.rows = this.tbody.querySelectorAll("tr"); 

        this.data = [];
        this.initTable();

        this.thead.addEventListener("click", this.onHeaderClick.bind(this)) // bind: kontextus csatolása

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
        this.rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            const rowData = [];
            cells.forEach((cell) => {
                rowData.push(cell.innerText);
            })

            this.data.push(rowData);
        });
    }
}

// Használat:
const table = document.querySelector("#animals-table");
const myTable = new SortableTable(table);