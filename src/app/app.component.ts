import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokedex';
  numbers: number[] = Array.from({ length: 30 }, (_, i) => i + 1);

  ngOnInit(): void { 
    
  }
}