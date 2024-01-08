export interface ParamsForGetAllTasks {
    filters?: Filters;
    actualPage?: number | 0;
    limit?: number | 10;
    sort?: string | 'ASC';
    order?: string;
}

export interface Filters {
    name?: string;
    title?: string;
    date: any;
}