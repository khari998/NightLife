import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { SocketIOModule } from "nativescript-socketio/angular";
// import { from } from "rxjs";

import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { AuthComponent } from "./components/auth/auth.component";
import { SharedModule } from '../app/shared/shared.module';
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { MapComponent } from "./components/map/map.component";
import { RecComponent } from "./components/rec/rec.component";
import { EmerComponent } from "./components/emer/emer.component";
import { StartupComponent } from "./components/startup/startup.component";
import { ReviewComponent } from "./components/review/review.component";
import { GuardiansComponent } from "./components/emer/guardians/guardians.component";
import { VisitsComponent } from "./components/review/recentVisits/visits.component";
import { VisitDetailComponent } from "./components/review/recentVisits/visit-detail.component";
import { PlaceItemComponent } from "./components/map/place-item/place-item.component";
import { GuardianDetailComponent } from "./components/emer/guardians/guardian-detail.component";
import { AddGuardianComponent } from './components/emer/guardians/addGuardian/add-guardian.component'
import { MapCommentStreamComponent } from './components/map/map-comment-stream/map-comment-stream.component';

const server = 'https://edcdd69e.ngrok.io';
// import { SocketIO } from "nativescript-socketio";

// import { TextFieldBindingComponent } from './components/textfield.component';
// import * as platform from "tns-core-modules/platform";
// declare var GMSServices: any;
// import { googleAPI } from '../../config'
// import * as GooglePlaces from 'nativescript-plugin-google-places';
// import { GuardiansComponent } from "./components/emer/guardians/guardians.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NativeScriptUISideDrawerModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SharedModule,
        SocketIOModule.forRoot(server),
    ],
    declarations: [
        AppComponent,
        StartupComponent,
        HomeComponent,
        MapComponent,
        RecComponent,
        EmerComponent,
        ReviewComponent,
        PlaceItemComponent,
        GuardiansComponent,
        VisitsComponent,
        VisitDetailComponent,
        GuardianDetailComponent,
        AddGuardianComponent,
        NavbarComponent,
        AuthComponent,
        MapCommentStreamComponent,
        // TextFieldBindingComponent
    ],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {
    constructor() {
        // GooglePlaces.init();
    }
}
