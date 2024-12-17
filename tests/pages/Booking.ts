export class Booking {
private phoneNumber: string;
private customerName: string;

constructor(phoneNumber: string, customerName: string){
    this.phoneNumber = phoneNumber;
    this.customerName = customerName;
}

public getPhoneNumber(): string {
    return this.phoneNumber;
}

public setPhoneNumber(phonenumber: string) {
    this.phoneNumber = phonenumber;
}

public getCustomerName(): string {
    return this.customerName;
}

public setCustomerName(customername: string) {
    this.customerName = customername;
} 
}