import { FC } from "react";
import FilmWrapper from "./FilmWrapper";

const filmIds = [
    "tt1707386",
    "tt1375666",
    "tt0816692",
    "tt5311514",
    "tt0434409",
    "tt1485796",
    "tt3783958",
    "tt2380307",
    "tt9426210"
];

const Top: FC = () => (
    <div>
        {filmIds.map(id => (
            <FilmWrapper key={id} id={id} />
        ))}
    </div>
);

export default Top;
