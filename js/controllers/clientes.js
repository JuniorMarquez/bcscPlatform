'use strict';


app.controller('IndexController', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig,dato,datosSolicitud) {
$scope.date = moment();
}]);
app.controller('clientesCtrl', ['$scope', '$http', '$filter', '$modal', 'MyService', 'filterFilter', 'datepickerConfig',function($scope, $http, $filter,$modal, MyService,filterFilter, datepickerConfig) {
   

    $scope.today = function() {
      $scope.fechaInicio = new Date();
    };
    // $scope.today();

    $scope.clear = function () {
      $scope.fechaFin = null;
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };
     $scope.open2 = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened2 = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd/MM/yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = 'MM/dd/yyyy';
    $scope.tbOptions = {
    filterText: ''};
    $scope.filter = '';
      $scope.tbOptions = {
      bDestroy: true,
      pageLength: 5,
      data: []                                              
    };
    
    $scope.filter = '';
      $scope.tbOptions2 = {
      bDestroy: true,
      pageLength: 5,
      data: []
                                                     
    };

 $scope.vigilante=MyService.data.contador;
 $scope.vigilante=$scope.vigilante+1;
 MyService.data.contador=$scope.vigilante;
    $scope.getClientes = function () {
      $scope.clientes=null;
      $http.get('http://192.168.1.100:1337/cliente/').then(function (resp) {
        $scope.clientes = resp.data.results;
        var bandera="";
        var bandera2="";
        $scope.clientes2=[];
        var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy');
        var conversations = $scope.clientes;
        var start_date =  Date.parse(firstDay);
        var end_date = Date.parse(lastDay);
        end_date=end_date+86400000;
        if ($scope.clientes && $scope.clientes.length > 0){
          for (var i=0;i < $scope.clientes.length;i++){
            var conversationDate1 =  $scope.clientes[i].createdAt;
            var conversationDate=Date.parse(conversationDate1);
            if (conversationDate >= start_date && conversationDate <= end_date && $scope.clientes[i].status=="activo"){
         
              result.push($scope.clientes[i]);
            
            }
            $scope.clientes2=result;
          }
        }
        var identif=0;
        for (var i  = 0; i<$scope.clientes2.length;i++){
          bandera = $scope.clientes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.clientes2[i].createdAtFormateada=bandera2;
          identif=$scope.clientes2[i].id;  
  $scope.clientes2[i].accion="<button onclick=\"angular.element(this).scope().openAprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        
  $scope.clientes2[i].accion2="<button onclick=\"angular.element(this).scope().openNegar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Negar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        


        }
        $scope.clientes2=$scope.clientes2.reverse();
        $scope.tbOptions.data = $scope.clientes2;
        $scope.tbOptions.aoColumns=[
          { mData: 'nombreRazon' }  ,
          { mData: 'numeroIdentificacionFiscal' }  ,
          { mData: 'nombresC'},
          { mData: 'apellidosC' },
          { mData: 'accion' },
          { mData: 'accion2' }   
          ];
      });
    };

    $scope.getClientes();

    
    $scope.getClientes2 = function () {
    $("#dataTable").dataTable().fnDestroy();
    $scope.clientesSegundo=null;
    $http.get('http://192.168.1.100:1337/cliente/').then(function (resp) {
      $scope.clientesSegundo = resp.data.results;  
      var bandera="";
      var bandera2="";
      var result2 = [];
      var conversations2 = $scope.clientesSegundo;
      var date = new Date();
        var mes = date.getMonth();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var result = [];
        $scope.fechaInicio=$filter('date')(new Date(firstDay),'dd/MM/yyyy');
        $scope.fechaFin=$filter('date')(new Date(lastDay),'dd/MM/yyyy'); 
        var conversations = $scope.clientes;
        var start_date2 =  Date.parse(firstDay);
        var end_date2 = Date.parse(lastDay); 
      end_date2=end_date2+86400000;
      if ($scope.clientesSegundo && $scope.clientesSegundo.length > 0){
        var conversationDate =0;
        for (var i=0;i < $scope.clientesSegundo.length;i++){
          conversationDate=Date.parse($scope.clientesSegundo[i].createdAt);
          if (conversationDate >= start_date2 && conversationDate <= end_date2 && $scope.clientesSegundo[i].status == "activo"){
           
              result2.push($scope.clientesSegundo[i]);
          }
          $scope.clientes2=result2;   
        }
      }

        var identif=0;
        for (var i  = 0; i<$scope.clientes2.length;i++){
          bandera = $scope.clientes2[i].createdAt;
          bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
          $scope.clientes2[i].createdAtFormateada=bandera2;
          identif=$scope.clientes2[i].id;  
          $scope.clientes2[i].accion="<button onclick=\"angular.element(this).scope().openAprobacion('" +identif +"')\"  class=\"btn btn-success btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Aprobar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";
       $scope.clientes2[i].accion2="<button onclick=\"angular.element(this).scope().openNegar('" +identif +"')\"  class=\"btn btn-danger btn-xs\" ui-toggle-class=\"show inline\" target=\"#spin\"> <span class=\"text\">Negar</span>  <span class=\"text-active\">Cargando...</span></button> <i class=\"fa fa-spin fa-spinner hide\" id=\"spin\"></i>";                        

        }
        $scope.clientes2=$scope.clientes2.reverse();
        $scope.tbOptions.data = $scope.clientes2;
        $scope.tbOptions.aaData = result2;
    }); 

  };
  if ($scope.vigilante>1){
  $scope.getClientes2();
 }
}]);
