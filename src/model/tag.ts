// export interface tagList {
//   code: number;
//   msg: string;
//   data: tag[];
// }
export interface tag {
  tagName: string;
  tagId: number;
  tagCover: string;
}
export interface tagList {
  code: number;
  data: Array<tag>;
}
