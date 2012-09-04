// 提供数据层的封装

JJ.Data = function(){
	
	var index = [];
	var dataChangeListeners = [];
	
	//返回[start, end]区间包含的JSON数据
	function getData(start, end){
	
	}
	
	//初始化，请求数据并保存
	function init(){
		baidu.sio.callByServer('http://image.baidu.com/i?tn=resultjson&ct=201326592&cl=2&fm=detail&lm=-1&st=-1&sf=2&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&word=mm&rn=60', 'JJ.Data.dataBack');
	}
	
	//JSONP返回数据时的回调函数
	function dataBack(data){
		var arr = data.data, i, len, tempW, tempH;
		for(i = 0, len = arr.length - 1; i < len; i++){
			index[i] = arr[i];
			tempW = index[i].originWidth = arr[i].width;
			tempH = index[i].originHeight = arr[i].height;
			delete index[i].width;
			delete index[i].height;
			if(tempW >= tempH){
				index[i].thumbWidth = 170;
				index[i].thumbHeight = 170 * tempH / tempW;
			}else{
				index[i].thumbHeight = 170;
				index[i].thumbWidth = 170 * tempW / tempH;
			}
		}
		//
		for(i = 0, len = dataChangeListeners.length; i < len; i++){
			var temp = dataChangeListeners[i];
			temp.fun.call(temp.context ? temp.context : null, index);
		}
	}
	
	//增加数据变化的监听器
	function addDataChangeListener(callBack, context){
		dataChangeListeners.push({
			'fun' : callBack, 
			'context' : context
		});
	}
	
	return {
		getData : getData, 
		index : index, 
		init : init, 
		dataBack : dataBack, 
		addDataChangeListener : addDataChangeListener
	};
}();