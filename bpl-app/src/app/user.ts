export class User {

    constructor(
        public email: string,
        public username: string,
        public password: string,
        public cpassword: string,
        public squestion: string,
        public dob: string,
        public name: string,
        public gender: string,
        public alias?: string,
        public blood?: string,
        public mob?: string,
        public alt?: string,
        public locality?: string,
        public city?: string,
        public state?: string
    ) { }

}