const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popular.desc&api_key=c6a24b8c2d3a7a20b823ca45996d8ca1&page=1'
const API_NEW = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2022-09-01&primary_release_date.lte=2022-09-01&api_key=c6a24b8c2d3a7a20b823ca45996d8ca1&page=1'
const API_CHILD = 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=c6a24b8c2d3a7a20b823ca45996d8ca1'
const API_MOST = 'https://api.themoviedb.org/3/discover/movie?primary_release_year=2022&sort_by=vote_average.desc&api_key=c6a24b8c2d3a7a20b823ca45996d8ca1'
const API_CINEMA = 'https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&api_key=c6a24b8c2d3a7a20b823ca45996d8ca1&page=1'
const IMAGE_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=c6a24b8c2d3a7a20b823ca45996d8ca1&query="'

const form = document.querySelector('#form')
const search = document.querySelector('#search')
const main = document.querySelector('#main')

getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average,overview } = movie;

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')
        movieEl.innerHTML = `
            <img src="${IMAGE_PATH + poster_path}" alt="${title}">
            <div class="movie_info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if(searchTerm && searchTerm !== ''){
        getMovies(SEARCH_URL + searchTerm)

        search.value = ''
    }else{
        window.location.reload()
    }
})