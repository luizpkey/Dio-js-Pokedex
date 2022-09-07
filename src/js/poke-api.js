const pokeApi ={}

function convertPokeApiDetailToPoken(pokeDetail){
    const types = pokeDetail.types.map((typeSlot) =>typeSlot.type.name);
    const [type] = types;
    console.log(type)
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.home.front_default;
    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
           .then((response)=>response.json()
           .then(convertPokeApiDetailToPoken))
}
pokeApi.getPoKemons = (offset = 0, limit = 5) =>{
   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
   return fetch(url)
          .then((response) => response.json())
          .then((jsonBody) => jsonBody.results)
          .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
          .then((detailRequests)=>Promise.all(detailRequests))
          .catch(error => console.error(error));
}
