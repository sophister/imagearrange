//ÏÔÊ¾ËõÂÔÍ¼

JJ.View = function(){
	
	var CON_ID = 'thumbContainer', 
		TPL = '<div class="thumb-wrapper" style="left:#{left}px; top:#{top}px; width:#{boxWidth}px; height:#{boxHeight}px; "></div>';
	
	function display(data, start, end){
		var elem = baidu.g(CON_ID), html = '', i, len = Math.min(end, data.length), temp, fit;
		for(i = 0; i < len; i++){
			temp = data[i];
			fit = temp.fit;
			if(!fit){
				break;
			}
			temp.left = fit.x;
			temp.top = fit.y;
			temp.boxWidth = temp.thumbWidth - 2;
			temp.boxHeight = temp.thumbHeight - 2;
			
			html += baidu.format(TPL, temp);
		}
		
		elem.innerHTML = html;
	}
	
	
	return {
		display : display
	};
}();