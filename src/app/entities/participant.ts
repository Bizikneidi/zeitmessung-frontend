import { Race } from './race';

/**
 *A person who is registered for a race.
 *Entity to represent a potential participant
 *Most values are strings due to regex in html
 *
 * @export
 * @class Participant
 */
export class Participant {
    /**
     *only one word,
     *letters,
     *numbers,
     *hyphen,
     *required,
     *colon,
     *slashes
     *
     * @type {string}
     * @memberof Participant
     */
    public City: string;
    /**
     *Valid email,
     *required
     *
     * @type {string}
     * @memberof Participant
     */
    public Email: string;
    /**
     *Multiple words separated by spaces,
     *Capital initial letter, rest lower case,
     *Within words only letters,
     *At least two letters per name,
     *required
     *
     * @type {string}
     * @memberof Participant
     */
    public Firstname: string;
    /**
     *Needs to be a single word or more words seperated with a '-',
     *Capital initial letter, rest lower case,
     *minimum 2 letters,
     *required
     *
     * @type {string}
     * @memberof Participant
     */
    public Lastname: string;
    /**
     *only letters and numbers,
     *accept umlauts
     *
     * @type {string}
     * @memberof Participant
     */
    public HouseNumber: string;
    /**
     *ISO - Country,
     *Alpha 3 Code
     *
     * @type {string}
     * @memberof Participant
     */
    public Nationality: string;
    /**
     *international standard
     *
     * @type {string}
     * @memberof Participant
     */
    public PhoneNumber: string;
    /**
     *only one word,
     *letters,
     *numbers,
     *hyphen,
     *colon,
     *slashes,
     *required
     *
     * @type {string}
     * @memberof Participant
     */
    public PostalCode: string;
    /**
     *only m (male) f (female) or o (other),
     *required
     *
     * @type {string}
     * @memberof Participant
     */
    public Sex: string;
    /**
     *Letters,
     *"-", ".", "/", " ",
     *required
     *
     * @type {string}
     * @memberof Participant
     */
    public Street: string;
    /**
     * The team of the Participant (No Restrictions on format)
     *
     * @type {string}
     * @memberof Participant
     */
    public Team: string;
    /**
     *The year of birth,
     *first year group: 1920
     *
     * @type {number}
     * @memberof Participant
     */
    public YearGroup: number;

    /**
     *The starter number of the participant
     *
     * @type {number}
     * @memberof Participant
     */
    public Starter: number;
    /**
     *The time it took the participant to complete the race (in ms)
     *
     * @type {number}
     * @memberof Participant
     */
    public Time: number;
    /**
     *The Race the Participant registered for / took part in
     *
     * @type {Race}
     * @memberof Participant
     */
    public Race: Race;

    /**
     *Creates an instance of Participant.
     * @memberof Participant
     */
    constructor() {
    }
}
