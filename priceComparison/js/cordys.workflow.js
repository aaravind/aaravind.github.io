/**
 * Cordys Workflow Plugin
 *
 * Copyright (c) 2013 Cordys
 */
;(function (window, $, undefined) {

	if (!$.cordys) {
		throw new Error("The Cordys HTML5 SDK is required, please ensure it is loaded properly");
	}

	$.cordys.workflow = new function() {
		var self = this;

		this.getTasks = function(options) {
			options = getOptionsForWorkflowMethod("GetTasks", "", options, {
				OrderBy: "Task.StartDate DESC",
				ShowNonWorkableItems: "false",
				ReturnTaskData: "false"
			});
			return $.cordys.ajax(options).then(function(response) {
				return $.cordys.json.findObjects(response, "Task");
			});
		};
		this.getAllTasksForUser = function(options) {
			options = getOptionsForWorkflowMethod("GetAllTasksForUser", "", options, {
				OrderBy: "Task.StartDate DESC"
			});
			return $.cordys.ajax(options).then(function(response) {
				return $.cordys.json.findObjects(response, "Task");
			});
		};
		this.getPersonalTasks = function(options) {
			options = getOptionsForWorkflowMethod("GetTasks", "", options, {
				OrderBy: "Task.StartDate DESC"
			});
			return $.cordys.ajax(options).then(function(response) {
				return $.cordys.json.findObjects(response, "Task");
			});
		};
		this.getTaskDetails = function(task, options) {
			options = options || {};
			options.parameters = options.parameters || {};
			options.parameters.TaskId = getTaskId(task);
			options = getOptionsForWorkflowMethod("GetTask", "", options, {
				ReturnTaskData:"true",
				RetrievePossibleActions:"true"
			});
			return $.cordys.ajax(options).then(function(response) {
				return $.cordys.json.find(response, "Task");
			});
		};
		this.getAllTargets = function(options) {
			options = getOptionsForWorkflowMethod("GetAllTargets", "", options, {
					TaskCountRequired: "true"
			});
			return $.cordys.ajax(options).then(function(response) {
				return $.cordys.json.findObjects(response, "Target");
			});
		};
		this.getWorkLists = function(options) {
			options = getOptionsForWorkflowMethod("GetAllWorklistsForUser", "", options);
			return $.cordys.ajax(options).then(function(response) {
				return $.cordys.json.findObjects(response, "Worklist");
			});
		};

		this.claimTask = function(task, options) {
			options = getOptionsForWorkflowMethod("ClaimTask", "", options, {
					TaskId: getTaskId(task)
			});
			return $.cordys.ajax(options);
		};
		this.delegateTask = function(task, user, memo, options) {
			options = getOptionsForWorkflowMethod("DelegateTask", "", options, {
					TaskId: getTaskId(task),
					TransferOwnership: "true",
					Memo: memo || "",
					SendTo: {
						UserDN: user
					}
			});
			return $.cordys.ajax(options);
		};
		this.performTaskAction = function(task, taskData, action, reason,options) {
			options = getOptionsForWorkflowMethod("PerformTaskAction", "", options, {
					TaskId: getTaskId(task),
					Action: action,
					Memo : reason,
					Data: taskData || {}
			});
			return $.cordys.ajax(options);
		};

		this.completeTask = function(task, taskData, options) {
			return this.performTaskAction(task, taskData, "COMPLETE",'', options);
		};
		this.pauseTask = function(task, taskData, options) {
			return this.performTaskAction(task, taskData, "PAUSE",'', options);
		};
		this.resumeTask = function(task, taskData, options) {
			return this.performTaskAction(task, taskData, "RESUME", '',options);
		};
		this.revokeTask = function(task, taskData, options) {
			return this.performTaskAction(task, taskData, "REVOKECLAIM",'', options);
		};
		this.skipTask = function(task, taskData, reason, options) {
			return this.performTaskAction(task, taskData, "SKIP", reason,options);
		};
		this.startTask = function(task, taskData, options) {
			return this.performTaskAction(task, taskData, "START", '',options);
		};
		this.stopTask = function(task, taskData, options) {
			return this.performTaskAction(task, taskData, "STOP", '',options);
		};
		this.suspendTask = function(task, taskData, options) {
			return this.performTaskAction(task, taskData, "SUSPEND", '',options);
		};

		this.isCaseActivity = function(task) {
			var taskType = getTaskType(task);
			return taskType ? (taskType === "CASE") : -1;
		};

		// Attachments
		this.getAttachments = function(task, options) {
			if (typeof(task) == "string") {
				var asyncvalue = (options) ? options.async : undefined ; //NOMBV
				var defaultsAsync = $.cordys.ajax.defaults.async ; //NOMBV
				return $.cordys.workflow.getTaskDetails(task, {async : (options && (asyncvalue !== undefined)) ? asyncvalue : defaultsAsync}).then(function(taskObject){
					return $.cordys.workflow.getAttachments(taskObject, options);
				}); 
			}
			options = getOptionsForWorkflowMethod("GetAttachments", "http://schemas.cordys.com/bpm/attachments/1.0", options, {
				instanceid: {
					"@type": getTaskType(task),
					text: getInstanceId(task)
				},
				activityid: task.ActivityId || task.Activity['@id']
			});

			return $.cordys.ajax(options).then(function(response) {
				return $.cordys.json.findObjects(response, "instance");
			});
		}

		this.addAttachment = function(task, attachmentName, fileName, description, content, options) {
			if (typeof(task) == "string") {
				var asyncvalue = (options) ? options.async : undefined ; //NOMBV
				var defaultsAsync = $.cordys.ajax.defaults.async ; //NOMBV
				return $.cordys.workflow.getTaskDetails(task, {async : (options && (asyncvalue !== undefined)) ? asyncvalue : defaultsAsync}).then(function(taskObject){
					return $.cordys.workflow.addAttachment(taskObject, attachmentName, fileName, description, content, options);
				});
			}
			var isURL = /^[a-zA-Z].*\:/.test(content);
			if (isURL) {
				// upload the file
				if ($.cordys.mobile) {
					$.cordys.mobile.fileReader.readAsDataURL(content, function(result) {
						// content retrieved as base64 encoded
						content = result.replace(/^.*base64,/, "");
						options = getOptionsForWorkflowMethod("UploadAttachment", "http://schemas.cordys.com/bpm/attachments/1.0", options, {
							instanceid: {
								"@type": getTaskType(task),
								text: getInstanceId(task)
							},
							activityid: task.ActivityId || task.Activity['@id'],
							attachmentname: attachmentName,
							filename: fileName,
							description: description,
							content: {
								"@isURL": false,
								text: content
							}
						});
						$.cordys.ajax(options);
					}, function (error) {
						throw new Error("Unable to read file, error: " + JSON.stringify(error));
					});
				} else {
					throw new Error("Unable to add attachment by url");
				}
			} else {
				// content should be base64 encoded
				if(!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(content)) || content.length % 4 > 0){
					if (window.btoa) content = window.btoa(content);
					else throw new Error("Unable to convert data to base64");
				}
				options = getOptionsForWorkflowMethod("UploadAttachment", "http://schemas.cordys.com/bpm/attachments/1.0", options, {
					instanceid: {
						"@type": getTaskType(task),
						text: getInstanceId(task)
					},
					activityid: task.ActivityId || task.Activity['@id'],
					attachmentname: attachmentName,
					filename: fileName,
					description: description,
					content: {
						"@isURL": false,
						text: content
					}
				});
				return $.cordys.ajax(options);
			}
		}

		this.uploadAttachment = function(task, attachmentName, fileName, description, url, options) {
			if (typeof(task) == "string") {
				var asyncvalue = options.async ; //NOMBV
				var defaultsAsync = $.cordys.ajax.defaults.async ; //NOMBV
				return $.cordys.workflow.getTaskDetails(task, {async : (options && (asyncvalue !== undefined)) ? asyncvalue : defaultsAsync}).then(function(taskObject){
					return $.cordys.workflow.uploadAttachment(taskObject, attachmentName, fileName, description, url, options);
				});
			}
			options = getOptionsForWorkflowMethod("UploadAttachment", "http://schemas.cordys.com/bpm/attachments/1.0", options, {
				instanceid: {
					"@type": getTaskType(task),
					text: getInstanceId(task)
				},
				activityid: task.ActivityId || task.Activity['@id'],
				attachmentname: attachmentName,
				filename: fileName,
				description: description,
				content: {
					"@isURL": true,
					text: url
				}
			});
			return $.cordys.ajax(options);
		}

		this.removeAttachment = function(task, attachmentName, fileName, documenturl, options) {
			if (typeof(task) == "string") {
				var asyncvalue = options.async ; //NOMBV
				var defaultsAsync = $.cordys.ajax.defaults.async ; //NOMBV
				return $.cordys.workflow.getTaskDetails(task, {async : (options && (asyncvalue !== undefined)) ? asyncvalue : defaultsAsync}).then(function(taskObject){
					return $.cordys.workflow.removeAttachment(taskObject, attachmentName, fileName,documenturl, options);

				});
			}
			options = getOptionsForWorkflowMethod("DeleteAttachment", "http://schemas.cordys.com/bpm/attachments/1.0", options, {
				instanceid: {
					"@type": getTaskType(task),
					text: getInstanceId(task)
				},
				activityid: task.ActivityId || task.Activity['@id'],
				attachmentname: attachmentName,
				filename: fileName,
				documenturl: documenturl
			});
			return $.cordys.ajax(options);
		}

		return this;
	};

	function getOptionsForWorkflowMethod(methodName, namespace,options, defaultParameters) {
		options = options || {};
		var ajaxOptions =  $.extend({
			method: methodName,
			namespace: namespace || "http://schemas.cordys.com/notification/workflow/1.0"
		}, options);
		ajaxOptions.parameters = $.extend(defaultParameters, options.parameters);
		return ajaxOptions;
	}

	function getTaskId(task) {
		var id = (typeof(task) === "object") ? task.TaskId : task;
		// If it is an observable, call the method to get the value, otherwise just return the value
		return (typeof(id) === "function") ? id() : id;
	}

	function getTaskType(task) {
		if (typeof(task) !== "object") return "";
		return task.SourceType || task.Component;
	}

	function getInstanceId(task) {
		if (typeof(task) === "string") return task;
		var id = ($.cordys.workflow.isCaseActivity(task)) 
				? (task.ProcessInstanceId || task.CaseInstanceId || task.SourceInstanceId || task.RootInstanceId || task.caseinstanceid) 
				: (task.ProcessInstanceId || task.SourceInstanceId);
		// If it is an observable, call the method to get the value, otherwise just return the value
		return (typeof(id) === "function") ? id() : id;
	}

})(window, jQuery)
