export const fetchStatusErrorHandler = (res: Response) => {
    if (!res.ok)
        throw new Error(`${res.status} - ${res.statusText}`);
    return res.json();
};
