SettingsVM = function(superClass,SettingsModel,Configuration) {

    return class extends superClass {

        static get properties() {
            return {
                list:String
            }
        }

        constructor() {
            super();
        }

        bind(list, ironRequest) {
            this.list = list;

            var url = Configuration.configuration()[0].baseUrl;
            var endpoint = '/settings';
            var request = null;
            var coreAjax = ironRequest;

            // setup iron request
            SettingsModel.requestIron(url,endpoint,request,coreAjax,this);

            SettingsModel.getUserdetail();
        }

        _onSettingsModelChange(){
            this.list.render();
        }

        ready(){
            super.ready();
            this.addEventListener('request-response', (e)=>this._requestResponse(e));
        }

        _requestResponse(e) {
            this.settingItems = e.detail.data;
            this.$.loadingScreen.style = "display: none;";
            this.$.mainScreen.style  = "display: flex;";
        }

    }

}