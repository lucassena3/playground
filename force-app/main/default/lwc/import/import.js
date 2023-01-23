import { LightningElement, track, api, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import csvFileRead from '@salesforce/apex/CSVFileReadLWCCntrl.csvFileRead';
import getAccountDataToExport from '@salesforce/apex/ExportDataController.getAccountDataToExport';

const columnsAccount = [
    { label: 'Name', fieldName: 'Name' }, 
    { label: 'Source', fieldName: 'AccountSource' },
    { label: 'Account Site', fieldName: 'Site'}, 
    { label: 'Type', fieldName: 'Type'}, 
    { label: 'Website', fieldName: 'Website', type:'url'}
];

export default class Import extends LightningElement {
    @api recordId;
    @track error;
    @track columnsAccount = columnsAccount;
    @track data;
    @track contactData = {}
    columnHeader = ['ID', 'FirstName', 'LastName', 'Email' ]
    // accepted parameters
    get acceptedCSVFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler(event) {
        // Get the list of records from the uploaded files
        const uploadedFiles = event.detail.files;

        // calling apex class csvFileread method
        csvFileRead({contentDocumentId : uploadedFiles[0].documentId})
        .then(result => {
            window.console.log('result ===> '+result);
            if(!result.length){
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Alerta',
                        message: 'Lista vazia',
                        variant: 'Alert',
                    }),
                );   
            }else {
                this.data = result;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Sucesso!!',
                        message: 'Conta criada de acordo com arquivo carregado!!!',
                        variant: 'Success',
                    }),
                );      
            }
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error',
                }),
            );     
        })
    }

    @wire(getAccountDataToExport, {idConta: '$recordId'})
    wiredData({ error, data }) {
        if (data) {
            console.log('Data', data);
            this.contactData = data;
        } else if (error) {
            console.error('Error:', error);
        }
    }

    exportContactData(){
        // Prepare a html table
        let doc = '<table>';
        // Add styles for the table
        doc += '<style>';
        doc += 'table, th, td {';
        doc += '    border: 1px solid black;';
        doc += '    border-collapse: collapse;';
        doc += '}';          
        doc += '</style>';
        // Add all the Table Headers
        doc += '<tr>';
        this.columnHeader.forEach(element => {            
            doc += '<th>'+ element +'</th>'           
        });
        doc += '</tr>';
        // Add the data rows
        this.contactData.forEach(record => {
            doc += '<tr>';
            doc += '<th>'+record.Id+'</th>'; 
            doc += '<th>'+record.FirstName+'</th>'; 
            doc += '<th>'+record.LastName+'</th>';
            doc += '<th>'+record.Email+'</th>'; 
            doc += '</tr>';
        });
        doc += '</table>';
        var element = 'data:application/vnd.ms-excel,' + encodeURIComponent(doc);
        let downloadElement = document.createElement('a');
        downloadElement.href = element;
        downloadElement.target = '_self';
        // use .csv as extension on below line if you want to export data as csv
        downloadElement.download = 'Contact Data.xls';
        document.body.appendChild(downloadElement);
        downloadElement.click();
    }
}