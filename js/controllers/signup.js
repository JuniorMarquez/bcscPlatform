'use strict';

// controlador de inicio de session
app.controller('SignupFormController', ['$scope', '$filter','$http', '$state','MyService', 'toaster', function($scope, $filter,$http, $state,MyService,toaster) {
    $scope.toaster = {
    title: 'Exito!!',
    type: 'success',
    text: 'En hora buena! su solicitud de registro se ha realizado con éxito',
  };
  $scope.pop = function(){
    toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
  };

    $scope.user = {};
    $scope.datos=[];
    $scope.establecimientos={};
    $scope.createEstablecimiento = function(user){
       $http.post('http://192.168.1.100:1337/establecimiento/', {administrador: $scope.user.nombre, emailAdministrador: $scope.user.email});
    };

    $scope.entrar = function(user) {
      $http.get('http://192.168.1.100:1337/userbcsc/?email=' +$scope.user.email).success(function(respuesta){
        $scope.datos = respuesta.results[0];
        MyService.data.datos=$scope.datos;
      });
      MyService.data.idUsuario=MyService.data.datos.id;
      $scope.app.usuario=MyService.data.datos.email; 
      $scope.pop();     
      if(MyService.data.datos){
       
      }
     // 
    };

    $scope.ok = function(user) {
      $http.post('http://192.168.1.100:1337/cliente/', {
        nombresC: $scope.user.nombre, 
        apellidosC:$scope.user.apellido,
        identificacionC:$scope.user.identificacionC,
        telefonoC:$scope.user.telefonoC,
        direccionC:$scope.user.direccionC,
        email: $scope.user.email,
        password: $scope.user.password,
        nombreRazon:$scope.user.nombreRazon,
        numeroIdentificacionFiscal:$scope.user.numeroIdentificacionFiscal,
        direccion:$scope.user.direccion,
        telefono:$scope.user.telefono,
        nivel:2,
          status:"pendiente",
          });
     $state.go('access.signin');
   };

  }])
