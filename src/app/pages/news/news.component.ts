import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BlogsService } from '../../modules/ng-innoway/services/blogs.service';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  blogs:Observable<[any]>;

  constructor(
    public blogService: BlogsService
  ) { }

  ngOnInit() {
    this.blogs = this.blogService.getBlogs();
    this.blogs.subscribe(blogs =>{
      console.log('BLOGS',blogs);
    })
  }

}
