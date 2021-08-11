export type ApiResponseError = {
    Response: "False",
    Error: string
};

export type ApiResponseIdItem = {
    Title: string,
    Poster: string,
    Year: string,
    Runtime: string,
    Director: string
};

export type ApiResponseId = {
    Response: "True"
} & ApiResponseIdItem;

export type ApiResponseSearchItem = {
    imdbID: string,
    Title: string,
    Poster: string,
    Year: string
};

export type ApiResponseSearch = {
    Response: "True",
    Search: ApiResponseSearchItem[]
};
