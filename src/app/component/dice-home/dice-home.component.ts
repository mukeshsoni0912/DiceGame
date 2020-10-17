import { Component, OnInit ,Output, Input, EventEmitter, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';

@Component({
  selector: 'app-dice-home',
  templateUrl: './dice-home.component.html',
  styleUrls: ['./dice-home.component.css']
})
export class DiceHomeComponent implements OnInit {
  @Input() playersArr: any;
  @Input() accumulatePoints: any;
  activePlayerIndex: any = 0;
  disabledCount = 0;
  randomNum : any;
  rollDiceShown = true;
  pointTable = true;
  rankingArr = [];
  rankingObj = {};

  constructor() { }

  ngOnInit() {
  	this.playersArr[0].isActive = true;

  }

//dice roll
  rollDice(){
  	this.rollDiceShown = false;
    let playerObj = this.playersArr[this.activePlayerIndex];
  	this.randomNum = Math.floor(Math.random() * 6) + 1  ;
  	playerObj['score']=playerObj['score']+ this.randomNum;

    //condition for maintaining rank score 
    if(playerObj['score']< this.accumulatePoints){
    	playerObj['rankScore'] = playerObj['score']
    }
    else{
      this.disabledCount++;
      playerObj['disabled'] =  true;
      playerObj['rankScore'] = this.accumulatePoints;
    }
  	setTimeout(()=>{
  		playerObj['isActive']=false;

      // If a player rolls the value "6" then they immediately get another chance to roll again and move ahead in the game.
  		if(this.randomNum==6 && !playerObj['disabled']){
        playerObj['lastScore']=6
  			this.randomNum=0;
  			playerObj['isActive']=true;
  			this.rollDiceShown = true;
  			this.getRankings(this.playersArr);
  			return;
  		}

      //If a player rolls the value "1" two consecutive time then set missTurn flag true.
  		else if(this.randomNum==1 && playerObj['lastScore']==1){
  			playerObj['missTurn'] = true;
  		}
  		else{
  			playerObj['lastScore']= this.randomNum;
  		}
  		if(this.activePlayerIndex!=this.playersArr.length-1){
	  		this.activePlayerIndex = this.activePlayerIndex+1
  		}
  		else{
  			this.activePlayerIndex = 0;
  		}

      //if next player cant play due to cnsecutive rolls 1 or already reached at accumulated points checking by disabled flag and find next player
  		while(this.playersArr[this.activePlayerIndex]['missTurn']==true || this.playersArr[this.activePlayerIndex]['disabled']==true){
        if(this.disabledCount >= this.playersArr.length-1){
          this.pointTable =false;
          break;
        }
  			this.playersArr[this.activePlayerIndex]['missTurn']=false;
  			if(this.activePlayerIndex!=this.playersArr.length-1){
	  		this.activePlayerIndex = this.activePlayerIndex+1
	  		}
	  		else{
	  			this.activePlayerIndex = 0;
	  		}

  		}
  		this.randomNum=0;
  		this.playersArr[this.activePlayerIndex]['isActive']=true;
  		this.rollDiceShown = true;
  		this.getRankings(this.playersArr);
      if(this.disabledCount >= this.playersArr.length-1){
          this.pointTable =false;
        }
  	 }, 2000);
  }


// find player ranking according to score and time 
  getRankings(playersArr){
  	this.rankingArr = JSON.parse(JSON.stringify(playersArr));
  	this.rankingArr.sort(function(a, b) {
	  let score1 = a.rankScore,
	     score2 = b.rankScore;
	  if (score1 < score2) return 1;
	  if (score1 > score2) return -1;
	  return 0;
	});
    this.rankingArr.forEach((player, i)=> {
       this.rankingObj[player.name] = i+1;
      });
  }
}
