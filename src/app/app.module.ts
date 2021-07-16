import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTableComponent} from './data-table/data-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatDataTableComponent} from './data-table/mat-data-table/mat-data-table.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSortModule} from '@angular/material/sort';
import {ResizeColumnDirective} from './data-table/mat-data-table/resize-column.directive';
import {ColumnSelectorsComponent} from './data-table/column-selectors/column-selectors.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {CarsComponent} from './cars/cars.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {EmployeesComponent} from './employees/employees.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    MatDataTableComponent,
    ResizeColumnDirective,
    ColumnSelectorsComponent,
    CarsComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSortModule,
    MatTableModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
