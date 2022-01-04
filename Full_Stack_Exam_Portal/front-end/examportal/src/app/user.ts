export class User {
    username: string='';
    password: string='';
    firstName: string='';
    lastName: string='';
    email: string='';
    phone: string='';
    profile: string='';
    id : number=0;
    authorities : Array<any>= [{authority : ''}];
    enabled : boolean = false;
}

