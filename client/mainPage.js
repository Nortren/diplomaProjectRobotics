document.addEventListener('DOMContentLoaded', function() {
   var roboticData = document.getElementsByClassName('roboticData');
   roboticData[0].onclick = function() {
      var testdata = document.createElement('div');
      testdata.classList.add('testdata');
      testdata.innerHTML = 'testdata';


      this.appendChild(testdata);
   };


   var sensorsList = document.getElementsByClassName('sensorsList');
   sensorsList[0].onclick = function() {
      var testElement = document.createElement('div');
      testElement.classList.add('testElement');
      testElement.innerHTML = 'testElement';


      this.appendChild(testElement);
   };
});
