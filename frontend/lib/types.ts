type User = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
    created_at: string;
    updated_at: string;
};

type Pagination = {
    page: number;
    per_page: number;
    total_count: number;
    total_pages: number;
};

type Conversation = {
    id: number;
    excerpt: string;
    slug: number;
    created_at: string;
    updated_at: string;
};

type Message = {
    id: number;
    message: string;
    ai: boolean;
    created_at: string;
    updated_at: string;
};

export type { User, Pagination, Conversation, Message };
