// main element in html where we put our stuff in e.g cards
const wrap = document.getElementById("wrapper");
// our sort button
const sortBtn = document.getElementById("sort");

// the data (in data.js) is currently in json format which means its a string
// to create an array of objects we use JSON.parse() on our data string
const data = JSON.parse(dataJSON);
console.log(data);

// first we create a function to create our html, why a function?
// so we can use it every time we update data in the data array (line 6)
function createHTML(){
    // make sure our innerHTML is empty before we start putting stuff in it
    // otherwise it will add to everything that was there before instead of
    // redrawing it so if we dont empty it each time the function is called
    // we get more and more cards instead of only updated ones
    wrap.innerHTML = "";
    for(let i = 0; i < data.length; i++){
        // console.log(i); // by logging i in the console we check if we get what we want/expect

        // create our content for every object in the array, you can use
        // bootstrap cards, tables or whatever you feel like
        wrap.innerHTML += `
            <div class="card">
                <h2 class="name">${data[i].name}</h2>
                <button class="like">${data[i].likes}</button>
            </div>
        `;
    }

    // we're still inside the function createHTML!!
    // after we looped through all the objects and created the html
    // we now can get the newly created buttons with their class.
    // likeBtns will be an array of html elements (the buttons we just 
    // created in the for loop)
    const likeBtns = document.getElementsByClassName("like");
    // now we can loop through them to give each of them an event listener
    // to check if we click on them
    for(let i = 0; i < likeBtns.length; i++){
        likeBtns[i].addEventListener("click", function(){
            // if we click, the likes of that object increase by 1
            // as we build the html with a loop the like btns follow
            // the same rule so likeBtns[i] is always the correct
            // btn for data[i], no need for a new loop
            data[i].likes++;
            // we can cap the number of likes to 5 in this example
            // if we click again after it is already 5 it will go back to 0
            if(data[i].likes > 5){
                data[i].likes = 0;
            }
            // print the new amount of likes to the innerHTML of our btn
            likeBtns[i].innerHTML = data[i].likes;
        });
    }
}

// add event listener to the sort button and wait for a click
sortBtn.addEventListener("click", function(){
    // to sort our array we can use the sort function that is already
    // built for us in javascript
    // in our case we could only use data.sort() without any function
    // because we only have numbers from 0-5, however, as soon as you go over
    // 9 so for example 11, it would start to do unexpected things as it doesnt
    // know the value of 11 and sees it as 1 so 
    // [1, 5, 11].sort() would result in [1, 11, 5]. but we can pass in a function
    // which we get by typing sort() and read the popup text.
    // it takes 2 arguments, a the first element in the array and b the second one
    // then we compare, in our case we want to compare the likes of each object
    // so we say a.likes and b.likes, if we say a - b it sorts ascending (0,1,2,..)
    // and if we put it as here as b - a we ged descending order (5,4,3,..)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // you can find everything in the docs, if you scroll down a bit youll find
    // "Sorting array of objects" where it goes more in-depth
    data.sort((a, b) => b.likes - a.likes);
    console.log(data);
    // and finally, call our createHTML function again to redraw the sorted array
    createHTML();
})

// call the function to draw the initial html, 
// this only runs once when the page is refreshed
createHTML();