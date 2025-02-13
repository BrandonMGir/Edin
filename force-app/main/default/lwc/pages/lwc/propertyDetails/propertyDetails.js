import { api, LightningElement, wire } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';
import getPropertyById from '@salesforce/apex/PropertyDetailsController.getPropertyById';
import favoriteProperty from '@salesforce/apex/AccountController.favoriteProperty';
import unFavoriteProperty from '@salesforce/apex/AccountController.unFavoriteProperty';
import Id from '@salesforce/user/Id';
import { refreshApex } from "@salesforce/apex";
import isFavorited from '@salesforce/apex/PropertyDetailsController.isFavorited';

export default class PropertyDetails extends LightningElement {

    // images = [
    //     {name: 'img1', image: DUMMY_PROPERTY},
    //     {name: 'img2', image: DUMMY_PROPERTY},
    //     {name: 'img3', image: DUMMY_PROPERTY},
    //     {name: 'img4', image: DUMMY_PROPERTY},
    //     {name: 'img5', image: DUMMY_PROPERTY},
    //     {name: 'img6', image: DUMMY_PROPERTY},
    //     {name: 'img7', image: DUMMY_PROPERTY},
    //     {name: 'img8', image: DUMMY_PROPERTY},
    // ];

    property_title = 'Property Title';
    price = 100000;
    sqft = 1000;
    bed = 3;
    bath = 1;
    lot = 3000;
    address = '123 Somewhere ave. Detroit, MI';
    description = 'this is a house'
    features = ["Feature", "Feature", "Feature", "Feature"];

    images;

    @api
    propertyid;

    nearbyProperties;

    mapMarkers = [];

    // favorited;
    // wireFavorited;

    renderedCallback(){
        refreshApex(this.isFav);
    }

    @wire(getPropertyById, {id: "$propertyid"})
    details({error, data}){
        if(data){
            console.log('DETAILS: ' + JSON.stringify(data.property.Address__c));
            //console.log('DETAILS: ' + JSON.stringify(data.otherproperties));

            let imgData = [];

            if(data.imageUrls){
                for(let i = 0; i < data.imageUrls.length; i++){
                    imgData.push({name: 'img' + i, image: data.imageUrls[i]});
                }
            }

            this.images = imgData;

            this.property_title = data.property.Name;
            this.price = data.property.Price__c;
            this.sqft = data.property.Square_Footage__c;
            this.bed = data.property.Bedrooms__c;
            this.bath = data.property.Bathrooms__c;
            this.lot = data.property.Lot_Square_Footage__c;
            this.description = data.property.Description__c;
            this.features.push(data.property.Features__c);
            this.address = data.property.Address__c.street + ', ' + data.property.Address__c.city + ', ' + data.property.Address__c.stateCode;

            this.mapMarkers = [{
                location:{
                    City: data.property.Address__c.city,
                    Country: data.property.Address__c.countryCode,
                    PostalCode: data.property.Address__c.postalCode,
                    State: data.property.Address__c.stateCode,
                    Street: data.property.Address__c.street
                }
            }];

            if(data.otherproperties){
                this.nearbyProperties = data.otherproperties.map(({property, imageUrls}) => 
                    ({id: property.Id, name: property.Name, image: imageUrls[0], page: 'details'})
                 );
            }
        }
        else if(error){
            console.log('ERROR: ' + JSON.stringify(error));
        }
    }

    @wire(isFavorited, {userId: Id, propertyId: "$propertyid"})
    isFav;


    async handleFavorite(){
        try{
            let res = await favoriteProperty({userId: Id, propertyId: this.propertyid});

            console.log('FAVORITE: ' + res);
            await refreshApex(this.isFav);
        }
        catch(error){
            console.log('ERROR: ' + error);
        }
    }

    async handleUnfavorite(){
        try{
            let res = await unFavoriteProperty({userId: Id, propertyId: this.propertyid});

            console.log('FAVORITE: ' + res);
            await refreshApex(this.isFav);
        }
        catch(error){
            console.log('ERROR: ' + error);
        }
    }

    get isFavorite(){
        console.log(JSON.stringify(this.isFav.data));
        return this.isFav.data == true;
    }
}