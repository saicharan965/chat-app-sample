export interface Message {
    user: User,
    message: string
}

export interface User {
    userName: string,
    phoneNumber: string
}

export interface socketData {
    user?: string,
    room?: string,
    message?: string
}

export interface ChatMessage {
    message_id: string,
    room_id: string,
    sender_id: string,
    receiver_id: string,
    timestamp: string,
    content: string,
}

export interface LoggedInUserChat {
    user_id: string,
    username: string,
    last_login: string,
    chat_messages: ChatMessage[]
}