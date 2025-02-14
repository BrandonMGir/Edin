import { LightningElement, track, wire } from 'lwc';
import DUMMY_PROPERTY from '@salesforce/resourceUrl/DummyProperty';
import USER_IMAGE from '@salesforce/resourceUrl/defaultUser';
import Id from '@salesforce/user/Id';
import getUser from '@salesforce/apex/AccountController.getUserById';
import getFavoritedProperties from '@salesforce/apex/AccountController.getFavoritedProperties';
import unFavoriteProperty from '@salesforce/apex/AccountController.unFavoriteProperty';
import { publish, MessageContext } from 'lightning/messageService';
import NAV_LINK_CHANNEL from '@salesforce/messageChannel/navLinkChannel__c';
import { refreshApex } from "@salesforce/apex";

export default class Account extends LightningElement {

    @wire(MessageContext)
    messageContext;

    @wire(getUser, {id: Id})
    user({error, data}){
        if(data){
            console.log('USER: ' + JSON.stringify(data));
            this.name = data.Name;
            this.email = data.Email;
        }
        else{
            console.log('ERROR: ' + JSON.stringify(error));
        }
    }

    @wire(getFavoritedProperties, {id: Id})
    favorites(result){
        this.wireFavorites = result;
        const{data, error} = result;

        if(data){
            console.log('FAVORITES: ' + JSON.stringify(data));
            this.favoritedproperties = data.map((favorite) => ({
                id: favorite.Id,
                address: favorite.Address__c.street + ', ' + favorite.Address__c.city + ', ' + favorite.Address__c.stateCode
            }));
        }   
        else{
            console.log('ERROR: ' + JSON.stringify(error));
            this.favoritedproperties = [];
        }
    }

    profileimage = USER_IMAGE;
    name = '';
    email = '';

    @track
    favoritedproperties;

    @track
    wireFavorites;

    renderedCallback(){
        refreshApex(this.wireFavorites);
    }

    async handleDelete(e){
        try{
            let res = await unFavoriteProperty({userId: Id, propertyId: e.target.dataset.id});
            
            if(res){
                console.log('DELETE FAV: ' + JSON.stringify(res));
                await refreshApex(this.wireFavorites);
            }
        }
        catch(error){
            console.log('ERROR: ' + JSON.stringify(error));
        }
        

    }

    handleLink(e){
        const payload = {
            page: 'details',
            id: e.target.dataset.id
        };

        publish(this.messageContext, NAV_LINK_CHANNEL, payload);
    }
}