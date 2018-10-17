import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  API_URLs = {
    categories: `${this.settingServ.apiURL}/api/category`
  };

  constructor(
    private http: HttpClient,
    private settingServ: SettingsService
  ) { }

  postProduct(data) {
    const url = this.API_URLs.categories;
    console.log(data);
    return this.http.post(url, data);
  }

  getProduct() {
    const url = this.API_URLs.categories;
    return this.http.get(url);
  }

  deleteCategory(id) {
    console.log(id)
    const url = this.API_URLs.categories;
    return new Promise((resolve, reject) => {
      this.http.delete(`${url}/${id}`)
        .subscribe(resolve, reject);
    });
  }


}
