import { Film } from './film';


export interface User {
    id?: number;
    firstname: string;
    lastname: string;
    favoritesfilm: Film[];
}