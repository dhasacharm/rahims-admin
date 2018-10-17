import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  API_URLs = {
    products: `${this.settingServ.apiURL}/api/products`
  };

  constructor(
    private http: HttpClient,
    private settingServ: SettingsService
  ) { }

  postProduct(data) {
    const url = this.API_URLs.products;
   return this.http.post(url, data);
  }

}
