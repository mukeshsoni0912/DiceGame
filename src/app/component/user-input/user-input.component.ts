import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {
	totalPlayers : Number;
	accumulatePoints : Number;
	playersArr: any = [];

  constructor() { }

  ngOnInit() {
  }

  start(){
  	for(let i=0 ; i<this.totalPlayers; i++){
  		this.playersArr.push({
  			name:"player"+(i+1),
  			score:0,
  			missTurn:false,
  			rank:null,
        lastScore:0,
        disabled:false
  		})
  	}
  }

}
