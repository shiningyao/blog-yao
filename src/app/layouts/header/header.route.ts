import { Route } from "@angular/router";
import { HeaderComponent } from "./header.component";
// import { HomeComponent } from "../../../home/home.component";
// import { AboutComponent } from "../../../about/about.component";

// export const routes: Routes  = [
//     { path: '', component: HomeComponent },
//     { path: 'about', component: AboutComponent, pathMatch: 'full' }
// ];

export const headerRoutes: Route  = { 
    path: '', 
    component: HeaderComponent,
    outlet: 'header'
};