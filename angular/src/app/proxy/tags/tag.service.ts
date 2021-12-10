import type { TagCreateOrUpdate, TagDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  apiName = 'Default';

  create = (input: TagCreateOrUpdate) =>
    this.restService.request<any, TagDto>({
      method: 'POST',
      url: `/api/app/tag`,
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/tag/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TagDto>({
      method: 'GET',
      url: `/api/app/tag/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: PagedAndSortedResultRequestDto) =>
    this.restService.request<any, PagedResultDto<TagDto>>({
      method: 'GET',
      url: `/api/app/tag`,
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: TagCreateOrUpdate) =>
    this.restService.request<any, TagDto>({
      method: 'PUT',
      url: `/api/app/tag/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  xoaByName = (name: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/tag/xoa`,
      params: { name: name },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
