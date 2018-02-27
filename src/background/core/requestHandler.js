var RequestHandler = (function(){

    var requestHandler = function(app){

        // make get request
        this.getRequest = function(url,request,ironAjax,thisApp) {

            // ironAjax.send({url: url, body: null});
            ironAjax.url = null;
            ironAjax.url = url;

            var response = ironAjax.generateRequest();
            response.completes.then(function(req) {
                    thisApp.dispatchEvent(new CustomEvent('request-response', {
                        bubbles: true, composed: true, detail: req.response}));

                }, function(rejected) {
                    // failed request, argument is an object
                    let req = rejected.request;
                    let error = rejected.error;
                    console.log('error');
                }
            )

        }

        // make post request
        this.postRequest = function(url,request) {
            console.log('post request');
        }

        // make put request
        this.putRequest = function(url,request) {
            console.log('put request');
        }

        // make delete request
        this.deleteRequest = function (url,request) {
            console.log('delete request');
        }

    }

    return new requestHandler();
})();