class MessageService {
    constructor() {
        this.guestFirstName = "";
        this.guestLastName = "";
        this.hotel = "";
        this.message = "";
        this.fullName = this.guestFirstName + "" + this.guestLastName;
    }

    getGuestFirstName() {
        return this.guestFirstName;
    }

    getGuestLastName() {
        return this.guestLastName;
    }

    getHotel() {
        return this.hotel;
    }

    setGuestFirstName(firstName) {
        this.guestFirstName = firstName;
    }
    setGuestLastName(lastName) {
        this.guestLastName = lastName;
    }
    setHotel(hotel) {
        this.hotel = hotel;
    }
    setMessage(message) {
        this.message = message;
    }
    insertGreeting(timezone) {
        
    }
}