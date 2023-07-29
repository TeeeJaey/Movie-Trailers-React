// Get a full list of genres from the moviesData
export function getGenres(moviesData) {
    let genres = [];
    if (!moviesData) return [];

    for (const key in moviesData) {
        let movie = moviesData[key];
        let movieGenres = movie.EventGenre.split("|");
        if (movieGenres && movieGenres.length > 0) {
            movieGenres.forEach(movieGenre => {
                genres.push(movieGenre);
            });
        }
    }

    let setGenre = new Set(genres);
    return [...setGenre].sort();
}

// Get a full list of languages from the moviesData
export function getLanguages(moviesData) {
    let langs = [];
    if (!moviesData) return [];

    for (const key in moviesData) {
        let movie = moviesData[key];
        let movieLang = movie.EventLanguage;
        langs.push(movieLang);
    }

    let setLang = new Set(langs);
    return [...setLang].sort();
}

export const getTrailerIdFromURL = url => url.split("v=")[1].split("&")[0];

export function parseDate(showDate) {
    const date = showDate.split(" ");
    return {
        day: date[0],
        month: date[1].split(",")[0],
        year: date[2],
    };
}
