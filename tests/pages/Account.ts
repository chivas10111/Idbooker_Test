export class Account {
    private userName: string;
    private passWord: string;

    constructor(userName: string, passWord: string){
        this.userName = userName;
        this.passWord = passWord;
    }

    public getUsername(): string {
        return this.userName;
    }

    public setUsername(username: string) {
        this.userName = username;
    }

    public getPassword(): string {
        return this.passWord;
    }

    public setPassword(password: string) {
        this.passWord = password;
    }
}