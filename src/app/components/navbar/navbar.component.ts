import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { screen } from "platform";


@Component({
  selector: 'Navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @ViewChild('tabHighlight', null) tabHighlight: ElementRef;
  selectedTab: number = 0;

  @ViewChild('image1', null) image1: ElementRef;
  @ViewChild('image2', null) image2: ElementRef;
  @ViewChild('image3', null) image3: ElementRef;
  @ViewChild('image4', null) image4: ElementRef;
  @ViewChild('image5', null) image5: ElementRef;

  @Output() tabSelected = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => { this.animateCurrentImage(this.image1); }, 100);
  }

  selectTab(index: number) {
    let previousTab = this.selectedTab;
    if (index != this.selectedTab) {
      this.selectedTab = index;
      this.tabHighlight.nativeElement.animate({
        translate: { x: index * screen.mainScreen.widthDIPs / 5, y: 0 },
        // curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
        duration: 300
      })
      this.animateCurrentImage(this.getImage(index));
      this.animatePreviousImage(this.getImage(previousTab));
      // this.tabSelected.emit(this.selectedTab);
    }
  }

  getImage(index: number) {
    let currentImage: ElementRef<any>;
    switch (index) {
      case 0:
        currentImage = this.image1;
        break;
      case 1:
        currentImage = this.image2;
        break;
      case 2:
        currentImage = this.image3;
        break;
      default:
        break;
    }
    return currentImage;
  }

  animateCurrentImage(arg: any) {
    arg.nativeElement.animate({
      scale: { x: 1.2, y: 1.2 },
      // curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
      duration: 300
    });
  }

  animatePreviousImage(arg: any) {
    arg.nativeElement.animate({
      scale: { x: 1, y: 1 },
      // curve: AnimationCurve.cubicBezier(1, .02, .45, .93),
      duration: 300
    })
  }

}
