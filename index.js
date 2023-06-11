
const canvas = new fabric.Canvas('myCanvas', { preserveObjectStacking:true });

canvas.uniformScaling = true;
document.getElementById('fontSize').disabled=true;
document.getElementById('colorPicker').disabled=true;
document.getElementById('outlineColor').disabled=true;
document.getElementById('outlineThickness').defaultValue=0;
document.getElementById('outlineThickness').max=10;
document.getElementById('outlineThickness').disabled=true;




//////////

fabric.Image.fromURL('./img/CrewTee_Template_F_Black.png', function(img)  {


  canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas),{
               scaleX: canvas.width / img.width,
               scaleY: canvas.height / img.height
            });

});


////////////////////////


var boundingrectangle = new fabric.Rect({ 
  width: 250, 
  height: 350, 
  fill:"",
  stroke:"black",
  paintFirst: "stroke",
  strokeWidth:4,
  hasControls:false,
  hasBorders:false,
  selectable:false,
});


canvas.centerObject(boundingrectangle);
canvas.add(boundingrectangle);


/////////////////////////

var maxScaleX, maxScaleY;

/////////////////////////

document.getElementById('imageInput').addEventListener("change", function (e) {
 var reader = new FileReader();
 reader.onload = function(event){
  var imjObj = new Image();
  imjObj.src=event.target.result;
  imjObj.onload=function() {
    var image = new fabric.Image(imjObj);
    image.set({

      lockSkewingY:true,
      lockSkewingX:true,
      //centeredScaling:true,
      lockScalingFlip:true,
    });

    image.setControlsVisibility({
    mt: false, // middle top disable
    mb: false, // midle bottom
    ml: false, // middle left
    mr: false, // I think you get it
    //tr: false, // middle top disable
    //br: false,
    //bl:false,
});

    ////



    ////

    image.scaleToHeight(200);
    image.scaleToWidth(200);
    canvas.centerObject(image);
    canvas.add(image);
    canvas.renderAll();

   maxScaleX = boundingrectangle.width/image.width;
   maxScaleY = boundingrectangle.height/image.height;
  }


 }
 reader.readAsDataURL(e.target.files[0]);

});


////////////////////////

document.getElementById('removeImage').addEventListener("click", 
 function (e) {
 var object = canvas.getActiveObject();
  if (!object){
    alert('Please select an element to remove');
    return '';
  }
  canvas.remove(object);
});



var goodtop, goodbottom, goodleft , goodright;
var goodwidth, goodheight;
var boundingrectangleBottom=boundingrectangle.top + boundingrectangle.height;
var boundingrectangleRight=boundingrectangle.left + boundingrectangle.width;
var goodScaleX , goodScaleY;

canvas.on("object:moving", function(){
    var obj = canvas.getActiveObject();

    obj.setCoords();
    if(!obj.isContainedWithinObject(boundingrectangle)){
        obj.set('top',goodtop);
        obj.set('left',goodleft);   
    } else {
        goodtop = obj.top;
        goodleft = obj.left;
        //goodbottom=obj.top + obj.height;

        goodScaleX=obj.scaleX;
        goodScaleY=obj.scaleY;


        goodwidth = goodScaleX*obj.width;
        goodheight = goodScaleY*obj.height;
        

        goodbottom=obj.top + goodheight;
         
        
console.log("Obj Top: "+goodtop+"Obj Bottom" + goodbottom );
console.log("Topbound: "+boundingrectangle.top+"Bottombound: " + boundingrectangleBottom );
console.log("Obj Height: "+goodheight);
console.log("BoundHeight: "+boundingrectangle.height);
console.log("BoundHeight: "+boundingrectangle.height);

    }  
});

///////////////////////////


canvas.on("object:scaling", function(){


var obj = canvas.getActiveObject();


//////////

canvas.on('object:modified', function(event) {

  var obj = canvas.getActiveObject();

    if (event.target) {

      if (obj.isType('i-text'))
      {
      event.target.fontSize *= event.target.scaleX;
      event.target.fontSize = event.target.fontSize.toFixed(0);
      event.target.scaleX = 1;
      event.target.scaleY = 1;
      event.target._clearCache();
      //$("textarea#add-text-value").val(event.target.text);
      //$("#text-font-size").val(event.target.fontSize);
      document.getElementById('fontSize').value=event.target.fontSize;
      }
    }
  });

//////////



  console.log("in_X " + maxScaleX);
  console.log("in_Y " + maxScaleY);
  console.log("X " + obj.scaleX);
  console.log("Y " + obj.scaleY);

  
/**  if(obj.scaleX > maxScaleX) {
    obj.scaleX = maxScaleX;
    obj.left = lastGoodLeft;
    obj.top = lastGoodTop;
  }
  if(obj.scaleY > maxScaleY) {
    obj.scaleY = maxScaleY;
    obj.left = lastGoodLeft;
    obj.top = lastGoodTop;
  } **/

 if(!obj.isContainedWithinObject(boundingrectangle))
    {
    ////obj.scaleX = maxScaleX;
    ////obj.scaleY = maxScaleX;
    obj.scaleX = lastGoodScaleX;
    obj.scaleY = lastGoodScaleX;
    obj.left = lastGoodLeft;
    obj.top = lastGoodTop;
    }
    lastGoodTop = obj.top;
    lastGoodLeft = obj.left;
    lastGoodScaleX= obj.scaleX;
    lastGoodScaleY= obj.scaleY;




 
});


//////////////

var design_text;

