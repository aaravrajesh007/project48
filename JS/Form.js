class Form{
    
    constructor(){
        this.input=createInput("Name");
        this.button=createButton("Play");
        this.greeting=createElement('h3');
        this.title=createElement('h2');
        this.resetButton=createButton("Reset")
    }
    formHide(){
        this.greeting.hide();
        this.button.hide();
        this.input.hide();
        this.title.hide();
    }
    display(){
        this.title.html("Running Race Game");
        this.title.position(displayWidth/2-100,0);

        this.input.position(displayWidth/2-100,displayHeight/2-100);

        this.button.position(displayWidth/2-40,displayHeight/2-75);
        this.resetButton.position(displayWidth-100,20);  
        this.resetButton.mousePressed(()=>{
            runner.updatepc(0);
            game.updateGS(0);
            database.ref('/').update({
                runners:null,
                PlayersAtEnd:0
            })
        })
        this.button.mousePressed(()=>{
            this.input.hide();
            this.button.hide();
            runner.name=this.input.value();
            pc+=1
            runner.index=pc
            runner.update();
            runner.updatepc(pc);
            
           this.greeting.html("Hello "+runner.name);
           this.greeting.position(displayWidth/2-100,displayHeight/4);
        })
    }
    
}