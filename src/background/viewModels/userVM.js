UserVM = function(superClass,UserModel,Configuration) {

    return class extends superClass {

        constructor() {
            super();
        }

        bind(ironRequest, limit, from) {

            var url = Configuration.configuration()[0].baseUrl;
            var endpoint = '/users?type=newest&limit='+limit+'&from='+from;
            var request = null;
            var coreAjax = ironRequest;

            // setup iron request
            UserModel.requestIron(url,endpoint,request,coreAjax,this);
            UserModel.getUsers();
        }

        _onUserModelChange() {
            this.$.loader.style = "display: block;";
            // render
            this.$.userList.render();
        }

        ready(){
            super.ready();
            this.addEventListener('request-response', (e)=>this._requestResponse(e));
        }

        _requestResponse(e) {
            var e = e.detail.profiles;
            var main = this;
            e.forEach(function(element) {
                main.push('userItems', element);
                main.from = element.user_id;
            });

            this.$.loader.style = "display: none;";
            this.$.skeletonScreen.style = "display: none;";
            this.$.searcher.style="display: block;";
            this.$.mainScreen.style  = "display: block;";
        }

    }

}