window.onload = function() {
	if (document.getElementById('notificationDiv').innerText != '') {
		document.getElementById('notificationDiv').style.display = 'block';
	}
	else {
		document.getElementById('notificationDiv').style.display = 'none';
	}
};