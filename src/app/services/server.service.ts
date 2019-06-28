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
    ratingsEndpoint: string = '/ratings'
    ratingsDownEndpoint: string = '/ratingsDown'


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

    postComments(locationId, text) {
        return this.http.post(`${this.url}${this.commentEndpoint}`, {
            locationId,
            text,
            userId: 0,
        }).subscribe(data => {
            console.log(data)
        },
            error => {
                console.log(error) })

    }



    icons = ['res://number_0', 'res://number_1', 'res://number_2', 'res://number_3', 'res://sunny']

  marker: any;

  currentLocation: any;

  // on like button click, need to update in DB likes

  likeLocation(locationId) {
      return this.http.post(`${this.url}${this.ratingsEndpoint}`, { locationId })
        .subscribe(() => {
            console.log('successful post to DB of like rating');
        }, (error) => {
            console.log(error);
        })
  }

    dislikeLocation(locationId) {
        return this.http.post(`${this.url}${this.ratingsDownEndpoint}`, { locationId })
            .subscribe(() => {
                console.log('successful post to DB of dislike rating');
            }, (error) => {
                console.log(error);
            })
    }

}
