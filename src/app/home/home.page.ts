/* eslint-disable prefer-const */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('textAnimation') textAnimation: ElementRef;
  textAnimationNativeElement: any;

  @ViewChild('simpleCanAni') simpleCanAni: ElementRef<HTMLCanvasElement>;
  simpleCanvasAnimation: any;
  ctx: CanvasRenderingContext2D;

  @ViewChild('cardContent') cardContent: ElementRef;

  requestId;
  isAnimationStarted = [false];

  // Simple Text Animation variable
  startTime: any;
  previousTimeStamp: any;

  cursor = {
    x: innerWidth / 2,
    y: innerHeight / 2,
  };

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {}

  ionViewDidEnter() {
    this.textAnimationNativeElement = this.textAnimation.nativeElement;
    this.simpleCanvasAnimation = this.simpleCanAni.nativeElement;
  }

  textAnimationFunction() {
    let count: any;
    this.requestId = requestAnimationFrame((timestamp) => {
      this.textAnimationFunction();

      this.isAnimationStarted[0] = true;
      if (this.startTime === undefined) {
        this.startTime = timestamp;
      }

      const elapsed = timestamp - this.startTime;

      if (this.previousTimeStamp !== timestamp) {
        count = Math.min(0.1 * elapsed, 200);

        this.textAnimationNativeElement.style.transform =
          'translateX(' + count + 'px)';
      }

      if (elapsed > 2000) {
        // Stop the animation after 2 seconds
        this.previousTimeStamp = timestamp;
        window.cancelAnimationFrame(this.requestId);

        // Re-set Animation
        this.textAnimationNativeElement.style.transform =
          'translateX(' + 0 + 'px)';
        this.startTime = undefined;
        timestamp = 0;
        count = 0;

        this.isAnimationStarted[0] = false;
      }
    });
  }

  simpleCanvasAnimationFunction() {
    const cardContentWidth = this.cardContent.nativeElement.offsetWidth;

    this.isAnimationStarted[1] = true;

    let x: any = 0;
    let y: any = 0;
    let ctx: CanvasRenderingContext2D;

    ctx = this.simpleCanvasAnimation.getContext('2d');

    ctx.globalAlpha = 1; // Transperence min 0 and Max 1

    this.clearCtx(ctx);

    this.requestId = requestAnimationFrame((timestamp) => {
      this.simpleCanvasAnimationFunction();

      if (this.startTime === undefined) {
        this.startTime = timestamp;
      }
      const elapsed = timestamp - this.startTime;
      x = Math.min(0.1 * elapsed, cardContentWidth);
      y = Math.min(0.1 * elapsed, 100);

      this.drawAnimatedRectangle(ctx, x, y);

      if (Math.round(x) === cardContentWidth) {
        window.cancelAnimationFrame(this.requestId);
        this.startTime = undefined;
        timestamp = 0;
        x = 0;

        this.isAnimationStarted[1] = false;
      }
    });
  }

  drawAnimatedRectangle(ctx, x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, 50, 50, 50);
  }

  clearCtx(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.requestId);
  }
}
