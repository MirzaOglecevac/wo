ContentVM = function(superClass,ContentModel,Configuration) {

    return class extends superClass {

        constructor() {
            super();
        }

        bind(ironRequest, limit, from) {

            var url = Configuration.configuration()[0].baseUrl;
            var endpoint = '/content?type=ALL&limit='+limit+'&from='+from;
            var request = null;
            var coreAjax = ironRequest;

            // setup iron request
            ContentModel.requestIron(url,endpoint,request,coreAjax,this);
            ContentModel.getContent();
        }

        _onContentModelChange() {
            this.$.loader.style = "display: block;";
            this.$.contentList.render();
        }

        ready(){
            super.ready();
            this.addEventListener('request-response', (e)=>this._requestResponse(e));
        }

        _requestResponse(e) {
            var e = e.detail.data;
            var main = this;
            e.forEach(function(element) {
                main.push('contentItems', element);
                main.from = element.id;
            });

            this.$.loader.style = "display: none;";
            this.$.skeletonScreen.style = "display: none;";
            this.$.mainScreen.style  = "display: block;";
        }

    }

}