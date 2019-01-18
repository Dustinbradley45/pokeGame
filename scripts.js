//Purpose: Create a game that randomly appends Pokemon stats to one side of the screen; user then has to guess the pokemon and evaluates the answer to either true or false. Photo pops up regardless on the left screen(see API) and if correct, display a message; ELSE display a sorry, try again message.

//1. USE POKEAPI to pull an array of objects

//create function variable for what starts;
const thisGame = {
    currentAnswer: {},

};
    //use variable.init()
    thisGame.ranNum = function (min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
   
    
    
thisGame.fetchData = function (randomPokeId) {
    //Create array from data gained from the API
    //Generate random Number
    
    $.ajax({
        url: `https://pokeapi.co/api/v2/pokemon/${randomPokeId}/`,
        method: 'GET',
        dataType: 'json'
    }).then(function (currentAnswer) {  
        thisGame.currentAnswer = currentAnswer;
        thisGame.showPokeData();
    })    
}

thisGame.showPokeData = function () { 
    // Adds data to the one screen
    $('.pokeDataScreen').html(`<ul class='pokemonInfo'>
    <li><p>Pokemon Identification Number: ${thisGame.currentAnswer.id}</p></li>
    <li><p>Pokemon Name:${thisGame.currentAnswer.name}</p></li>
    <li><p>Pokemon Type: ${thisGame.currentAnswer.types[0].type.name}</p></li>
    </ul>`);

}

thisGame.showPokeAnswer = function() { 
    $('.answerScreen').html(`
    <ul class='pokeAnswer'>
    <li>
    <p>Pokemon Name: ${thisGame.currentAnswer.name}</p>
    </li>
    <li>
    <img src='${thisGame.currentAnswer.sprites.front_default}'>
    </li>
    </ul>`)
    
}

thisGame.restartSystem = function () { 
    //Remove from answer Object
    delete thisGame.currentAnswer
    //Remove appended text
     $('.answerScreen').empty();
    $('.pokeDataScreen').empty();
    $('.userInputBox').val('');
   
    //create new object
    thisGame.currentAnswer = {};
}



thisGame.tryAgain = function () {
    $('.tryAgainButton').on('click', function () {
        thisGame.restartSystem();
        thisGame.init();

    });

}

    
thisGame.setUpEventListeners = function () {
    
    $('.startGame').on('click', function () {
        thisGame.showPokeData();
        //Removes instruction screen
        $('.instructions').addClass('visually-hidden');
    }); 
    
    //On submit, should check answer and ring either true or false; if tr
    $('.userSubmit').on('click', function () {
        let userAnswer = $('.userInputBox').val();

       
        
        if (userAnswer.toLowerCase() === thisGame.currentAnswer.name) {
            $('.answerScreen').html(
                `<h3>Yes! You caught ${thisGame.currentAnswer.name}.</h3> 
                 <img src='${thisGame.currentAnswer.sprites.front_default}'>
               <button class='tryAgainButton'>Play Again!</button>
                `)
            thisGame.tryAgain();
        } else {
            $('.answerScreen').html(
                `<h3>Darn! ${thisGame.currentAnswer.name} got away!</h3>
                    <img src='${thisGame.currentAnswer.sprites.front_default}'>
                    <button class='tryAgainButton'>Try Again!</button>
                    `)
            thisGame.tryAgain();  
        }         
    })
}    
                    


$(function () { 
    thisGame.init();
})
        
thisGame.init = function () {
    let randomPokeId = thisGame.ranNum(1, 900);
    thisGame.fetchData(randomPokeId);
    thisGame.setUpEventListeners(); 
    // thisGame.tryAgain();

}


        
       
    
 
    
    

    // add an init function that calls fetchData (you have to write this function and it will make your request)
    // add another function called setUpEventListeners 
    // create a namespace object -> when i fetch my data, store the data on a property in my namespace



// tiffs simple exampple:
// const app = {}

// app.custommethodexample = () {

// }

// app.init = () => {
//     // event handlers 
//     // onClick
// }

// $(docready){
//     app.init();
// }