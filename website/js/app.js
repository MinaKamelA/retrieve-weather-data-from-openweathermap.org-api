const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
const zipCode = document.getElementById('zip');
const apiKey = 'your openweathermap api key'; /*WARNING: Don't forget to replace this string with your api key */
const generateButton = document.getElementById('generate');
const contentHolder = document.getElementById('enteryHolder');

/*add event listener for clicks on the button*/
generateButton.addEventListener('click', function (){
 	getPostAndUpdate(baseUrl+zipCode.value+apiKey);
});

/*function to get the data from the api using fetch for the api url*/
async function getData(url = ''){
	const response = await fetch(url);
	try{
		const dataRetrieved = await response.json();
		console.log(`Get Succeed data is:${dataRetrieved}`);	/*displaying messages for test and debug purposes*/
		console.log(dataRetrieved);
		return dataRetrieved;
	}
	catch(error){
		console.log(`there was an error while trying to fetch the data [error: ${error}]`);
	}
}

/*function to post the data to the server post route*/
async function postData(url, data){
	const res = await fetch(url, {
		method: 'POST', 
      	credentials: 'same-origin',
      	headers: {
          'Content-Type': 'application/json',
      	},        
      	body: JSON.stringify(data), 
	});
	try{
		const dataToPost = await res.json();
		console.log(`Post Succeed data is:${dataToPost}`); /*displaying messages for test and debug purposes*/
		console.log(dataToPost);
		return	dataToPost;
	}
	catch(error){
		console.log(`there was an error while trying to post the data [error: ${error}]`);
	}
}

/*function to update the user interface with the new data*/
async function updateUi(){
	const request = await fetch('/all');
	try{
		const dataToUpdateWith = await request.json();
		document.getElementById('date').innerHTML = `<p> Date: ${dataToUpdateWith.date} </p>`;
		document.getElementById('temp').innerHTML = `<p> Temp: <strong> ${dataToUpdateWith.temp} degrees </strong> </p>`;
		document.getElementById('content').innerHTML = `<p> Feelings: ${dataToUpdateWith.feelings} </p>`;
		/*check for the temperature if it is hot cold or nice*/
		if(dataToUpdateWith.temp > 86){
			/*in case it is hot*/
			contentHolder.classList.remove('nice', 'cold');
			contentHolder.classList.add('hot');
		}
		else if(dataToUpdateWith.temp < 72){
			/*in case it is cold*/
			contentHolder.classList.remove('nice', 'hot');
			contentHolder.classList.add('cold');	
		}
		else{
			/*in case it is nice*/
			contentHolder.classList.remove('cold', 'hot');
			contentHolder.classList.add('nice');	
		}
		console.log(`Update Succeed data is:${dataToUpdateWith}`); /*displaying messages for test and debug purposes*/
		console.log(dataToUpdateWith);
	}
	catch(error){
		console.log(`there was an error while trying to update the UI [error: ${error}]`);
	}
}

async function getPostAndUpdate(url = ''){
	getData(url)
	.then(function(data){
		const date = new Date();
		const dateValue = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
		postData('/all', {date:dateValue,
		temp: data.main.temp,
		feelings: document.getElementById('feelings').value});
		updateUi();
	})
}
