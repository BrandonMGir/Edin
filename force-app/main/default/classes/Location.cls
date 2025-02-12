public with sharing class Location {
    
    public Decimal latitude{get;set;}
    public Decimal longitude{get;set;}

    public Location(Decimal latitude, Decimal longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }
}