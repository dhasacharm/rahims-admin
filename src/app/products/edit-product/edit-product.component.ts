import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }


  initForm() {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      categories: this.fb.array([]),
      picture: ['', Validators.required],
      isVeg: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      availableTime: ['', Validators.required],
      isAvailable: ['', Validators.required]
    });
  }

  handleSubmit() {

  }

}
