//从data取数据，对图片进行排序

JJ.Arrange = function(){
	var verticalImages = [], 
		horizontalImages = [], 
		squareImages = [], 
		lists = [], 
		CON_WIDTH = 0, /*容器的宽度*/
		CON_HEIGHT = 0, /*容器的高度*/
		CON_SQUARE = 0/*大区域面积*/, 
		data = [], 
		smallW, 
		smallH, 
		imageNum , /*某一页的缩略图个数*/
		totalRow,  /*划分出的小格子的行数*/
		totalCol,  /*划分出的小格子的列数*/
		baseCellW, /*划分出的小格子宽度*/
		baseCellH, /*划分出的小格子高度*/
		cellArr = [], 
		smallArea;
	
	function setData(dataArr){
		data = dataArr;
		return that;
	}
	
	//开始计算图片排列
	function start(){
	
///////////////////////////////////////////////////
		var currArea = 0, 
			i = 0, len = data.length;
		imageNum = 0;
		smallW = data[0].thumbWidth;
		smallH = data[0].thumbHeight;
		smallArea = smallW * smallH;
		for(; i < len; i++){
			var temp = data[i];
			temp.w = temp.thumbWidth;
			temp.h = temp.thumbHeight;
			temp.area = temp.thumbWidth * temp.thumbHeight;
			if(temp.originWidth > temp.originHeight * 1.15){
				//横图
				pushHorizontalImage(temp);
			}else if(temp.originHeight > temp.originWidth * 1.15){
				//竖图
				pushVerticalImage(temp);
			}else{
				//方图
				pushSquareImage(temp);
			}
			pushImage(temp);
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
		
		
/******************************use packer.growing.js*********************************************/
		var packer = new Packer(800, 430);
		packer.fit(lists);
//		console.log(lists[0], lists[1]);
for(i = 0, len = lists.length; i < len; i++){
	console.log(lists[i].fit);
}		
//		JJ.View.display(data, 0, lists.length);
		
		return;

/***************************************************************************/
		
/*		console.log(horizontalImages);
		console.log(verticalImages);
		console.log(squareImages);
		console.log(smallW, smallH, smallArea);
		totalRow = Math.ceil(CON_HEIGHT / smallH);
		totalCol = Math.ceil(CON_WIDTH / smallW);
		baseCellW = CON_WIDTH / totalCol;
		baseCellH = CON_WIDTH / totalRow;
		//
		for(var i = 0; i < totalRow; i++){
			cellArr.push(new Array(totalCol));
		}
/*		
		//开始计算各个图片的位置
		var p, first, end, matchArea, obj, areaW, areaH, 
		for(i = 0; i < imageNum; i++){
//			p = getNextPosition();
//			first = p[0];
//			end = p[p.length - 1];
//			areaW = baseCellW * (end.left - first.left);
//			areaH = baseCellH * (end.top - first.top);
//			obj = getMatchObj(areaW, areaH);

			obj = lists.shift();
			p = getMatchArea(obj.thumbWidth, obj.thumbHeight);
			
		}
*/
	}
	
	//选择下一个最大的空白区域
	function getNextPosition(){
/*		var i = 0, temp, j, out = [];
		for(i < totalRow; i++){
			temp = cellArr[i];
			for(j = 0; j < totalCol; j++){
				if(!temp[j]){
					out.push({
						left : j, 
						top : i
					});
				}else if(out.length > 0){
					return out;
				}
			}
		}
		return out;*/
	}
	
	//
	function getMatchObj(w, h){
		return lists.shift();
	}
	
	//
	function getMatchArea(boxW, boxH){
		
	}
	
	//保存横图
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
	//保存竖图
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
	//保存方图
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
	
	//
	function pushImage(obj){
		var i = 0, len = lists.length;
		while(i < len){
			var curr = lists[i];
			if(curr.area <= obj.area){
				lists.splice(i, 0, obj);
				return;
			}
			i++;
		}
		lists.push(obj);
	}
	
	//设置缩略图显示区域的宽高
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