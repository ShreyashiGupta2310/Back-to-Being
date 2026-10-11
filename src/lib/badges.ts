export const BADGE_CATEGORIES= [
   'sound',
   'smell',
   'sight',
   'taste',
   'people',
   'feeling',
] as const

export type BadgeCategory = (typeof BADGE_CATEGORIES)[number]
  export interface badge{
    title : string,
    meaning:string , 
    category:BadgeCategory,
    quote : string
  }