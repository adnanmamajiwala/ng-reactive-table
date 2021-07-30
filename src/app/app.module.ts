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
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSortModule} from '@angular/material/sort';
import {ResizeColumnDirective} from './data-table/mat-data-table/resize-column.directive';
import {ColumnSelectorsComponent} from './data-table/column-selectors/column-selectors.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {CarsComponent} from './cars/cars.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EmployeesComponent} from './employees/employees.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {far} from '@fortawesome/free-regular-svg-icons';
import {EmployeeCardComponent} from './employees/employee-card/employee-card.component';
import {DateSelectorComponent} from './date-selector/date-selector.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {SmallLargeChartComponent} from './small-large-chart/small-large-chart.component';
import {ChartsModule} from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    MatDataTableComponent,
    ResizeColumnDirective,
    ColumnSelectorsComponent,
    CarsComponent,
    EmployeesComponent,
    EmployeeCardComponent,
    DateSelectorComponent,
    SmallLargeChartComponent
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
    DragDropModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
