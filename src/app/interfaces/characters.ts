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
    created: string,
    edited: string,
    url: string,
    starships?: any,
    image?: string
}

// DECODE DATE
// var json = "\"2014-01-01T23:28:56.782Z\"";

// var dateStr = JSON.parse(json);  
// console.log(dateStr); // 2014-01-01T23:28:56.782Z