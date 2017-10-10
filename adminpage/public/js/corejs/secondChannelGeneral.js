
callSecondChannelGeneral = function(){

	dataSet = [];             
	digitaladvert.initializeSecondChannelGeneralTable = function(dataSet){
		// this.dataSet = dataSet


		dataSet = _.where(dataSet,{foldername : 'second',type:'general'})

		_.map(dataSet, function(record,index){
			record.stepno = index+1;
			return record;
		})
		if ($.fn.DataTable.isDataTable( '#secondChannelGeneralTable' )) {
			if(dtAPISecondChannelGeneral.page.info().recordsTotal == 0){
				dtAPISecondChannelGeneral.rows.add(dataSet);
			    dtAPISecondChannelGeneral.draw();
			}
			else if(dtAPISecondChannelGeneral.page.info().recordsTotal > 0){
				dtAPISecondChannelGeneral.clear();
			    dtAPISecondChannelGeneral.rows.add(dataSet);
			    dtAPISecondChannelGeneral.draw();
			}
		}else{
		    $('#secondChannelGeneralTable').DataTable({
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
		               		var $button = $('<button class="btn btn-danger btn-xs deleteRowButton" id="deleteRow3">-</button>', {});
		                    return $button.prop("outerHTML");
		                }
		            }],
		            drawCallback : function (oSettings) {
		            	if($('#secondChannelGeneralTable').DataTable().rows().nodes().length == 0){
		            		$("#secondChannelGeneralTable_wrapper div.col-sm-7").empty();
		            		$("#secondChannelGeneralTable_wrapper div.col-sm-7").append($('<button class="btn btn-success btn-xs" id="secondAddNewRowExtraGeneral" style="float:right">+</button>',{}));
		            		$("#secondAddNewRowExtraGeneral").off('click').on('click',function(e){

							    dataModelChannel1General.data = "";
							    dataModelChannel1General.foldername = "second";
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
		            		$("#secondChannelGeneralTable_wrapper div.col-sm-7").empty();
		            	}

		            	$($('#secondChannelGeneralTable').DataTable().rows()
		            		.nodes()[$('#secondChannelGeneralTable').DataTable().data().length -1]).find('button#addNewRow3').remove()
		            	$($('#secondChannelGeneralTable').DataTable().rows()
		            		.nodes()[$('#secondChannelGeneralTable').DataTable().data().length -1])
		            			.find('button').closest('td').append(" <button class='btn btn-success btn-xs' id='addNewRow3'>+</button>");
		            	   $("#addNewRow3").on('click',function(e){

							    dataModelChannel1General.data = "";
							    dataModelChannel1General.foldername = "second";
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

						   $("#secondChannelGeneralTable .deleteRowButton").off('click').on('click',function(e){
						   		row = parseInt($(e.target).closest('tr').find('td').first().text())
							    doc = $("#secondChannelGeneralTable").dataTable().fnGetData()[row-1];
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
		
		    dtJQSecondChannelGeneral = $('#secondChannelGeneralTable').dataTable();
		    dtAPISecondChannelGeneral = $('#secondChannelGeneralTable').DataTable();
		}
	}

	getDataFromLocalDB(function(dataSet){
		getFileList(function(fileList){
			contentCategories = fileList;
			digitaladvert.initializeSecondChannelGeneralTable(dataSet);
		})
	});


    $("#secondChannelGeneralTable").on('change','.contentSelect',contentSelect);
    $("#secondChannelGeneralTable").on('change','.contentTypeSelect',contentTypeSelect);

   $("#saveRecordSecondChannelGeneral").on('click',function(){
	   	datas = dtJQSecondChannelGeneral.fnGetData();
	   	$.each(datas,function(index,data){
	   		data.duration = $(dtAPISecondChannelGeneral.rows().nodes()[index]).find('td input.duration').val();
	   		delete data.stepno;
	   		if(data.datatype == "text"){
	   			data.data = $($("#secondChannelGeneralTable").DataTable().rows().nodes()[index]).find('td input.textinput').val();
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