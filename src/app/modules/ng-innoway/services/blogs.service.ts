import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var innoway:any;

@Injectable()
export class BlogsService {

  blogs: Observable<[any]>;

  constructor() { 

  }

  getBlogs(){
    if(this.blogs) return this.blogs;
    this.blogs = new Observable(ob=>{
      innoway.Customer.getAllBlogs((err,data)=>{
        if(err){
          ob.error(err);
        }else{
          ob.next(data);
        }
      });
    })
    return this.blogs;
  }

}
