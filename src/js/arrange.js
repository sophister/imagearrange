//��dataȡ���ݣ���ͼƬ��������

JJ.Arrange = function(){
	var verticalImages = [], 
		horizontalImages = [], 
		squareImages = [], 
		CON_WIDTH = 0, /*�����Ŀ��*/
		CON_HEIGHT = 0, /*�����ĸ߶�*/
		CON_SQUARE = 0/*���������*/, 
		data = [], 
		smallW, 
		smallH, 
		imageNum , /*ĳһҳ������ͼ����*/
		totalRow,  /*���ֳ���С���ӵ�����*/
		totalCol,  /*���ֳ���С���ӵ�����*/
		baseCellW, /*���ֳ���С���ӿ��*/
		baseCellH, /*���ֳ���С���Ӹ߶�*/
		cellArr = [], 
		smallArea;
	
	function setData(dataArr){
		data = dataArr;
		return that;
	}
	
	//��ʼ����ͼƬ����
	function start(){
		var currArea = 0, 
			i = 0, len = data.length;
		imageNum = 0;
		smallW = data[0].thumbWidth;
		smallH = data[0].thumbHeight;
		smallArea = smallW * smallH;
		for(; i < len; i++){
			var temp = data[i];
			temp.area = temp.thumbWidth * temp.thumbHeight;
			if(temp.originWidth > temp.originHeight * 1.15){
				//��ͼ
				pushHorizontalImage(temp);
			}else if(temp.originHeight > temp.originWidth * 1.15){
				//��ͼ
				pushVerticalImage(temp);
			}else{
				//��ͼ
				pushSquareImage(temp);
			}
			//
			if(temp.area < smallArea){
				smallArea = temp.area;
				smallW = temp.thumbWidth;
				smallH = temp.thumbHeight;
			}
			currArea += temp.area;
			imageNum++;
			if(currArea >= CON_SQUARE){
				break;
			}
		}
		
/*		console.log(horizontalImages);
		console.log(verticalImages);
		console.log(squareImages);
		console.log(smallW, smallH, smallArea);*/
		totalRow = Math.ceil(CON_HEIGHT / smallH);
		totalCol = Math.ceil(CON_WIDTH / smallW);
		baseCellW = CON_WIDTH / totalCol;
		baseCellH = CON_WIDTH / totalRow;
		//
		for(var i = 0; i < totalRow; i++){
			cellArr.push(new Array(totalCol));
		}
		
		//��ʼ�������ͼƬ��λ��
		for(i = 0; i < imageNum; i++){
			
		}
	}
	
	//
	function getNextPosition(){
		var i = 0, temp, j, out = [];
		for(i < totalRow; i++){
			temp = cellArr[i];
			for(j = 0; j < totalCol; j++){
				if(!temp[j]){
					out.push();
				}
			}
		}
	}
	
	//�����ͼ
	function pushHorizontalImage(obj){
		var i = 0, len = horizontalImages.length;
		while(i < len){
			var curr = horizontalImages[i];
			if(curr.area <= obj.area){
				horizontalImages.splice(i, 0, obj);
				return;
			}
			i++;
		}
		horizontalImages.push(obj);
	}
	//������ͼ
	function pushVerticalImage(obj){
		var i = 0, len = verticalImages.length;
		while(i < len){
			var curr = verticalImages[i];
			if(curr.area <= obj.area){
				verticalImages.splice(i, 0, obj);
				return;
			}
			i++;
		}
		verticalImages.push(obj);
	}
	//���淽ͼ
	function pushSquareImage(obj){
		var i = 0, len = squareImages.length;
		while(i < len){
			var curr = squareImages[i];
			if(curr.area <= obj.area){
				squareImages.splice(i, 0, obj);
				return;
			}
			i++;
		}
		squareImages.push(obj);
	}
	
	//��������ͼ��ʾ����Ŀ��
	function setDimension(width, height){
		CON_WIDTH = width;
		CON_HEIGHT = height;
		CON_SQUARE = CON_WIDTH * CON_HEIGHT;
		return that;
	}
	
	var that =  {
		setData : setData, 
		start : start, 
		setDimension : setDimension
	};
	
	return that;
}();