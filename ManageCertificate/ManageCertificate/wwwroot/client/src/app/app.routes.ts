import { Routes } from '@angular/router';
import { AllRequestesComponent } from '../Components/all-requestes/all-requestes.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { RequestDetailsComponent } from '../Components/request-details/request-details.component';
import { InventoryReportsComponent } from '../Components/inventory-reports/inventory-reports.component';
import { UserComponent } from '../Components/user/user.component';
export const routes: Routes = [
    { path: '', component: AllRequestesComponent },
    { path: 'RequestDetails/:id', component: RequestDetailsComponent },
    { path: 'InventoryReports', component:InventoryReportsComponent } ,
    { path: 'manageUsers', component:UserComponent } 


]