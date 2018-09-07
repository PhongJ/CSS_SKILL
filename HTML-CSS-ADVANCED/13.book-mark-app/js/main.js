// Listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark (e) {
	//-- Get form values
	const siteName = document.getElementById('siteName').value;
	const siteUrl = document.getElementById('siteUrl').value;

	if (!validateForm(siteName, siteUrl)) {
		return false;
	}

	const bookmark = {
		name: siteName,
		url: siteUrl
	}

	//-- Test if bookmark is null
	if (localStorage.getItem('bookmarks') === null) {
		//-- Init array
		var bookmarks = [];

		//-- Add to array
		bookmarks.push(bookmark);

		//-- Set to localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//-- Get bookmarks from localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		//-- Add bookmark to array
		bookmarks.push(bookmark);

		//-- Re-set back to the localStorage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}

	//-- Clear form
	document.getElementById('myForm').reset();

	//-- Re-fetch bookmarks
	fetchBookmarks();

	//-- Prevent form from submitting
	e.preventDefault();
}

function deleteBookmark(url) {
	//-- Get bookmarks from the localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//-- Loop throught bookmarks
	for (let i = 0, l = bookmarks.length; i < l; ++i) {
		if (bookmarks[i].url == url) {
			//-- Remove from array
			bookmarks.splice(i, 1);
		}
	}

	//-- Re-set back to localStorage
	localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	//-- Re-fetch bookmarks
	fetchBookmarks();

}

//Fetch bookmarks
function fetchBookmarks() {
	//-- Get bookmarks form localStorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//-- Get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	//-- Build output
	bookmarksResults.innerHTML = '';

	for (let i = 0, l = bookmarks.length; i < l; ++i) {
		const name = bookmarks[i].name;
		const url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">' + 
				'<h3>' + name + 
				' <a class="btn btn-default" target="_blank" href="' + url +'">Visit</a>' +
				' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="" href="#">Delete</a>' +
				'</h3>' +
				'</div>';
	}
}

function validateForm(siteName, siteUrl) {
	if (!siteName || !siteUrl) {
		alert('Please fill in the form');
		return false;
	}

	const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	const regex = new RegExp(expression);

	if (!siteUrl.match(regex)) {
		alert('Please use a valid URL');
		return false;
	}

	return true;
}

























