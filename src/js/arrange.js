//��dataȡ���ݣ���ͼƬ��������

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
	
	//��ʼ����ͼƬ����
	function start(){
		alert(data.length);
	}
	
	//��������ͼ��ʾ����Ŀ��
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