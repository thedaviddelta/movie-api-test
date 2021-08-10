import { useEffect, useReducer, FC, ChangeEvent } from "react";
import reducer, { ActionType, initialState, SearchType, LoadingState } from "../reducers/search";
import FilmView from "./FilmView";
import { ApiResponseSearch, ApiResponseError } from "../model/ApiResponse";

const Search: FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch({
            type: ActionType.SET_FIELD,
            payload: {
                key: e.target.id,
                value: e.target.value
            }
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => (
            dispatch({ type: ActionType.SET_FIELD, payload: { key: "delayedQuery", value: state.query } })
        ), 1000);
        return () => clearTimeout(timeout);
    }, [state.query]);

    useEffect(() => {
        if (!state.delayedQuery)
            return dispatch({ type: ActionType.EMPTY });

        dispatch({ type: ActionType.LOADING });

        fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${state.delayedQuery}&type=${state.type}`)
            .then(res => {
                if (!res.ok)
                    throw new Error(`${res.status} - ${res.statusText}`);
                return res.json();
            }).then((json: ApiResponseSearch | ApiResponseError) => {
                if (json.Response !== "True")
                    return dispatch({ type: ActionType.ERROR, payload: { error: json.Error } });

                const result = json.Search.map(({ imdbID, Title, Poster, Year }) => ({ imdbID, Title, Poster, Year }));
                dispatch({ type: ActionType.RESULT, payload: { result } });
            }).catch(err => {
                dispatch({ type: ActionType.ERROR, payload: { error: err.message } });
            });
    }, [state.delayedQuery, state.type]);

    return (
        <div>
            <div>
                <input
                    type="text"
                    id="query"
                    aria-label="Query"
                    placeholder="Search..."
                    value={state.query}
                    onChange={handleChange}
                />
                <select
                    id="type"
                    aria-label="Type"
                    value={state.type}
                    onChange={handleChange}
                >
                    {Object.values(SearchType).map(type => (
                        <option key={type} value={type}>
                            {type[0].toLocaleUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {state.loading === LoadingState.PENDING ? (
                <div>Loading...</div>
            ) : state.loading === LoadingState.ERROR ? (
                <div>Unexpected error {state.error}</div>
            ) : state.loading === LoadingState.SUCCESS ? (
                state.result.map(film => (
                    <FilmView key={film?.imdbid ?? film.title} {...film} />
                ))
            ) : null}
        </div>
    );
};

export default Search;
