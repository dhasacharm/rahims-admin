import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { SharedComponentsModule } from '../components/shared-components.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatTableModule, MatPaginatorModule, MatDialogModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatComponentsModule,
    SharedComponentsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  declarations: [
    CreateCategoryComponent,
    EditCategoryComponent,
    CategoryListComponent,
    CategoryFormComponent
  ]
})
export class CategoriesModule { }
