import { Component, OnInit } from '@angular/core';
import {  LearnService } from '@proxy/learns';

@Component({
  selector: 'app-review-button',
  templateUrl: './review-button.component.html',
  styleUrls: ['./review-button.component.scss']
})
export class ReviewButtonComponent implements OnInit {
  reviews;
  constructor(private learnService: LearnService ) { }

  ngOnInit(): void {
    this.learnService.getCurrentReview().subscribe((data)=>{
      this.reviews = data.length;
      console.log(this.reviews);
      
    })
  }

}
