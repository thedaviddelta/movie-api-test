import { useEffect, useReducer } from "react";
import reducer, { ActionType, initialState } from "../reducers/film";

const useFilmInfo = (id: string) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${id}`)
            .then(res => {
                if (!res.ok)
                    throw new Error(`${res.status} - ${res.statusText}`);
                return res.json();
            }).then(json => {
                const { Response, Title, Poster, Year, Runtime, Director, Error } = json;
                if (Response !== "True")
                    return dispatch({ type: ActionType.ERROR, payload: { error: Error } });
                dispatch({ type: ActionType.SET, payload: { Title, Poster, Year, Runtime, Director } });
            }).catch(err => {
                dispatch({ type: ActionType.ERROR, payload: { error: err.message } });
            });
    }, [id]);

    return state;
};

export default useFilmInfo;
