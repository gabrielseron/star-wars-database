import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http'
import { Characters } from '../interfaces/characters';
@Injectable({
  providedIn: 'root'
})

export class SwapiService
{
  // url: string = "https://swapi.dev/api/"
  url: string = "https://www.swapi.tech/api/"
  characterList: object[] = []
  character_page: number
  constructor
  (
    private http: HttpClient,
  ) { }

  // request swapi.dev

  // getAllCharacters()
  // {
  //   return new Promise((resolve, reject) =>
  //   {
  //     this.http.get(this.url + 'people/').subscribe((data: any) => 
  //     {
  //       if(data.count % 10 == 0)
  //         this.character_page = data.count/10
  //       else
  //         this.character_page = Math.floor(data.count/10) + 1
        
  //       for (let i = 0; i < this.character_page; i++)
  //       {
  //         this.http.get(this.url + 'people/?page=' + (i+1)).subscribe((data: any) => 
  //         {
  //           for (let i = 0; i < data.results.length; i++)
  //           {
  //             this.characterList.push({name: data.results[i].name, url: data.results[i].url})
  //           }
  //         })
  //       }
  //       resolve(this.characterList)
  //     }, ((error : HttpErrorResponse) => reject(error)))
  //   })
  // }

  // getCharacter(url: string)
  // {
  //   return new Promise((resolve, reject)=>
  //   {
  //     this.http.get(url).subscribe((data: any) => 
  //     {
  //       let starshipList = []
  //       if (data.starships.length != 0)
  //       {
  //         for (let i = 0; i < data.starships.length; i++)
  //         {
  //           this.http.get(data.starships[i]).subscribe((data: any) => 
  //           {
  //             starshipList.push(data.name)
  //           })
  //         }
  //       }
  //       console.log(starshipList);
  //       const selectedCharacter : Characters =
  //       {
  //         name: data.name,
  //         height: data.height,
  //         mass: data.mass,
  //         hair_color: data.hair_color,
  //         skin_color: data.skin_color,
  //         eye_color: data.eye_color,
  //         birth_year: data.birth_year,
  //         gender: data.gender,
  //         homeworld: data.homeworld,
  //         created: Date.parse(data.created),
  //         edited: Date.parse(data.edited),
  //         url: data.url,
  //         starships: starshipList
  //       }
  //       resolve(selectedCharacter)
  //     }, ((error : HttpErrorResponse) => reject(error)))
  //   })
  // }

    // request swapi.tech

  getAllCharacters()
  {
    return new Promise((resolve, reject) =>
    {
      this.http.get(this.url + 'people/?page=1&limit=100').subscribe((data: any) => 
      {
        for (let i = 0; i < data.results.length; i++)
        {
          this.characterList.push({name: data.results[i].name, url: data.results[i].url})
        }
      }, ((error : HttpErrorResponse) => reject(error)))
      resolve(this.characterList)
    })
  }


  getCharacter(url: string)
  {
    return new Promise((resolve, reject)=>
    {
      this.http.get(url).subscribe((data: any) => 
      {
        data = data.result.properties
        const selectedCharacter : Characters =
        {
          name: data.name,
          height: data.height,
          mass: data.mass,
          hair_color: data.hair_color,
          skin_color: data.skin_color,
          eye_color: data.eye_color,
          birth_year: data.birth_year,
          gender: data.gender,
          homeworld: data.homeworld,
          created: Date.parse(data.created),
          edited: Date.parse(data.edited),
          url: data.url,
        }
        resolve(selectedCharacter)
      }, ((error : HttpErrorResponse) => reject(error)))
    })
  }
}