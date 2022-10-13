import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'hangman';
  showInst: boolean = false;
  showAbout:boolean =false;
  water = document.getElementById("water") as HTMLElement;
  constructor(){}
ngOnInit(): void {
  
}
  changeInst(){
    this.showInst = true;
    // this.water?.style.position == "unset";
    // console.log(this.water);
    
  }
  changeAbout(){
    this.showAbout = true;

  }
  onCloseModal(){
    this.showInst = false;
    this.showAbout = false;
    this.water?.style.position == "fixed";
  }
}
