
/////////////////////////////////////
//
//          Pokemon API 
//
/////////////////////////////////////


let pokeBox = [];


fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=160`) // api address
.then((data) => {

    data.json().then((processedData) => {

        for(let el of processedData.results) { // loops through obtained array of data for a url containing Pokemon data
            
            fetch(el.url) // using obtained url to fetch pokedata
            .then((pokeData) => {
                
                pokeData.json().then((x) => { // grabs the json portion for the pokedata
                    pokeBox.push(x); // pushes data to pokeBox array as an object
                })
            })
        }

    });

})
.then(() => {

    setTimeout(() => {   // I added a time delay to give the api call time to complete
    
        for(let el of pokeBox) {
            document.querySelector('.container').insertAdjacentHTML('beforeend', `<img src="${el.sprites.front_default}"></img>`) // adds the obtained sprites
        }

        let images = document.querySelectorAll('img');

        for(let i = 0; i < 160; i++) {
            images[i].addEventListener('click', () => { // adding click listeners to all the images
                console.log(`It's ${pokeBox[i].name}!`);
            })
        }
        
      }, "1500"); 

})
