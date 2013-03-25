angular.module('app',['ngResource']);

//ngResource.module('app').factory('AppResource',['$resource',function($resource){
//    return function(name){
//        return $resource('../../server/api.php/'+name+'/:name');
//    }
//}]);

//angular.module('app').factory('Greeting',['AppResource',function(AppResource){
//    return AppResource('greeting');
//}]);

//angular.module('app').factory('Greeting',function(){
//    return {
//        get:function(){
//            return {hello:'Hello my friendo'}
//        }
//    }
//});
angular.module('app').factory('AppRsrc',['$resource',function($resource){
    return function(resources){
        var resourcesStr=resources.join('/');
        var appRsrc=$resource('../../server/api.php/'+resourcesStr);

        return appRsrc;
    }
}]);
angular.module('app').factory('UserRsrc',['AppRsrc',function(AppRsrc){
    var userRsrc=AppRsrc(['users']);

    //Extending instance methods
    userRsrc.prototype.$bugs=function(){
        //TODO:INVESTIGATE THIS...., EASY STUFF DUDE...NOW 'IM TIRED...
        var _userRsrc=AppRsrc(['users/'+this.id,'bugs',':id'],
            {
                id:'id'
            }

        );
        var insts= _userRsrc.query(function(){
            console.log('insts:'+JSON.stringify(insts));

        });
        return insts;
    }

    return userRsrc;
}]);

angular.module('app').factory('Bug',['AppRsrc',function(AppRsrc){
    var bugRsrc=AppRsrc(['bug']);
    return bugRsrc;
}]);

angular.module('app').controller('AppCtrl',['$scope','UserRsrc',function($scope,UserRsrc){
    $scope.users=UserRsrc.query();
    $scope.showUserBugs=function(user){
        alert('gonna get bugs');
        user.bugs=user.$bugs();

    }
}]);
