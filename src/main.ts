import * as saml from 'samlify';
import * as fs from 'fs';

async function validate(xml:string) {
  // Implement your validator function by need.
}

saml.setSchemaValidator({validate});

const sp = saml.ServiceProvider({
  signingCert: fs.readFileSync('./cert.pem'),
  metadata: fs.readFileSync('./sp.xml')
});
const idp = saml.IdentityProvider({
	isAssertionEncrypted: false,
	metadata: fs.readFileSync('./idp.xml')
});
const url = sp.createLoginRequest(idp, 'redirect');
console.log('url:', url.context);

const body = {
  SAMLResponse: '...SAML response here...',
};
const req = {body};

sp.parseLoginResponse(idp, 'post', req)
.then((res) => {
console.log('result:', res);
}, (err) => {
console.log('error:', err);
});
