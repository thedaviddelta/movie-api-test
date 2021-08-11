import { FC } from "react";
import useListSearch , { SearchType, LoadingState } from "../hooks/useListSearch";
import FilmView from "./FilmView";

const Search: FC = () => {
    const { state, handleFieldChange } = useListSearch();

    return (
        <>
            <div className="searchForm">
                <input
                    type="text"
                    id="query"
                    aria-label="Query"
                    placeholder="Search..."
                    value={state.query}
                    onChange={handleFieldChange}
                />
                <select
                    id="type"
                    aria-label="Type"
                    value={state.type}
                    onChange={handleFieldChange}
                >
                    {Object.values(SearchType).map(type => (
                        <option key={type} value={type}>
                            {type[0].toLocaleUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            {state.loading === LoadingState.IDLE ? (
                <div className="searchMsg">
                    There's nothing here
                </div>
            ) : state.loading === LoadingState.PENDING ? (
                <div className="searchMsg">
                    Loading...
                </div>
            ) : state.loading === LoadingState.ERROR ? (
                <div className="searchMsg error">
                    Unexpected error: {state.error}
                </div>
            ) : (
                <div className="filmList">
                    {state.result.map(film => (
                        <FilmView key={film?.imdbid ?? film.title} {...film} />
                    ))}
                </div>
            )}
        </>
    );
};

export default Search;
