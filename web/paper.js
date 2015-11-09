/**
 * Created by xiaofei on 11/7/2015.
 */
var example_data = [
    {
        label: '操作系统',
        id: 1,
        children: [
            {label: 'Linux操作系统', id: 2},
            {
                label: '内存管理',
                id: 3,
                children: [
                    {label: '分页管理', id: 4},
                    {label: '分区管理', id: 5},
                    {label: '高速缓存', id: 6},
                    {label: '物理内存', id: 7},
                    {
                        label: 'Coelurosaurians',
                        id: 8,
                        children: [
                            {label: 'Tyrannosauroids', id: 9},
                            {label: 'Ornithomimosaurians', id: 10},
                            {label: 'Therizinosauroids', id: 11},
                            {label: 'Oviraptorosaurians', id: 12},
                            {label: 'Dromaeosaurids', id: 13},
                            {label: 'Troodontids', id: 14},
                            {label: 'Avialans', id: 15}
                        ]
                    }
                ]
            },
            {
                label: 'UCOS操作系统',
                id: 16,
                children: [
                    {label: '任务管理', id: 17},
                    {
                        label: 'Sauropods',
                        id: 18,
                        children: [
                            {label: 'Diplodocoids', id: 19},
                            {
                                label: 'Macronarians',
                                id: 20,
                                children: [
                                    {label: 'Brachiosaurids', id: 21},
                                    {label: 'Titanosaurians', id: 22}
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: '时间可预测性',
        id: 23,
        children: [
            {label: '操作系统时间可预测性', id: 24},
            {
                label: 'Thyreophorans',
                id: 25,
                children: [
                    {label: '<a href="example.html?id=26">Example 1</a>', id: 26},
                    {label: '<a href="example.html?id=27">Example 2</a>', id: 27},
                    '<a href="example.html?id=25">Example 3</a>'
                ]
            },
            {
                label: '编程模型时间可预测性',
                id: 28,
                children: [
                    {label: 'Hadrosaurids', id: 29}
                ]
            },
            {label: '物理平台时间可预测性', id: 30},
            {label: 'Ceratopsians', id: 31}
        ]
    }
];


$(function() {

    $('#popup').hide();

    $('#tree1').tree({
        data: example_data,
        dragAndDrop:true,
        autoOpen:0,
        saveState: true,
        autoEscape:false
    });

var node2change;
    nodeid = -1;

    $('#tree1').bind(
        'tree.dblclick',
        function(event) {
            // event.node is the clicked node
            startRename();
            node2change = event.node;
            nodeid = event.node.id;
            $('#foldername').val(event.node.name);
        }
    );
});


function startRename(){
    EV_modeAlert('popup');
}

function submitRename(){
    EV_closeAlert();
    var value = $('#foldername').val();

    if(nodeid==-1)
    {
        var nodes = $('#tree1').tree('getSelectedNodes');
        $('#tree1').tree(
            'appendNode',
            {
                label: value,
                id: nodes[0].id*10
            },
            nodes[0]
        );
    }
    else
    {
        var node = $('#tree1').tree('getNodeById', nodeid);
        $('#tree1').tree('updateNode', node, value);
        nodeid = -1;
    }

};

$("#addFolder").click(function(){
    startRename();
});

$("#addFile").click(function () {
    var nodes = $('#tree1').tree('getSelectedNodes');

});

var EV_MsgBox_ID=""; //重要

//弹出对话窗口(msgID-要显示的div的id)
function EV_modeAlert(msgID){
    //创建大大的背景框
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','EV_bgModeAlertDiv');
    document.body.appendChild(bgObj);
    //背景框满窗口显示
    EV_Show_bgDiv();
    //把要显示的div居中显示
    EV_MsgBox_ID=msgID;
    EV_Show_msgDiv();
}

//关闭对话窗口
function EV_closeAlert(){

    var msgObj=document.getElementById(EV_MsgBox_ID);
    var bgObj=document.getElementById("EV_bgModeAlertDiv");
    msgObj.style.display="none";
    document.body.removeChild(bgObj);
    EV_MsgBox_ID="";
}

//窗口大小改变时更正显示大小和位置
window.onresize=function(){
    if (EV_MsgBox_ID.length>0){
        EV_Show_bgDiv();
        EV_Show_msgDiv();
    }
}

//窗口滚动条拖动时更正显示大小和位置
window.onscroll=function(){
    if (EV_MsgBox_ID.length>0){
        EV_Show_bgDiv();
        EV_Show_msgDiv();
    }
}

//把要显示的div居中显示
function EV_Show_msgDiv(){
    var msgObj   = document.getElementById(EV_MsgBox_ID);
    msgObj.style.display  = "block";
    var msgWidth = msgObj.scrollWidth;
    var msgHeight= msgObj.scrollHeight;
    var bgTop=EV_myScrollTop();
    var bgLeft=EV_myScrollLeft();
    var bgWidth=EV_myClientWidth();
    var bgHeight=EV_myClientHeight();
    var msgTop=bgTop+Math.round((bgHeight-msgHeight)/2);
    var msgLeft=bgLeft+Math.round((bgWidth-msgWidth)/2);
    msgObj.style.position = "absolute";
    msgObj.style.top      = msgTop+"px";
    msgObj.style.left     = msgLeft+"px";
    msgObj.style.zIndex   = "10001";

}
//背景框满窗口显示
function EV_Show_bgDiv(){
    var bgObj=document.getElementById("EV_bgModeAlertDiv");
    var bgWidth=EV_myClientWidth();
    var bgHeight=EV_myClientHeight();
    var bgTop=EV_myScrollTop();
    var bgLeft=EV_myScrollLeft();
    bgObj.style.position   = "absolute";
    bgObj.style.top        = bgTop+"px";
    bgObj.style.left       = bgLeft+"px";
    bgObj.style.width      = bgWidth + "px";
    bgObj.style.height     = bgHeight + "px";
    bgObj.style.zIndex     = "10000";
    bgObj.style.background = "#777";
    bgObj.style.filter     = "progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60,finishOpacity=60);";
    bgObj.style.opacity    = "0.0";
}
//网页被卷去的上高度
function EV_myScrollTop(){
    var n=window.pageYOffset
        || document.documentElement.scrollTop
        || document.body.scrollTop || 0;
    return n;
}
//网页被卷去的左宽度
function EV_myScrollLeft(){
    var n=window.pageXOffset
        || document.documentElement.scrollLeft
        || document.body.scrollLeft || 0;
    return n;
}
//网页可见区域宽
function EV_myClientWidth(){
    var n=document.documentElement.clientWidth
        || document.body.clientWidth || 0;
    return n;
}
//网页可见区域高
function EV_myClientHeight(){
    var n=document.documentElement.clientHeight
        || document.body.clientHeight || 0;
    return n;
}