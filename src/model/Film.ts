export default interface Film {
    title: string,
    poster: string,
    imdbid?: string, // only needed when searched
    year?: string,
    runtime?: string,
    director?: string
}
