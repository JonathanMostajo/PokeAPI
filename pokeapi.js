const mainDiv$$ = document.querySelector(".container");
const input$$ = document.querySelector("input");
const btnWeight$$ = document.querySelector(".weight");
let pokemons = [];
let filterPokemons = [];

const arrayPoke = () => {
  if (pokemons.length === 0) {
    for (let i = 1; i <= 151; i++) {
      const dataBase = `https://pokeapi.co/api/v2/pokemon/${i}`;
      pokemons.push(fetch(dataBase).then((res) => res.json()));
    }
  }
  Promise.all(pokemons).then((results) => {
    filterPokemons = results.filter(
      (pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(input$$.value.toLocaleLowerCase()) ||
        pokemon.id == input$$.value
    );
    printPokemons(filterPokemons);
    btnWeight$$.addEventListener("click", () => filterByWeight(pokemons));
  });
};

const printPokemons = (pokemons) => {
  mainDiv$$.innerHTML = "";
  for (const pokemon of pokemons) {
    let name = pokemon.name;
    let id = pokemon.id;
    let height = pokemon.height;
    let weight = pokemon.weight;
    let img = pokemon.sprites.other["official-artwork"]["front_default"];

    const divNameId$$ = document.createElement("div");
    const div$$ = document.createElement("div");
    const divStats$$ = document.createElement("div");
    const name$$ = document.createElement("h2");
    const id$$ = document.createElement("p");
    const img$$ = document.createElement("img");
    const height$$ = document.createElement("p");
    const weight$$ = document.createElement("p");

    name$$.textContent = name;
    id$$.textContent = id;
    img$$.setAttribute("src", img);
    height$$.textContent = height / 10 + " m";
    weight$$.textContent = weight / 10 + " kg";

    divNameId$$.classList.add("nameId");
    img$$.classList.add("images");
    divStats$$.classList.add("stats");
    div$$.classList.add("card");
    name$$.classList.add("name");
    id$$.classList.add("id");

    div$$.appendChild(divNameId$$);
    divNameId$$.appendChild(name$$);
    divNameId$$.appendChild(id$$);
    div$$.appendChild(img$$);
    divStats$$.appendChild(height$$);
    divStats$$.appendChild(weight$$);

    div$$.appendChild(divStats$$);
    mainDiv$$.appendChild(div$$);
  }
};

function filterByWeight(pokemons) {
  let weights = [];
  Promise.all(pokemons).then((results) => {
    results.filter((pokemon) => {
      pokemon.weight;
      weights.push(pokemon.weight);
    });
    sortByWeight(weights);
  });
}

const sortByWeight = (weights) => {
  weights.sort((a, b) => b - a);
  console.log(weights);

  let finalWeights = [];

  for (let i = 0; i < weights.length; i++) {
    if (i === 0) {
      finalWeights.push(weights[i])
    } else {
      if (weights[i] === weights[i-1]) {
      } else {
        finalWeights.push(weights[i])
      }
    }
  }

  let pokemonsSorted = [];

  for (let i = 0; i < finalWeights.length; i++) {
    for (let j = 0; j < filterPokemons.length; j++) {
      if (filterPokemons[j].weight === finalWeights[i]) {
        pokemonsSorted.push(filterPokemons[j]);
      }
    }
  }
  printPokemons(pokemonsSorted);
};

arrayPoke();
input$$.addEventListener("input", arrayPoke);
