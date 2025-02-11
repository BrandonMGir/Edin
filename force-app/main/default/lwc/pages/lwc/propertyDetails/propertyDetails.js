import { LightningElement } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';

export default class PropertyDetails extends LightningElement {

    images = [
        {name: 'img1', image: DUMMY_PROPERTY},
        {name: 'img2', image: DUMMY_PROPERTY},
        {name: 'img3', image: DUMMY_PROPERTY},
        {name: 'img4', image: DUMMY_PROPERTY},
        {name: 'img5', image: DUMMY_PROPERTY},
        {name: 'img6', image: DUMMY_PROPERTY},
        {name: 'img7', image: DUMMY_PROPERTY},
        {name: 'img8', image: DUMMY_PROPERTY},
    ];
    
    property_title = 'Property Title';
    price = 100000;
    sqft = 1000;
    bed = 3;
    bath = 1;
    lot = 3000;
    address = '123 Somewhere ave. Detroit, MI';
    description = 'this is a house'
    features = ["Feature", "Feature", "Feature", "Feature"];
}