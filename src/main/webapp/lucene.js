function rebuildDatabase() {
	var workers = document.getElementById("txtWorkers").value;
	if (workers < 1) {
		return;
	}
	luceneSearchManager.rebuildDatabase(workers, function(t) {
		updateStatusFromResponse(t.responseObject());
	});
}

function getStatus() {
	luceneSearchManager.getStatus(function(t) {
		updateStatusFromResponse(t.responseObject());
	});
}
function updateStatusFromResponse(statement) {
	var messageElement = document.getElementById("message");
	messageElement.className = ((statement.code !== 0) ? "error" : "success");
	messageElement.innerHTML = statement.message;
	document.getElementById("btnRebuild").style.display = ((statement.running) ? "none"
			: "");
	document.getElementById("txtWorkers").style.display = ((statement.running) ? "none"
			: "");
	document.getElementById("currentProgress").style.display = ((statement.progress) ? ""
			: "none");
	document.getElementById("lblWorkers").style.display = ((statement.running) ? "none"
			: "");
	if (statement.progress) {
		var progress = statement.progress;
		document.getElementById("currentWorkers").innerHTML = statement.workers;

		document.getElementById("currentlyProcessing").innerHTML = progress.name;
		document.getElementById("currentlyProcessingIndex").innerHTML = progress.current;
		document.getElementById("currentlyProcessingMax").innerHTML = progress.max;
		document.getElementById("totalProcessesedRun").innerHTML = progress.processedItems;
		document.getElementById("currentElapsedTime").innerHTML = (progress.elapsedTime / 1000)
				+ "s";
		var historyString = "";
		for (var historyIndex = 0; historyIndex != progress.history.length; historyIndex++) {
			var hist = statement.progress.history[historyIndex];
			var projectString = hist.name + " completed after "
					+ (hist.elapsedTime / 1000) + "s (" + hist.current
					+ " elements processed)";
			if (hist.reasonMessage) {
				historyString += "<span class=\"historyerror\">"
						+ projectString + ": " + hist.reasonMessage
						+ "</span><br />";
			} else {
				historyString += "<span class=\"historysuccess\">"
						+ projectString + "</span><br />";
			}
		}
		document.getElementById("history").innerHTML = historyString;
	} else {
		document.getElementById("currentProgress").style.display = "none";
	}

}