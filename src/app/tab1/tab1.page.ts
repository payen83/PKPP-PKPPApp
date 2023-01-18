import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

declare var document: any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  inventory: Array<any> = [];
  item: any;
  showScanner: boolean = false;
  constructor(public api: ApiService, private router: Router) {
    this.item = {
      name: null,
      serial_number: null,
      description: null,
      category: null
    };
  }

  cancel(){
    this.showScanner = false;
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  }

  async scanQR() {
    this.showScanner = true;
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    document.querySelector('body').classList.remove('scanner-active');
    this.showScanner = false;

    if (result.hasContent) {
      console.log(result.content); // log the raw scanned content
      this.item.serial_number = result.content;
    } else {
      alert('Invalid QR Code');
    }

  }

  viewDetail(id: any) {
    console.log(id);
    this.router.navigateByUrl('/detail/' + id);
  }

  submit() {
    this.api.doPost('/create-inventory', this.item).then((response: any) => {
      console.log('success ==> ', response);
      this.inventory.push(this.item);
    })
      .catch((error: any) => { console.log('error: ', error); })
  }

  ngOnInit(): void {
    this.api.doGet('/get-all-inventory').then((response: any) => {
      console.log(response);
      this.inventory = response.feedData;
      this.api.saveInventory(this.inventory);
    })
      .catch((error: any) => { console.log('error: ', error); })
  }

}
