export interface IPhoto {
    _id: string;
    createdAt: string;
    usersLiked: string[];
    likes: number;
    title: string;
    description: string;
    imageUrl: string;
    owner: string;
    __v: number;
}