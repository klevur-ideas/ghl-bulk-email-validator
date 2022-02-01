import fetch from 'node-fetch';

//Go High Level agency or sub-account location's API Key
const ghlLocationApiKey = '';

const baseGhlApiURL = 'https://rest.gohighlevel.com';
const ghlApiEndpoint = '/v1/contacts/';
const httpHeaders = { 'Authorization': 'Bearer ' + ghlLocationApiKey };
const qsLimit = 'limit=100';
const ghlValidateEmailURL = 'https://msgsndr.com/contact/validate_email/';


function getContacts(specs, startAfter = '', startAfterId = '', previousContactIds = []) {

	return fetch(specs.url + '?' + specs.qs + '&startAfter=' + startAfter + '&startAfterId=' + startAfterId, { headers: specs.headers })
		.then(response => response.json())
		.then(newResponse => {
			var contacts = previousContactIds;
			for (var contact in newResponse.contacts) {
				console.log(newResponse.contacts[contact].id);
				if (newResponse.contacts[contact].email !== null) {
					contacts.push(newResponse.contacts[contact].id);
				} else {
					console.log(' ^^^(skipping contact id ' + newResponse.contacts[contact].id + ' ... email address not available)');
				}
			}

			if (newResponse.meta.startAfter !== null) {
				return getContacts(specs, newResponse.meta.startAfter, newResponse.meta.startAfterId, contacts);
			}
			return contacts;
		});

}


function mailgunValidateEmail(id, url) {
	fetch(url + id)
		.then(response => response.text())
		.then(text => console.log('Mailgun email validation response for GHL contact ID, ' + id + ': ' + text));
}


getContacts({
	url: baseGhlApiURL + ghlApiEndpoint,
	headers: httpHeaders,
	qs: qsLimit
}).then(contacts => {
	console.log('Total contacts retrieved: ' + contacts.length);
	for (var id in contacts) {
		mailgunValidateEmail(contacts[id], ghlValidateEmailURL);
	}
});