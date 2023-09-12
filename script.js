/////////////////////////////////////
//
//          Pokemon API 
//
/////////////////////////////////////



let pokeBox = [];   // box containing all final data that will be rendered


/////////////////////////////////////////////////////////////////////////////

// this function sends 2 get requests in order to obtain all Pokemon data needed

let pokeData = async () => {

    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=160`) 
    .then((x) => {
        
        for(let el of x.data.results) { 
            
            axios.get(el.url) // nested urls containing the final data needed
            .then((finalData) => {
               
                pokeBox[finalData.data.id] = finalData.data; // reorders pokeBox array based on pokemon's id

            })  
        }
    })
    
}

/////////////////////////////////////////////////////////////////////////////////////////////////

// this function creates the sprites, browser placement, and event listeners for each Pokemon #1 - 160

let boxCheck = async () => { 

    setTimeout(() => {

        pokeBox.shift(); // removing first blank element since no pokemon has an id of '0'
        for(let el of pokeBox) {

            let sprite = `<img src="${el.sprites.front_default}"></img>`; // creating sprites and pushing them to the DOM
            document.body.insertAdjacentHTML('beforeend', sprite);
        }

        let images = document.querySelectorAll('img'); // click listener for each sprite
        for(let i = 0; i < 160; i++) {
            images[i].addEventListener('click', () => {
                alert(`Heyy, it's ${pokeBox[i].name}!`);
            })
        }

      }, "1100");

} 

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// this function reloads the page if some pokemon do not load from the api
let reloadPage = async () => {
    
    setTimeout(() => {

        let pokeAmount = document.querySelectorAll('img');
        
        if(pokeAmount.length < 160) {  // checks if the first 160 pokemon have loaded
            location.reload();
        } else {
            null;
        }

      }, "1500");
}

//////////////////////////////////////////////////////////////////////////////////////////////////////

let process = async () => {
    
    try {
        await pokeData();
        await boxCheck();
        await reloadPage();

    } catch(err) {
        console.log(`There's been an error: ${err}`);
    }
}


process();
