const readline = require('node:readline');

const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });

const workDuration = 25*60;//in seconds
const smallBreakDuration = 5*60;//all are in seconds
const longBreakDuration = 20*60;
let pomodoro = 4;

function startTimer(type,duration){
    console.log(`${type} timer started`);
    
      let currsecond = 0;
      
      const intervalId = setInterval(()=>{
        currsecond++;
        console.log(currsecond);
        
        if(currsecond === duration-1){
          clearInterval(intervalId);
        }
      },1000)
    
    setTimeout(()=>{
      console.log(`${type} timer finished`);
      
      if(type==="work"){
        if(pomodoro === 1){
          pomodoro = 4;
          startTimer("break",longBreakDuration);
        }else{
          startTimer("break",smallBreakDuration);
        }
        
      }else if(type==="break"){
        pomodoro--;
        startTimer("work",workDuration)
      }
    },duration*1000)
}

rl.question('Press Y to start the timer ', (answer) => {
  if(answer==="Y" || answer==="y"){
    startTimer("work",workDuration);
  }else{
    console.log("Bye");
    rl.close();
  }

  
});