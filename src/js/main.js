
const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 5;
let offset =0;


function loadPokemonItens(offset,limit){
    function convertPokemonTypesToLI(pokemonTypes) {
        return pokemonTypes.map((type)=> `<li class="${type} type">${type}</li>`)
     } 
     
     function convertPokemonToLI(pokemon){
         return `
         <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${convertPokemonTypesToLI(pokemon.types).join('')}
                </ol>
                <img src=${pokemon.photo}
                   alt="${pokemon.name}">
            </div>
         </li>
         `
     }
     
    pokeApi.getPoKemons(offset,limit).then( (pokemons =[]) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLI).join('');
       })
    
}

loadPokemonItens(offset,limit)

loadMoreButton.addEventListener('click', ()=>{
    offset+=limit;
    loadPokemonItens(offset, limit);
})