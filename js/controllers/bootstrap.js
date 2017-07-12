'use strict';

  app.controller('AccordionDemoCtrl', ['$scope', function($scope) {
    $scope.oneAtATime = true;
    $scope.clientes=[];
    $scope.groups = [
      {
        title: 'Accordion group header - #1',
        content: 'Dynamic group body - #1'
      },
      {
        title: 'Accordion group header - #2',
        content: 'Dynamic group body - #2'
      }
    ];

    $scope.items = ['item 1', 'Item 2', 'Item 3'];
    $scope.addItem = function() {
      var newItemNo = $scope.items.length + 1;
      $scope.items.push("<button tooltip=\"Ver detalles\" tooltip-placement=\"bottom\" onclick=\"angular.element(this).scope().openDetalles('')\"  class=\"btn btn-info btn-xs\" > <i class=\"fa fa-eye text\"></i></button>  <button onclick=\"angular.element(this).scope().openConfirmEliminar('')\"  class=\"btn btn-danger btn-xs\" tooltip=\"Eliminar\" tooltip-placement=\"left\"> <i class=\"fa fa-trash-o text\"></i></button>" + newItemNo);
    };

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  }])
  ; 
  app.controller('AlertDemoCtrl', ['$scope', function($scope) {
    $scope.alerts = [
      { type: 'success', msg: 'Well done! You successfully read this important alert message.' },
      { type: 'info', msg: 'Heads up! This alert needs your attention, but it is not super important.' },
      { type: 'warning', msg: 'Warning! Best check yo self, you are not looking too good...' }
    ];

    $scope.addAlert = function() {
      $scope.alerts.push({type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.'});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  }])
  ; 
  app.controller('ButtonsDemoCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;

    $scope.radioModel = 'Middle';

    $scope.checkModel = {
      left: false,
      middle: true,
      right: false
    };
  }])
  ; 
  app.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 7000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      slides.push({
        image: 'img/c' + slides.length + '.jpg'

      });
    };
    for (var i=0; i<4; i++) {
      $scope.addSlide();
    }
  }])
  ; 
  app.controller('DropdownDemoCtrl', ['$scope', function($scope) {
    $scope.items = [
      'The first choice!',
      'And another choice for you.',
      'but wait! A third!'
    ];

    $scope.status = {
      isopen: false
    };

    $scope.toggled = function(open) {
      //console.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope.status.isopen = !$scope.status.isopen;
    };
  }])
  ;

  app.controller('ModalInstanceCtrl', ['$scope', '$http', '$modalInstance', 'items', 'MyService', '$filter','$modal','dato','datosCuenta','toaster', '$state',function($scope, $http, $modalInstance, items, MyService,$filter,$modal,dato,datosCuenta,toaster,$state) {
    var dato="";
    var datosCuenta="";
    $scope.item={};
    $scope.filter={};
    $scope.filter = '';
    $scope.filter = '';
      $scope.tbOptions3 = {
      bDestroy: true,
      pageLength: 5,
      data: []                                              
    };
    

$http.get('http://192.168.1.100:1337/especialidad/').then(function (resp2) {
    var bandera="";
    var bandera2="";
    $scope.categorias = resp2.data.results;
    for (var i  = 0; i<$scope.categorias.length;i++){
        bandera = $scope.categorias[i].createdAt;
        bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        $scope.categorias[i].createdAtFormateada=bandera2;
            }
    $scope.categorias=$scope.categorias.reverse();
   
});

$http.get('http://192.168.1.100:1337/especialidad/').then(function (resp2) {
    var bandera="";
    var bandera2="";
    $scope.especialidades = resp2.data.results;
    for (var i  = 0; i<$scope.especialidades.length;i++){
        bandera = $scope.especialidades[i].createdAt;
        bandera2=$filter('date')(new Date(bandera),'dd/MM/yyyy');
        $scope.especialidades[i].createdAtFormateada=bandera2;
            }
    $scope.especialidades=$scope.especialidades.reverse();
   
});

    

$scope.borrarEspecialidad=function(item){
   var idEspecialidad=item.id;
      $http.delete('http://192.168.1.100:1337/especialidad/'+idEspecialidad , item)
      $modalInstance.dismiss('cancel');
};

 $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    }; 

    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [250, 500, 1000],
        pageSize: 250,
        currentPage: 1
    }; 

    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function () {
           var data ;
          $http.get('http://192.168.1.100:1337/cliente/').then(function (resp2) {
            $scope.clientes = resp2.data.results;
          });
          data = $scope.clientes;
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function (newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function (newVal, oldVal) {
        if (newVal !== oldVal) {
          $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
 
    $scope.gridOptions = {
        data: 'myData',
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
  


    $scope.mensajeBorrado="Al borrar este articulo, se perderá de manera definitiva toda la información referente al mismo, está seguro de querer borrarlo?";
    $scope.mensajeBorradoConsultor="Al borrar este consultor, se perderá de manera definitiva toda la información referente al mismo, está seguro de querer borrarlo?";


    $scope.okNuevoCliente = function (item) {
      item.status="pendiente";
      $http.post('http://192.168.1.100:1337/cliente/' ,item); 
      $modalInstance.close();

    };
    $scope.okNuevaSolicitud = function (item) {
      item.estado="Pendiente";
      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://192.168.1.100:1337/solicitud/' ,item);  
      $modalInstance.close();
      $state.go('app.dashboard-v1');

    };

    $scope.okEspecialidad = function (item) {
      item.idUsuario=MyService.data.idUsuario;
      $http.post('http://192.168.1.100:1337/especialidad/' ,item);       
      $modalInstance.close();
    };
  
   $scope.okMensaje = function (item) {
        item.idSolicitud=MyService.data.idSolicitud;
        item.autor="cliente";
        item.idUsuario=MyService.data.idUsuario;
        $http.post('http://192.168.1.100:1337/mensaje/' ,item);       
        $modalInstance.close();
    };

      $scope.toaster = {
        type8: 'info',
        text8: 'Cliente borrado con exito',
        title8: 'Información',
      };
      $scope.pop8 = function(){
    toaster.pop($scope.toaster.type8, $scope.toaster.title8, $scope.toaster.text8);
  };
    $scope.okBorrarCliente = function (item) { 
      $http.delete('http://192.168.1.100:1337/cliente/'+MyService.data.idenCliDel)
      $scope.pop8();
      $modalInstance.close();
      $state.go('app.clientes');

    };
    $scope.okConfirm = function (item) { 
      var idArticulo=MyService.data.identificador;
      $http.delete('http://192.168.1.100:1337/articulo/'+idArticulo , item)
      $scope.items = null;
      $scope.item = null;
      $scope.articulos = null;  
      $modalInstance.close();
    };

    $scope.okConfirmConsultor = function (item) { 
      var idConsultor=MyService.data.identificador;
      $http.delete('http://192.168.1.100:1337/consultor/'+idConsultor , item)
      $scope.items = null;
      $scope.item = null;
      $scope.ingredientes = null;  
      $modalInstance.close();
    };

    $scope.okConfirm2 = function (item) { 
      var idEspecialidad=MyService.data.identificador;
      $http.delete('http://192.168.1.100:1337/especialidad/'+idEspecialidad, item)
        $scope.item = null;
        $scope.items = null;
        $modalInstance.close();
    };

    $scope.ok = function (item) {
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }])
  ; 
  app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (item) {
      var identificador =item.id;
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        // $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  ; 
  app.controller('PaginationDemoCtrl', ['$scope', '$log', function($scope, $log) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      // $log.info('Page changed to: ' + $scope.currentPage);
    };

    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
  }])
  ; 
  app.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title';
  }])
  ; 
  app.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;

    $scope.random = function() {
      var value = Math.floor((Math.random() * 100) + 1);
      var type;

      if (value < 25) {
        type = 'success';
      } else if (value < 50) {
        type = 'info';
      } else if (value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      $scope.showWarning = (type === 'danger' || type === 'warning');

      $scope.dynamic = value;
      $scope.type = type;
    };
    $scope.random();

    $scope.randomStacked = function() {
      $scope.stacked = [];
      var types = ['success', 'info', 'warning', 'danger'];

      for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
          var index = Math.floor((Math.random() * 4));
          $scope.stacked.push({
            value: Math.floor((Math.random() * 30) + 1),
            type: types[index]
          });
      }
    };
    $scope.randomStacked();
  }])
  ; 
  app.controller('TabsDemoCtrl', ['$scope', function($scope) {
    $scope.tabs = [
      { title:'Dynamic Title 1', content:'Dynamic content 1' },
      { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
    ];
  }])
  ; 
  app.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };
  }])
  ; 
  app.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';
  }])
  ; 
  app.controller('TypeaheadDemoCtrl', ['$scope', '$http','MyService','$state', '$filter', 'filterFilter',function($scope, $http, MyService, $state,$filter,filterFilter) {
    $scope.selected = undefined;
    $scope.items = null;
    $scope.item=null;

   $scope.getLocation = function(val) {
      return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: val,
          sensor: false
        }
      }).then(function(res){
        var addresses = [];
        angular.forEach(res.data.results, function(item){
          addresses.push(item.formatted_address);
        });
        return addresses;
      });
    };
  }])
  ; 
  app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
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

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }])
  ; 
  app.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;

    $scope.options = {
      hstep: [1, 2, 3],
      mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function() {
      $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
      var d = new Date();
      d.setHours( 14 );
      d.setMinutes( 0 );
      $scope.mytime = d;
    };

    $scope.changed = function () {
      //console.log('Time changed to: ' + $scope.mytime);
    };

    $scope.clear = function() {
      $scope.mytime = null;
    };
  }]);