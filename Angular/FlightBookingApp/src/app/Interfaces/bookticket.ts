import { Passenger } from "./passenger";

export class BookTicket {
    id?: number;
    userID?: number;
    flightInvID?: number;
    journeyType?: string;
    pnr?: any;
    isCancelled?: boolean;
    passengers?: Passenger[];
    noofSeats?: number;
    mealPreference?: string;
    totalCost:number=0;

}