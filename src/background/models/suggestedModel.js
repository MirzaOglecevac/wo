var SuggestedModel = (function(){

    var suggestedModel = function(requestHandler){

        var main = this;
        var url;
        var endpoint;
        var request;

        this.requestIron = function(url, endpoint, request){
            main.url = url;
            main.endpoint = endpoint;
            main.request = request;
        }

        this.getSuggestedStatis = function(){
            return requestHandler.getRequest(main.url+main.endpoint,main.request).data;
        };

        this.getSuggested = function() {
            // make request on server
        }

    }

    return new suggestedModel(RequestHandler);
})();