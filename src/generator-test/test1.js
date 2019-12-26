function* g() {
    yield 'a';
    yield 'b';
    yield 'c';
    return 'ending';
}

var gen = g()
console.log(gen.next()) // {value: "a", done: false}
console.log(gen.next()) // {value: "b", done: false}
console.log(gen.next()) // {value: "c", done: false}
console.log(gen.next()) // {value: "ending", done: true}