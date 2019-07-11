import  {Pipe, PipeTransform} from '@angular/core';
@Pipe({
    name:'filtering'
})

export class FilterPricePipe implements PipeTransform{
    transform(items:any[] , searchtext: String):any[]{
        if(!items){
            // console.log("No items");
            return [];
        }
        if(!searchtext){
            // console.log("st");
            return items;}
        return items.filter( it=>{
            let ans = false;
            if(it.price <= searchtext){
                ans = true;
            }
            return ans;
        });
    }
}