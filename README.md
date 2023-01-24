# Learner Credential Portal

Coordinates credential collection by student/wallet from issuer.

The 'portal' is really a coordination of three pieces:

**LCW** - Learner Credential Wallet

**LCI** - Learner Credential Issuer

**LCP** - Learner Credential Portal (i.e, this repo)

The portal (LCP) itself (i.e., this Github repo) is just a very basic React App with two pages:

1. src/routes/SignIn.jsx - Could handle the GUI part of authentication using eduGain, but doesn't have to if the student authenticates somewhere else.
2. src/routes/credentialList.jsx - Displays a list of credentials for a student.  It gets the list from the LCI (Learner Credential Issuer) by calling a URL that is passed into the credentialList page as a request parameter.  Each credential in the list returned by the LCI has:
	- display title
	- a deeplink to open the LCW.  The deeplink includes a challenge. 
	- everything CHAPI needs to invoke the wallet
	- potentially a link to a downloadable PDF, if the given credential supports a PDF.

**NOTE:**  there is an addtional page, src/routes/Demo.jsx that opens the list page for precanned users.

The issuer (LCI) is a node express app.  It has three endpoints:

**/:listID** which returns the list of credentials for a student, complete with display data for each cred, and with deeplinks and endpoints (one per cred) from which to retrieve the signed cred.  This is the URL that is passed into the LCP credentialList page as a request parameter.
	
**:listID/:credID** which returns the signed credential in response to a DIDAuth (these are the uris that are included in the list that /:listID provides to the portal).

Both of those endpoints (/:listID and :/listID/credentialID) are ephemeral.  They only exist for some period (e.g., ten minutes), from the time the third endpoint (/handle) is called:

**/handle** is called to kick off a given credential exchange session.  It is meant to be called after authentication, and once the issuer has retrieved the credential data from its backend store.  It is called internally by the issuer, and so is not public.  Once called, /handle takes care of all the rest of the exchange with the wallet including challenge management and construction of deep links, etc.

The handle call expects a posting of all the data needed for a given student's credentials - all the data to both display the list of credentials, and also to construct a VC for each credential.  This endpoint (/handle) is really the meat of the portal.  It takes the data that is passed to it and stores it in a key-value store, with one entry per credential where the 'key' of each entry is a new UUID generated for each.  The key also acts as the challenge.  The /handle call returns a URL that can be used to open (e.g, as a redirect) the LCP with a request parameter on it that is the /:ist uri that the portal can call to get the list of credentials.  Like this exmaple:

http://learnerCredentialPortal.org/list?list=http://mcmaster.ca/lci/3234/232 

When this url is (opened or redirected to) portal list page opens, it fetches the list of creds and displays them. 

So, this /handle call is doing a bit more than just managing the generation and verification of the challenge (although it does that too)  It also constructs:

- deeplinks for each credential to which the student is entitled
- endpoints from which to get the list of credentials for the student
- endpoints from which to get each signed credentials, including constructing the VC from raw data    

The goal is to simplify what the issuing institution has to do.  Their job comes down to a bit of code to retrieve the data for a student and POST it to /handle.  Then their job is done.

If we were to make use of eduGain for auth, then the LCI might have one more endpoint that can be called from the portal edugain auth page, and which would be setup to assume a backend API (called something like getDataForStudent(studentID)) which the endpoint would call to get the data and then POST to handle.  In this case, the issuing institution just has to implement that one backend call (getDataForStudent(studentID)) either as an http endpoint or a direct javascript method.

Note, too, that the LCI code I have also has one further experimental endpoint from which to get a PDF version of a credential.  It isn't yet working, but should work fine - it is the same thing I do in the McMaster code to generate their PDFs.
