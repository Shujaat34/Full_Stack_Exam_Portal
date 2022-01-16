import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.carousel();
  }

  myIndex = 0;

  carousel() {
    let i;
    let x = Array.from(document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>)
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";  
    }
    this.myIndex++;
    if (this.myIndex > x.length) {this.myIndex = 1}    
    x[this.myIndex-1].style.display = "block";  
    window.setTimeout(()=>{
      this.carousel();
    }, 3000); // Change image every 5 seconds
  }

}
