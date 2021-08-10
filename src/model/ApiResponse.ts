export type ApiResponseError = {
    Response: "False",
    Error: string
};

export type ApiResponseId = {
    Response: "True",
    Title: string,
    Poster: string,
    Year: string,
    Runtime: string,
    Director: string
};

export type ApiResponseSearch = {
    Response: "True",
    Search: {
        imdbID: string,
        Title: string,
        Poster: string,
        Year: string
    }[]
};
