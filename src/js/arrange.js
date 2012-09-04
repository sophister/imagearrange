//从data取数据，对图片进行排序

JJ.Arrange = function(){
	var verticalImages = [], 
		horizontalImages = [], 
		squareImages = [], 
		CON_WIDTH = 0, 
		CON_HEIGHT = 0, 
		data = [];
	
	function setData(dataArr){
		data = dataArr;
		return that;
	}
	
	//开始计算图片排列
	function start(){
		alert(data.length);
	}
	
	//设置缩略图显示区域的宽高
	function setDimension(width, height){
		CON_WIDTH = width;
		CON_HEIGHT = height;
		return that;
	}
	
	var that =  {
		setData : setData, 
		start : start, 
		setDimension : setDimension
	};
	
	return that;
}();