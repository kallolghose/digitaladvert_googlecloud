var digitaladvert = {}
var contentTypeCategories = ['image','video','text'];
var contentCategories= [];
digitaladvert.selectContent = "<select class='mySelect contentSelect'></select>";
digitaladvert.textInput = '<div class="input-group"><input type="text" placeholder="Text" class="form-control textinput"></div>';
var dtAPIFirstChannelPlanned;
var dtJQFirstChannelPlanned;

var dtAPIFirstChannelGeneral;
var dtJQFirstChannelGeneral;



var dtAPISecondChannelPlanned;
var dtJQSecondChannelPlanned;

var dtAPISecondChannelGeneral
var dtJQSecondChannelGeneral;



var dtAPIThirdChannelPlanned;
var dtJQThirdChannelPlanned;

var dtAPIThirdChannelGeneral
var dtJQThirdChannelGeneral;



var dtAPIFourthChannelPlanned;
var dtJQFourthChannelPlanned;

var dtAPIFourthChannelGeneral
var dtJQFourthChannelGeneral;



var dtAPISosChannelPlanned;
var dtJQSosChannelPlanned;

var dropboxFileList = undefined;

// var contentCategories = ['check_img1','check_img2','check_img3'];
var localDB; 
var remoteDB;
// var dbx = new Dropbox({ accessToken: 'D5T_eB2HNLQAAAAAAAABmCXPGhseKoD6V3kxnMs_JdeGZ_VHzkTHaWyvjUPKRd1X' });
var dbx = new Dropbox({ accessToken: 'aiI0y8s8I-AAAAAAAAAB0jp8C21Q9pOBXDJ8n0H2bqtWCZ6G78CdbOlkTr_UbJLu' });
var dataModelChannel1Planned = { 	data : "",
							datatype : "",
							deviceid : "ID",
							duration : "",
							endtime : "",
							foldername : "first",
							starttime : "",
							type : "planned",
						}
var dataModelChannel1General = { 	data : "",
							datatype : "",
							deviceid : "ID",
							duration : "",
							foldername : "first",
							type : "general",
						}						

function getFileList(foldername,callback){
	// dbx.filesListFolder({path: '/digitalAdvert'})
	dbx.filesListFolder({path: '/DigiAdvert/'+foldername})
	.then(function(response) {
		dropboxFileList = _.pluck(response.entries,'name')
		if(!dropboxFileList && dropboxFileList.length == 0){
			console.log(response);
			callback(_.pluck(response.entries,'name'));
		}
		else
			callback(dropboxFileList);
	})
	.catch(function(error) {
		console.log(error);
	});
	// callback(["image1.jpeg", "image3.jpeg", "image2.jpeg", "image4.jpeg", "image5.jpeg", "image6.jpeg"]);
}

function getDataFromLocalDB(callback){
	localDB.allDocs({
	  include_docs: true,
	  attachments: true
	}).then(function (result) {
		callback(_.pluck(result.rows,'doc'));
	}).catch(function (err) {
	  console.log(err);
	});
}

digitaladvert.getJQObjectDataTableById = function(tableid){
	if(tableid == 'firstChannelPlannedTable'){
		return dtJQFirstChannelPlanned
	}
	else if(tableid == 'firstChannelGeneralTable'){
		return dtJQFirstChannelGeneral
	}
	else if(tableid == 'secondChannelGeneralTable'){
		return dtJQSecondChannelGeneral
	}
	else if(tableid == 'secondChannelPlannedTable'){
		return dtJQSecondChannelPlanned
	}
	else if(tableid == 'thirdChannelPlannedTable'){
		return dtJQThirdChannelPlanned
	}
	else if(tableid == 'thirdChannelGeneralTable'){
		return dtJQThirdChannelGeneral
	}
	else if(tableid == 'fourthChannelGeneralTable'){
		return dtJQFourthChannelGeneral
	}
	else if(tableid == 'fourthChannelPlannedTable'){
		return dtJQFourthChannelPlanned
	}
	else if(tableid == 'sosChannelPlannedTable'){
		return dtJQSosChannelPlanned
	}
	else
		return null;
}

digitaladvert.getAPIInstanceDataTableById = function(tableid){
	if(tableid == 'firstChannelPlannedTable'){
		return dtAPIFirstChannelPlanned
	}
	else if(tableid == 'firstChannelGeneralTable'){
		return dtAPIFirstChannelGeneral
	}
	else if(tableid == 'secondChannelGeneralTable'){
		return dtAPISecondChannelGeneral
	}
	else if(tableid == 'secondChannelPlannedTable'){
		return dtAPISecondChannelPlanned
	}
	else if(tableid == 'thirdChannelPlannedTable'){
		return dtAPIThirdChannelPlanned
	}
	else if(tableid == 'thirdChannelGeneralTable'){
		return dtAPIThirdChannelGeneral
	}
	else if(tableid == 'fourthChannelGeneralTable'){
		return dtAPIFourthChannelGeneral
	}
	else if(tableid == 'fourthChannelPlannedTable'){
		return dtAPIFourthChannelPlanned
	}
	else if(tableid == 'sosChannelPlannedTable'){
		return dtAPISosChannelPlanned
	}
	else
		return null;
}

