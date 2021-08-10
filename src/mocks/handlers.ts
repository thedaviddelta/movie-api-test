import { rest } from "msw";
import { ApiResponseId, ApiResponseSearch, ApiResponseError } from "../model/ApiResponse";
import sampleFilm from "./film.json";
import sampleList from "./list.json";

type Response = ApiResponseId | ApiResponseSearch | ApiResponseError;

const handlers = [
    rest.get<{}, Response>("https://www.omdbapi.com/", (req, res, ctx) => {
        const params = req.url.searchParams;

        const id = params.get("i");

        if (id)
            return res(
                ctx.status(200),
                ctx.json(sampleFilm as typeof sampleFilm & { Response: "True" })
            );

        const query = params.get("s");
        const type = params.get("type");

        if (query && type)
            return res(
                ctx.status(200),
                ctx.json(sampleList as typeof sampleList & { Response: "True" })
            );

        return res(
            ctx.status(200),
            ctx.json({
                Response: "False",
                Error: "Incorrect IMDb ID."
            })
        );
    })
];

export default handlers;
