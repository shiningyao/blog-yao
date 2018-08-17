import { Routes } from "@angular/router";
import { FooterComponent } from "@/layouts/footer/footer.component";

export const footerRoutes: Routes  = [{
    path: '',
    component: FooterComponent,
    outlet: 'footer'
}];