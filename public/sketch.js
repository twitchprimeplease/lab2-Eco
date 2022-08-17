let canvas;
let SPRITE_PATH_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'
let pokemonArray = [];
let pokeSprites = [];
let pNumber = 0;
let pokeText = 'Selecciona un Pokemon';

function preload() {
    fetchPokemonList()
}

function setup() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function draw() {
    background(0);
    newCursor();
    let x = 300
    let y = 100
    pokemonArray.forEach(element => {
        element.showName(x,y);
        y += 100
    });

    text(pokeText, 500,windowHeight/2)
    // pokeSprites.forEach(element => {
    //     if (element =! null) {
    //         image(element,100,y)
    //     }

    // })
}

function mouseClicked(){

    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function newCursor() {
    noStroke();
    fill(255);
    ellipse(pmouseX, pmouseY, 10, 10);
}

const fetchPokemonList = async () => {
    let URL = 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0'
    try { 
        let query = await fetch(URL);
        let data = await query.json();
        const { results } = data;

        let pokemon = results[0];
        let fetchedPokemon = [];
        results.forEach(element => {
            fetchedPokemon.push(element);
            
            let temporaryArray = element.url.split('/');
        element.sprite = SPRITE_PATH_URL + temporaryArray[6] + '.png';
        loadImage(element.sprite, image => {
            element.pImage = image
            pokeSprites.push(image)
        })
        });
        console.log(pokeSprites)

        let temporaryArray = pokemon.url.split('/');
        pokemon.sprite = SPRITE_PATH_URL + temporaryArray[6] + '.png';
        loadImage(pokemon.sprite, image => {
            pokemon.pImage = image
            let bulbasur = pokemon
            pokeSprites.push(pokemon.sprite)
            fetchedPokemon.forEach(element => {
                pokemonArray.push(new Pokemon(element));
            });
            
        })
    }
    catch (error) {
        console.log(error);
    }
}

async function findPokemons(id){
    let data = null;
    const pokeULR = `https://pokeapi.co/api/v2/pokemon/${id}/`
    const query = await fetch (pokeULR)
    data = await query.json()
    console.log(data)
    
}

class Pokemon {
    constructor(pokemon){
        this.pokemon = pokemon;
    }

    showName(x,y){
        fill(255);
        textSize(20)
        text(this.pokemon.name,x,y)

    }
}