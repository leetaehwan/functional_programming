const log = console.log

const L = {};
L.map = function *(f, iter) {
  for (const a of iter) {
    yield f(a);
  };
};

var it = L.map(a => a +10, [1,2,3]);

log(it.next());
log(it.next()); 
log(it.next());

// L.filter

L.filter = function *(f, iter) {
  for (const a of iter) if (f(a)) yield a;
};
var it = L.filter(a => a % 2, [1,2,3,4])
log(it.next());
log(it.next());