const BN = require('bn.js');

const ONE = new BN('1', 10);
const TWO = new BN('2', 10);

const p = new BN('3', 10);
const q = new BN('7', 10);

const n = p.mul(q);
console.log('N=', n.toString());

console.log('\n\nFast>>>>>>>>');
console.log('Secrets (p,q)=', p.toString(), q.toString());
const phiP = p.sub(ONE);
const phiQ = q.sub(ONE);
const phiN = phiP.mul(phiQ);
console.log('phi(N)=', phiN.toString());

const t = new BN('10000', 10);
const redN = BN.red(n);
const redPhiN = BN.red(phiN);
const redT = t.toRed(redPhiN);

const e = (TWO.toRed(redPhiN)).redPow(t);
console.log('e=2^t', e.fromRed().toString());
const b = TWO.toRed(redN).redPow(e.fromRed());
console.log('b=a^e', b.fromRed().toString());

console.log('\n\nSlow>>>>>>>>');

let start = (new Date()).getTime();
let res = TWO.toRed(redN);
for (let i= 1; i<=t; i++) {
  res = res.redPow(TWO);
  console.log(i, ': ', res.toString());
}
const elapsed = (new Date()).getTime() - start;
console.log('Time: ', elapsed, 'ms');
console.log('ms/squaring: ', (new BN(elapsed)).div(t).toString());

console.log('\n\nResulting key: Slow:', res.toString(), ' Fast:', b.toString());
