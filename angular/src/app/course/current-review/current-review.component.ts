import { Component, OnInit } from '@angular/core';

import { ListService, PagedResultDto } from '@abp/ng.core';
import { Router,ActivatedRoute } from '@angular/router';
import { LearnDto, LearnService } from '@proxy/learns';
import { LessionService } from '@proxy/lessions';
import { Word, WordDto, WordService } from '@proxy/words';
import { Words } from '@proxy';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

@Component({
  selector: 'app-current-review',
  templateUrl: './current-review.component.html',
  styleUrls: ['./current-review.component.scss']
})
export class CurrentReviewComponent implements OnInit {
  idlesson : any;
  test : Array<testx> = new Array();
  words: Array<LearnDto> = new Array();
  currnumber : number  ;
  conlai : number ;
  currentes: testx;
  showans : false;
  state:string;
  pageDto:PagedAndSortedResultRequestDto;

  wordsForAnswers: Array<WordDto> = new Array();
  
  constructor(//public readonly list: ListService, 
   private learnService: LearnService, 
   private wordService: WordService, 
   private route: ActivatedRoute,
   private lessonService: LessionService,
   private router: Router,
    
    
  ) { }

  ngOnInit(): void {
    this.state = "unknow";
    this.idlesson =  this.route.snapshot.params.idLession;
    this.learnService.getCurrentReview().
    subscribe((data => {
     
      this.words = data;
      this.conlai = this.words.length;
      if(this.conlai == 0){
        this.state = "done";
        let s  = this.router.url.substring(0, this.router.url.length - 13);
        setTimeout(()=>{
          this.router.navigate([s]).then(() => {
            window.location.reload();
          });
          
        },2000)
      };
      console.log(this.words);
      this.pageDto = {
        sorting:"0",
        skipCount:0,
        maxResultCount:100
      }
      this.wordService.getList(this.pageDto).subscribe(( data =>{
        this.wordsForAnswers = data.items;
        console.log('dung dep ',this.wordsForAnswers);
        this.generateQuestion();
        
      }));
      
    }));
    
    
    
   
  }
  
  generateQuestion()
  {
    var len = this.words.length;
    
   
   
    
    this.words.forEach((value , index) => {
      
      
     let tmp = [...this.wordsForAnswers];

     let dapan = this.wordsForAnswers.indexOf( this.wordsForAnswers.find(x => x.id == value.wordId));

      tmp[dapan] = tmp[tmp.length -1];
      let tmpindex : number = 0;
      
    
      tmpindex = this.randomIntFromInterval(0,tmp.length-2);
      console.log(tmpindex);
      let w1 = tmp[tmpindex];
      tmp[tmpindex] = tmp[tmp.length - 2];
      
      
      tmpindex = this.randomIntFromInterval(0,tmp.length-3);
      console.log(tmpindex);
      let w2 = tmp[tmpindex];
      tmp[tmpindex] = tmp[tmp.length - 3];
      
      tmpindex = this.randomIntFromInterval(0,tmp.length-4);
      console.log(tmpindex);
      let w3 = tmp[tmpindex];
      tmp[tmpindex] = tmp[tmp.length - 4];
      
      tmpindex = this.randomIntFromInterval(0,tmp.length-5);
      console.log(tmpindex);
      let w4 = tmp[tmpindex];
      tmp[tmpindex] = tmp[tmp.length - 5];
      
      var object = {
        arr: [{
          word: w1, ans: false
        },{
          word: w2, ans: false
        },{
          word: w3, ans: false
        },{
          word: w4, ans: false
        }],
        ans: value
      };
      var x = this.randomIntFromInterval(0,3);
      object.arr[x].ans = true;
      object.arr[x].word.name = value.name;
      object.arr[x].word.vn = value.vn;
      object.arr[x].word.en = value.en;
      object.arr[x].word.id = value.wordId;
      console.log('ob',object);
      this.test.push(object);
     
    });
    this.currentes = this.test[0];
    //this.curentes = this.test[0];
    console.log('curren ', this.currentes);
    //console.log('test',this.test);
    //console.log('ob23', this.test[0]);
   // console.log('ob',this.test);
   // console.log('ob2', this.test[0]);
  }
  randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  bambne(a : number)
  {
    
    console.log(this.state)
    if(this.currentes.arr[a].ans)
    {
      this.state = "true";
      this.learnService.updateLevelLearningWordByIdwordAndB(this.currentes.ans.wordId,true).subscribe( data => {
       // console.log(data);
      });
      
    }
    else{
      this.state = "false";
      this.learnService.updateLevelLearningWordByIdwordAndB(this.currentes.ans.wordId,false).subscribe( data => {
      });
    }
    setTimeout(()=>{
      this.conlai -=1;
      this.currentes = this.test[this.test.length -this.conlai ];
      this.state = "unknow";
      if(this.conlai == 0){
        this.state = "done";
        let s  = this.router.url.substring(0, this.router.url.length - 13);
        setTimeout(()=>{
          this.router.navigate([s]).then(() => {
            window.location.reload();
          });
        },2000)
      }
    },1000)
    
    
    }
  
}
class testx {

  arr: {
    word: WordDto,
    ans: boolean
  }[] ;
  ans: LearnDto;
}