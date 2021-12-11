import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Characters } from '../interfaces/characters';
@Injectable({
  providedIn: 'root'
})

export class SwapiService
{
  url: string = "https://swapi.dev/api/"
  characterList: object[] = []
  character_page: number
  constructor
  (
    private http: HttpClient,
  ) { }
  

  getAllCharacters()
  {
    return new Promise((resolve) =>
    {
      this.http.get(this.url + 'people/').subscribe((data: any) => 
      {
        if(data.count % 10 == 0)
          this.character_page = data.count/10
        else
          this.character_page = Math.floor(data.count/10) + 1
        
        for (let i = 0; i < this.character_page; i++)
        {
          this.http.get(this.url + 'people/?page=' + (i+1)).subscribe((data: any) => 
          {
            for (let i = 0; i < data.results.length; i++)
            {
              this.characterList.push({name: data.results[i].name, url: data.results[i].url})
            }
          })
        }
        resolve(this.characterList)
      })
    })
  }

  getCharacter(url: string)
  {
    return new Promise((resolve)=>
    {
      this.http.get(url).subscribe((data: any) => 
      {
        let starshipList = []
        if (data.starships.length != 0)
        {
          for (let i = 0; i < data.starships.length; i++)
          {
            this.http.get(data.starships[i]).subscribe((data: any) => 
            {
              starshipList.push(data.name)
            })
          }
        }
        console.log(starshipList);
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
          created: data.created,
          edited: data.edited,
          url: data.url,
          starships: JSON.stringify(starshipList)
        }

        console.log(selectedCharacter); // 2014-01-01T23:28:56.782Z
        resolve(selectedCharacter)
      })
    })
  }
}