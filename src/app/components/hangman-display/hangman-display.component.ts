import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
// import * as $ from 'jquery';

@Component({
  selector: 'app-hangman-display',
  templateUrl: './hangman-display.component.html',
  styleUrls: ['./hangman-display.component.css']
})
export class HangmanDisplayComponent implements OnInit, OnChanges {
  @Input() guesses: string[] = [];
  @Input() question: string = '';
@Input() category: string = '';
  @Output() gameFinished = new EventEmitter<boolean>();
 MAX_MISTAKES = 5;
 mistakesRemining;
 success: boolean = false;
// water = document.getElementById('water');
  constructor() { 
    this.mistakesRemining = this.MAX_MISTAKES;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(
    changes?.['question']?.currentValue &&
    changes?.['question']?.currentValue !== changes?.['question'].previousValue
    ){
      
      this.mistakesRemining = this.MAX_MISTAKES;
      this.success = false;
    }
    const guessesCurrentValue = changes?.['guesses']?.currentValue;
    if(guessesCurrentValue && 
      guessesCurrentValue.length &&
      guessesCurrentValue !== changes['guesses'].previousValue
    ){
      const char = [...guessesCurrentValue].pop();
      this.checkGuess(char);
    }
  }

  checkGuess(letter: string){
    let didWin = true;
    this.mistakesRemining -= this.wasGuessAMistake(letter);
    for(var i =0; i<this.question.length; i++){
      if(!this.guesses.find((guess) => guess.toLowerCase() === this.question[i].toLowerCase())){
        didWin = false;
        break;
      }
    }
    this.success = didWin;
    if(this.success || this.mistakesRemining === 0){
      
      this.gameFinished.emit(this.success);
      
    }
    console.log(this.mistakesRemining);

    // let water = document.getElementsByClassName('water')[0] as HTMLElement;
    // console.log(water);
    
    // switch(this.mistakesRemining){
      
    //   case 6:
    //     water.style.height = "200px";
    //     break;
    //   case 5:
    //     water.style.height = "210px";
    //     break;
    //   case 4:
    //     water.style.height = "230px";
    //     break;
    //   case 3:
    //     water.style.height = "250px";
    //     break;
    //   case 2:
    //     water.style.height = "275px";
    //     break;
    //   case 1:
    //     water.style.height = "280px";
    //     break;
    //   default:
    //     water.style.height = "180px";

    // }
   
    
    
  }
  wasGuessAMistake(letter: string){
    let wasMistake = false;
    for(var i =0; i<this.question.length;i++){
      if(this.question[i].toLowerCase()===letter.toLowerCase()){
        return 0;
      }
    }
   return 1;
  }
  ngOnInit(): void {    
  }
 
 
}
