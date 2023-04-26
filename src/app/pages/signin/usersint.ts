export interface UsersInt {
  uid: string; //user unique id, required
  uemail: string; //user email
  upass: string; //user password
  ualias: string; //user nickname
  ucountry: string; //user password
  uregpip: string; //user public ip when signed up
  uregdate: string; //user date when signed up
  urolecod: string; //user role or profile code, required, = 'admin' | 'standar' | 'moderator' | 'anon' | 'upaid'
}
