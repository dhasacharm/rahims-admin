import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories/categories.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  @Input() categoryId: number;
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoryServ: CategoriesService
  ) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  handleSubmit() {
    console.log(this.categoryForm.value)
    this.categoryServ.postProduct(this.categoryForm.value)
    .subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    }
    );

  }
}
