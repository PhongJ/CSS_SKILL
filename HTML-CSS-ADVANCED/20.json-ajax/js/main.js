var btn = document.getElementById("btn");
var animalContainer = document.getElementById("animal-info");
var pageCounter = 1;

btn.addEventListener("click", function() {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open('GET', 'https://learnwebcode.github.io/json-example/animals-' + pageCounter + '.json');

	ourRequest.onload = function () {
		if (ourRequest.status >= 200 && ourRequest.status < 400) {
			var ourData = JSON.parse(ourRequest.responseText);
			renderHTML(ourData);	
		} else {
			console.log("We connected to the server, but it returned an error");
		}
	}

	ourRequest.onerror = function () {
		console.log("Connection error");
	}

	ourRequest.send();
	if (pageCounter < 3) {
		pageCounter++;
	} else {
		btn.disabled = true;
	}
});

function renderHTML (data) {
	var htmlString = "";

	for (let i = 0, l = data.length; i < l; ++i) {
		htmlString += "<p>" + data[i].name + " is a " + data[i].species + " that likes ";

		for (let ii = 0, ll = data[i].foods.likes.length; ii < ll; ++ii) {
			if (ii == 0) {
				htmlString += data[i].foods.likes[ii];
			} else {
				htmlString += " and " + data[i].foods.likes[ii];
			}
		}

		htmlString += " and dislikes ";

		for (let ii = 0, ll = data[i].foods.dislikes.length; ii < ll; ++ii) {
			if (ii == 0) {
				htmlString += data[i].foods.dislikes[ii];
			} else {
				htmlString += " and " + data[i].foods.dislikes[ii];
			}
		}

		htmlString +=  ".</p>";
	}
	animalContainer.insertAdjacentHTML('beforeend', htmlString);
}


































