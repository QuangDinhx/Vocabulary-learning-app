import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ListService, PagedResultDto } from '@abp/ng.core';
import { CourseService, CourseDto } from '@proxy/courses';
import { query } from '@angular/animations';
import { ServerHttpService } from '../CourseService/server-http.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [ListService],

})
export class CourseComponent implements OnInit {
  courses: [];
  constructor(public readonly list: ListService,
    private Service: ServerHttpService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.Service.getCourses().subscribe((data => {
      console.log(data);
      this.courses = data.items;
    }))
  };
  public openDialog() {
    this.dialog.open(CourseCreateComponent, {
      height: '400px',
      width: '500px',
    });
    this.Service.addMode = true;
    this.Service.idCourse = '';
    this.Service.name = '';
  }
  public openDialogEdit(id, name, userId, publishDate, price, creationTime, creatorId, listTag) {
    this.dialog.open(CourseCreateComponent, {
      height: '570px',
      width: '500px',
    });
    this.Service.addMode = false;
    this.Service.idCourse = id;
    this.Service.name = name;
    this.Service.userId = userId;
    this.Service.publishDate = publishDate;
    this.Service.price = price;
    this.Service.creationTime = creationTime;
    this.Service.creatorId = creatorId;
    this.Service.listTag = listTag;
  }
  public deleteCourse(id) {
    this.Service.deleteCourse(id).subscribe((data => {
      console.log(data);
      location.reload();
    }))
  }
}
@Component({
  selector: 'CourseCreateComponent',
  templateUrl: './CourseCreate.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseCreateComponent implements OnInit {
  @ViewChild('tagNameInput') tagNameInput: ElementRef;
  form: FormGroup;
  hide = true;
  name: '';
  password: '';
  tags = [];
  tagSelected = [];
  flags;
  tagsNames = "";
  newTags = [];
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private Service: ServerHttpService,
    private router: Router,
  ) {
  }
  ngOnInit() {
    this.name = this.Service.name;
    this.form = this.fb.group({
      name: this.name,
      password: this.password
    })
    this.getSuggestTags();
    if(this.Service.listTag){
      this.Service.listTag.forEach(e => {
        let item = {name:e.name,id:e.tagId};
        this.tagSelected.push(item);
      });
    }
  }
  public closeDialog() {
    this.dialog.closeAll();
  }
  public save() {
    this.tagSelected.forEach((e,i)=>{
      if(i == 0){
        this.tagsNames = this.tagsNames + e.id;
      }else{
        this.tagsNames = this.tagsNames + "," + e.id;
      }
    })
    if (this.Service.addMode === false) {
      this.name = this.form.controls.name.value;
      this.password = this.form.controls.password.value;
      this.Service.editCourse(
        {
          "name": this.name,
          "password": this.password,
          "userId": this.Service.userId,
          "publishDate": this.Service.publishDate,
          "price": this.Service.price,
          "creationTime": this.Service.creationTime,
          "creatorId": this.Service.creatorId,
          "tagNames": this.tagsNames
        }, this.Service.idCourse
      ).subscribe((data => {
        console.log(data);
        location.reload();
      }));
      this.newTags.forEach((e)=>{
        this.Service.addNewTags(
          {
            "name":e.name
          }
          ).subscribe((data)=>{
          console.log(data);
          
        })
      })
    } else {
      this.name = this.form.controls.name.value;
      this.password = this.form.controls.password.value;
      
      this.Service.addCourse(
        {
          "name": this.name,
          "password": this.password,
          "tagNames": this.tagsNames
        }
      ).subscribe((data => {
        console.log(data);
        
      }));
      
      this.newTags.forEach((e)=>{
        this.Service.addNewTags(
          {
            "name":e.name
          }
          ).subscribe((data)=>{
          console.log(data);
          
        })
      })
    }
  }
  public getSuggestTags(){
    this.Service.getSuggestTags().subscribe((data) => {
      if(data.items){
        this.flags = data.items.length - 1;
        data.items.forEach(e => {
          let item = {name:e.name,id:e.tagId}
          if(this.tags.length < 5){
            this.tags.push(item);
          }
        });
      }
      console.log(this.tags);
    })
  }
  public addTagSuggest(item){
    let isExist = false;
    this.tagSelected.forEach((i)=>{
      if(i.name == item.name){
        isExist = true;
      }
    })
    if(isExist == false){
      if(this.tagSelected.length < 6){
        this.tagSelected.push(item);
      }
    }
  }
  public deleteTag(item){
    if(this.tagSelected){
      this.tagSelected.splice(this.tagSelected.findIndex(x => x == item), 1);
      console.log(this.tagSelected)
    }
    if(this.newTags.find(x => x == item)){
      this.newTags.splice(this.newTags.findIndex(x => x == item), 1);
      console.log(this.newTags)
    }
  }
  public addNewTags(){
    this.flags ++;
    let item = {name:this.tagNameInput.nativeElement.value,id:this.flags}
    this.newTags.push(item);
    console.log(this.newTags);
    this.addTagSuggest(item);
  }

}

