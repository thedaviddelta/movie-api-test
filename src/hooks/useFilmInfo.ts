import { useEffect, useReducer } from "react";
import reducer, { ActionType, initialState, LoadingState } from "../reducers/film";
import { fetchStatusErrorHandler } from "../utils/fetch";
import { ApiResponseId, ApiResponseError } from "../model/ApiResponse";

const useFilmInfo = (id: string) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        dispatch({ type: ActionType.LOADING });

        fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`)
            .then(fetchStatusErrorHandler)
            .then((json: ApiResponseId | ApiResponseError) => {
                if (json.Response !== "True")
                    return dispatch({ type: ActionType.ERROR, payload: { error: json.Error } });

                const { Title, Poster, Year, Runtime, Director } = json;
                dispatch({ type: ActionType.SET, payload: { film: { Title, Poster, Year, Runtime, Director } } });
            }).catch(err => {
                dispatch({ type: ActionType.ERROR, payload: { error: err.message } });
            });
    }, [id]);

    return state;
};

export default useFilmInfo;

export { LoadingState };
