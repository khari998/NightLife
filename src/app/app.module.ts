import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { HomeComponent } from "./components/home/home.component";
import { MapComponent } from "./components/map/map.component";
import { RecComponent } from "./components/rec/rec.component";
import { EmerComponent } from "./components/emer/emer.component";
import { StartupComponent } from "./components/startup/startup.component";
import { ReviewComponent } from "./components/review/review.component";
import { GuardiansComponent } from "./components/emer/guardians/guardians.component";
import { VisitsComponent } from "./components/review/recentVisits/visits.component";
import { VisitDetailComponent } from "./components/review/recentVisits/visit-detail.component";



// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        StartupComponent,
        HomeComponent,
        MapComponent,
        RecComponent,
        EmerComponent,
        ReviewComponent,
        GuardiansComponent,
        VisitsComponent,
        VisitDetailComponent,
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
    constructor() {
       // GooglePlaces.init();
    }
}
