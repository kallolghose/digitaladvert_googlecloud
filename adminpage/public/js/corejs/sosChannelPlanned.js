

callSosChannelPlanned = function(){

	dataSet = [];             
	digitaladvert.initializeSosChannelPlannedTable = function(dataSet){
		// this.dataSet = dataSet


		dataSet = _.where(dataSet,{foldername : 'sos',type:'sos'})

		_.map(dataSet, function(record,index){
			record.stepno = index+1;
			return record;
		})
		if ($.fn.DataTable.isDataTable( '#sosChannelPlannedTable' )) {
			if(dtAPISosChannelPlanned.page.info().recordsTotal == 0){
				dtAPISosChannelPlanned.rows.add(dataSet);
			    dtAPISosChannelPlanned.draw();
			}
			else if(dtAPISosChannelPlanned.page.info().recordsTotal > 0){
				// dtAPISosChannelPlanned.fnClearTable();
				// dtAPISosChannelPlanned.destroy()
				// dtJQSosChannelPlanned.data(dataSet).draw();
				dtAPISosChannelPlanned.clear();
			    dtAPISosChannelPlanned.rows.add(dataSet);
			    dtAPISosChannelPlanned.draw();
			}
		}else{
		    $('#sosChannelPlannedTable').DataTable({
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
		                        var $starttime = $("<div class='input-group date sosallstarttimepickers' id='sosstarttimepicker" + full.stepno + "'>" + 
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
		                        var $endtime = $("<div class='input-group date sosallendtimepickers' id='sosendtimepicker" + full.stepno + "'>" + 
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
		               		var $button = $('<button class="btn btn-danger btn-xs deleteRowButton" id="deleteRow9">-</button>', {});
		                    return $button.prop("outerHTML");
		                }
		            }],
		            drawCallback : function (oSettings) {
		            	if($('#sosChannelPlannedTable').DataTable().rows().nodes().length == 0){
		            		$("#sosChannelPlannedTable_wrapper div.col-sm-7").empty();
		            		$("#sosChannelPlannedTable_wrapper div.col-sm-7").append($('<button class="btn btn-success btn-xs" id="sosAddNewRowExtraPlanned" style="float:right">+</button>',{}));
			            		$("#sosAddNewRowExtraPlanned").off('click').on('click',function(){
			            	   		startDate = new Date();
			            	   		startDate.setMinutes(startDate.getMinutes() + 5);
			            	   		endDate = new Date(startDate.getTime());;
			            	   		endDate.setMinutes(startDate.getMinutes() + 1);

								    dataModelChannel1Planned.data = "";
								    dataModelChannel1Planned._id = new Date().toISOString(),
								    dataModelChannel1Planned.datatype = "text";
								    dataModelChannel1Planned.foldername = "sos";
								    dataModelChannel1Planned.starttime = startDate.toISOString();
								    dataModelChannel1Planned.endtime = endDate.toISOString();
								    dataModelChannel1Planned.duration = (startDate - endDate)/1000;
								    dataModelChannel1Planned.type = "sos";

								    localDB.put(dataModelChannel1Planned).then(function(response) {
								  		console.log(response)
									}).catch(function (err) {
									  	console.log(err);
									  	alert(err);
									});;
							   });
		            	}else{
		            		$("#sosChannelPlannedTable_wrapper div.col-sm-7").empty();
		            	}
		            	$($('#sosChannelPlannedTable').DataTable().rows()
		            		.nodes()[$('#sosChannelPlannedTable').DataTable().data().length -1]).find('button#addNewRow9').remove()
		            	$($('#sosChannelPlannedTable').DataTable().rows()
		            		.nodes()[$('#sosChannelPlannedTable').DataTable().data().length -1])
		            			.find('button').closest('td').append(" <button class='btn btn-success btn-xs' id='addNewRow9'>+</button>");
		            	   $("#addNewRow9").on('click',function(){
		            	   		startDate = new Date();
		            	   		startDate.setMinutes(startDate.getMinutes() + 5);
		            	   		endDate = new Date(startDate.getTime());;
		            	   		endDate.setMinutes(startDate.getMinutes() + 1);

							    dataModelChannel1Planned.data = "";
							    dataModelChannel1Planned._id = new Date().toISOString(),
							    dataModelChannel1Planned.datatype = "text";
							    dataModelChannel1Planned.foldername = "sos";
							    dataModelChannel1Planned.starttime = startDate.toISOString();
							    dataModelChannel1Planned.endtime = endDate.toISOString();
							    dataModelChannel1Planned.duration = (startDate - endDate)/1000;
							    dataModelChannel1Planned.type = "sos"

							    localDB.put(dataModelChannel1Planned).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   })

						   $("#sosChannelPlannedTable .deleteRowButton").off('click').on('click',function(e){
						   		row = parseInt($(e.target).closest('tr').find('td').first().text())
							    doc = $("#sosChannelPlannedTable").dataTable().fnGetData()[row-1];
							    doc['_deleted'] = true;
							    localDB.put(doc).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   })


		            	$('.sosallstarttimepickers').datetimepicker();
				        $('.sosallendtimepickers').datetimepicker({
				            useCurrent: false //Important! See issue #1075
				        });

				        totalRows = $('#sosChannelPlannedTable').DataTable().rows()[0].length
				        var currentRow=1;
				        while( currentRow <= totalRows){
				        	var table = $("#sosChannelPlannedTable").DataTable();

					        $("#sosstarttimepicker" + currentRow).on("dp.change", function (e) {
								entimepickerid = $(e.target).closest('td')
				    									.next().find('div.sosallendtimepickers').attr('id')
					            $("#"+entimepickerid).data("DateTimePicker").minDate(e.date);
					        });
					        $("#sosendtimepicker" + currentRow).on("dp.change", function (e) {
					        	starttimepickerid = $(e.target).closest('td')
				    									.prev().find('div.sosallstarttimepickers').attr('id')
					            $("#"+starttimepickerid).data("DateTimePicker").maxDate(e.date);
					        });


					        $("#sosstarttimepicker" + currentRow).off('dp.hide').on("dp.hide", function (e) {
					        	// var rw = parseInt($(e.target).closest('tr').find('td').first().text());
				        		// table.cell(rw-1,1).data(e.date.toISOString())
				        		// $('#starttimepicker'+rw).data("DateTimePicker").date(moment(table.cell(rw-1,1).data()));
					        });

					        $("#sosendtimepicker" + currentRow).off('dp.hide').on("dp.hide", function (e) {
					        	// var rw = parseInt($(e.target).closest('tr').find('td').first().text());
					        	// table.cell(rw-1,2).data(e.date.toISOString())
					        	// $('#endtimepicker'+rw).data("DateTimePicker").date(moment(table.cell(rw-1,2).data()));
					        });

					        var col = 1;
					        while(col < 3){
			        			if(col == 1){
				        			$('#sosstarttimepicker'+currentRow).data("DateTimePicker").date(moment(table.cell(currentRow-1,col).data()));
			        			}else if(col == 2){
				        			$('#sosendtimepicker'+currentRow).data("DateTimePicker").date(moment(table.cell(currentRow-1,col).data()));
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
		
		    dtJQSosChannelPlanned = $('#sosChannelPlannedTable').dataTable();
		    dtAPISosChannelPlanned = $('#sosChannelPlannedTable').DataTable();
		}
	}

	getDataFromLocalDB(function(dataSet){
		getFileList('sos',function(fileList){
			contentCategories = fileList;
			digitaladvert.initializeSosChannelPlannedTable(dataSet);
		})
	});


    $("#sosChannelPlannedTable").on('change','.contentSelect',contentSelect);
    $("#sosChannelPlannedTable").on('change','.contentTypeSelect',contentTypeSelect);


   $("#saveRecordSosChannelPlanned").on('click',function(){
	   	datas = dtJQSosChannelPlanned.fnGetData();
	   	$.each(datas,function(index,data){
	   		starttime = $("#"+$(dtAPISosChannelPlanned.rows().nodes()[index]).find('td div')[0].id).data("DateTimePicker").date().toISOString();
	   		endtime = $("#"+$(dtAPISosChannelPlanned.rows().nodes()[index]).find('td div')[1].id).data("DateTimePicker").date().toISOString();
	   		data.starttime = starttime;
	   		data.endtime = endtime;
	   		if(data.datatype == "text"){
	   			data.data = $($("#sosChannelPlannedTable").DataTable().rows().nodes()[index]).find('td input.textinput').val();
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