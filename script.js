/////////////////////////////////////
//
//          Pokemon API 
//
/////////////////////////////////////



let pokeBox = []; // box containing all final data


/////////////////////////////////////////////////////////////////////////////

// this function sends 2 get requests in order to obtain the final Pokemon data

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

// this function creates the sprites, browser placement, and event listeners for each Pokemon

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
                console.log(pokeBox[i].name);
            })
        }

      }, "1100");

} 

let reloadPage = async () => {
    
    setTimeout(() => {

        let pokeAmount = document.querySelectorAll('img');
        
        if(pokeAmount.length < 160) {  // if less than 160 pokemon load, refresh the page
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
