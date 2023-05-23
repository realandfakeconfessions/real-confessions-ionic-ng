export interface ConfessionsInt {
  clanguage: string; // object Language
  ctitle: string; // confession title
  cisreal: boolean; // confession real(true) or fake(false)
  ccategory: string; // object Category
  ctext: string; // confession text
  cdate: string; // confession date
  curltext: string; // confession .txt file
  curlaudio: string; // confession .wav file
  converteds1: boolean; // true converteds1, false not
  converteds2: boolean; // true converteds2, false not
  cuid: string; //the user owner of the confession
}
