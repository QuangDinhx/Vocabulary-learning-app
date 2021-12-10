import type { AuditedEntityDto } from '@abp/ng.core';
import type { TagDto } from '../tags/models';
import type { sortby } from '../sortby.enum';
import type { price } from '../price.enum';

export interface CourseCreateUpdateDto {
  name: string;
  password: string;
  publishDate: string;
  userId: string;
  price: number;
  tagNames: string;
}

export interface CourseDto extends AuditedEntityDto<string> {
  name: string;
  userId: string;
  authorName: string;
  publishDate: string;
  lessonNumber: number;
  price: number;
  listTag: TagDto[];
}

export interface FilterCourseDto {
  sortby: sortby;
  price: price;
}
