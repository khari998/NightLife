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
    <ActionBar [title]="location.name"></ActionBar>
    <!--StackLayout>
    <!--Label style="text-align: center" class="h1 ; font-bold" [text]="selected.comments.name"></Label-->
    <!--Label style="text-align: center" class="h3 ; font-italic" textWrap="true" [text]="selected.comments.comment.join(' ')"></Label-->
    <!--/StackLayout-->
    <!--TextField class="input" hint="Comments" returnKeyType="next" ngModel #comment="ngModel" required></TextField-->
    <!--Button colSpan="2" width="50%" height="44" text="Log Out" (tap)="logout()" borderWidth="1"  borderRadius="8" borderColor="black" textAlignment="center" horizontalAlignment="center"></Button-->
    <!--Button text="Submit" marginTop="20" (tap)="onSubmit(comment.value)"></Button-->
    <!--/StackLayout-->
    <!--GridLayout columns="2*,*" rows = "auto,auto, *" class="page">
    </GridLayout-->
    <StackLayout>
        <Label [text]="location.name"></Label>
        <Label [text]="location.type"></Label>
        <Label [text]="location.address"></Label>
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
    </StackLayout>
    `,
                moduleId: module.id,
    providers: [ServerService],
                // </StackLayout>
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


        this.serverService.postComments(data.locationId, data.message)

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
