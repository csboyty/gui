/**
 * Created with JetBrains WebStorm.
 * User: ty
 * Date: 14-7-24
 * Time: 下午3:12
 * To change this template use File | Settings | File Templates.
 */
var controllers=angular.module("controllers",["services","models"]);

controllers.controller("home",['$scope',"CourseDesign","CourseWare","CourseVideo","Config",
    function($scope,CourseDesign,CourseWare,CourseVideo,Config){
        Storage.currentScrollType="";
        CourseDesign.getNewest(function(response){
            $scope.newestCourseDesigns=response.aaData.slice(0,4);
            $scope.roll.items=response.aaData.slice(0,3);
            $scope.roll.info=$scope.roll.items[0];
            if(response.aaData.length>1){
                $scope.roll.showNext=true;
            }
        });
        CourseWare.getNewest(function(response){
            $scope.newestCourseWares=response.aaData.slice(0,3);
        });
        CourseVideo.getNewest(function(response){
            $scope.newestCourseVideos=response.aaData.slice(0,3);
        });

        $scope.prev=function(){
            $scope.roll.currentNumber=$scope.roll.currentNumber-1;
            $scope.roll.rollLeft="left:"+"-"+$scope.roll.currentNumber*100+"%";
            if($scope.roll.currentNumber==0){
                $scope.roll.showPrev=false;
            }
            $scope.roll.info=$scope.roll.items[$scope.roll.currentNumber];
            $scope.roll.showNext=true;
        };
        $scope.next=function(){
            $scope.roll.currentNumber=$scope.roll.currentNumber+1;
            $scope.roll.rollLeft="left:"+"-"+$scope.roll.currentNumber*100+"%";
            if($scope.roll.currentNumber==$scope.roll.items.length-1){
                $scope.roll.showNext=false;
            }

            $scope.roll.info=$scope.roll.items[$scope.roll.currentNumber];

            $scope.roll.showPrev=true;
        };

        $scope.roll={
            currentNumber:0,
            rollLeft:"left:0",
            showNext:false,
            showPrev:false,
            items:[],
            info:{
                title:"",
                teacher:"",
                createTime:"",
                abstract_:""
            }
        };
}]);
controllers.controller("courseDesign",['$scope',"CourseDesign","Config","Storage",
    function($scope,CourseDesign,Config,Storage){
        Storage.currentScrollType=Config.scrollTypes.courseDesign;
        Storage.lastLoadCount=0;

        CourseDesign.query(function(response){
            $scope.designs=response.aaData;

            if(response.aaData.length<Config.perLoadCount.list){
                Storage.lastLoadCount=Config.hasNoMoreFlag;
            }else{
                Storage.lastLoadCount+=Config.perLoadCount.list;
            }
        });
    }]);
controllers.controller("courseDesignDetail",['$scope',"CourseDesign","Config","Storage",
    function($scope,CourseDesign,Config,Storage){
        Storage.currentScrollType=Config.scrollTypes.courseDesignWork;
        Storage.lastLoadCount=0;

        var ids=Storage.currentDetailId.split(",");
        Storage.currentDetailId=ids[1];

        $scope.info={
            title:"这里是标题",
            author:"指导老师",
            createTime:"2016-09-09",
            abstract_:"这里是描述"
        };

        CourseDesign.get({id:ids[0]},function(response){
            $scope.info=response.object;
        });
        CourseDesign.getWorks({id:Storage.currentDetailId},function(response){
            $scope.artifacts=response.artifacts;

            if(response.artifacts.length<Config.perLoadCount.list){
                Storage.lastLoadCount=Config.hasNoMoreFlag;
            }else{
                Storage.lastLoadCount=response.artifacts[response.artifacts.length-1].artifact.id;
            }
        });
    }]);
controllers.controller("workDetail",['$scope',"CourseDesign","Config","Storage",
    function($scope,CourseDesign,Config,Storage){

        CourseDesign.getWorkDetail({id:Storage.currentWorkDetailId},function(response){
            $scope.info=response;
        });
    }]);
controllers.controller("courseWare",['$scope',"CourseWare","Config","Storage",
    function($scope,CourseWare,Config,Storage){
        Storage.currentScrollType=Config.scrollTypes.courseWare;
        Storage.lastLoadCount=0;

        CourseWare.query(function(response){
            $scope.wares=response.aaData;

            if(response.aaData.length<Config.perLoadCount.list){
                Storage.lastLoadCount=Config.hasNoMoreFlag;
            }else{
                Storage.lastLoadCount+=Config.perLoadCount.list;
            }
        });
    }]);
controllers.controller("courseWareDetail",['$scope',"CourseWare","Config","Storage",
    function($scope,CourseWare,Config,Storage){
        CourseWare.get({id:Storage.currentDetailId},function(response){
            $scope.info=response.object;
        });
    }]);
controllers.controller("courseVideo",['$scope',"CourseVideo","Config","Storage",
    function($scope,CourseVideo,Config,Storage){
        Storage.currentScrollType=Config.scrollTypes.courseVideo;
        Storage.lastLoadCount=0;

        CourseVideo.query(function(response){
            $scope.videos=response.aaData;

            if(response.aaData.length<Config.perLoadCount.list){
                Storage.lastLoadCount=Config.hasNoMoreFlag;
            }else{
                Storage.lastLoadCount+=Config.perLoadCount.list;
            }
        });
    }]);
controllers.controller("courseVideoDetail",['$scope',"$sce","CourseVideo","Config","Storage",
    function($scope,$sce,CourseVideo,Config,Storage){
        CourseVideo.get({id:Storage.currentDetailId},function(response){
            $scope.info=response.object;
            $scope.info.content=$sce.trustAsResourceUrl($scope.info.content);
        });
    }]);
controllers.controller("searchResult",['$scope',"Search","Config","CFunctions",
    function($scope,Search,Config,CFunctions){
        $scope.tags=$scope.mainVars.searchTags;
        $scope.mainVars.searchTags=[];

        function search(){
            Search.query({searchKey:$scope.tags.join(",")},function(response){
                $scope.result=response.object;
                $scope.total=$scope.result.CourseDesign.length+$scope.result.Courseware.length+
                    $scope.result.VideoCourse.length;
            })
        }
        search();

        $scope.remove=function(tag){
            var index=$scope.tags.indexOf(tag);
            $scope.tags.splice(index,1);
            search();
        };

        $scope.removeAll=function(){
            $scope.tags=[];
            $scope.result={
                CourseDesign:[],
                Courseware:[],
                VideoCourse:[]
            };
            $scope.total=0;
        };



        $scope.addSearchTags=function(tag){
            if(CFunctions.trim(tag)&&$scope.tags.indexOf(tag)==-1){
                $scope.tags.push(tag);
                $scope.searchTag="";

                //重新搜索
                search();
            }

        }
    }]);





