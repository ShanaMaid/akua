import akua from '../index';

const getRandBoolean = () => {
  return Math.random() > 0.5;
}

export const testAkuaUnit = () => {
  const conditionA = getRandBoolean();
  const conditionB = getRandBoolean();
  const conditionC = getRandBoolean();
  const conditionD = getRandBoolean();
  const conditionE = getRandBoolean();
  const conditionF = getRandBoolean();
  const conditionG = getRandBoolean();

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
  const normailIfEnd = new Date().getTime();

  const akuaIfStart = new Date().getTime();
  let akuaIf = '';
  const ifTree = new akua();
  ifTree
  .inject(conditionA, 'a', (obj) => {
    obj.tempA = 'tempA';
    akuaIf += 'a';
  })
  .inject(!conditionA, '!a', () => {
    akuaIf += '!a';
  })
  .inject(conditionB, 'a->b', (obj) => {
    akuaIf += 'b';
    akuaIf += obj.tempA;
  })
  .inject(!conditionB, 'a->!b', () => {
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
  const akuaIfEnd = new Date().getTime();

  return {
    result: normalIf === akuaIf,
    nomralIfCost: normailIfEnd - normailIfStart,
    akuaIfCost: akuaIfEnd - akuaIfStart,
  };
}