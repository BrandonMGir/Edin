import { api, wire, LightningElement } from 'lwc';
import { publish, MessageContext } from 'lightning/messageService';
import NAV_LINK_CHANNEL from '@salesforce/messageChannel/navLinkChannel__c';

export default class CardLink extends LightningElement {

    @wire(MessageContext)
    messageContext;
    
    subscription = null;

    @api
    content;

    @api
    page;

    @api
    variant = 'default'

    handleClick(){
        const payload = {
            page: this.page,
            id: this.content.id
        };

        publish(this.messageContext, NAV_LINK_CHANNEL, payload);
    }

    get isDefault(){
        return this.variant == 'default';
    }

    get isDetailed(){
        return this.variant == 'detailed';
    }
}