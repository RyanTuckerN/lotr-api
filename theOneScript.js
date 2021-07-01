const baseUrl = "https://the-one-api.dev/v2";
const headers = {
  Accept: "application/json",
  Authorization: "Bearer TdVcTeNZdQwVZGbmxbr5",
};

// *** *** ENDPOINTS *** *** //

const movie = "/movie";
const book = "/book";
const character = "/character";

// *** *** DOM *** *** //

const triviaSection = document.querySelector("#lotr-trivia");
const buttonsSection = document.querySelector("#buttons");
const trivia = document.createElement("p");
const attribution = document.createElement("p");

// *** *** FETCH *** *** //

async function lotrFetch() {
  //////// MOVIES FETCH //////////
  const movieResult = await fetch(baseUrl + movie, { headers: headers });
  const movieObj = await movieResult.json();
  const moviesArr = movieObj.docs;
  // console.log("movies: ", moviesArr);

  ///////// QUOTES FETCH //////////
  const quoteResult = await fetch(baseUrl + "/quote", { headers: headers });
  const quoteObj = await quoteResult.json();
  const quotesArr = quoteObj.docs;
  console.log("quotes: ", quotesArr);

  // //////// CHAR FETCH ////////////
  const charResult = await fetch(baseUrl + character, { headers: headers });
  const charObj = await charResult.json();
  const charactersArr = charObj.docs;
  // console.log("characters: ", charactersArr);

  const charIdentifier = (charId) => {
    for (let char of charactersArr) {
      if (charId === char._id) {
        return char.name;
      }
    }
  };

  const movieIdentifier = (movieId) => {
    for (let movie of moviesArr) {
      if (movieId === movie._id) {
        return movie.name;
      }
    }
  };

  //VARIABLES

  const quoteMultiplier = Math.round(Math.random() * 999);
  const quote = quotesArr[quoteMultiplier];
  const quoteDialog = quote.dialog; //content of the quote
  const quoteChar = quote.character; //who said it (ID)
  const quoteMovie = quote.movie; //what movie it is from (ID)

  //DOM

  const fellowship = document.createElement("BUTTON");
  fellowship.setAttribute("id", "fellowship");
  fellowship.innerText = "The Fellowship of the Ring";
  fellowship.addEventListener("click", () => {
    if (movieIdentifier(quoteMovie) === "The Fellowship of the Ring") {
      if (!alert("You got it right!")) {
        window.location.reload();
      }
    } else {
      alert("Wrong! Don't be hasty next time!");
    }
  });
  const towers = document.createElement("button");
  towers.setAttribute = ("id", "towers");
  towers.innerText = "The Two Towers";
  towers.addEventListener("click", () => {
    if (movieIdentifier(quoteMovie) === "The Two Towers ") {
      if (!alert("You got it right!")) {
        window.location.reload();
      }
    } else {
      alert("Wrong! Don't be hasty next time!");
    }
  });
  const rotk = document.createElement("button");
  rotk.innerText = "The Return of the King";
  rotk.setAttribute = ("id", "rotk");
  rotk.addEventListener("click", () => {
    if (movieIdentifier(quoteMovie) === "The Return of the King") {
      if (!alert("You got it right!")) {
        window.location.reload();
      }
    } else {
      alert("Wrong! Don't be hasty next time!");
    }
  });

  trivia.innerText = ` "  ${quoteDialog.replace(/\s+/g, ' ').trim()}  "`;
  trivia.setAttribute("id", "quotation");
  attribution.innerText = `-${charIdentifier(quoteChar)}`;
  attribution.setAttribute("id", "attribution");
  triviaSection.appendChild(trivia);
  triviaSection.appendChild(attribution);
  buttonsSection.appendChild(fellowship);
  buttonsSection.appendChild(towers);
  buttonsSection.appendChild(rotk);

  // console.log(movieIdentifier(quoteMovie))
}

lotrFetch();

/* Plan:
1. Push button to Display a quote, with attribution
2. Have a way for user to select a movie (guess which movie the quote is from)
3. If they get it right, add a point to correct. wrong? add point to incorrect
4. 
*/
