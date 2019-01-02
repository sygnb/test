/**
 * Created by Administrator on 2016/8/31.
 */
//广告图片数组
var imgs=[
    {"i":3,"src":"./img/1ba4939c9-fc0a-4916-bddc-726fa00f7e9b.jpg"},
    {"i":4,"src":"./img/46550f09-b967-42ee-84bf-ca3f8bfd0432.jpg"},
    {"i":0,"src":"./img/2eafbb767-ba52-46ae-bf81-9b61277408fa.jpg"},
    {"i":1,"src":"./img/3f4bee59d-85a5-498f-ae57-a2cabe6aeb5b.jpg"},
    {"i":2,"src":"./img/2c61541b-b318-4710-8106-a3f20aef6fc3.jpg"},
];
var adv={
    LIWIDTH:0,      //每个li的宽度
    DISTANCE:0,     //总距离
    DURATION:1000,  //总时间
    STEPS:200,      //总步数
    interval:0,     //步频
    step:0,         //步长
    timer:null,     //定时器序号
    moved:0,        //本次动画已经移动的步数
    WAIT:3000,      //自动轮播等待时间
    canAuto:true,   //能否启动自动轮播
    init:function(){
        //获得id为slider的宽
        this.LIWIDTH=parseFloat($("#slider").css("width"));
        this.updateView();
        //计算步频
        this.interval=this.DURATION/this.STEPS;
        $("#idxs").on("mouseover",
            function(e){
                var target=e.target;//获得target
                //如果target是li且target的class不是hover
                if(target.nodeName=="LI"
                    &&target.className!="hover"){
                    //找到id为idxs下的class为hover的li，获取其内容保存在start中
                    var start=
                        $("#idxs>.hover").html();
                    //获得target的内容保存在end中
                    var end=target.innerHTML;
                    this.move(end-start);
                }
            }.bind(this)//提前绑定this
        );
        this.autoMove();
    },
    autoMove:function(){
        this.timer=setTimeout(
            function(){
                this.canAuto?this.move(1):this.autoMove();
            }.bind(this),this.WAIT);
    },
    move:function(n){
        clearInterval(this.timer);
        this.timer=null;
        //计算总距离
        this.DISTANCE=n*this.LIWIDTH;
        //计算步长
        this.step=this.DISTANCE/this.STEPS;
        if(n<0){
            imgs=imgs.splice(imgs.length-(-n),-n).concat(imgs);
            this.updateView();
            $("#imgs").css("left",n*this.LIWIDTH+"px");
            this.timer=setInterval(
                this.moveStep.bind(this),this.interval
            );
        }else{          //************************************************
            this.timer=setInterval(
                this.moveStep.bind(this,function(){
                    imgs=imgs.concat(imgs.splice(0,n));
                    this.updateView();
                    $("#imgs").css("left","");
                }.bind(this)),this.interval
            );
        }
    },
    moveStep:function(callback){
        $("#imgs").css("left",parseFloat($("#imgs").css("left"))-this.step+"px");
        this.moved++;
        if(this.moved==this.STEPS){
            clearInterval(this.timer);
            this.timer=null;
            this.moved=0;
            callback&&callback();
            $("#imgs").css("left","");
            this.autoMove();
        }
    },
    updateView:function(){              //根据数组更新界面
        $("#imgs").html("");
        $("#idxs").html("");
        var fragImgs=document.createDocumentFragment();
        var fragIdxs=document.createDocumentFragment();
        for(var i=0;i<imgs.length;i++){
            var li=document.createElement("li");
            var a=document.createElement("a");
            a.href="#";
            var img=new Image();
            img.src=imgs[i].src;
            a.appendChild(img);
            li.appendChild(a);
            fragImgs.appendChild(li);

            li=document.createElement("li");
            if(i==imgs[0].i){
                //设置li的class为hover
                li.className="hover";
            }
            //设置其内容为i+1
            li.innerHTML=i+1;
            //将li追加到fragIdxs下
            fragIdxs.appendChild(li);
        }
        $("#imgs").append(fragImgs);
        $("#idxs").append(fragIdxs);
        $("#imgs").css("width",this.LIWIDTH*imgs.length+"px");
    }
}
adv.init();

/********************小米明星单品滚动************************/
var mi={
    DISTANCE:0, //总距离
    DURATION:1000,//总时间
    STEPS:100, //总步数
    interval:0,//步频
    step:0, //步长
    timer:null,//定时器序号
    WAIT:4000,//在此移动的等待时间
    init:function(){
        var x=parseFloat($("#xiaomi_ul").css("width"));
        this.DISTANCE=parseFloat(x/2);
        this.interval=this.DURATION/this.STEPS;
        this.step=this.DISTANCE/this.STEPS;
    },
    moveLeft:function(){
        if(this.timer==null){
            this.timer=setInterval(
                this.moveLeftStep.bind(this),this.interval
            );
        }
    },
    moveLeftStep:function(){
        var left=parseFloat($("#xiaomi_ul").css("left"));
        if(left>-this.DISTANCE){
            $("#xiaomi_ul").css("left",left-this.step+"px")
        }else{
            clearInterval(this.timer);
            this.timer=setTimeout(
                this.moveRight.bind(this),this.WAIT
            );
            this.timer=null;
        }
    },
    moveRight:function(){
        if(this.timer==null)
            this.timer=setInterval(
                this.moveRightStep.bind(this),this.interval
            );
    },
    moveRightStep:function(){
        var left=parseFloat($("#xiaomi_ul").css("left"));
        if(left<0){
            $("#xiaomi_ul").css("left",left+this.step+"px");
        }else{
            clearInterval(this.timer);
            this.timer=setTimeout(
                this.moveLeft.bind(this),this.WAIT
            );
            this.timer=null;
        }
    }
}
mi.init();
setTimeout(mi.moveLeft.bind(mi),3000);


