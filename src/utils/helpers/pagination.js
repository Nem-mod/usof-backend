export const getPagination = (page = 1, size = 10) => {
    const limit = size ? +size : 3;
    const offset = ( page - 1 ) * limit;

    return { limit, offset };
};


export const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: elements } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, elements, totalPages, currentPage };
};