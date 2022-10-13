import { HangmanService } from './../../services/hangman.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
 question: string = '';
 questions: string[] = [];
 guesses: string[] = [];
 categories: string[]= [];
 category: string = '';
 all: any= [];
 restartGameBtnShown = false;
  constructor(private hangmanService: HangmanService) { }

  ngOnInit(): void {
    this.hangmanService.getQuestions().subscribe((response) => {
      this.all = response.all;
      // for( var i =0; i<this.all.length; i++){
      //   this.questions =this.all[i].items;
      //   this.categories = this.all[i].category;
      // }
      
      // console.log("questions", this.questions);
      // console.log("category", this.categories);
      console.log("all", this.all);
      
      
      this.pickNewQuestion();
    });
  }
  guess(letter: string){
    if(!letter || this.guesses.includes(letter)){
      return;
    }
    this.guesses = [...this.guesses, letter];
  }
  dummyClick(){
    const key = prompt ('Enter a key') || '';
    this.guess(key); 
  }
  reset(){
    this.guesses = [];
    this.pickNewQuestion();
    this.restartGameBtnShown = false;
  }
  pickNewQuestion() {
    const randomIndex = Math.floor(Math.random() * this.all.length);
    const randomItem = Math.floor(Math.random() * this.all[randomIndex].items.length);
    this.question = this.all[randomIndex].items[randomItem];
    this.category = this.all[randomIndex].category;
console.log("category", this.category);

    
    console.log(this.question);
    
    
  }
  onGameFinished(){
    this.restartGameBtnShown = true;
  }

}
