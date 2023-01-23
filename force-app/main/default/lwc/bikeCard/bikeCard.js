import { LightningElement, track } from 'lwc';
import testeInjection from '@salesforce/apex/TestSoqlInjection.teste';
export default class BikeCard extends LightningElement {
    name = 'Electra X4';
    description = 'A sweet bike built for comfort.';
    category = 'Mountain';
    material = 'Steel';
    price = '$2,700';
    pictureUrl = 'https://s3-us-west-1.amazonaws.com/sfdc-demo/ebikes/electrax4.jpg';
    selection;
    identifier;

    @track produtos = [
        {id: '1', label: 'teste1', manterQuantidade: false},
        {id: '2', label: 'teste2', manterQuantidade: false},
        {id: '3', label: 'teste3', manterQuantidade: false},
        {id: '4', label: 'teste4', manterQuantidade: false},
        {id: '5', label: 'teste5', manterQuantidade: false}
    ];

    handleManterQuantidade(event) {
        let check = this.template.querySelectorAll('[data-element="manterQuantidade-checkbox"]')[0].checked;
        this.template
            .querySelectorAll('[data-element="manterQuantidade-checkbox"]')
            .forEach((element) => {
                element.checked = !check;
            });
    }

    handleCheckboxChange(event) {
        let check = this.template.querySelectorAll('[data-element="manterQuantidade-checkbox"]').forEach((element) => {
            console.log(element.checked);
        })
    }

    searchKeyword(event){
        this.identifier = event.target.value;
    }

    enviarPesquisa(event){
        console.log(this.identifier);
        testeInjection({
            nomeConta: this.identifier
        }).then(retorno => {
            console.log(retorno);
        }).catch(error => {
            console.log(error);
        });

    }
}