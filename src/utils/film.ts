import Film from "../model/Film";
import { ApiResponseIdItem, ApiResponseSearchItem } from "../model/ApiResponse";

export const parseFilmKeys = (item: ApiResponseIdItem | ApiResponseSearchItem): Film => {
    const itemEntries = Object.entries(item);
    const mappedEntries = itemEntries.map(([key, value]) => [key.toLocaleLowerCase(), value]);
    return Object.fromEntries(mappedEntries);
};
