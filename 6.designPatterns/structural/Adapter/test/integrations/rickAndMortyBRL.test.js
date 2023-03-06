import { expect, describe, test, jest, beforeEach } from "@jest/globals";

import fs from "fs/promises";
import RickAndMortyBRL from "../../src/business/integrations/rickAndMortyBRL";
import Character from "../../src/entities/character";
import axios from "axios";
describe("#RickAndMortyBRL", () => {
  beforeEach(() => jest.clearAllMocks());
  test("#getCharactersJSON should resturn a list of Characters Entity", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters.json")
    );
    const expected = response.results.map((char) => new Character(char));
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
  test("#getCharactersJSON should return an empty list if the API returns nothing", async () => {
    const response = JSON.parse(
      await fs.readFile("./test/mocks/characters-empty.json")
    );
    const expected = response.results;
    jest.spyOn(axios, "get").mockResolvedValue({ data: response });
    const result = await RickAndMortyBRL.getCharactersFromJSON();

    expect(result).toStrictEqual(expected);
  });
});
