// API Variables >>
const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

// DOM Elements >>
const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const nextBtn = document.querySelector(".next")
const previousBtn = document.querySelector(".previous")

// Global variables >>
let pageNumber = 1;
let requestedURL = '';
let lastPage = false;


// Initial Load >>
getMovies(APIURL);

// Functions >> 
async function getMovies(url) {
    const resp = await fetch(url).then(res => res.json());
    requestedURL = url;
    if (resp.page == resp.total_pages) {
        lastPage = true;
    }
    showMovies(resp.results);

}

function getClassByRate(vote) {
    if (vote > 7.5) {
        return 'green'
    } else if (vote > 6) {
        return 'orange'
    } else {
        return 'red'
    }
}

function showMovies(movies) {

    // clear the main element 
    mainEl.innerHTML = "";
    movies.forEach(movie => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        let { backdrop_path } = movie != null ? movie : false;
        let finalImagePath = '';
        if (backdrop_path) {
            finalImagePath = IMGPATH + backdrop_path;
        } else {
            finalImagePath = "https://dummyimage.com/300x170/ee4c7c/e3e2df.jpg&text=No+Image+Found"
        }

        movieEl.innerHTML = `
        <img src="${finalImagePath}" alt = "img"/>
        <div class= "movie-info">
            <h3>${movie.original_title}</h3>
            <span class= "${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
        </div> 
        <div class ="overview"> 
        <h3> Movie Overview: </h3>
        <p>${movie.overview} </p>
        </div>
        `

        mainEl.appendChild(movieEl);

    });
}

// Event listeners >> 
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    pageNumber = 1; //resetting the page number each time something new is searched.
    lastPage = false;
    const search = document.getElementById('search').value;
    const searchTerm = search.trim().length > 0 ? search.trim() : false;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        document.getElementById('search').value = '';
    }

});
nextBtn.addEventListener('click', () => {
    if (lastPage) return console.log("last Page");
    pageNumber += 1;
    let newUrl = requestedURL + "&page=" + pageNumber;
    getMovies(newUrl);
})
previousBtn.addEventListener('click', () => {
    pageNumber -= 1;
    if (pageNumber <= 0) {
        return pageNumber = 1;
    }
    let newUrl = requestedURL + "&page=" + pageNumber;
    getMovies(newUrl);
})