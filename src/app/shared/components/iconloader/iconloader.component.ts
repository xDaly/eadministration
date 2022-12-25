import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'icon-loader',
  template:
  `
    <img src="src/assets/icons/{{ name }}.svg" width="{{ size }}">

  `,
  styleUrls: ['./iconloader.component.scss']
})
export class IconloaderComponent {

  @Input()
  size: string;
  @Input()
  name: string;

}
