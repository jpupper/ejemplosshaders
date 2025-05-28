
let rdm1,rdm2 ;
let lf1 ,lf2;

let colorbmode ;

const colores = [
  '#a173ad',
  '#9b4ba0',
  '#262626',
  '#e5e5e5',
  '#f4f4f4',
  '#801a86'
];
class CoralManager {
    constructor() {

        this.name = "Alien";
        this.dir = "Alien";
        this.localUniformsNames = [];
        this.localUniformsValues = [];
        this.loaded = false;
        this.generate = true;

        this.cosos = [];
        this.maxpasadas = 8;
        this.dif = Math.PI/4
        this.flag = true;

        const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];

        const colorAleatorio2 = colores[Math.floor(Math.random() * colores.length)];
        this.c1 = colorAleatorio;
        this.c2 = colorAleatorio2;

        this.maxsp = 3;

        this.corals1 = createGraphics(windowWidth,windowHeight);
        
        this.RM = new RenderManager();
        this.RM.addShader('shaders/imageprocessing/arena2.frag', 0, "papel.frag");
    }
    setup() {
        let cnt = floor(genR(4,10));
        
       // lf1 = genR(7,10);
        //lf2 = genR(15,19);
        rdm1 = genR(.5);
        rdm2 = genR(.5);


        lf1 = genR(10,25);
        lf2 = genR(18,25);

        lf1 = genR(7,25);
        lf2 = genR(7,25);
        let distribucion = genR(1) > .2;


        colorbmode = floor(genR(3));
//        this.RM.sh[0].

        this.RM.objts[0].localUniformsValues[0] = red(this.c1)/255.;
        this.RM.objts[0].localUniformsValues[1] = green(this.c1)/255.;
        this.RM.objts[0].localUniformsValues[2] = blue(this.c1)/255.;
        
        this.RM.objts[0].localUniformsValues[3] = red(this.c1)/255.;
        this.RM.objts[0].localUniformsValues[4] = green(this.c1)/255.;
        this.RM.objts[0].localUniformsValues[5] = blue(this.c1)/255.;

        this.RM.objts[0].localUniformsValues[5] = blue(this.c1)/255.;


      //  distribucion = false;
        if(distribucion){
            for(let i=0; i<cnt;i++){
                this.addCoso(genR(width*2/8,width*6/8),genR(height*2/8,height*6/8));
            }
        }else{
            let cnt1 = floor(2);
            let cnt2 = floor(2);
            for(let i=0; i<cnt1;i++){
                for(let k=0; k<cnt2;k++){
                    let x = map(i,0,cnt1-1,width*2/8,width*6/8);
                    let y = map(k,0,cnt2-1,height*2/8,height*6/8);



                    this.addCoso(x,y);

                    
                }
            }
        }
    }
    
    draw(_ps) {
        this.drawCorals(this.corals1);
        this.RM.update();
        this.RM.updateDrawOnBuffers();
        _ps.image(this.RM.pgs[0],0,0);
  
       this.RM.objts[0].sh.setUniform("tx", this.corals1);
       // image(this.RM.pgs[0],0,0);
       
       
    }
    drawCorals(_ps){
        
       // _ps.ellipse(width/2,height/2,800,800);
       // console.log("COSOS LENGHT"+this.cosos.length);
       for (var i = 0; i<this.cosos.length; i++) {
        var c = this.cosos[i];
        c.update();
        c.display(_ps);
        if (c.vueltas > c.maxlife || this.cosos.length > 2000) {
        //cosos.remove(c);
        this.cosos.splice(i,1);
        }
    }
    
    for (var i = 0; i<this.cosos.length; i++) {
        var c = this.cosos[i];
        for (var k = 0; k<this.cosos.length; k++) {
            var c2 = this.cosos[k];
            if (i != k) {
                c.check(c2);
            }
        }
        if (c.life <0) {
        if (c.pasadas <  c.pasadasmax ) {
          
          if(c.pasadas == c.pasadasmax && genR(1) > .2 || c.pasadas <  c.pasadasmax-1){
            var a = c.speed.heading();
            var cn1 = new Coso(c.ap.x, c.ap.y, c.pasadas+1);
            var cn2 = new Coso(c.ap.x, c.ap.y, c.pasadas+1);
            var cn3 = new Coso(c.ap.x, c.ap.y, c.pasadas+1);
            var cn4 = new Coso(c.ap.x, c.ap.y, c.pasadas+1);
            cn1.col1 = c.col1;
            cn1.col2 = c.col2;
            cn2.col1 = c.col1;
            cn2.col2 = c.col2;
            var fas = 0;
            var vel1x = cos(a+this.dif+fas);
            var vel1y = sin(a+this.dif+fas);
            var vel2x = cos(a-this.dif+fas);
            var vel2y = sin(a-this.dif+fas);
            
            var stspeed = genR(1,2);
            cn1.speed = createVector(vel1x, vel1y);
            cn2.speed = createVector(vel2x, vel2y);
            cn1.speed.mult(stspeed);
            cn2.speed.mult(stspeed);
            
            //cn3.speed = new PVector(width-vel1x, height-vel1y);
            //cn3.speed = new PVector(height-vel2x, height-vel2y);

            var spm = map(c.pasadas, 0, this.maxpasadas, 0, 10);
            this.cosos.push(cn2);
            this.cosos.push(cn1);
            
          }
        }
        this.cosos.splice(i,1);
        }
    }

    if (mouseIsPressed &&  !this.flag ) {
        // addCoso();
        if(mouseButton === LEFT){
          
          this.addCoso(mouseX,mouseY);
        }else {
          _ps.background(0);
        }
       
        this.flag =true;
    }

    if(!mouseIsPressed){
        this.flag = false;
    }
    }

    update() {
        //this.particles.update();
        //this.RM.update();
      //  this.addCoso();
    }
    addCoso(_x,_y) {
  
  
        var c1 = colores[Math.floor(Math.random() * colores.length)];
        var c2 = colores[Math.floor(Math.random() * colores.length)];
        
        
        //c1 = color(255,0,0);
        //c2 = color(0,0,255,150);
        
       //c1 = lerpColor(c1,this.c1,0.7);
        //c2 = lerpColor(c2,this.c2,0.7);
        var cnt = 2;
          
        
        for (var i=0; i<cnt; i++) {
          var cos = new Coso(_x, _y, 0);
          var a = map(i,0,cnt,0,TWO_PI);
        //  var asped = atan2(pmouseY-mouseY, pmouseX-mouseX)-PI;
          var spx = Math.sin(a);
          var spy = Math.cos(a);
          cos.speed = createVector(spx, spy);
       //   cos.speed.mult(30);
          //cos.col1 = color(genR(100, 255), genR(100, 255), 0);
          //cos.col2 = color(100, genR(100, 255), genR(10));
          var cy = genR(100);
          cos.col2 = color(red(c1), green(c1), blue(c1));
          cos.col1 = color(red(c2), green(c2), blue(c2));
          cos.col1 =color(colores[Math.floor(Math.random() * colores.length)]);
          cos.col1 = color(colores[Math.floor(Math.random() * colores.length)]);
        /*  if(genR(1) > .5){
          cos.col2 = color(red(c1), cy+green(c1), cy+blue(c1));
          cos.col1 = color(red(c2), green(c2), blue(c2));
        }else{
          cos.col2 = color(red(c1),genR(green(c1))+genR(50), cy+blue(c1));
          cos.col1 = color(red(c2), genR(green(c2))+genR(50), blue(c2));
        }*/

          
          this.cosos.push(cos);
        }
    }
   
}


