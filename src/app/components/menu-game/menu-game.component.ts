import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-menu-game',
  templateUrl: './menu-game.component.html',
  styleUrl: './menu-game.component.css'
})
export class MenuGameComponent {
  
  @Input() titleGame: string = ''
  @Input() timer: number = 99; // Tempo total do jogo em segundos
  @Input() isPlaying: boolean = false;
  @Input() points: number = 0;
  @Input() selectedValue: number = 8;

  @Output() onOptionClicked = new EventEmitter<Event>();
  @Output() onStartGame = new EventEmitter<void>();
  @Output() onResetGame = new EventEmitter<void>();

  // Function to emit the event
  onOptionSelected(value: Event) {
    this.onOptionClicked.emit(value);
  }

  onStartGameSelected() {
    this.onStartGame.emit();
  }

  onResetGameSelected() {
    this.onResetGame.emit();
  }
}