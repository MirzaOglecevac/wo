AIVM = function(superClass,AiModel,Configuration) {

    return class extends superClass {

        constructor() {
            super();
        }

        bind(ironRequest, limit, from) {
            var url = Configuration.configuration()[0].baseUrl;
            var endpoint = '/ai?limit='+limit+'&from='+from;
            var request = null;
            var coreAjax = ironRequest;

            // setup iron request
            AiModel.requestIron(url,endpoint,request,coreAjax,this);
            AiModel.getProfiles();
        }

        _onAiModelChange() {
            this.$.aiList.render();
        }

        ready(){
            super.ready();
            this.addEventListener('request-response', (e)=>this._requestResponse(e));
        }

        _requestResponse(e) {
            var e = e.detail.profiles;
            var main = this;
            e.forEach(function(element) {
                main.push('mergeUsers', element);
                main.from = element.user_id;
               // console.log("From: " + element.user_id);
            });

            this.$.skeletonScreen.style = "display: none;";
            this.$.loader.style = "display: none;";
            this.$.mainScreen.style  = "display: block;";
        }

    }

}