SuggestedVM = function(superClass,SuggestedModel,Configuration) {

    return class extends superClass {

        static get properties() {
            return {
                list:String
            }
        }

        constructor() {
            super();
        }

        bind(list, ironRequest){
            this.list = list;

            var url = Configuration.configuration()[0].baseUrl;
            var endpoint = '/users?type=newest&limit=10';
            var request = null;
            var coreAjax = ironRequest;

            // setup iron request
            SuggestedModel.requestIron(url,endpoint,request,coreAjax,this);
            SuggestedModel.getSuggestedStatis();

            // get items
            //this.statisticItems = SuggestedModel.getCurrentStatistics();

        }

        _onSuggestionsModelChange() {
            this.list.render();
        }

        ready(){
            super.ready();
            this.addEventListener('request-response', (e)=>this._requestResponse(e));
        }

        _requestResponse(e) {
            console.log(e.detail.profiles);
            this.suggestionsItems = e.detail.profiles;
            this.$.loadingScreen.style = "display: none;";
            this.$.mainScreen.style  = "display: block;";
        }

    }

}