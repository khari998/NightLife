import { Component, OnInit, NgZone } from '@angular/core';
import { SocketIO } from 'nativescript-socketio';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { ServerService } from '../../../services/server.service';
import { getCurrentLocation } from 'nativescript-geolocation';

// class Visit {
//     constructor(public id: number, public venue: string, public city: string) {
//     }
// }

@Component({

    // selector: 'ns-visited',
    // <ActionBar [title]="location.name"></ActionBar>
    //     <StackLayout orientation="vertical" class="m-x-auto">
    //         <Image [src]="location.src" width="210"></Image>
    //         <Label style="text-align: center" class="h2" [text]="location.name"></Label>
    //         <Label style="text-align: center" class="body" [text]="location.type"></Label>
    //         <Label style="text-align: center" class="h3; font-italic" textWrap="true" text="works"></Label>
    //             <Label style="text-align: center" class="h4" text="Comments"></Label>
    template: `
        <StackLayout orientation="vertical" class="m-x-auto">
            <Image [src]="selected.src" width="210"></Image>
            <Label style="text-align: center" class="h2" [text]="selected.city"></Label>
            <Label style="text-align: center" class="body" [text]="selected.address"></Label>
            <Label style="text-align: center" class="h3; font-italic" textWrap="true" [text]="'- ' + selected.description"></Label>
            <StackLayout class="hr-light m-10"></StackLayout>
                <Label style="text-align: center" class="h4" text="Comments"></Label>
                <StackLayout>
                <Label style="text-align: center" class="h1 ; font-bold" [text]="selected.comments.name"></Label>
                <Label style="text-align: center" class="h3 ; font-italic" textWrap="true" [text]="selected.comments.comment.join(' ')"></Label>
                </StackLayout>
                <StackLayout class="input-field ; m-x-5">
                <TextField class="input" hint="Comments" returnKeyType="next" ngModel #comment="ngModel" required></TextField>
                <Button text="Submit" marginTop="20" (tap)="onSubmit(comment.value)"></Button>
                </StackLayout>
        </StackLayout>
    `
})

export class VisitDetailComponent implements OnInit {
    list = [];
    currentUser = '';
    location = {};

    constructor(
        private router: RouterExtensions,
        private route: ActivatedRoute,
        private socketIO: SocketIO,
        private ngZone: NgZone,
        private serverService: ServerService,
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
            userId: 0,
            locationId: this.serverService.currentLocation.id
            // timeStamp: +new Date(),
            // location: getCurrentLocation();
        };

        this.socketIO.emit('new message', data, wasReceived => {
            this.ngZone.run(() => {
                if (wasReceived) {
                    // console logging if message was sent, and the message that was sent
                    console.log('message sent successfully');
                    console.log(JSON.stringify(data));
                    this.list.push(data);
                }
            });
        });

        this.serverService.postComments(data.locationId, data.message)
    }

    logout() {
        // this.socketIO.off("login");
        this.socketIO.disconnect();
    }
}
