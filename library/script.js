let myLibrary = [];

const gallery = document.querySelector(".gallery");
const addBtn = document.querySelector(".add");

addBtn.addEventListener("click", addFilmToLibrary);

// Film constructor and prototype
function Film (title, director, genre, watched) {
    this.title = title;
    this.director = director;
    this.genre = genre;
    this.watched = watched;
}

Film.prototype.info = function() {
    if (this.watched) {
        watched = "watched"
    }
    else {
        watched = "not watched yet"
    }
    return `${this.title} by ${this.director}, ${this.genre} pages, ${this.watched}.`
}

// Existing entries
const theHobbit = new Film ("The Hobbit", "Peter Jackson", "Fantasy", true);
const StandByMe2 = new Film ("Stand By Me 2", "Takashi Yamazaki", "Fantasy", false);

myLibrary.push(theHobbit);
myLibrary.push(StandByMe2);

// Add film to library
function addFilmToLibrary() {
    let title = prompt("Title");
    let director = prompt("director");
    let genre = prompt("Genre");
    let watched = prompt("Watched");

    const newFilm = new Film(title, director, genre, watched);

    myLibrary.push(newFilm);
}

// Display films on the page
function displayFilms() {
    for (let i = 0; i < myLibrary.length; i++) {
        let card = document.createElement("div");
        let title = document.createElement("h3");
        let director = document.createElement("h4");
        let genre = document.createElement("h4");
        let rmvBtn = document.createElement("button");
        let watchBtn = document.createElement("button");

        title.textContent = myLibrary[i].title;
        director.textContent = myLibrary[i].director;
        genre.textContent = myLibrary[i].genre;
        watchBtn.textContent = watchedOrNot(myLibrary[i].watched);
        rmvBtn.textContent = "Remove";

        watchBtn.classList.add("watchState");
        watchBtn.setAttribute("value", i);

        rmvBtn.classList.add("remove");
        rmvBtn.setAttribute("value", i);

        card.classList.add("film");
        card.append(title, director, genre, rmvBtn, watchBtn);
        gallery.appendChild(card);
    }
}

function changeStatus(button) {
    let index = button.value;
    let status = myLibrary[index].watched;
    console.log(status);

    if (status) {
        status = false;
    }
    else {
        status = true;
    }
    console.log(status);
    button.textContent = watchedOrNot(status);
}

function watchedOrNot(value) {
    return (value) ? "Watched" : "Not watched";
}

function removeFilm(button) {
    console.log('hello');
    let index = button.value;
    myLibrary.splice(index, 1);
    let parentCard = button.parentElement;
    gallery.removeChild(parentCard);
}

displayFilms();

const rmvBtns = document.querySelectorAll(".remove");
const watchBtns = document.querySelectorAll(".watchState");

rmvBtns.forEach((rmvBtn) => {
    rmvBtn.addEventListener("click", () => removeFilm(rmvBtn));
})

watchBtns.forEach((watchBtn) => {
    watchBtn.addEventListener("click", () => changeStatus(watchBtn));
})
