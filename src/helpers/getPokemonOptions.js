import pokemonApi from "../api/pokemonApi.js";

const getPokemons = () => {
  const pokemonsArray = Array.from({ length: 650 });
  return pokemonsArray.map((_, index) => index + 1);
};

const getPokemonsOptions = async () => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5);
  return await getPokemonNames(mixedPokemons.slice(0, 4));
};

const getPokemonNames = async ([a, b, c, d] = []) => {
  const [p1, p2, p3, p4] = await Promise.all([
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]);

  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
};

export default getPokemonsOptions;
