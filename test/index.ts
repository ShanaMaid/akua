import { testAkuaUnit } from './unit';

const count = 1000;
let success = 0;
let fail = 0;
let normalIfCostTime = 0;
let akuaIfCostTime = 0;
for (let i = 0; i < count; i++) {
  const unitResult = testAkuaUnit();
  unitResult.result ? success++ : fail++;
  normalIfCostTime += unitResult.nomralIfCost;
  akuaIfCostTime += unitResult.akuaIfCost;
}

console.log(`test: ${count}， success: ${success}, fail: ${fail}`);
console.log(`normal-if cost time: ${normalIfCostTime}ms`);
console.log(`akua-if cost time: ${akuaIfCostTime}ms`);

