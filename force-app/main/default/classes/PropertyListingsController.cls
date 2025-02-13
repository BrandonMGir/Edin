public with sharing class PropertyListingsController {


    static List<String> types = new List<String>{'House', 'Apartment', 'Condo', 'Townhouse'};
    static List<String> features = new List<String>{'Pet-Friendly', 'Pool', 'Garage'};

    @AuraEnabled
    public static List<PropertyWrapper> getFilteredProperties(FilterRequest request){
        try {
            
            String query = 'SELECT Id, Name, Address__c, Bathrooms__c, Bedrooms__c, Price__c, Type__c FROM Property__c';
            String whereClause = ' WHERE ';
            List<String> filters = new List<String>();

            if(request.search != '' && request.search != null){
                Location location = GeoLocationHelper.getLatLong(request.search);
                filters.add('DISTANCE(Geolocation__c, GEOLOCATION(' + location.latitude + ', ' + location.longitude + '), \'mi\') < 50');
            }

            if(request.minprice != '' && request.minprice != null && request.minprice != 'any'){
                filters.add('Price__c >= ' + request.minprice);
            }

            if(request.maxprice != '' && request.maxprice != null && request.maxprice != 'any'){
                filters.add('Price__c <= ' + request.maxprice);
            }

            if(request.bathrooms != '' && request.bathrooms != null && request.bathrooms != 'any'){
                if(request.bathrooms == '3'){
                    filters.add('Bathrooms__c >= 3');
                }
                else{
                    filters.add('Bathrooms__c = ' + request.bathrooms);
                }
            }

            if(request.bedrooms != '' && request.bedrooms != null && request.bedrooms != 'any'){
                if(request.bedrooms == '3'){
                    filters.add('Bedrooms__c >= 3');
                }
                else{
                    filters.add('Bedrooms__c = ' + request.bedrooms);
                }
            }

            if(request.features != null){
                String featureFilter = 'Features__c includes (';

                if(request.features.size() > 0){

                    for(String f : request.features){
                        Integer index = Integer.valueOf(f);
                        String featureStr = features[index];
                        featureFilter += ('\'' + featureStr + '\',');
                    }

                    featureFilter = featureFilter.removeEnd(',');
                    featureFilter += ')';

                    filters.add(featureFilter);
                }
            }

            if(request.type != null){
                String typeFilter = 'Type__c';
                if(request.type.size() == 1){
                    Integer index = Integer.valueOf(request.type[0]);
                    typeFilter += (' = \'' + types[index] + '\'');
                    filters.add(typeFilter);
                }
                else if(request.type.size() > 1){
                    typeFilter = ' IN (';

                    for(String t : request.type){
                        Integer index = Integer.valueOf(t);
                        String typeStr = types[index];
                        typeFilter += ('\'' + typeStr + '\', ');
                    }

                    typeFilter = typeFilter.removeEnd(', ');

                    typeFilter += ')';
                    filters.add(typeFilter);
                }
            }

            if(filters.size() > 0){
                query += whereClause;

                query += filters[0];

                if(filters.size() > 1){
                    for(Integer i = 1; i < filters.size(); i++){
                        query += (' AND ' + filters[i]);
                    }
                }
            }

            if(request.sortoption != '' && request.sortoption != null && request.sortoption != 'none'){
                switch on request.sortoption{
                    when '1'{
                        query += ' ORDER BY PRICE__c ASC';
                    }
                    when '2'{
                        query += ' ORDER BY PRICE__c DESC';
                    }
                    when '3'{
                        query += ' ORDER BY Listing_Date__c ASC';
                    }
                }
            }

            //return query;

            List<Property__c> properties = Database.query(query);
            return PropertyHelper.getPropertyWrapperList(properties); 
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}