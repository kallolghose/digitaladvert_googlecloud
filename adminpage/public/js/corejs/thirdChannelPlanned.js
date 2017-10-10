

callThirdChannelPlanned = function(){

	dataSet = [];             
	digitaladvert.initializeThirdChannelPlannedTable = function(dataSet){
		// this.dataSet = dataSet


		dataSet = _.where(dataSet,{foldername : 'third',type:'planned'})

		_.map(dataSet, function(record,index){
			record.stepno = index+1;
			return record;
		})
		if ($.fn.DataTable.isDataTable( '#thirdChannelPlannedTable' )) {
			if(dtAPIThirdChannelPlanned.page.info().recordsTotal == 0){
				dtAPIThirdChannelPlanned.rows.add(dataSet);
			    dtAPIThirdChannelPlanned.draw();
			}
			else if(dtAPIThirdChannelPlanned.page.info().recordsTotal > 0){
				// dtAPIThirdChannelPlanned.fnClearTable();
				// dtAPIThirdChannelPlanned.destroy()
				// dtJQThirdChannelPlanned.data(dataSet).draw();
				dtAPIThirdChannelPlanned.clear();
			    dtAPIThirdChannelPlanned.rows.add(dataSet);
			    dtAPIThirdChannelPlanned.draw();
			}
		}else{
		    $('#thirdChannelPlannedTable').DataTable({
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
		                        var $starttime = $("<div class='input-group date thirdallstarttimepickers' id='thirdstarttimepicker" + full.stepno + "'>" + 
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
		                        var $endtime = $("<div class='input-group date thirdallendtimepickers' id='thirdendtimepicker" + full.stepno + "'>" + 
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
		               		var $button = $('<button class="btn btn-danger btn-xs deleteRowButton" id="deleteRow5">-</button>', {});
		                    return $button.prop("outerHTML");
		                }
		            }],
		            drawCallback : function (oSettings) {
		            	if($('#thirdChannelPlannedTable').DataTable().rows().nodes().length == 0){
		            		$("#thirdChannelPlannedTable_wrapper div.col-sm-7").empty();
		            		$("#thirdChannelPlannedTable_wrapper div.col-sm-7").append($('<button class="btn btn-success btn-xs" id="thirdAddNewRowExtraPlanned" style="float:right">+</button>',{}));
		            		$("#thirdAddNewRowExtraPlanned").off('click').on('click',function(){
		            	   		startDate = new Date();
		            	   		startDate.setMinutes(startDate.getMinutes() + 5);
		            	   		endDate = new Date(startDate.getTime());;
		            	   		endDate.setMinutes(startDate.getMinutes() + 1);

							    dataModelChannel1Planned.data = "";
							    dataModelChannel1Planned._id = new Date().toISOString(),
							    dataModelChannel1Planned.datatype = "image";
							    dataModelChannel1Planned.foldername = "third";
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
		            	}else{
		            		$("#thirdChannelPlannedTable_wrapper div.col-sm-7").empty();
		            	}

		            	$($('#thirdChannelPlannedTable').DataTable().rows()
		            		.nodes()[$('#thirdChannelPlannedTable').DataTable().data().length -1]).find('button#addNewRow5').remove()
		            	$($('#thirdChannelPlannedTable').DataTable().rows()
		            		.nodes()[$('#thirdChannelPlannedTable').DataTable().data().length -1])
		            			.find('button').closest('td').append(" <button class='btn btn-success btn-xs' id='addNewRow5'>+</button>");
		            	   $("#addNewRow5").on('click',function(){
		            	   		startDate = new Date();
		            	   		startDate.setMinutes(startDate.getMinutes() + 5);
		            	   		endDate = new Date(startDate.getTime());;
		            	   		endDate.setMinutes(startDate.getMinutes() + 1);

							    dataModelChannel1Planned.data = "";
							    dataModelChannel1Planned._id = new Date().toISOString(),
							    dataModelChannel1Planned.datatype = "image";
							    dataModelChannel1Planned.foldername = "third";
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

						   $("#thirdChannelPlannedTable .deleteRowButton").off('click').on('click',function(e){
						   		row = parseInt($(e.target).closest('tr').find('td').first().text())
							    doc = $("#thirdChannelPlannedTable").dataTable().fnGetData()[row-1];
							    doc['_deleted'] = true;
							    localDB.put(doc).then(function(response) {
							  		console.log(response)
								}).catch(function (err) {
								  	console.log(err);
								  	alert(err);
								});;
						   })


		            	$('.thirdallstarttimepickers').datetimepicker();
				        $('.thirdallendtimepickers').datetimepicker({
				            useCurrent: false //Important! See issue #1075
				        });

				        totalRows = $('#thirdChannelPlannedTable').DataTable().rows()[0].length
				        var currentRow=1;
				        while( currentRow <= totalRows){
				        	var table = $("#thirdChannelPlannedTable").DataTable();

					        $("#thirdstarttimepicker" + currentRow).on("dp.change", function (e) {
								entimepickerid = $(e.target).closest('td')
				    									.next().find('div.thirdallendtimepickers').attr('id')
					            $("#"+entimepickerid).data("DateTimePicker").minDate(e.date);
					        });
					        $("#thirdendtimepicker" + currentRow).on("dp.change", function (e) {
					        	starttimepickerid = $(e.target).closest('td')
				    									.prev().find('div.thirdallstarttimepickers').attr('id')
					            $("#"+starttimepickerid).data("DateTimePicker").maxDate(e.date);
					        });


					        $("#thirdstarttimepicker" + currentRow).off('dp.hide').on("dp.hide", function (e) {
					        	// var rw = parseInt($(e.target).closest('tr').find('td').first().text());
				        		// table.cell(rw-1,1).data(e.date.toISOString())
				        		// $('#starttimepicker'+rw).data("DateTimePicker").date(moment(table.cell(rw-1,1).data()));
					        });

					        $("#thirdendtimepicker" + currentRow).off('dp.hide').on("dp.hide", function (e) {
					        	// var rw = parseInt($(e.target).closest('tr').find('td').first().text());
					        	// table.cell(rw-1,2).data(e.date.toISOString())
					        	// $('#endtimepicker'+rw).data("DateTimePicker").date(moment(table.cell(rw-1,2).data()));
					        });

					        var col = 1;
					        while(col < 3){
			        			if(col == 1){
				        			$('#thirdstarttimepicker'+currentRow).data("DateTimePicker").date(moment(table.cell(currentRow-1,col).data()));
			        			}else if(col == 2){
				        			$('#thirdendtimepicker'+currentRow).data("DateTimePicker").date(moment(table.cell(currentRow-1,col).data()));
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
		
		    dtJQThirdChannelPlanned = $('#thirdChannelPlannedTable').dataTable();
		    dtAPIThirdChannelPlanned = $('#thirdChannelPlannedTable').DataTable();
		}
	}

	getDataFromLocalDB(function(dataSet){
		getFileList(function(fileList){
			contentCategories = fileList;
			digitaladvert.initializeThirdChannelPlannedTable(dataSet);
		})
	});


    $("#thirdChannelPlannedTable").on('change','.contentSelect',contentSelect);
    $("#thirdChannelPlannedTable").on('change','.contentTypeSelect',contentTypeSelect);


   $("#saveRecordThirdChannelPlanned").on('click',function(){
	   	datas = dtJQThirdChannelPlanned.fnGetData();
	   	$.each(datas,function(index,data){
	   		starttime = $("#"+$(dtAPIThirdChannelPlanned.rows().nodes()[index]).find('td div')[0].id).data("DateTimePicker").date().toISOString();
	   		endtime = $("#"+$(dtAPIThirdChannelPlanned.rows().nodes()[index]).find('td div')[1].id).data("DateTimePicker").date().toISOString();
	   		data.starttime = starttime;
	   		data.endtime = endtime;
	   		if(data.datatype == "text"){
	   			data.data = $($("#thirdChannelPlannedTable").DataTable().rows().nodes()[index]).find('td input.textinput').val();
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