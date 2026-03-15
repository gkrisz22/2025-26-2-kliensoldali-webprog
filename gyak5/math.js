
export function add(a,b) {
    return a + b;
}

function mul(a, b) {
    return a * b;
}

function div(a, b) {
    if(b == 0) {
        return 0; // 0-val nem osztunk
    }
    return a / b;
}

export {
    //add,
    mul,
    div
}

export default add;