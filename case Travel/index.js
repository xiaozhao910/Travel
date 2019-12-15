 
window.onload = function () 
{
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var list = document.getElementById("list");
    var buttons = document.getElementById("buttons").getElementsByTagName("span");
    var container = document.getElementById("box");
    var index = 1;
    var timer;
    var animated = false;
    function shownButton()
    {
        for (var i = 0; i < buttons.length ; i++) 
        {
            if ( buttons[i].className == 'on')
            {
                buttons[i].className = '';
                /* prev和next每click一次，
                        就会清除一次前一个class为on的span元素，
                        所以没有必要再去循环下面的span*/
                break;
            }
            //  或者直接遍历清除  buttons[i].className=""；
        }
        buttons[index - 1].className = "on";
    }


    function animate(offset)
    {
        var time = 300;
        var inteval = 10;
        var speed = offset / (time / inteval);
        animated = true;//更改全局变量，防止跳图
        var newLeft = parseInt(list.style.left) + offset;
        function go()
        {
            if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else 
            {
                animated = false;//全局变量
                 list.style.left=newLeft+"px";
                if (newLeft > -1300) {
                    list.style.left =- 3900 + "px";
                };
                if (newLeft <- 3900) {
                    list.style.left =- 1300 + "px";
                };
            }
        }
        go();
    };
    prev.onclick = function ()
    {
        /*添加一个if判断index为1时，如果继续往前滚的话就让index返回第五个span
                但是当快速点击arrow时会出现一种span点亮延迟的情况。可以尝试把判断index是否大于1或小于5的情况放进
                判断是否animated的if语句中，先判断能不能点击，再点亮。
                */
        if (!animated) {
            if (index == 1) {
                index = 3;
            }
            else {
                index -= 1;
            }
            shownButton();
            animate(1300);
        }
    };
    next.onclick = function ()
    {
        if (!animated) {
            if (index ==3 ) {
                index = 1;
            }
            else {
                index += 1;
            }
            shownButton();
            animate(-1300);
        }
    };
    for (var i = 0; i < buttons.length; i++) 
    {
        buttons[i].onclick = function ()
        {
            if (this.className == "on") {
                return;
            }
            var myIndex = parseInt(this.getAttribute("index"));
            var offset =- 1300 * (myIndex - index);
            if (!animated) {
                animate(offset);
            }
            index = myIndex;
            shownButton();
        }
    }
    function play()
    {
        timer = setInterval(function ()
        {
            next.onclick();
        }, 2000);
    }
    function stop()
    {
        clearInterval(timer);
    }
    play();
    container.onmouseover = stop;
    container.onmouseout = play;
}
 