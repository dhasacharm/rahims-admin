import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatAutocompleteSelectedEvent } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories/categories.service';
import { ProductService } from '../../services/product/product.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup;
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  readonly separatorKeysCodes: number[] = [ENTER];
  visible = true;
  addOnBlur = false;
  removable = true;
  categoryCtrl = new FormControl();
  categories = [];
  selectedCategories = [];
  url: any;
  filteredCategories: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private categoryServ: CategoriesService,
    private productServ: ProductService,
    private sanitizer: DomSanitizer
  ) {
    this.getCategory();
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((searchText: any) => searchText ? this._filter(searchText) : this.categories.slice())
    );
    this.initForm();
  }

  getCategory() {
    this.categoryServ.getProduct()
      .subscribe((data: any[]) => {
        this.categories = data;
      });
  }

  ngOnInit() {
  }

  private _filter(value): any[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category => category.name.toLowerCase().includes(filterValue));
  }

  // Price Group Section
  createPriceGroup() {
    return this.fb.group({
      quantity: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  get priceGroups(): FormArray {
    return this.createProductForm.get('priceGroups') as FormArray;
  }

  addPriceGroup() {
    this.priceGroups.push(this.createPriceGroup());
  }

  removePriceGroup(index) {
    this.priceGroups.removeAt(index);
  }


  /**
   * Time Groups
   */

  get availableTimings(): FormArray {
    return this.createProductForm.get('availableTimings') as FormArray;
  }

  createTimegroup() {
    return this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required]
    });
  }

  addTimeGroup() {
    this.availableTimings.push(this.createTimegroup());
  }

  removeTimeGroup(index) {
    this.availableTimings.removeAt(index);
  }


  initForm() {
    const priceGroups = this.fb.array([
      this.createPriceGroup()
    ]);

    const availableTimings = this.fb.array([
      this.createTimegroup()
    ]);

    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      image: [null, Validators.required],
      isVeg: [false, Validators.required],
      categories: ['', Validators.required],
      priceGroups,
      availableTimings
    });
  }

  get categoryIds(): FormControl {
    return this.createProductForm.get('categories') as FormControl;
  }

  setCategoryId(value) {
    const inputCtrl = this.categoryIds;
    const categoryIdsValue = inputCtrl.value ? [...inputCtrl.value.split(','), value] : [value];
    inputCtrl.setValue(categoryIdsValue.toString());
  }

  removeCategoryId(value) {
    const inputCtrl = this.categoryIds;
    const categoryIdsValue = inputCtrl.value.split(',').filter(id => id.trim() !== value);
    inputCtrl.setValue(categoryIdsValue.toString());
  }

  removeChip(category, index) {
    this.selectedCategories = this.selectedCategories.filter((item, i) => i !== index);
    this.removeCategoryId(category.id);
  }

  resetCategoryInputCtrl() {
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const id = event.option.value;
    this.resetCategoryInputCtrl();
    const category = this.categories.find(item => item._id === id);

    if (this.selectedCategories.includes(category)) {
      return;
    }

    this.selectedCategories.push(category);
    this.setCategoryId(category._id);
  }



  handleSubmit() {
    console.log(this.createProductForm.value);
    this.productServ.postProduct(this.createProductForm.value)
      .subscribe((result) => {
        console.log(result);
      });
  }


  readUrl(events) {
    const img = window.URL.createObjectURL(events.target.files[0]);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(img);
  }

}
