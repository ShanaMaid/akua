import akua from '../index';

const getRandBoolean = () => {
  return Math.random() > 0.5;
}

function testAkuaUnit() {
  const ifTree = new akua();
  const conditionA = getRandBoolean();
  const conditionB = getRandBoolean();
  const conditionC = getRandBoolean();
  const conditionD = getRandBoolean();
  const conditionE = getRandBoolean();
  const conditionF = getRandBoolean();
  const conditionG = getRandBoolean();

  let normalIf = '';
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

  let akuaIf = '';
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

  return normalIf === akuaIf;
}

const count = 10000;
let success = 0;
let fail = 0;
for (let i = 0; i < count; i++) {
  testAkuaUnit() ? success++ : fail++;
}

console.log(`测试${count}次， 成功${success}, 失败${fail}`);


