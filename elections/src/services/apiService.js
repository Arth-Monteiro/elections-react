import { read } from './httpService';
// import { getNewId } from './idService';

export async function apiGetAllCities() {
  const allFlashCards = await read('/cities');
  return allFlashCards;
}

export async function apiGetAllCandidates() {
  const candidates = await read('/candidates');
  return candidates;
}

export async function apiGetCityCandidates(cityId) {
  const candidates = await read(`/election/?cityId=${cityId}`);
  return candidates;
}
