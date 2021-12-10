import { mapEnumToOptions } from '@abp/ng.core';

export enum price {
  lowTohigh = 0,
  highTolow = 1,
}

export const priceOptions = mapEnumToOptions(price);
