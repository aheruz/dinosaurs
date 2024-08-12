// Create Dino Constructor
class Dino {
    constructor(dino) {
        this.species = dino.species;
        this.weight = dino.weight;
        this.height = dino.height;
        this.diet = dino.diet;
        this.fact = dino.fact;
        this.when = dino.when;
        this.where = dino.where;
    }
}

// Fetch Dino Data from dino.json
let dinoData; // Declare dinoData in a higher scope
fetch('dino.json')
    .then(response => response.json())
    .then(data => {
        dinoData = data.Dinos.map(dino => new Dino(dino));
    })
    .catch(error => console.error('Error fetching dino data:', error));
    
// Create Human Object
let human;

// Use IIFE to get human data from form
(function() {
    const form = document.getElementById('dino-compare');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const feet = document.getElementById('feet').value;
        const inches = document.getElementById('inches').value;
        const weight = document.getElementById('weight').value;
        const diet = document.getElementById('diet').value;

        human = {
            name: name,
            height: (parseInt(feet) * 12) + parseInt(inches),
            weight: weight,
            diet: diet
        };

        form.style.display = 'none'; // Remove form from screen
        generateTiles(); // Generate infographic
    });
})();

// Create Dino Compare Method 1
function compareWeight(dino) {
    return dino.weight > human.weight ? `${dino.species} weighs more than you.` : `${dino.species} weighs less than you.`;
}

// Create Dino Compare Method 2
function compareHeight(dino) {
    return dino.height > human.height ? `${dino.species} is taller than you.` : `${dino.species} is shorter than you.`;
}

// Create Dino Compare Method 3
function compareDiet(dino) {
    return dino.diet === human.diet ? `You and ${dino.species} have the same diet.` : `${dino.species} has a different diet than you.`;
}

// Generate Tiles for each Dino in Array
function generateTiles() {
    const grid = document.getElementById('grid');

    // Create the human tile element
    const humanTile = document.createElement('div');
    humanTile.className = 'grid-item';
    humanTile.innerHTML = `<h3>${human.name}</h3><img src="images/human.png" alt="Human">`;

    // Create an array to hold the Dino tiles
    const tiles = dinoData.map(dino => {
        const dinoTile = document.createElement('div');
        dinoTile.className = 'grid-item';
        const randomFact = getRandomFact(dino);
        dinoTile.innerHTML = `<h3>${dino.species}</h3><img src="images/${dino.species.toLowerCase()}.png" alt="${dino.species}"><p>${randomFact}</p>`;
        return dinoTile;
    });

    // Insert the human tile in the middle of the Dino tiles
    const midIndex = Math.floor(tiles.length / 2);
    tiles.splice(midIndex, 0, humanTile);

    // Append all tiles to the grid
    tiles.forEach(tile => {
        grid.appendChild(tile);
    });
}

// Get a random fact for the dino
function getRandomFact(dino) {
    if (dino.species === "Pigeon") {
       return dino.fact;
    }

    const facts = [
        dino.fact,
        compareWeight(dino),
        compareHeight(dino),
        compareDiet(dino),
        dino.when ? `This dinosaur lived during the ${dino.when}.` : '',
        dino.where ? `This dinosaur was found in ${dino.where}.` : ''
    ].filter(fact => fact);
    return facts[Math.floor(Math.random() * facts.length)];
}