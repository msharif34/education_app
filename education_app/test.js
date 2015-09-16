function parking(arr){
	var count = 0;
	arr.sort(function(a,b){
		return a - b;
	})

	for(var i = 0; i < arr.length; i++){
		if(count != arr[i]){
			return count
		}else{
			count++
		}
	}

}
 console.log(parking([0,1,2,3]))