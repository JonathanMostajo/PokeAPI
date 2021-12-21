const mainDiv$$ = document.querySelector(".container");
/* const url$$ = `https://pokeapi.co/api/v2/pokemon/${i}`; */

const arrayPoke = () => {
pokemons = []

for (let i = 1; i <= 151; i++) {
  const dataBase = `https://pokeapi.co/api/v2/pokemon/${i}`;
  pokemons.push(fetch(dataBase).then((res) => res.json()));
}
Promise.all(pokemons).then((results) => {
  printPokemons(results);
});
};


const printPokemons = (pokemons) => {
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
    height$$.textContent = height/10 + " m";
    weight$$.textContent = weight/10 + " kg";

    divNameId$$.classList.add('nameId')
    img$$.classList.add("images");
    divStats$$.classList.add("stats");
    div$$.classList.add("card");
    name$$.classList.add('name')
    id$$.classList.add('id')

    div$$.appendChild(divNameId$$)
    divNameId$$.appendChild(name$$);
    divNameId$$.appendChild(id$$);
    div$$.appendChild(img$$);
    divStats$$.appendChild(height$$);
    divStats$$.appendChild(weight$$);

    div$$.appendChild(divStats$$);
    mainDiv$$.appendChild(div$$);
  }
};

arrayPoke();