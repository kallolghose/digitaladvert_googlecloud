
callFourthChannelGeneral = function(){

	dataSet = [];             
	digitaladvert.initializeFourthChannelGeneralTable = function(dataSet){
		// this.dataSet = dataSet


		dataSet = _.where(dataSet,{foldername : 'fourth',type:'general'})

		_.map(dataSet, function(record,index){
			record.stepno = index+1;
			return record;
		})
		if ($.fn.DataTable.isDataTable( '#fourthChannelGeneralTable' )) {
			if(dtAPIFourthChannelGeneral.page.info().recordsTotal == 0){
				dtAPIFourthChannelGeneral.rows.add(dataSet);
			    dtAPIFourthChannelGeneral.draw();
			}
			else if(dtAPIFourthChannelGeneral.page.info().recordsTotal > 0){
				dtAPIFourthChannelGeneral.clear();
			    dtAPIFourthChannelGeneral.rows.add(dataSet);
			    dtAPIFourthChannelGeneral.draw();
			}
		}else{
		    $('#fourthChannelGeneralTable').DataTable({
		        data: dataSet,
		        bPaginate : false,
    			fixedColumns: true,
    			searching: false,
				bAutoWidth : false,
				"bSort" : false,
				fixedHeader: {
					header: true,
					footer: true
				},
		        columns: [
		            { "data": "stepno" },
		            { "data": "duration" },
		            { "data": "datatype" },
		            { "data": "data" }],
	            "columnDefs": [{
	            		"targets": 0,
	            		width : "2%",
	            		data : "stepno"
	            		},
	            		{
	            		"targets": 1,
	            		width : "26%",
		                "data": "duration",
		               	render: function (data, type, full, meta) {
		                        var $duration = $("<div class='input-group'>" + 
                    							"<input type='number' placeholder='Seconds' class='form-control duration' value='"+ data +"' /></div>", {
		                        });
		                        return $duration.prop("outerHTML");
			                }

			            },
	            		{
		                "targets": 2,
		                width : "26%",
		                "data": "datatype",
		               	render: function (data, type, full, meta) {
		                        var $select = $("<select class='mySelect contentTypeSelect'></select>", {
		                        });
		                        $.each(contentTypeCategories, function (k, v) {	
		                            var $option = $("<option></option>", {
		                                "text": v,
		                                "value": v
		                            });
		                            if (data === v) {
		                                $option.attr("selected", "selected")
		                            }
		                            $select.append($option);
		                        });
		                        return $select.prop("outerHTML");
			                }
			            },
		                {
		                "targets": 3,
		                width : "26%",
		                "data": "data",
		               	render: function (data, type, full, meta) {
		               			if(full.datatype == 'text'){
		               				$textInput = $(digitaladvert.textInput, {});
		               				$textInput.find('input')[0].setAttribute('value',data);
									return $textInput.prop("outerHTML");
		               			}else{
			                        var $select = $("<select class='mySelect contentSelect'></select>", {
			                        });
			                        $.each(contentCategories, function (k, v) {
			                            var $option = $("<option></option>", {
			                                "text": v,
			                                "value": v
			                            });
			                            if (data === v) {
			                                $option.attr("selected", "selected")
			                            }
			                            $select.append($option);
			                        });
			                        digitaladvert.selectContent = $select;
			                        return $select.prop("outerHTML");
			                    }
		                }
		            },
		            {
		                "targets": 4,
		                width : "20%",
		                "data": "",
		               	render: function (data, type, full, meta) {
		               		var $button = $('<button class="btn btn-danger btn-xs deleteRowButton" id="deleteRow7">-</button>', {});
		                    return $button.prop("outerHTML");
		                }
		            }],
		            drawCallback : function (oSettings) {
		            	if($('#fourthChannelGeneralTable').DataTable().rows().nodes().length == 0){
		            		$("#fourthChannelGeneralTable_wrapper div.col-sm-7").empty();
		            		$("#fourthChannelGeneralTable_wrapper div.col-sm-7").append($('<button class="btn btn-success btn-xs" id="fourthAddNewRowExtraGeneral" style="float:right">+</button>',{}));
		            		$("#fourthAddNewRowExtraGeneral").off('click').on('click',function(e){

							    dataModelChannel1General.data = "";
							    dataModelChannel1General.foldername = "fourth";
							    dataModelChannel1General._id = new Date().toISOString(),
							    dataModelChannel1General.datatype = "image";
							    dataModelChannel1General.duration = 60;

							    localDB.put(dataModelChannel1General).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   })
		            	}else{
		            		$("#fourthChannelGeneralTable_wrapper div.col-sm-7").empty();
		            	}

		            	$($('#fourthChannelGeneralTable').DataTable().rows()
		            		.nodes()[$('#fourthChannelGeneralTable').DataTable().data().length -1]).find('button#addNewRow7').remove()
		            	$($('#fourthChannelGeneralTable').DataTable().rows()
		            		.nodes()[$('#fourthChannelGeneralTable').DataTable().data().length -1])
		            			.find('button').closest('td').append(" <button class='btn btn-success btn-xs' id='addNewRow7'>+</button>");
		            	   $("#addNewRow7").on('click',function(e){

							    dataModelChannel1General.data = "";
							    dataModelChannel1General.foldername = "fourth";
							    dataModelChannel1General._id = new Date().toISOString(),
							    dataModelChannel1General.datatype = "image";
							    dataModelChannel1General.duration = 60;

							    localDB.put(dataModelChannel1General).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   })

						   $("#fourthChannelGeneralTable .deleteRowButton").off('click').on('click',function(e){
						   		row = parseInt($(e.target).closest('tr').find('td').first().text())
							    doc = $("#fourthChannelGeneralTable").dataTable().fnGetData()[row-1];
							    doc['_deleted'] = true;
							    localDB.put(doc).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   });


		            	// $('.mySelect').selectpicker();
			            // new Selectr('.contentTypeSelect');
			            // new Selectr('.contentSelect');
					    
					},
		    });
		
		    dtJQFourthChannelGeneral = $('#fourthChannelGeneralTable').dataTable();
		    dtAPIFourthChannelGeneral = $('#fourthChannelGeneralTable').DataTable();
		}
	}

	getDataFromLocalDB(function(dataSet){
		getFileList('fourth',function(fileList){
			contentCategories = fileList;
			digitaladvert.initializeFourthChannelGeneralTable(dataSet);
		})
	});


    $("#fourthChannelGeneralTable").on('change','.contentSelect',contentSelect);
    $("#fourthChannelGeneralTable").on('change','.contentTypeSelect',contentTypeSelect);

   $("#saveRecordFourthChannelGeneral").on('click',function(){
	   	datas = dtJQFourthChannelGeneral.fnGetData();
	   	$.each(datas,function(index,data){
	   		data.duration = $(dtAPIFourthChannelGeneral.rows().nodes()[index]).find('td input.duration').val();
	   		delete data.stepno;
	   		if(data.datatype == "text"){
	   			data.data = $($("#fourthChannelGeneralTable").DataTable().rows().nodes()[index]).find('td input.textinput').val();
	   		}
		   	localDB.put(data).then(function(response) {
		  		console.log(response)
		  		// $.notify('Saved','success')
			  // handle response
			}).catch(function (err) {
			  console.log(err);
		  		// $.notify('Error :' + JSON.stringify(err),'error')

			});
	   	})
   });
}