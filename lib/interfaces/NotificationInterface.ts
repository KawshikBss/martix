export interface NotificationInterface {
    id: string;
    data: {
        type: string;
        title: string;
        message: string;
        priority: string;
        action_url: string;
        reference_type: string;
        reference_id: string;
    };
    read: boolean;
    created_at: string;
}
