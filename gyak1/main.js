const nav = document.querySelector("#mainNav");

/** 
 * Görgetés eseménykezelője
*/
function onScroll() {
    console.log("Görgetek");
    /*if(window.scrollY > 200) {
        nav.classList.add("navbar-scrolled");
    }
    else {
        nav.classList.remove("navbar-scrolled");
    }*/
    
    // htmlNode.classList.toggle("css osztály neve", "feltétel") -> beállítja a css osztályt, ha a feltétel igaz, egyébként eltávolítja azt
    nav.classList.toggle("navbar-scrolled", window.scrollY > 200);
}

// "Ügyelj arra, hogy kis idő alatt többször lefuthat az esemény": _.throttle(függvény, késleltetés ideje ms-ban), a lodash könyvtárból
document.addEventListener("scroll", _.throttle(onScroll, 200));

// Az onObserve függvény fogja lekezelni az IntersectionObserver által küldött eseményt
function onObserve(entries) {

    // Minden megfigyelt elemet megnézünk, hogy éppen a viewportban van-e
    entries.forEach((elem) => {
        if(elem.isIntersecting) { // Ha az elem viewportban van
            // Feladatnak megfelelően az elemhez hozzáadjuk a megfelelő animációs osztályokat, amik az animate.css könyvtárból származnak

            // data-scroll-animation="valami" -> elem.target.dataset.scrollAnimation -> "valami"
            const anim = elem.target.dataset.scrollAnimation;
            elem.target.classList.add("animate__animated", "animate__" + anim);
                                                            // animate__fadeInUp
        }
    })
}

// IntersectionObserver: figyeli, hogy egy elem mikor kerül a viewportba, és mikor hagyja el azt
const observer = new IntersectionObserver(onObserve, {
    threshold: 1 // 0 és 1 között (0-100%), azaz milyen mértékben kell az elemnek láthatónak lennie, hogy viewportban legyen.
});

// A feladat alapján, lekérjük az összes animálandó elemet (data-scroll attribútummal)
const animatedElements = document.querySelectorAll("[data-scroll]");

// Minden elemet, egyesével megfigyelünk az IntersectionObserver, feljebb létrehozott observer példányának segítségével
animatedElements.forEach((animElem) => {
    observer.observe(animElem);
});


/*
// Függvény deklarációk különböző módjai
function onScroll() {

}

const onScroll2 = () => {

}

const onScroll3 = function() {
    
}*/