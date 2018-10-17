import { NgModule } from '@angular/core';


import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatAutocompleteModule,
} from '@angular/material';

const matComponents = [
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatInputModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatAutocompleteModule
];


@NgModule({
  imports: matComponents,
  exports: matComponents
})
export class MatComponentsModule { }
