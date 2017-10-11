

callFourthChannelPlanned = function(){

	dataSet = [];             
	digitaladvert.initializeFourthChannelPlannedTable = function(dataSet){
		// this.dataSet = dataSet


		dataSet = _.where(dataSet,{foldername : 'fourth',type:'planned'})

		_.map(dataSet, function(record,index){
			record.stepno = index+1;
			return record;
		})
		if ($.fn.DataTable.isDataTable( '#fourthChannelPlannedTable' )) {
			if(dtAPIFourthChannelPlanned.page.info().recordsTotal == 0){
				dtAPIFourthChannelPlanned.rows.add(dataSet);
			    dtAPIFourthChannelPlanned.draw();
			}
			else if(dtAPIFourthChannelPlanned.page.info().recordsTotal > 0){
				// dtAPIFourthChannelPlanned.fnClearTable();
				// dtAPIFourthChannelPlanned.destroy()
				// dtJQFourthChannelPlanned.data(dataSet).draw();
				dtAPIFourthChannelPlanned.clear();
			    dtAPIFourthChannelPlanned.rows.add(dataSet);
			    dtAPIFourthChannelPlanned.draw();
			}
		}else{
		    $('#fourthChannelPlannedTable').DataTable({
		        data: dataSet,
		        bPaginate : false,
    			fixedColumns: true,
				bAutoWidth : false,
				searching: false,
				"bSort" : false,
				fixedHeader: {
					header: true,
					footer: true
				},
		        columns: [
		            { "data": "stepno" },
		            { "data": "starttime" },
		            { "data": "endtime" },
		            { "data": "datatype" },
		            { "data": "data" }],
	            "columnDefs": [{
	            		"targets": 0,
	            		width : "2%",
	            		data : "stepno"
	            		},
	            		{
	            		"targets": 1,
	            		width : "23%",
		                "data": "starttime",
		               	render: function (data, type, full, meta) {
		                        var $starttime = $("<div class='input-group date fourthallstarttimepickers' id='fourthstarttimepicker" + full.stepno + "'>" + 
                    							"<input type='text' class='form-control' />"+
							                    "<span class='input-group-addon'>"+
						                        "<span class='glyphicon glyphicon-calendar'></span>" +
                								"</span></div>", {
		                        });
		                        return $starttime.prop("outerHTML");
			                }

			            },
			            {
	            		"targets": 2,
	            		width : "23%",
		                "data": "endtime",
		               	render: function (data, type, full, meta) {
		                        var $endtime = $("<div class='input-group date fourthallendtimepickers' id='fourthendtimepicker" + full.stepno + "'>" + 
                    							"<input type='text' class='form-control' value='"+moment(data)+"'/>"+
							                    "<span class='input-group-addon'>"+
						                        "<span class='glyphicon glyphicon-calendar'></span>" +
                								"</span></div>", {
		                        });
		                        return $endtime.prop("outerHTML");
			                }

			            },
	            		{
		                "targets": 3,
		                width : "23%",
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
		                "targets": 4,
		                width : "22%",
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
		                "targets": 5,
		                width : "7%",
		                "data": "",
		               	render: function (data, type, full, meta) {
		               		var $button = $('<button class="btn btn-danger btn-xs deleteRowButton" id="deleteRow8">-</button>', {});
		                    return $button.prop("outerHTML");
		                }
		            }],
		            drawCallback : function (oSettings) {
		            	if($('#fourthChannelPlannedTable').DataTable().rows().nodes().length == 0){
		            		$("#fourthChannelPlannedTable_wrapper div.col-sm-7").empty();
		            		$("#fourthChannelPlannedTable_wrapper div.col-sm-7").append($('<button class="btn btn-success btn-xs" id="fourthAddNewRowExtraPlanned" style="float:right">+</button>',{}));
			            		$("#fourthAddNewRowExtraPlanned").off('click').on('click',function(){
			            	   		startDate = new Date();
			            	   		startDate.setMinutes(startDate.getMinutes() + 5);
			            	   		endDate = new Date(startDate.getTime());;
			            	   		endDate.setMinutes(startDate.getMinutes() + 1);

								    dataModelChannel1Planned.data = "";
								    dataModelChannel1Planned._id = new Date().toISOString(),
								    dataModelChannel1Planned.datatype = "image";
								    dataModelChannel1Planned.foldername = "fourth";
								    dataModelChannel1Planned.starttime = startDate.toISOString();
								    dataModelChannel1Planned.endtime = endDate.toISOString();
								    dataModelChannel1Planned.duration = (startDate - endDate)/1000;

								    localDB.put(dataModelChannel1Planned).then(function(response) {
								  		console.log(response)
									}).catch(function (err) {
									  	console.log(err);
									  	alert(err);
									});;
							   });
		            	}else{
		            		$("#fourthChannelPlannedTable_wrapper div.col-sm-7").empty();
		            	}
		            	$($('#fourthChannelPlannedTable').DataTable().rows()
		            		.nodes()[$('#fourthChannelPlannedTable').DataTable().data().length -1]).find('button#addNewRow8').remove()
		            	$($('#fourthChannelPlannedTable').DataTable().rows()
		            		.nodes()[$('#fourthChannelPlannedTable').DataTable().data().length -1])
		            			.find('button').closest('td').append(" <button class='btn btn-success btn-xs' id='addNewRow8'>+</button>");
		            	   $("#addNewRow8").on('click',function(){
		            	   		startDate = new Date();
		            	   		startDate.setMinutes(startDate.getMinutes() + 5);
		            	   		endDate = new Date(startDate.getTime());;
		            	   		endDate.setMinutes(startDate.getMinutes() + 1);

							    dataModelChannel1Planned.data = "";
							    dataModelChannel1Planned._id = new Date().toISOString(),
							    dataModelChannel1Planned.datatype = "image";
							    dataModelChannel1Planned.foldername = "fourth";
							    dataModelChannel1Planned.starttime = startDate.toISOString();
							    dataModelChannel1Planned.endtime = endDate.toISOString();
							    dataModelChannel1Planned.duration = (startDate - endDate)/1000;

							    localDB.put(dataModelChannel1Planned).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   })

						   $("#fourthChannelPlannedTable .deleteRowButton").off('click').on('click',function(e){
						   		row = parseInt($(e.target).closest('tr').find('td').first().text())
							    doc = $("#fourthChannelPlannedTable").dataTable().fnGetData()[row-1];
							    doc['_deleted'] = true;
							    localDB.put(doc).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   })


		            	$('.fourthallstarttimepickers').datetimepicker();
				        $('.fourthallendtimepickers').datetimepicker({
				            useCurrent: false //Important! See issue #1075
				        });

				        totalRows = $('#fourthChannelPlannedTable').DataTable().rows()[0].length
				        var currentRow=1;
				        while( currentRow <= totalRows){
				        	var table = $("#fourthChannelPlannedTable").DataTable();

					        $("#fourthstarttimepicker" + currentRow).on("dp.change", function (e) {
								entimepickerid = $(e.target).closest('td')
				    									.next().find('div.fourthallendtimepickers').attr('id')
					            $("#"+entimepickerid).data("DateTimePicker").minDate(e.date);
					        });
					        $("#fourthendtimepicker" + currentRow).on("dp.change", function (e) {
					        	starttimepickerid = $(e.target).closest('td')
				    									.prev().find('div.fourthallstarttimepickers').attr('id')
					            $("#"+starttimepickerid).data("DateTimePicker").maxDate(e.date);
					        });


					        $("#fourthstarttimepicker" + currentRow).off('dp.hide').on("dp.hide", function (e) {
					        	// var rw = parseInt($(e.target).closest('tr').find('td').first().text());
				        		// table.cell(rw-1,1).data(e.date.toISOString())
				        		// $('#starttimepicker'+rw).data("DateTimePicker").date(moment(table.cell(rw-1,1).data()));
					        });

					        $("#fourthendtimepicker" + currentRow).off('dp.hide').on("dp.hide", function (e) {
					        	// var rw = parseInt($(e.target).closest('tr').find('td').first().text());
					        	// table.cell(rw-1,2).data(e.date.toISOString())
					        	// $('#endtimepicker'+rw).data("DateTimePicker").date(moment(table.cell(rw-1,2).data()));
					        });

					        var col = 1;
					        while(col < 3){
			        			if(col == 1){
				        			$('#fourthstarttimepicker'+currentRow).data("DateTimePicker").date(moment(table.cell(currentRow-1,col).data()));
			        			}else if(col == 2){
				        			$('#fourthendtimepicker'+currentRow).data("DateTimePicker").date(moment(table.cell(currentRow-1,col).data()));
			        			}
			        			col++;
					        }

				        	currentRow++;
				        }








		            	// $('.mySelect').selectpicker();
			            // new Selectr('.contentTypeSelect');
			            // new Selectr('.contentSelect');
					    
					},
		    });
		
		    dtJQFourthChannelPlanned = $('#fourthChannelPlannedTable').dataTable();
		    dtAPIFourthChannelPlanned = $('#fourthChannelPlannedTable').DataTable();
		}
	}

	getDataFromLocalDB(function(dataSet){
		getFileList('fourth',function(fileList){
			contentCategories = fileList;
			digitaladvert.initializeFourthChannelPlannedTable(dataSet);
		})
	});


    $("#fourthChannelPlannedTable").on('change','.contentSelect',contentSelect);
    $("#fourthChannelPlannedTable").on('change','.contentTypeSelect',contentTypeSelect);


   $("#saveRecordFourthChannelPlanned").on('click',function(){
	   	datas = dtJQFourthChannelPlanned.fnGetData();
	   	$.each(datas,function(index,data){
	   		starttime = $("#"+$(dtAPIFourthChannelPlanned.rows().nodes()[index]).find('td div')[0].id).data("DateTimePicker").date().toISOString();
	   		endtime = $("#"+$(dtAPIFourthChannelPlanned.rows().nodes()[index]).find('td div')[1].id).data("DateTimePicker").date().toISOString();
	   		data.starttime = starttime;
	   		data.endtime = endtime;
	   		if(data.datatype == "text"){
	   			data.data = $($("#fourthChannelPlannedTable").DataTable().rows().nodes()[index]).find('td input.textinput').val();
	   		}

	   		data.duration = "" + (new Date(endtime)-new Date(starttime))/1000;
	   		delete data.stepno;
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