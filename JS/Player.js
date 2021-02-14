class Player{
    
    constructor(){
  this.index=null;
  this.distance=0;
  this.name=null;
  this.rank=1;
    }
    getCount(){
        var pcref=database.ref('playerCount');
        pcref.on("value",(data)=>{
            pc=data.val();
        })
    }
    updatepc(count){
        database.ref('/').update({
            'playerCount':count
          })
    }
    update(){
        var playerIndex="runners/runner"+this.index;
        database.ref(playerIndex).set({
            'name':this.name,
            'distance':this.distance,  
            'rank':this.rank+1
          })
    }
    static getPlayerinfo(){
        var playerinforef=database.ref('runners');
        playerinforef.on("value",(data)=>{
            allPlayers=data.val();
        })
    }
    getPlayersAtEnd(){
        var carsatend=database.ref('PlayersAtEnd');
        carsatend.on("value",(data)=>{
            this.rank=data.val();
        })
    }

    static updatePlayersAtEnd(r){
        database.ref('/').update({
            'PlayersAtEnd':r
        })
    }
    
}