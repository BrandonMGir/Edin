import { LightningElement, wire } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';
import getFeaturedProperties from '@salesforce/apex/PropertyController.getFeaturedProperties';
import getPropertiesWithinDistance from '@salesforce/apex/PropertyController.getPropertiesWithinDistance';

export default class Home extends LightningElement {

    // properties = [
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY},
    // ];

    detailpage = 'details';

    searchresult;
    featuredproperties;

    @wire(getFeaturedProperties)
    wiredData({error, data}){
        if(data){
            console.log('DATA: ' + JSON.stringify(data));
            let mapped = data.map(({property, imageUrls}) => 
               ({name: property.Name, image: imageUrls[0]})
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
                ({id: property.Id, name: property.Price__c, image: imageUrls[0]}));

                console.log('SEARCH MAPPED: ' + JSON.stringify(mapped));

            
                this.searchresult = mapped;
            }
            
        }catch(error){
            console.log(error);
        }
    }
}