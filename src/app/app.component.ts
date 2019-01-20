import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public sideMenu = 'close';

  controlNav() {
    if (this.sideMenu === 'close') {
      this.sideMenu = 'open';
      document.getElementById('mySidenav').style.width = '250px';
      document.getElementById('main').style.marginLeft = '250px';
    } else {
      this.sideMenu = 'close';
      document.getElementById('mySidenav').style.width = '0';
      document.getElementById('main').style.marginLeft = '0';
    }
  }

}
