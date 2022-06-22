
const cards = document.getElementById('cards');

const searchBar = document.getElementById("bar");
let display_breeds = [];
console.log(searchBar);

searchBar.addEventListener("keyup", (e) => {
  console.log(e.target.value);

  const searchstring = e.target.value;
  const breedsfiltered = display_breeds.filter((dogs) => {
    return ( (`(${dogs.breed_group})`).toLowerCase().includes(searchstring) || 
    (`(${dogs.name})`).toLowerCase().includes(searchstring)
    );
  });
  displaybreeds(breedsfiltered);
  // console.log(itemfiltered);
});


const loadbreeds = async () =>{
  try{
    const res = await fetch("https://api.thedogapi.com/v1/breeds/");
    display_breeds = await res.json();
    displaybreeds (display_breeds);
    console.log(display_breeds);
  }catch(err){
    console.log(err);
  }
};



var displaybreeds = (dogs) => {
  const htmlString = dogs
        .map((dogs) =>{
          return `
            <div id="breeds">
            <img
                src=${dogs.image.url}
                alt=""
                srcset=""
                id="images"
              />
              <div id = "content">
              <h1 id="name">${dogs.name}</h1>
              <h3 id="breed_group">${dogs.breed_group}</h3>
              <h3 id="weight">${dogs.weight.imperial}</h3>
            <h3 id="breed_for">Breed-for : ${dogs.bred_for} </h3>
              <p id="temperament">
                ${dogs.temperament}
              </p>
              <h3 id="origin">Life_span : ${dogs.life_span} </h3></div>
            </div>
          `;
        })
        .join('');
        cards.innerHTML = htmlString;

};

loadbreeds();

