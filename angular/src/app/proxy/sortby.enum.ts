import { mapEnumToOptions } from '@abp/ng.core';

export enum sortby {
  a_z = 0,
  z_a = 1,
}

export const sortbyOptions = mapEnumToOptions(sortby);
