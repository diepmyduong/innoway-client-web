import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fb-layout',
  templateUrl: './fb-layout.component.html',
  styleUrls: ['./fb-layout.component.css']
})
export class FbLayoutComponent implements OnInit {

  constructor(
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit() {

  }

}
