import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    AfterViewInit,
    ChangeDetectorRef,
    ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RadSideDrawerComponent } from 'nativescript-ui-sidedrawer/angular/side-drawer-directives';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';

import { UIService } from '../app/shared/ui.service';
import { AuthService } from '../app/services/auth.service';

@Component({
    selector: 'ns-app',
    moduleId: module.id,
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild(RadSideDrawerComponent, { static: false }) drawerComponent: RadSideDrawerComponent;
    activeChallenge = '';
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(
        private uiService: UIService,
        private changeDetectionRef: ChangeDetectorRef,
        private vcRef: ViewContainerRef,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(() => {
            if (this.drawer) {
                this.drawer.toggleDrawerState();
            }
        });
        this.uiService.setRootVCRef(this.vcRef);
        this.authService.autoLogin().subscribe(success => console.log("AutoLogin successful", success));
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;

        this.changeDetectionRef.detectChanges();
    }

    onLogout() {
        this.uiService.toggleDrawer();
        this.authService.logout();
    }

    ngOnDestroy() {
        if (this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
}
