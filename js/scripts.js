const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonGif = document.querySelector('.poke-img');


const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let indexPokemon;

//Buscando da API
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        indexPokemon = data.id
        return data
    }

}



//Renderizando
const renderPokemon = async (pokemon) =>{

    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon)

    if(data){
        pokemonGif.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonGif.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
    }else{
        pokemonName.innerHTML = 'Not found :C'
        pokemonNumber.innerHTML = '???'
        pokemonGif.style.display = 'none'

    }
   
}
//Renderizar o primeiro quando inicia
renderPokemon('1')

//renderizar de acordo com a busca
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
    
});

//renderizar pelos botoes de prev e next
next.addEventListener('click', () =>{
    indexPokemon++;
    console.log(indexPokemon)
    renderPokemon(indexPokemon);
})

prev.addEventListener('click', () =>{
    console.log(indexPokemon)
    if(indexPokemon === 1){
        indexPokemon = 1;
        renderPokemon(indexPokemon);
    }else{
        indexPokemon--;
        renderPokemon(indexPokemon)
    }
    
})

