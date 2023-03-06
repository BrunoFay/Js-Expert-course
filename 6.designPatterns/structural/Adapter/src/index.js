import RickAndMortyBRLAdapter from "./business/adapters/RickAndMortyBRLAdapter.js";
import RickAndMortyUSAAdapter from "./business/adapters/rickAndMortyUSAAdapter.js";

const data = [
  RickAndMortyBRLAdapter,
  RickAndMortyUSAAdapter,
].map((integration) => integration.getCharacters());

const all = await Promise.allSettled(data);
/* Promise.allSettled return object with de "status" of promise and the "value"*/
const successes = all
  .filter(({ status }) => status === "fulfilled")
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), []);

const errors = all.filter(({ status }) => status === "rejected");
console.table(successes);
console.table(errors);
