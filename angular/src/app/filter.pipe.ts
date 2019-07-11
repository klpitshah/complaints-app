import  {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name:'filter'
})

export class FilterPipe implements PipeTransform{
    transform(items:any[],searchtext: String):any[]{
        if(!items){
            console.log("No items");
            return [];
        }
        if(!searchtext){
            return items;}
        console.log("serach text " + searchtext);    
        searchtext = searchtext.toLocaleLowerCase();
        return items.filter( it=>{
            return it.complainName.toLocaleLowerCase().includes(searchtext.toLocaleLowerCase());
        });
    }
}