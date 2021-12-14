export interface Characters
{
    name: string,
    height: number,
    mass: number,
    hair_color: string,
    skin_color: string,
    eye_color: string,
    birth_year: string,
    gender: string,
    homeworld: string,
    created: number | Date | string,
    edited: number | Date | string,
    url: string,
    starships?: any,
    image?: string
}