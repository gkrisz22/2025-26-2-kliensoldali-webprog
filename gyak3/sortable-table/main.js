/*
 * Feladat: Rendezhetó táblázat – funkcionális megközelítés
 * A táblázat fejlécére kattintva az adott oszlop szerint rendezi a sorokat.
 * Az adatokat a DOM-ból nyerjük ki, tömbként kezeljük, majd visszaírjuk.
 *
 * Tudnivalók:
 *  - Eseménydelegálás: az eseménykezelőt nem minden <th>-ra külön tesszük,
 *    hanem a szülő <thead>-re – event.target.matches("th") szűri a kattintást.
 *  - Array.sort(compareFn): összehasonlító függvénnyel rendez; negatív → a előre, pozitív → b előre.
 *  - cellIndex: egy <td>/<th> elem oszlopindexét adja vissza (0-tól számozva).
 *  - innerHTML újraírás: a tbody.innerHTML felülírásával rendereljük újra a táblázatot.
 *  - Spread operátor ([...nodeList]): NodeList-et valódi tömbbé alakít,
 *    hogy tömbmetódusok (map, sort stb.) használhatók legyenek rajta.
 */

// 1. lépés: Az elemek lekérése a DOM-ból
const table = document.querySelector("#animals-table");
const thead = table.querySelector("thead"); // Innentől a table-t használjuk, nem document
const tbody = table.querySelector("tbody");
const rows = tbody.querySelectorAll("tr"); 

// 2. lépés: Az adatok kinyerése a táblázatból egy könnyen kezelhető struktúrába
const data = [];
rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    const rowData = [];
    cells.forEach((cell) => {
        rowData.push(cell.innerText);
    })

    data.push(rowData);
});


// Alternatív megoldás a data2 változó létrehozására, a spread operátor segítségével
const data2 = [...rows].map((row) => 
    [...row.querySelectorAll('td')].map((cell) => cell.innerText));

/*

data = [
    ["Kutya", "Kodi"], // a
    ["Macska", "Cirmi"], // b
    ["Kutya", "Csutak"] 
];
*/

console.log(data);

// Spread operator
let t = [1, 2, 3];
let t2 = [4, 5, 6];

let t3 = [...t, ...t2];
// t3 = [1,2,3,4,5,6]
//console.log(t3);

// 4. lépés: A táblázat újrarenderelése a rendezett adatok alapján
function renderTable(data) {
    return data.map((row) => `<tr>
        ${row.map((cell) => `<td>${cell}</td>`).join("")}
    </tr>`).join("");
}

// 3. lépés: A rendezés megvalósítása, amikor a felhasználó a fejlécre kattint (DELEGÁLÁS: az eseménykezelőt a kívánt elemek szűlőjére tesszük)
function sortTable(event) {
    console.log("Fejlécre kattintottál")
    if(event.target.matches("th")) {
        //console.log(event.target)
        const colIndex = event.target.cellIndex;
        data.sort((a, b) => (a[colIndex] < b[colIndex] ? -1 : 1));
        tbody.innerHTML = renderTable(data);
    }
}

thead.addEventListener("click", sortTable);