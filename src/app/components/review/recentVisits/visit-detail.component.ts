import { Component, OnInit, NgZone } from '@angular/core';
import { SocketIO } from 'nativescript-socketio';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { ServerService } from '../../../services/server.service';
import { getCurrentLocation } from 'nativescript-geolocation';
import { AuthService } from '~/app/services/auth.service';


@Component({
    template: `
    <ActionBar [title]="location.name"></ActionBar>
    <GridLayout columns="2*,*" rows = "auto,auto, *" class="page">
    <StackLayout>
        <Label [text]="location.name"></Label>
        <Label [text]="location.type"></Label>
        <Label [text]="location.address"></Label>
    </StackLayout>
                <TextField #messageEl hint="Enter text" row="1"></TextField>
                <Button col="1" text="Add" (tap)="sendText(messageEl.text)" row="1"></Button>
                <ListView id="lv" [items]="list" colSpan="2" row="2" class="list-group">
                    <ng-template let-item="item">
                        <GridLayout columns="*,*,*" class="list-group-item messages">
                            <Label [text]="item.username"></Label>
                            <Label [text]="item.message" col="1"></Label>
                        </GridLayout>
                    </ng-template>
                </ListView>
                </GridLayout>
                `,
                moduleId: module.id,
    providers: [ServerService],

})

export class VisitDetailComponent implements OnInit {
    list = [];
    currentUser = '';
    location: any;

    constructor(
        public router: RouterExtensions,
        public route: ActivatedRoute,
        public socketIO: SocketIO,
        public ngZone: NgZone,
        public serverService: ServerService,
        public AuthService: AuthService
    ) {
        this.route.queryParams.subscribe(params => {
            this.location = JSON.parse(params["location"]);
            });
    }

    ngOnInit() {



        this.socketIO.on('connect', () => {
            console.log();
        });

        // this.currentUser = this.route.snapshot.params['username'];
        // console.log('currentUser: ' + this.currentUser);

        this.socketIO.on('new message', data => {
            this.ngZone.run(() => {
                this.list.push(data);
                // console logging all messages
                console.log(JSON.stringify(data));
            });
        });

        this.socketIO.on('disconnect', () => {
            // this.list.push.length = 0;
            this.ngZone.run(() => {
                this.router.navigate(['login']);
            });
        });

        this.socketIO.on('getMessages', data => {
            this.ngZone.run(() => {
                if (data.length > 0) {
                    if (this.list.length !== data.length) {
                        let messages = data;
                        for (let i = 0; i < messages.length; i++) {
                            this.list.push(messages[i]);
                        }
                    }
                    console.log(JSON.stringify(data));
                }
            });
        });

        this.socketIO.emit('getMessages');
    }


    sendText(message: string) {

        let data = {
            message,
            // username: this.currentUser,
            // userId: 0,
            locationId: this.location.id,
            // timeStamp: +new Date(),
            // location: getCurrentLocation();
        };


        this.serverService.postComments(data.locationId, data.message, this.AuthService.userObj.id)

        this.socketIO.emit('new message', data, wasReceived => {
            this.ngZone.run(() => {
                if (wasReceived) {
                    // console logging if message was sent, and the message that was sent
                    console.log('message sent successfully');
                    this.list.push(data);
                }
            });
        });

    }

    logout() {
        // this.socketIO.off("login");
        this.socketIO.disconnect();
    }
}
