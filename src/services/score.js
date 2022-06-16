const score = {
  A: 1,
  B: 3,
  C: 2,
  Ç: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 4,
  H: 4,
  I: 1,
  J: 5,
  L: 2,
  M: 1,
  N: 3,
  O: 1,
  P: 2,
  Q: 6,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  X: 8,
  Z: 8,
};

export function get(letter) {
  return score[letter];
}
