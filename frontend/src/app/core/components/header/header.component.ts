import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isAuth!: boolean;
  @Output() displayLoginComponentChange: EventEmitter<boolean> = new EventEmitter()
  screenWidth!: number;
  toggleMenu: boolean = false;

  constructor() { }


  ngOnInit(): void {
    console.log('header ', this.isAuth);

    this.screenWidth = window.innerWidth

  }

  displayLoginComponent() {
    this.toggleMenu = false
    this.displayLoginComponentChange.emit(true)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.toggleMenu === true && this.screenWidth > 970) {
      this.toggleMenu = false
    }
  }

  displayToggleMenu() {
    this.toggleMenu = true

  }

  hideToggleMenu() {
    this.toggleMenu = false
  }
}

