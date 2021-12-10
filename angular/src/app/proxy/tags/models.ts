import type { AuditedEntityDto } from '@abp/ng.core';

export interface TagCreateOrUpdate {
  name: string;
  tagId: number;
}

export interface TagDto extends AuditedEntityDto<string> {
  tagId: number;
  name: string;
}
