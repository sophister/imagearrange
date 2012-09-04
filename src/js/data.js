// �ṩ���ݲ�ķ�װ

JJ.Data = function(){
	
	var index = [];
	var dataChangeListeners = [];
	
	//����[start, end]���������JSON����
	function getData(start, end){
	
	}
	
	//��ʼ�����������ݲ�����
	function init(){
		baidu.sio.callByServer('http://image.baidu.com/i?tn=resultjson&ct=201326592&cl=2&fm=detail&lm=-1&st=-1&sf=2&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&word=mm&rn=60', 'JJ.Data.dataBack');
	}
	
	//JSONP��������ʱ�Ļص�����
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
	
	//�������ݱ仯�ļ�����
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