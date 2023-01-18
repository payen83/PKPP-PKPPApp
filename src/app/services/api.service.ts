import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = 'https://nre.appsmalaya.com/warehouse/api';
  inventoryList: Array<any> = [];
  constructor(public httpClient: HttpClient) { }

  saveInventory(data: any){
    this.inventoryList = data;
  }

  getInventorybyId(id: any){
    return this.inventoryList.find( (item_) => {return item_.item_id == id})
  }

  doPost(endpoint: string, body: any) {
    let payload: any = {...body, user_id: 5, token: 'cb76fce66298afc035ae29ff6fc6a985ac8b7c0b521b6d1939226afd78b2c6ef'};
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.baseURL + endpoint, JSON.stringify(payload))
      .subscribe({
        next: (response: any) => { resolve(response); },
        error: (error: any) => { reject(error); }
      })
    })
  }

  doGet(endpoint: string){

    return new Promise((resolve, reject) => {
      this.httpClient.get(this.baseURL + endpoint)
      .subscribe({
        next: (response: any) => { resolve(response); },
        error: (error: any) => { reject(error); }
      })
    })

  }
}