document.getElementById('addText').addEventListener("click", 
 function (e) {

if(design_text==null)
{
  design_text=document.getElementById('textBox').value;
  document.getElementById('fontSize').disabled=true;
  console.log(design_text);

  // Instantiate an instance of fabric.IText
      var itext = new fabric.IText(design_text, {
        left: 10,
        top: 60,
        fontSize: 23,
        fontFamily: "Helvetica",
        //fontStyle: "italic",
        //stroke: "white",
        fill: "#000000",
        paintFirst: "stroke",
        lockScalingFlip:true,
        statefullCache:true,
        strokeUniform:true,
      });

          itext.setControlsVisibility({
    mt: false, // middle top disable
    mb: false, // midle bottom
    ml: false, // middle left
    mr: false, // I think you get it
    tr: false, // middle top disable
    //br: false,
    bl:false,
    tl:false,
    //mtr:false,
});

          document.getElementById("fontSize").value = itext.fontSize;

          design_text=null;
          document.getElementById('textBox').value=null;


      canvas.centerObject(itext);
      canvas.add(itext);
      canvas.renderAll();


  }


});

/////////////


document.getElementById("fontSize").addEventListener("change", 
  function(){
    obj.fontSize=document.getElementById("fontSize").value;
    canvas.renderAll();
  });


document.getElementById("colorPicker").addEventListener("change", 
  function(){
    obj.fill=document.getElementById("colorPicker").value;
    
    canvas.renderAll();
  });




document.getElementById("outlineColor").addEventListener("change", 
  function(){
    obj.stroke=document.getElementById("outlineColor").value;
    canvas.renderAll();
  });


document.getElementById("outlineThickness").addEventListener("change", 
  function(){
    obj.stroke=document.getElementById("outlineColor").value;
    obj.strokeWidth=document.getElementById("outlineThickness").value;
    console.log("ITCHANGEDTO:  "+document.getElementById("outlineThickness").value);
    canvas.renderAll();
  });



document.getElementById("fontfamily").addEventListener("change", 
  function(){


    if(this.value!="Helvetica")
    {
      console.log("WHAT");
      obj.fontFamily=this.value; 
    }
    else
    {
      obj.fontFamily="Helvetica"
    }




    //obj.stroke=document.getElementById("outlineColor").value;
    //obj.strokeWidth=document.getElementById("outlineThickness").value;
    //console.log("ITCHANGEDTO:  "+document.getElementById("outlineThickness").value);
    canvas.renderAll();
  });









////////////////


canvas.on("selection:created", function(){
obj=canvas.getActiveObject();
    if (obj.isType('i-text'))
  {
     document.getElementById('fontSize').disabled=false;
     document.getElementById("fontSize").value = obj.fontSize;

     document.getElementById("colorPicker").value= obj.fill;
     document.getElementById('colorPicker').disabled=false;

     document.getElementById('outlineThickness').disabled=false;

     //document.getElementById("outlineColor").value =obj.stroke;
     //document.getElementById('outlineThickness').value=obj.strokeWidth;


     document.getElementById('outlineColor').disabled=false;


     if(document.getElementById("outlineColor").value==0)
     {
     obj.stroke=document.getElementById("outlineColor").value;
     obj.strokeWidth=document.getElementById("outlineThickness").value;
      //document.getElementById('outlineThickness').value=0;
      console.log("FIRSTTIME")
     }

     if(obj.stroke!=null)
     {
        document.getElementById("outlineColor").value=obj.stroke;
        document.getElementById("outlineThickness").value= obj.strokeWidth;
     }
     

  }
});

canvas.on("selection:updated", function(){
obj=canvas.getActiveObject();
    if (obj.isType('i-text'))
  {
     document.getElementById('fontSize').disabled=false;
     document.getElementById("fontSize").value = obj.fontSize;


     document.getElementById("colorPicker").value =obj.fill;
     document.getElementById('colorPicker').disabled=false;

     document.getElementById('outlineThickness').disabled=false;


     //document.getElementById("outlineColor").value =obj.stroke;
     //document.getElementById('outlineThickness').value=obj.strokeWidth;


     document.getElementById('outlineColor').disabled=false;

          if(document.getElementById("outlineColor").value==0)
     {
     obj.stroke=document.getElementById("outlineColor").value;
     obj.strokeWidth=document.getElementById("outlineThickness").value;
      //document.getElementById('outlineThickness').value=0;
      console.log("FIRSTTIME")
     }
     else
     {

      document.getElementById("outlineColor").value=obj.stroke;
      document.getElementById("outlineThickness").value=obj.strokeWidth;
      //document.getElementById('outlineThickness').value=0;

     }

     if(obj.stroke!=null)
     {
        document.getElementById("outlineColor").value=obj.stroke;
        document.getElementById("outlineThickness").value= obj.strokeWidth;
     }


     document.getElementById("fontfamily").value = obj.fontFamily;






  }
});


canvas.on("selection:cleared", function(){

     document.getElementById("colorPicker").value="#000000";
     document.getElementById('colorPicker').disabled=true;

     
     document.getElementById('fontSize').disabled=true;
    
     
     
     document.getElementById("outlineColor").value="#000000";
     document.getElementById('outlineColor').disabled=true;

     document.getElementById('outlineThickness').disabled=true;
     document.getElementById('outlineThickness').value=0;
    


});



////////////////////////////////



 canvas.on('mouse:over', function(e) {


  console.log("Hoovering");



    




    //canvas.renderAll();
  });






