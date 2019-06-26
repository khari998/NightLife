import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverURL } from '../../../config';



@Injectable({
    providedIn: 'root'
})

export class ServerService {

    constructor(private http: HttpClient) { }

    url: string = serverURL;
    endpoint: string = '/locations';
    commentEndpoint: string = '/comments';

    smsEndpoint: string = '/sms';
    sosMessage: string = `*Current User* has indicated they are experiencing an emergency. Please contact them and / or the authorities`;


    getLocations() {
        return this.http.get(`${this.url}${this.endpoint}`)
    }

    //   public renderCommentStream = false;

    //   changeCommentState() {
    //       this.renderCommentStream = !this.renderCommentStream;
    //   }
    activateSOS() {
        console.log(`${this.url}${this.smsEndpoint}`)

        return this.http.post(`${this.url}${this.smsEndpoint}`, this.sosMessage)
            .subscribe(data => {
                console.log(data)
            },
                error => {
                    console.log(error) })

    }

    // function to get comments

    getComments() {
        return this.http.get(`${this.url}${this.commentEndpoint}`)
    }


}
