import { api, LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, publish, MessageContext } from 'lightning/messageService';
import NAV_LINK_CHANNEL from '@salesforce/messageChannel/navLinkChannel__c';

export default class Link extends LightningElement {

    @wire(MessageContext)
    messageContext;

    subscription = null;

    @api
    label;

    @api
    page;

    activeClass = '';

    handleClick(){
        const payload = {
            page: this.page
        };

        publish(this.messageContext, NAV_LINK_CHANNEL, payload);

        this.activeClass = 'active';
    }

    renderedCallback(){
        this.initCSSVariables();
    }
    
    initCSSVariables(){
        // var css = this.template.host.style;
        // css.setProperty('--bg-color', '#ffdf87');
    }

    connectedCallback(){
        this.subscribeToChannel();
    }

    disconnectedCallback(){
        this.unsubscribeToChannel();
    }

    subscribeToChannel(){
        this.subscription = subscribe(
            this.messageContext,
            NAV_LINK_CHANNEL,
            (page) => {
                if(this.page != page.page){
                    this.activeClass = '';
                }
            },
            {scope: APPLICATION_SCOPE}
        );
    }

    unsubscribeToChannel(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }


}