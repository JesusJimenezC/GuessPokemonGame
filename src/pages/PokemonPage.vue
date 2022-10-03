<template>
  <h1 v-if="!pokemon">Loading...</h1>

  <div v-else>
    <h1>Who is this Pokemon?</h1>

    <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
    <PokemonOptions :pokemons="pokemonsArr" @selection-pokemon="checkAnswer"/>

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newPokemonGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from '../components/PokemonPicture.vue'
import PokemonOptions from '../components/PokemonOptions.vue'

import getPokemonsOptions from "../helpers/getPokemonOptions.js";

export default {
  components: {
    PokemonPicture,
    PokemonOptions
  },
  data() {
    return {
      pokemonsArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: ''
    }
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonsArr = await getPokemonsOptions();
      const rndInt = Math.floor(Math.random() * this.pokemonsArr.length);
      this.pokemon = this.pokemonsArr[rndInt];
    },
    checkAnswer(pokemon) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (pokemon === this.pokemon.id) {
        this.message = `Correct! It's ${this.pokemon.name}!`;
      } else {
        this.message = `Wrong answer! The pokemon was ${this.pokemon.name}!`;
      }
    },
    newPokemonGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonsArr = [];
      this.pokemon = null;
      this.mixPokemonArray();
    }
  },
  created() {
    this.mixPokemonArray();
  }
}
</script>