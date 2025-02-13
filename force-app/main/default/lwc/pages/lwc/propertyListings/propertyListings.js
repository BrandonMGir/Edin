import { LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';
import getFilteredProperties from '@salesforce/apex/PropertyListingsController.getFilteredProperties';

export default class PropertyListings extends LightningElement {

    // results = [
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
    //     {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
    // ];

    sortvalue = '';
    expanded = false;
    expandedClass = 'sb-expanded';

    detailpage = 'details';

    results;

    async search(event){
        const searchVal = event.detail;
        const childFilter = this.refs.expandfilter;

        let req = {
            search: searchVal,
            sortoption: this.sortvalue == '' ? 'none' : this.sortvalue,
            type: childFilter.typevalue,
            minprice: childFilter.minpricevalue,
            maxprice: childFilter.maxpricevalue,
            bedrooms: childFilter.bedroomvalue,
            bathrooms: childFilter.bathroomvalue,
            features: childFilter.featurevalue
        };

        console.log('REQ: ' + JSON.stringify(req));

        try{
            let result = await getFilteredProperties({request: req});

            if(result){
                console.log('RESULTS: ' + JSON.stringify(result));

                let mapped = result.map(({property, imageUrls}) => 
                    ({
                        id: property.Id,
                        name: property.Name, 
                        image: imageUrls[0], 
                        type: property.Type__c,
                        price: property.Price__c, 
                        bed: property.Bedrooms__c, 
                        bath: property.Bathrooms__c,
                        location: property.Address__c.street + ', ' + property.Address__c.city + ', ' + property.Address__c.stateCode
                    })
                 );

                 this.results = mapped;
            }
            else{
                console.log('NO RESULTS');
            }
        }
        catch(error){
            console.log('ERROR: ' + JSON.stringify(error));
        }
    }

    
    get sortoptions() {
        return [
            { label: 'None', value: 'none' },
            { label: 'Price Asc', value: '1' },
            { label: 'Price Desc', value: '2' },
            { label: 'Date', value: '3' },
        ];
    }

    

    expand(){
        this.expanded = !this.expanded;
        let body = this.refs.expandfilter;

        if(this.expanded){
            body.classList.add(this.expandedClass);
        }
        else{
            body.classList.remove(this.expandedClass);
        }
    }

    handleSortChange(event){
        this.sortvalue = event.detail.value;
    }
}