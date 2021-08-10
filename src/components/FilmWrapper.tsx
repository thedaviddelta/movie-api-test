import { FC } from "react";
import useFilmInfo, { LoadingState } from "../hooks/useFilmInfo";
import FilmView from "./FilmView";

type Props = {
    id: string
};

const FilmWrapper: FC<Props> = ({ id }) => {
    const state = useFilmInfo(id);

    return state.loading === LoadingState.PENDING ? (
        <div>Loading...</div>
    ) : state.loading === LoadingState.ERROR ? (
        <div>Unexpected error: {state.error}</div>
    ) : (
        <FilmView {...state.film} />
    );
};

export default FilmWrapper;
