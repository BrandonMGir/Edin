import { LightningElement, wire } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';
import getFeaturedProperties from '@salesforce/apex/PropertyController.getFeaturedProperties';
import getPropertiesWithinDistance from '@salesforce/apex/PropertyController.getPropertiesWithinDistance';

export default class Home extends LightningElement {

    // searchresult = [
    //     {id: 1, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY},
    //     {id: 2, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY},
    //     {id: 3, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY},
    //     {id: 4, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY},
    //     {id: 5, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY},
    //     {id: 6, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY},
    //     {id: 7, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY},
    //     {id: 8, location: '30819 Marquette St, Garden City, Michigan', price: 200000, image: DUMMY_PROPERTY}
    // ];

    detailpage = 'details';

    searchresult;
    featuredproperties;

    @wire(getFeaturedProperties)
    wiredData({error, data}){
        if(data){
            console.log('DATA: ' + JSON.stringify(data));
            let mapped = data.map(({property, imageUrls}) => 
               ({name: property.Name, image: imageUrls[0], id: property.Id, page: this.detailpage})
            );
            console.log('MAPPED: ' + JSON.stringify(mapped));
            this.featuredproperties = mapped;
        }
        else{
            console.log('ERROR: ' + error);
        }
    }


    async search(event){
        const searchVal = event.detail;

        try{
            let result = await getPropertiesWithinDistance({address: searchVal});
            //console.log('SEARCH RESULT: ' + JSON.stringify(result));

            if(result){

                let mapped = result.map(({property, imageUrls}) =>
                ({
                    id: property.Id, 
                    price: property.Price__c, 
                    location: property.Address__c.street + ', ' + property.Address__c.city + ', ' + property.Address__c.stateCode,
                    image: imageUrls[0]
                }));

                console.log('SEARCH MAPPED: ' + JSON.stringify(mapped));

            
                this.searchresult = mapped;
            }
            
        }catch(error){
            console.log(error);
        }
    }
}