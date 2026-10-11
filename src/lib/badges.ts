export type BadgeCategory= 
  | 'sound'
  | 'smell'
  | 'sight'
  | 'taste'
  | 'people'
  | 'feeling'

  export interface badge{
    title : string,
    meaning:string , 
    category:BadgeCategory,
    quote : string
  }