
callThirdChannelGeneral = function(){

	dataSet = [];             
	digitaladvert.initializeThirdChannelGeneralTable = function(dataSet){
		// this.dataSet = dataSet


		dataSet = _.where(dataSet,{foldername : 'third',type:'general'})

		_.map(dataSet, function(record,index){
			record.stepno = index+1;
			return record;
		})
		if ($.fn.DataTable.isDataTable( '#thirdChannelGeneralTable' )) {
			if(dtAPIThirdChannelGeneral.page.info().recordsTotal == 0){
				dtAPIThirdChannelGeneral.rows.add(dataSet);
			    dtAPIThirdChannelGeneral.draw();
			}
			else if(dtAPIThirdChannelGeneral.page.info().recordsTotal > 0){
				dtAPIThirdChannelGeneral.clear();
			    dtAPIThirdChannelGeneral.rows.add(dataSet);
			    dtAPIThirdChannelGeneral.draw();
			}
		}else{
		    $('#thirdChannelGeneralTable').DataTable({
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
		               		var $button = $('<button class="btn btn-danger btn-xs deleteRowButton" id="deleteRow6">-</button>', {});
		                    return $button.prop("outerHTML");
		                }
		            }],
		            drawCallback : function (oSettings) {
		            	if($('#thirdChannelGeneralTable').DataTable().rows().nodes().length == 0){
		            		$("#thirdChannelGeneralTable_wrapper div.col-sm-7").empty();
		            		$("#thirdChannelGeneralTable_wrapper div.col-sm-7").append($('<button class="btn btn-success btn-xs" id="thirdAddNewRowExtraGeneral" style="float:right">+</button>',{}));
		            		$("#thirdAddNewRowExtraGeneral").off('click').on('click',function(e){

							    dataModelChannel1General.data = "";
							    dataModelChannel1General.foldername = "third";
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
		            		$("#thirdChannelGeneralTable_wrapper div.col-sm-7").empty();
		            	}

		            	$($('#thirdChannelGeneralTable').DataTable().rows()
		            		.nodes()[$('#thirdChannelGeneralTable').DataTable().data().length -1]).find('button#addNewRow6').remove()
		            	$($('#thirdChannelGeneralTable').DataTable().rows()
		            		.nodes()[$('#thirdChannelGeneralTable').DataTable().data().length -1])
		            			.find('button').closest('td').append(" <button class='btn btn-success btn-xs' id='addNewRow6'>+</button>");
		            	   $("#addNewRow6").on('click',function(e){

							    dataModelChannel1General.data = "";
							    dataModelChannel1General.foldername = "third";
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

						   $("#thirdChannelGeneralTable .deleteRowButton").off('click').on('click',function(e){
						   		row = parseInt($(e.target).closest('tr').find('td').first().text())
							    doc = $("#thirdChannelGeneralTable").dataTable().fnGetData()[row-1];
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
		
		    dtJQThirdChannelGeneral = $('#thirdChannelGeneralTable').dataTable();
		    dtAPIThirdChannelGeneral = $('#thirdChannelGeneralTable').DataTable();
		}
	}

	getDataFromLocalDB(function(dataSet){
		getFileList('third',function(fileList){
			contentCategories = fileList;
			digitaladvert.initializeThirdChannelGeneralTable(dataSet);
		})
	});


    $("#thirdChannelGeneralTable").on('change','.contentSelect',contentSelect);
    $("#thirdChannelGeneralTable").on('change','.contentTypeSelect',contentTypeSelect);

   $("#saveRecordThirdChannelGeneral").on('click',function(){
	   	datas = dtJQThirdChannelGeneral.fnGetData();
	   	$.each(datas,function(index,data){
	   		data.duration = $(dtAPIThirdChannelGeneral.rows().nodes()[index]).find('td input.duration').val();
	   		delete data.stepno;
	   		if(data.datatype == "text"){
	   			data.data = $($("#thirdChannelGeneralTable").DataTable().rows().nodes()[index]).find('td input.textinput').val();
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