class Coso {
  
    constructor(x,y, _pas) {
        
  
      this.p1 = createVector(x, y);
      this.maxpasadas = 9;
      this.pasadas = _pas;
      this.life =255;
      var stspeed = 9;
      this.speed= createVector(genR(-stspeed, stspeed), genR(-stspeed, stspeed));
  
      this.lasttime = millis();
      this.duration = 400;
      var ls = 600;
      this.p2 = createVector(this.p1.x+genR(-ls, ls), this.p1.y+genR(-ls, ls));
      this.ap = createVector(this.p1.x, this.p1.y);
      //col1 = color(genR(255), genR(100), genR(100), 5);
      //col2 = color(genR(50, 255), genR(20, 100), genR(100, 255), 5);
      
      
      let c1r = genR(255);
      let c2r = genR(255);

     /* this.col1 = color(c1r, genR(c1r), genR(255), 5);
      this.col2 = color(c2r, genR(c2r), genR(100, 255), 5);
      
      this.col1 = color(255,0,0);
      
      this.col2 = color(0,0,255);*/
      //col1 = color(genR(255),genR(255),genR(255));   
      //col2 = color(genR(255),genR(255),genR(255));   
      
       
      this.col1 = color(255,0,0);
      
      this.col2 = color(0,0,255);
      this.size1 = genR(100);
      this.size2 = genR(15000);
  
      this.strk1 = 1;
      this.strk2 = 4;
      this.rot1 = genR(PI*4);
      this.rot2 = genR(PI*4);
      this.maxlife = genR(10);
      this.vueltas = 0;
      this.asize = map(this.pasadas, 0, this.maxpasadas, 20, 3);
      
      this.pasadasmax = genR(3,this.maxpasadas);
      this.acol = color(255,0,0);

      let rdmlf = genR(15);
      this.lf1 = lf1 + genR(-rdmlf*.5,+rdmlf);
      this.lf2 = lf2 + genR(-rdmlf*.5,+rdmlf);
     }
  
