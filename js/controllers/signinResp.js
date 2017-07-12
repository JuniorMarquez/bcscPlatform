'use strict';

app.controller('SigninFormController', ['$scope', '$filter','$http', '$state', 'MyService','toaster', function($scope,$filter, $http, $state, MyService,toaster) {
    $scope.toaster = {
    title: 'Exito',
    type: 'success',
    text: 'Datos de cuenta actualizados con exito',
  };
  $scope.filter = '';

  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

    $scope.user = {};
    $scope.users=[];
    $scope.clientes=[];
    $scope.full=[];
    $scope.authError = null;
    $scope.item={};
    MyService.data.full=[];
    $scope.item.nombre=MyService.data.nombre;
    $scope.item.email=MyService.data.email;
    $scope.item.password=MyService.data.password;
    $scope.editItem = function(item){
      if(item){
        item.editing = true;
      }
    };

  $scope.doneEditingDatos = function(item){
    var usuarioAct = {};
    MyService.data.idenUser=item.id;
    usuarioAct.nombre=item.nombre;
    usuarioAct.email=item.email;
    usuarioAct.password=item.password;
    usuarioAct.tipoEstablecimiento=item.tipoEstablecimiento;
    $scope.app.nombre=item.nombre;
    $http.put('http://192.168.1.100:1337/userBcsc/'+MyService.data.idUsuario , usuarioAct)
    MyService.data.datos=item;
    item.editing = false;
    $scope.pop();
  };

  $scope.consultaUsers=function(){
    $http.get('http://192.168.1.100:1337/userBcsc/' ).success(function(respuesta){
    $scope.users = respuesta.results;    
    for (var i=0; i<$scope.users.length; i++) 
      {
        $scope.full.push($scope.users[i]);
      }
    });
  };
  $scope.consultaClientes=function(){
    var existente="no";
    MyService.data.existente=existente;
    $http.get('http://192.168.1.100:1337/cliente/').success(function(respuesta){
      $scope.clientes = respuesta.results; 
      for (var i=0; i<$scope.clientes.length; i++) 
        {
        $scope.full.push($scope.clientes[i]);
        } 
      for (var i=0; i<$scope.full.length; i++) 
        {
        if ($scope.full[i].email == $scope.user.email && $scope.full[i].password == $scope.user.password)         
          {
          if ($scope.full[i].nivel == 1 )
            {
            MyService.data.nombre=$scope.full[i].nombre;
            MyService.data.email=$scope.full[i].email;
            MyService.data.password=$scope.full[i].password;
            MyService.data.nivel=$scope.full[i].nivel;
            $scope.app.nombre=MyService.data.nombre;
            $scope.app.email=MyService.data.email;
            $scope.app.nivel=MyService.data.nivel;
            $scope.app.password=MyService.data.password;
            MyService.data.idUsuario=$scope.full[i].id;
            $scope.app.usuario=$scope.full[i].email;
            $state.go('app.dashboard-v1');

            } 
          if ($scope.full[i].nivel == 2 )
            {
            MyService.data.nombre=$scope.full[i].nombre;
            MyService.data.email=$scope.full[i].email;
            MyService.data.password=$scope.full[i].password;
            MyService.data.nivel=$scope.full[i].nivel;
            $scope.app.nombre=MyService.data.nombre;
            $scope.app.email=MyService.data.email;
            $scope.app.nivel=MyService.data.nivel;
            $scope.app.password=MyService.data.password;
            MyService.data.idUsuario=$scope.full[i].id;
            $scope.app.usuario=$scope.full[i].email; 
            $state.go('app.dashboard-v1a');
            } 
          if (existente=="no"){
            existente="si";
            MyService.data.existente=existente;
            }
          }
        } 
    });
  };

  $scope.login = function() {
    $scope.authError = null;  
    $scope.consultaUsers();
    $scope.consultaClientes();
    setTimeout(function() {
      if(MyService.data.existente=="no") 
        {
        $scope.authError = 'Error en los datos, por favor vuelva a intentarlo';
        }
      }, 300);
    };

  }]);