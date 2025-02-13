public with sharing class FilterRequest {
    
    @AuraEnabled
    public String search{get;set;} 

    @AuraEnabled
    public String sortoption{get;set;}

    @AuraEnabled
    public List<String> type{get;set;}

    @AuraEnabled
    public List<String> features{get;set;}

    @AuraEnabled
    public String minprice{get;set;}

    @AuraEnabled
    public String maxprice{get;set;}

    @AuraEnabled
    public String bedrooms{get;set;}

    @AuraEnabled
    public String bathrooms{get;set;}
}