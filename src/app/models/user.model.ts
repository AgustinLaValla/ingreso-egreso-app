export class User{
    public nombre?:string;
    public email: string;
    public password?: string;
    public uid?: string;
    public photoURL: string;

    constructor(userObj: UserInterface){
        this.nombre = userObj && userObj.nombre || null;
        this.email = userObj && userObj.email || null;
        this.password = userObj && userObj.password || null;
        this.uid = userObj && userObj.uid || null;
        this.photoURL = userObj && userObj.photoURL || null;
    }
}

export interface UserInterface { 
    nombre?: string;
    email:string;
    password?:string;
    uid?:string;
    photoURL?: string;
}