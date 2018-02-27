StatisticsVM = function(superClass,StatisticsModel,Configuration) {

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
            var endpoint = '/statistics';
            var request = null;
            var coreAjax = ironRequest;

            // setup iron request
            StatisticsModel.requestIron(url,endpoint,request,coreAjax,this);

            StatisticsModel.getCurrentStatistics();
        }

        _onStatisticsModelChange() {
            this.list.render();
        }

        ready(){
            super.ready();
            this.addEventListener('request-response', (e)=>this._requestResponse(e));
        }

        _requestResponse(e) {
            this.statisticItems = e.detail.data;
            this.$.skeletonScreen.style = "display: none;";
            this.$.mainList.style  = "display: flex;";
        }

    }

}