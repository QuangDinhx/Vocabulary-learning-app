import type { CourseCreateUpdateDto, CourseDto, FilterCourseDto } from './models';
import { RestService } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TagDto } from '../tags/models';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiName = 'Default';

  create = (input: CourseCreateUpdateDto) =>
    this.restService.request<any, CourseDto>({
      method: 'POST',
      url: `/api/app/course`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/course/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, CourseDto>({
      method: 'GET',
      url: `/api/app/course/${id}`,
    },
    { apiName: this.apiName });

  getCoursesOfUserByText = (text: string) =>
    this.restService.request<any, ListResultDto<CourseDto>>({
      method: 'GET',
      url: `/api/app/course/coursesOfUser`,
      params: { text: text },
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<CourseDto>>({
      method: 'GET',
      url: `/api/app/course`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getListssssByTextAndFilterCourseAndNameTags = (text: string, filterCourse: FilterCourseDto, nameTags: string) =>
    this.restService.request<any, ListResultDto<CourseDto>>({
      method: 'GET',
      url: `/api/app/course/ssss`,
      params: { text: text, sortby: filterCourse.sortby, price: filterCourse.price, nameTags: nameTags },
    },
    { apiName: this.apiName });

  getTagbyIdByTagTd = (TagTd: number) =>
    this.restService.request<any, TagDto>({
      method: 'GET',
      url: `/api/app/course/tagbyId`,
      params: { tagTd: TagTd },
    },
    { apiName: this.apiName });

  update = (id: string, input: CourseCreateUpdateDto) =>
    this.restService.request<any, CourseDto>({
      method: 'PUT',
      url: `/api/app/course/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  xoaById = (id: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/course/${id}/xoa`,
    },
    { apiName: this.apiName });

  checkListTagByFilterTagAndCourseTag = (filterTag: string, courseTag: string) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/course/checkListTag`,
      params: { filterTag: filterTag, courseTag: courseTag },
    },
    { apiName: this.apiName });

  convertForAddingTagByListAndTagNames = (list: CourseDto[], tagNames: string) =>
    this.restService.request<any, CourseDto[]>({
      method: 'POST',
      url: `/api/app/course/convertForAddingTag`,
      params: { tagNames: tagNames },
      body: list,
    },
    { apiName: this.apiName });

  getListTagOfCourseFromStringByChuoi = (chuoi: string) =>
    this.restService.request<any, TagDto[]>({
      method: 'GET',
      url: `/api/app/course/getListTagOfCourseFromString`,
      params: { chuoi: chuoi },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
