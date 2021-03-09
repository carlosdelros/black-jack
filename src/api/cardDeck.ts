import { BASE_URL } from '../constants'

export async function getNewShuffledDeckFn() {
  const res = await fetch(`${BASE_URL}/new/shuffle`);
  return res.json();
}

export async function drawCardsFn(deckId: string, n = '1') {
  const res = await fetch(`${BASE_URL}/${deckId}/draw/?count=${n}`);
  return res.json();
}
