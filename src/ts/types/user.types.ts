export type User = {
    id: number;
    name: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    roles: string[];
};
