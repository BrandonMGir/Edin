import { LightningElement } from 'lwc';

export default class SearchBar extends LightningElement {
    handleSearch(){
        let searchEl = this.refs.search;
        this.dispatchEvent(new CustomEvent('search', {detail: searchEl.value}));
    }
}