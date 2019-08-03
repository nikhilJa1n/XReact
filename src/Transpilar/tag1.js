const name = 'lokpati i am odi osi fidsjofi  mishra'; 
 const surname = 'mishra'; 
  
 class Component { 
     constructor() { 
         this.handleClick = this.handleClick.bind(this); 
     } 
   handleClick(){ 
       console.log('hit me '); 
   } 
  
 render() { 
     return createElement('button', { onClick:{ this.handleClick.bind(this) }, } , createElement('TEXT_ELEMENT', { textValue:"hit me  \n  ", } ))
 }} 
  
  
 const expression = 'hi i am in'; 
  
 const instance = new Component();
 console.log(instance);
 