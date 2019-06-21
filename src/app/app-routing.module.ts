import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { RecComponent } from "./components/rec/rec.component";
import { EmerComponent } from "./components/emer/emer.component";
import { StartupComponent } from "./components/startup/startup.component";
import { ReviewComponent } from "./components/review/review.component";
import { GuardiansComponent } from "./components/emer/guardians/guardians.component";
import { VisitsComponent } from "./components/review/recentVisits/visits.component";
import { VisitDetailComponent } from "./components/review/recentVisits/visit-detail.component";
// import { ItemDetailComponent } from "./item/item-detail.component";
import { GuardianDetailComponent } from './components/emer/guardians/guardian-detail.component';
import { AddGuardianComponent } from './components/emer/guardians/addGuardian/add-guardian.component';

const routes: Routes = [
    // { path: "", redirectTo: "/items", pathMatch: "full" },
    // { path: "items", component: ItemsComponent },
    // { path: "item/:id", component: ItemDetailComponent },
    { path: '', component: StartupComponent},
    { path: 'home', component: HomeComponent },
    { path: 'map', component: MapComponent },
    { path: 'rec', component: RecComponent },
    { path: 'emer', component: EmerComponent },
    { path: 'review', component: ReviewComponent},
    { path: 'guardians', component: GuardiansComponent },
    { path: 'recentVisits', component: VisitsComponent },
    { path: 'visited', component: VisitDetailComponent },
    { path: 'recentVisits', component: VisitsComponent},
    { path: 'guardian', component: GuardianDetailComponent},
    { path: 'addAngel', component: AddGuardianComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
