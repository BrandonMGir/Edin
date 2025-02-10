import { LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';

export default class PropertyListings extends LightningElement {

    results = [
        {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
        {name: 'property', info: 'info', image: DUMMY_PROPERTY, price: 100000, bed: 3, location: 'Detroit, MI'},
    ];

    bedroomfiltervalue = '';
    featurefiltervalue = [];

    get bedroomoptions() {
        return [
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3+', value: '3' },
        ];
    }

    get featureoptions() {
        return [
            { label: 'Pet-Friendly', value: '1' },
            { label: 'Pool', value: '2' },
            { label: 'Garage', value: '3' },
        ];
    }

    expanded = false;
    expandedClass = 'sb-expanded';

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
}