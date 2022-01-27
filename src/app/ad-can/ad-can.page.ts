/* eslint-disable no-var */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-ad-can',
  templateUrl: './ad-can.page.html',
  styleUrls: ['./ad-can.page.scss'],
})
export class AdCanPage implements OnInit {
  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  canvasElement: any;
  ctx: CanvasRenderingContext2D;

  x = 100;
  y = 100;
  radius = 25;
  color = 'blue';

  vx = 5;
  vy = 2;

  requestId;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.canvasElement = this.canvas.nativeElement;

    this.canvasElement.addEventListener('mouseover', (e) => {
      this.requestId = window.requestAnimationFrame(() => this.draw());
    });

    this.canvasElement.addEventListener('mouseout', (e) => {
      window.cancelAnimationFrame(this.requestId);
    });
  }

  draw() {
    this.ctx = this.canvasElement.getContext('2d');

    // * To Trailing effect
    this.trailingEffect(this.ctx);

    // * To clear Canvas
    // this.claerCanvas(this.ctx);

    this.requestId = requestAnimationFrame((timestamp) => {
      this.draw();

      this.x += this.vx;
      this.y += this.vy;

      // Adding Acceleration
      this.vy *= 0.99;
      this.vy += 0.25;

      // adding collision boundary
      if (
        this.y + this.vy > this.canvasElement.height ||
        this.y + this.vy < 0
      ) {
        this.vy = -this.vy;
      }
      if (this.x + this.vx > this.canvasElement.width || this.x + this.vx < 0) {
        this.vx = -this.vx;
      }

      // Draw Shape
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      this.ctx.closePath();
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    });
  }

  trailingEffect(ctx) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.fillRect(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
  }

  claerCanvas(ctx) {
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
  }
}
