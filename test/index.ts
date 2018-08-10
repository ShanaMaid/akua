import akua from '../index';

const getRandBoolean = () => {
  return Math.random() > 0.5;
}

function testAkuaUnit() {
  const ifTree = new akua();
  const a = getRandBoolean();
  const b = getRandBoolean();
  const c = getRandBoolean();
  const d = getRandBoolean();
  const e = getRandBoolean();
  const f = getRandBoolean();
  const g = getRandBoolean();

  let normalIf = '';
  if (a) {
    normalIf += 'a';
    if (b) {
      normalIf += 'b';
      if (c) {
        normalIf += 'c';
        if (d) {
          normalIf += 'd';
          if (e) {
            normalIf += 'e';
          }
        }
      }
    }

    if (f) {
      normalIf += 'f';
      if (g) {
        normalIf += 'g';
      }
    }
  }

  let akuaIf = '';
  ifTree
  .inject(a, 'a', () => {
    akuaIf += 'a';
  })
  .inject(b, 'a->b', () => {
    akuaIf += 'b';
  })
  .inject(c, 'b->c', () => {
    akuaIf += 'c';
  })
  .inject(d, 'c->d', () => {
    akuaIf += 'd';
  })
  .inject(e, 'd->e', () => {
    akuaIf += 'e';
  })
  .inject(f, 'a->f', () => {
    akuaIf += 'f';
  })
  .inject(g, 'f->g', () => {
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


