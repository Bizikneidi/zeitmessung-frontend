// Entity to represent a potential participant (duh...)
// Most values are strings due to regex in html
export class Participant {
    public City: string;
    public Email: string;
    public Firstname: string;
    public Lastname: string;
    public HouseNumber: string;
    public Nationality: string;
    public PhoneNumber: string;
    public PostalCode: string;
    public Sex: string;
    public Street: string;
    public Team: string;
    public YearGroup: number;

    constructor(fname: string, lname: string) {
        this.Firstname = fname;
        this.Lastname = lname;
    }
}
