# Akua
Chainable `if`!

`Akua`  is a very useful tools! It can solve your `nested if-tree`, make it become 
`chainable if`!

`Akua` can help you code maintainable if!

## Install
```
npm install akua --save
```

## Use
normal nested if-tree
```js
let normalIf = '';
const normailIfStart = new Date().getTime();
if (conditionA) {
  const tempA = 'tempA';
  normalIf += 'a';
  if (conditionB) {
    normalIf += 'b';
    normalIf += tempA;
    if (conditionC) {
      normalIf += 'c';
      if (conditionD) {
        normalIf += 'd';
        if (conditionE) {
          normalIf += 'e';
        }
      }
    }
  } else {
    normalIf += '!b';
  }

  if (conditionF) {
    normalIf += 'f';
    if (conditionG) {
      normalIf += 'g';
    }
  }
} else {
  normalIf += '!a';
}
```

akua if
```js
let akuaIf = '';
const ifTree = new akua();
ifTree
.inject(conditionA, 'a', (obj) => {
  obj.tempA = 'tempA';
  akuaIf += 'a';
})
.inject(!conditionA, '!a', (obj) => {
  akuaIf += '!a';
})
.inject(conditionB, 'a->b', (obj) => {
  akuaIf += 'b';
  akuaIf += obj.tempA;
})
.inject(!conditionB, 'a->!b', (obj) => {
  akuaIf += '!b';
})
.inject(conditionC, 'b->c', () => {
  akuaIf += 'c';
})
.inject(conditionD, 'c->d', () => {
  akuaIf += 'd';
})
.inject(conditionE, 'd->e', () => {
  akuaIf += 'e';
})
.inject(conditionF, 'a->f', () => {
  akuaIf += 'f';
})
.inject(conditionG, 'f->g', () => {
  akuaIf += 'g';
})
.parse();
```

Finally, `normalIf === akuaIf`, you can git clone this project and `npm run test` if you doubt！


## Unit Test Exampls
- [unit test](./test/unit.ts)

## Perfomance
`npm run test`
```
test: 1000， success: 1000, fail: 0
normal-if cost time: 2ms
akua-if cost time: 7ms
```

```
test: 100000， success: 100000, fail: 0
normal-if cost time: 19ms
akua-if cost time: 175ms
```