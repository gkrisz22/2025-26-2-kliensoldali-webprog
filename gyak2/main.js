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