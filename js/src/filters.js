var filters=angular.module("filters",["services"]);
filters.filter("formatDate",["CFunctions", function(CFunctions){
    return function(date){
        return CFunctions.formatDate("y-m-d",date);
    }
}]);