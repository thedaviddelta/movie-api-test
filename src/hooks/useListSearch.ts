import { useEffect, useReducer, ChangeEvent } from "react";
import reducer, { ActionType, initialState, SearchType, LoadingState } from "../reducers/search";
import { fetchStatusErrorHandler } from "../utils/fetch";
import { ApiResponseSearch, ApiResponseError } from "../model/ApiResponse";

const useListSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            .then(fetchStatusErrorHandler)
            .then((json: ApiResponseSearch | ApiResponseError) => {
                if (json.Response !== "True")
                    return dispatch({ type: ActionType.ERROR, payload: { error: json.Error } });

                const result = json.Search.map(({ imdbID, Title, Poster, Year }) => ({ imdbID, Title, Poster, Year }));
                dispatch({ type: ActionType.RESULT, payload: { result } });
            }).catch(err => {
                dispatch({ type: ActionType.ERROR, payload: { error: err.message } });
            });
    }, [state.delayedQuery, state.type]);

    return { state, handleFieldChange };
};

export default useListSearch;

export { SearchType, LoadingState };
