UserdetailVM = function(superClass,UserdetailModel,Configuration) {

    return class extends superClass {

        static get properties() {
            return {
                id: Number
            }
        }

        constructor() {
            super();
        }

        bind(id, ironRequest) {
            this.id = id;

            var url = Configuration.configuration()[0].baseUrl;
            var endpoint = '/users?user_id=' + this.id;
            var request = null;
            var coreAjax = ironRequest;

            // setup iron request
            UserdetailModel.requestIron(url,endpoint,request,coreAjax,this);
            UserdetailModel.getUserdetail();
        }

        _onUserdetailModelChange(){
            this.$.list.render();
        }

        ready(){
            super.ready();
            this.addEventListener('request-response', (e)=>this._requestResponse(e));
        }

        _requestResponse(e) {
            this.profileInfo = e.detail.profile;
            console.log(e.detail.profile);
            this.$.loadingScreen.style = "display: none;";
            this.$.mainScreen.style  = "display: block;";
        }
    }

}