var models=angular.module("models",["ngResource","services"]);
models.factory("CourseDesign",["$rootScope","$resource","Config",
    function($rootScope,$resource,Config){
        return $resource(Config.ajaxUrls.baseUrl+Config.ajaxUrls.getAllCourseDesign,{},{
                query:{method:"get",params:{limit:Config.perLoadCount.list,offset:0,choice:0}},
                getNewest:{method:"get",url:Config.ajaxUrls.baseUrl+Config.ajaxUrls.getAllCourseDesign,
                    params:{limit:5,offset:0,choice:1}},
                get:{method:"get",url:Config.ajaxUrls.baseUrl+Config.ajaxUrls.getCourseDesignDetail,
                    params:{id:0}},
                getWorks:{method:"get",url:Config.ajaxUrls.getCourseDesignWork,
                    params:{count:Config.perLoadCount.list,last_id:0}},
                getWorkDetail:{method:"get",url:Config.ajaxUrls.getCourseDesignWorkDetail,
                    params:{id:0}}
            })
    }]);
models.factory("CourseWare",["$rootScope","$resource","Config",
    function($rootScope,$resource,Config){
        return $resource(Config.ajaxUrls.baseUrl+Config.ajaxUrls.getAllCourseWare,{},{
            query:{method:"get",params:{limit:Config.perLoadCount.list,offset:0,choice:0}},
            getNewest:{method:"get",url:Config.ajaxUrls.baseUrl+Config.ajaxUrls.getAllCourseWare,
                params:{limit:3,offset:0,choice:1}},
            get:{method:"get",url:Config.ajaxUrls.baseUrl+Config.ajaxUrls.getCourseWareDetail,
                params:{id:0}}
        })
    }]);
models.factory("CourseVideo",["$rootScope","$resource","Config",
    function($rootScope,$resource,Config){
        return $resource(Config.ajaxUrls.baseUrl+Config.ajaxUrls.getAllCourseVideo,{},{
            query:{method:"get",params:{limit:Config.perLoadCount.list,offset:0,choice:0}},
            getNewest:{method:"get",url:Config.ajaxUrls.baseUrl+Config.ajaxUrls.getAllCourseVideo,
                params:{limit:3,offset:0,choice:1}},
            get:{method:"get",url:Config.ajaxUrls.baseUrl+Config.ajaxUrls.getCourseVideoDetail,
                params:{id:0}}
        })
    }]);
models.factory("Search",["$rootScope","$resource","Config",
    function($rootScope,$resource,Config){
        return $resource(Config.ajaxUrls.baseUrl+Config.ajaxUrls.search,{},{
            query:{method:"get",params:{limit:Config.perLoadCount.list,offset:0,searchKey:""}}
        })
    }]);