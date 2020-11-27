export interface User {
    id?: number;
    name: string;
    phone: string;
    address?: string;
}

export interface Result {
    statusCode: number;
    description: string;
    data: any;
}

export interface PageResult {
    pageIndex: number;

    pageSize: number;

    total: number;

    data: any[];
}
