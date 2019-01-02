/**
 * Created by Administrator on 2016/8/24.
 */
/*购物车 菜单*/
$("#top_box>ul.rt li.shopping").on("mouseover",function () {

    $(this).children("div").css("display","block");
});
$("#top_box>ul.rt li.shopping").on("mouseout",function () {
    $(this).children("div").css("display","none");
});

/*二级菜单*/
$("#left_list>ul.lf").on("mouseover","li",function(){
    $(this).children("div").css("display","block");
});
$("#left_list>ul.lf").on("mouseout","li",function(){
    $(this).children("div").css("display","none");
});
//搜索二级菜单
$("#top_search>ul.lf").on("mouseover","li",function(){
    $(this).children("div").css("display","block");
});
$("#top_search>ul.lf").on("mouseout","li",function(){
    $(this).children("div").css("display","none");
});

/********************************滚动************************************/

/*******小米单品********/
$("#btn>.btn_1").click(function(){
   var n= $("#xiaomi_ul").css("left","0px");
});
$("#btn>.btn_2").click(function(){
    var x=parseFloat($("#xiaomi_ul").css("width"));
    x=parseFloat(-(x/2));
    var n= $("#xiaomi_ul").css("left",x);
});


