function contentSelect(evt){
	console.log(evt.target.value);
	tableJQ = digitaladvert.getJQObjectDataTableById(evt.target.closest('table').id);
	getRowColFromTD($(evt.target).closest('td'),function(rowColInfo){
    	tableJQ.fnUpdate(evt.target.value,rowColInfo.row,rowColInfo.col,true);
	});
}

function contentTypeSelect(evt){
	console.log(evt.target.value);
	if(evt.target.value == "text"){
		$textInput = $(digitaladvert.textInput, {});
		$(evt.target).closest('td').next().empty();
		$(evt.target).closest('td').next().append($textInput.clone());
	}else{
		$select = $(digitaladvert.selectContent, {});
		$(evt.target).closest('td').next().empty();
		$(evt.target).closest('td').next().append($select.clone());
	}
	tableJQ = digitaladvert.getJQObjectDataTableById(evt.target.closest('table').id);
	getRowColFromTD($(evt.target).closest('td'),function(rowColInfo){
    	tableJQ.fnUpdate(evt.target.value,rowColInfo.row,rowColInfo.col,true)
	})
}

function getRowColFromTD(tdTarget,callback){
	var $destination = tdTarget;
		var $tr = $destination.closest('tr');
	var $tbody = $tr.closest('tbody');
	var $td = $tr.closest('td');
	var col = $tr.children().index($destination);
    var row = $tbody.children().index($tr);
    callback({row : row,col : col})
}

window.onload = function(){
	localDB = new PouchDB("digitaladvert_local");
	remoteDB = new PouchDB("https://35.201.239.214:6984/digitaladvert"); //Connected to google cloud
	// remoteDB = new PouchDB("http://10.13.67.174:5984/digitaladvert"); //Connected to google cloud

	var syncHandler = PouchDB.sync(localDB,remoteDB,{
		live:true,
		retry:true
	}).on('change',function(change){
		console.log(change);
		getDataFromLocalDB(function(dataSet){
			digitaladvert.initializeFirstChannelPlannedTable(dataSet);
			digitaladvert.initializeFirstChannelGeneralTable(dataSet);
			digitaladvert.initializeSecondChannelGeneralTable(dataSet);
			digitaladvert.initializeSecondChannelPlannedTable(dataSet);
			digitaladvert.initializeThirdChannelPlannedTable(dataSet);
			digitaladvert.initializeThirdChannelGeneralTable(dataSet);
			digitaladvert.initializeFourthChannelGeneralTable(dataSet);
			digitaladvert.initializeFourthChannelPlannedTable(dataSet);
			digitaladvert.initializeSosChannelPlannedTable(dataSet);
		});
	})
   .on('paused',function(info){
		//console.log("Data Pause");
	})
   .on('active', function(info){
		//console.log("Data active");
   })
   .on('error', function(info){
		console.log("Data error");
   });

   // localDB.sync('digitaladvert_local', 'http://35.201.239.214:5984/digitaladvert');

   	// setTimeout(function(){
		callFirstChannelPlanned();
   	// },100)
   	// setTimeout(function(){
		callFirstChannelGeneral();
   	// },500)

  //  	setTimeout(function(){
		// callSecondChannelGeneral();
  //  	},900)
  //  	setTimeout(function(){
		// callSecondChannelPlanned();
  //  	},1300)

  //  	setTimeout(function(){
		// callThirdChannelPlanned();
  //  	},1700)
  //  	setTimeout(function(){
		// callThirdChannelGeneral();
  //  	},2100)

  //  	setTimeout(function(){
		// callFourthChannelPlanned();
  //  	},2500)
  //  	setTimeout(function(){
		// callFourthChannelGeneral();
  //  	},2900)
	
  //  	setTimeout(function(){
		// callSosChannelPlanned();
  //  	},3300)

   	$("#myChannelsTab").tabs({
   		onSelect : function(title,index){
   			if(index == 0){
   				callFirstChannelPlanned();
				callFirstChannelGeneral();
   			}else if(index == 1){
   				callSecondChannelGeneral();
				callSecondChannelPlanned();
   			}else if(index == 2){
   				callThirdChannelPlanned();
				callThirdChannelGeneral();
   			}else if(index == 3){
   				callFourthChannelPlanned();
				callFourthChannelGeneral();
   			}else if(index == 4){
				callSosChannelPlanned();
   			}
   			
   		}
   	})

}