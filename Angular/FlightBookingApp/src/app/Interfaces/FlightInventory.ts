export interface FlightInventory
{
    id:number;
    flightNumber:number;
    airlineID:number;
    fromPlace:string;
    toPlace:string;
    startDateTime:Date|null;
    endDateTime:Date|null;
    scheduleDays:string;//need to change
    instrumentUsed:string;
    bussinesSteatsCount:number;
    nonBussinesSeatCount:number;
    ticketCost:number;
    noofRows:number;
    mealType:string;

}