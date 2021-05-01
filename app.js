class Drumkit{
    constructor(){
        this.pads=document.querySelectorAll('.pad');
        this.playBtn=document.querySelector('.play');
        this.kickAudio=document.querySelector('.kick-sound');
        this.clapAudio=document.querySelector('.clap-sound');
        this.hihatAudio=document.querySelector('.hihat-sound');
        this.index=0;
        this.bpm=150;
        this.isPlay=null;
        this.selects=document.querySelectorAll('select');
        this.mutBtns=document.querySelectorAll('.mute');
        this.tempoSlider=document.querySelector('.tempo-slider');
        this.tempoNr=document.querySelector('.tempo-nr');
    }
    activePads(){
        this.classList.toggle("active");
    }
    repeat(){
        let repeater= this.index % 8;
        const activeBars=document.querySelectorAll(`.b${repeater}`);
        activeBars.forEach(bar=>{
            bar.style.animation =`playAnimation 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains('active')){
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime=0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('clap-pad')){
                    this.clapAudio.currentTime=0;
                    this.clapAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime=0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        let interval= (60/this.bpm) *1000;
        if(this.isPlay){
            clearInterval(this.isPlay);
            this.isPlay=null;
        }
        else{
        this.isPlay=setInterval(()=>{
            this.repeat();
        },interval);
        }
    }
    updateBtn(){
        console.log(this.isPlay);
        if(this.isPlay){
            this.playBtn.classList.add('active');
            this.playBtn.innerText="Stop";
        }
        else{
            this.playBtn.classList.remove('active');
            this.playBtn.innerText="Play";
        }
    }
    changeSound(e){
        const selectedName=e.target.name;
        const selectedSound=e.target.value;
          switch(selectedName){
            case 'kick-select':
                this.kickAudio.src=selectedSound;
                break;
            case 'clap-select':
                this.clapAudio.src=selectedSound;
                break;
            case 'hihat-select':
                this.hihatAudio.src=selectedSound;
                break;    
        }
    }
    mute(e){
        const muteTracker=e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        console.log(muteTracker);
        if(e.target.classList.contains('active')){
        switch(muteTracker){
            case '0':
                this.kickAudio.volume=0;
                break;
            case '1':
                this.clapAudio.volume=0;
                break;
            case '2':
                this.hihatAudio.volume=0;
                break;    
        }
    }
    else{
        switch(muteTracker){
            case '0':
                this.kickAudio.volume=1;
                break;
            case '1':
                this.clapAudio.volume=1;
                break;
            case '2':
                this.hihatAudio.volume=1;
                break; 
    }
    }
 }
 changeTempo(e){
    this.tempoNr.innerText=e.target.value;

 }
 updateTempo(e){
    this.bpm=e.target.value;
    clearInterval(this.isPlay);
    this.isPlay=null;
    if(this.playBtn.classList.contains('active')){ 
        this.start();
    }
 }
}
const drumkit= new Drumkit();
drumkit.playBtn.addEventListener("click",function(){
    drumkit.start(); 
    drumkit.updateBtn();
});
drumkit.mutBtns.forEach(mutBtn=>{
    mutBtn.addEventListener('click',function(e){
        drumkit.mute(e);
    })
})
drumkit.pads.forEach(pad=>{
    pad.addEventListener('click',drumkit.activePads);
    pad.addEventListener('animationend',function(){
        this.style.animation="";
    });
})
drumkit.selects.forEach(select=>{
    select.addEventListener('change',function(e){
        drumkit.changeSound(e);
    } 
)});
drumkit.tempoSlider.addEventListener('input',function(e){
    drumkit.changeTempo(e);
});
drumkit.tempoSlider.addEventListener('change',function(e){
    drumkit.updateTempo(e);
});
