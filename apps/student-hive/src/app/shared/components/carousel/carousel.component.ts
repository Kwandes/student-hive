/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';

interface ISlide {
  text: string;
  link: string;
}

@Component({
  selector: 'student-hive-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss', './background-glow.component.scss'],
})
export class CarouselComponent implements AfterViewInit, OnChanges {
  @ViewChild('slickModal') slickModal: any;

  @Input()
  slides: ISlide[] = [];
  mulitpliedSlides = this.slides;
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  ngAfterViewInit(): void {
    // multipy the obtained slides to avoid the weird skipping when end of array is reached
    this.mulitpliedSlides = this.slides
      .concat(this.slides)
      .concat(this.slides)
      .concat(this.slides)
      .concat(this.slides);
    // skip a few slides forward
    this.slickModal.slickGoTo(this.slides.length);
  }

  ngOnChanges(): void {
    this.mulitpliedSlides = this.slides
      .concat(this.slides)
      .concat(this.slides)
      .concat(this.slides)
      .concat(this.slides);
    this.slickModal?.slickGoTo(this.slides.length);
  }

  slickInit(e: any) {
    // console.log('slick initialized', e);
  }

  breakpoint(e: any) {
    // console.log('breakpoint', e);
  }

  beforeChange(e: any) {
    // console.log('beforeChange', e);
  }

  afterChange(e: any) {
    // console.log('afterChange', e);
  }
}