     display(_ps) {
       // console.log("CORRE DRAW");

       
      _ps.noFill();
      _ps.noStroke();
      _ps.fill(this.acol, map(this.pasadas,0,this.maxpasadas,50,10));
      _ps.strokeWeight(map(this.pasadas,0,this.maxpasadas,this.strk1,this.strk2));
      _ps.push();	
      //this.bacol.setAlpha(70);
      _ps.stroke(this.bacol);
      _ps.ellipse(this.ap.x, this.ap.y, this.asize*genR(1.5,2), this.asize*genR(1.5,2));
      _ps.pop();
    }
    
    
    update() {
     // var counter = map(millis()-this.lasttime, 0, duration, 0, 1);
  
      var counter =0.0;
      this.ap.add(this.speed);
      //  ap.x = map(counter,0,1,p1.x,p2.x);
      // ap.y = map(counter,0,1,p1.y,p2.y);
  
      /*if(colorbmode == 0){
        this.acol = lerpColor(this.col1, this.col2, map(this.pasadas, 0, this.maxpasadas, 0, 1));
        this.bacol = color(0); 
      }*/

    //  colorbmode = 0;
    //this.acol = color(255,0,0);
    //this.bacol = color(0,0,255)
    //this.acol = lerpColor(color(this.col1), color(this.col2), map(this.pasadas, 0, this.maxpasadas, 0, 1));
    //this.bacol = lerpColor(color(this.col1), color(genR(255)), map(this.pasadas, 0, this.maxpasadas, 0, 1)); 
      if(colorbmode == 0){
        this.acol = lerpColor(this.col1, this.col2, map(this.pasadas, 0, this.maxpasadas, 0, 1));
        this.bacol = lerpColor(this.col1, color(genR(255)), map(this.pasadas, 0, this.maxpasadas, 0, 1)); 
      }
      if(colorbmode == 1){
        this.acol = lerpColor(this.col1, this.col2, map(this.pasadas, 0, this.maxpasadas, 0, 1));
        this.bacol = lerpColor(this.col1, color(255), map(this.pasadas, 0, this.maxpasadas, 0, 1)); 
      }
      if(colorbmode == 2){
        this.bacol = lerpColor(this.col1, this.col2, map(this.pasadas, 0, this.maxpasadas, 0, 1));
        this.acol = lerpColor(this.col2,color(sin(millis()*0.0025)*127+127), map(this.pasadas, 0, this.maxpasadas, 0, 1)); 
      }
    
   //   bacol = color(255-red(bacol),255-green(bacol),255-blue(bacol));
      
      // asize = map(counter,0,1,size1,size2);
      this.astrk = map(counter, 0, 1, this.strk1, this.strk2);
      this.arot = map(counter, 0, 1, this.rot1, this.rot2);
      //asize = 3;
      this.life-=map(this.pasadas, 0, this.maxpasadas, this.lf1, this.lf2);
      var rdm = map(this.pasadas, 0, this.maxpasadas, rdm1,rdm2);
      
      this.speed.x+=genR(-rdm, rdm);
      this.speed.y+=genR(-rdm, rdm)
  
    }
  
    check(c) {
        //Ni idea que hace esta parte
      var limit =40;
     // var d = dist(c.ap.x, c.ap.y, ap.x, ap.y); ? 
    }
  }