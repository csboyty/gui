/**
 * Created with JetBrains WebStorm.
 * User: ty
 * Date: 14-7-24
 * Time: 下午3:10
 * To change this template use File | Settings | File Templates.
 */
var directives=angular.module("directives",["services","models"]);
directives.directive("windowScroll", ["$timeout","$window","Config","Storage","CourseWare","CourseVideo","CourseDesign",
    function ($timeout,$window,Config,Storage,CourseWare,CourseVideo,CourseDesign) {
        return {
            link: function(scope, element, attrs) {
                var targetEl=attrs.windowScroll?element[0].parentElement:$window,
                    allHeight=0,
                    clientHeight=0,
                    scrollTop=0;

                    angular.element(targetEl).bind("scroll",function(){

                        if(Storage.scrollTimer){
                            $timeout.cancel(Storage.scrollTimer);
                            Storage.scrollTimer=null;
                        }

                        Storage.scrollTimer=$timeout(function(){

                            scrollTop=targetEl.scrollTop||targetEl.scrollY;
                            allHeight=targetEl.scrollHeight||targetEl.outerHeight;
                            clientHeight=targetEl.clientHeight||targetEl.innerHeight;

                            if(Storage.currentScrollType&&scrollTop+clientHeight>=allHeight&&
                                Storage.lastLoadCount!=Config.hasNoMoreFlag){
                                switch(Storage.currentScrollType){
                                    case Config.scrollTypes.courseDesign:
                                        CourseDesign.query({offset:Storage.lastLoadCount},function(response){
                                            scope.designs=scope.designs.concat(response.aaData);

                                            if(response.aaData.length<Config.perLoadCount.list){
                                                Storage.lastLoadCount=Config.hasNoMoreFlag;
                                            }else{
                                                Storage.lastLoadCount+=Config.perLoadCount.list;
                                            }
                                        });
                                        break;
                                    case Config.scrollTypes.courseDesignWork:
                                        CourseDesign.getWorks({id:Storage.currentDetailId,
                                            last_id:Storage.lastLoadCount},function(response){

                                            scope.artifacts=scope.artifacts.concat(response.artifacts);

                                            if(response.artifacts.length<Config.perLoadCount.list){
                                                Storage.lastLoadCount=Config.hasNoMoreFlag;
                                            }else{
                                                Storage.lastLoadCount=response.artifacts[response.artifacts.length-1].
                                                    artifact.id;
                                            }
                                        });
                                        break;
                                    case Config.scrollTypes.courseWare:
                                        CourseWare.query({offset:Storage.lastLoadCount},function(response){
                                            scope.wares=scope.wares.concat(response.aaData);

                                            if(response.aaData.length<Config.perLoadCount.list){
                                                Storage.lastLoadCount=Config.hasNoMoreFlag;
                                            }else{
                                                Storage.lastLoadCount+=Config.perLoadCount.list;
                                            }
                                        });
                                        break;
                                    case Config.scrollTypes.courseVideo:
                                        CourseVideo.query({offset:Storage.lastLoadCount},function(response){
                                            scope.videos=scope.videos.concat(response.aaData);

                                            if(response.aaData.length<Config.perLoadCount.list){
                                                Storage.lastLoadCount=Config.hasNoMoreFlag;
                                            }else{
                                                Storage.lastLoadCount+=Config.perLoadCount.list;
                                            }
                                        });
                                        break;
                                }
                            }
                        },200);
                    });

                //释放内存
                scope.$on("$destroy",function( event ) {
                    $timeout.cancel(Storage.scrollTimer);
                    Storage.scrollTimer=null;
                    angular.element($window).unbind("scroll");
                });
            }
        }
    }]);