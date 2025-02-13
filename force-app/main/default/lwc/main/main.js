import { api, LightningElement, track, wire } from 'lwc';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext } from 'lightning/messageService';
import NAV_LINK_CHANNEL from '@salesforce/messageChannel/navLinkChannel__c';


export default class Main extends LightningElement {

    @api
    pages = [
        {name: 'home', label: 'Home', active: true},
        {name: 'listings', label: 'Listings', active: false},
        {name: 'details', label: 'Details', active: false},
        {name: 'account', label: 'Account', active: false},
    ];

    subscription = null;

    @wire(MessageContext)
    messageContext;

    pageparams;

    connectedCallback(){
        this.subscribeToChannel();
        console.log(JSON.stringify(this.pages));
    }

    disconnectedCallback(){
        this.unsubscribeToChannel();
    }

    subscribeToChannel(){
        this.subscription = subscribe(
            this.messageContext,
            NAV_LINK_CHANNEL,
            (page) => this.handleNavigation(page),
            {scope: APPLICATION_SCOPE}
        );
    }

    unsubscribeToChannel(){
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleNavigation(page){
        console.log('Navigate to ' + JSON.stringify(page));

        let updatedPages = [];
        this.pageparams = null;

        if(page.id){
            this.pageparams = page.id;
        }
        
        this.pages.forEach(x => {
            let updatedPage = {name: x.name, label: x.label, active: false};

            if(x.name == page.page){
                updatedPage.active = true;
            }

            updatedPages.push(updatedPage);
        })

        //console.log('UPDATED: ' + updatedPages);
        this.pages = updatedPages;
    }

    get isHome(){
        return this.pages.filter(x => x.name == 'home')[0].active;
    }

    get isListing(){
        return this.pages.filter(x => x.name == 'listings')[0].active;
    }

    get isDetail(){
        return this.pages.filter(x => x.name == 'details')[0].active;
    }

    get isAccount(){
        return this.pages.filter(x => x.name == 'account')[0].active;
    }
}