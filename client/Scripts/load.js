//301254146 301188372 load.js
//this javascript will open the read page depending on the database ids

var options = {
  showLogicTab: true,
  haveCommercialLicense: true //Add this line
};
var creator = new SurveyCreator.SurveyCreator
                  ("YourCreatorElement", options);
var creator = new SurveyCreator.SurveyCreator(options);
ReactDOM.render (<React.StrictMode>
  <SurveyCreator.SurveyCreatorComponent creator={creator}/>
</React.StrictMode>, document.getElementById("creatorElement"));

  var objectId = document.getElementById("id").value;

  //change "SaveLoadSurveyCreatorExample" to object id
  creator.text = window.localStorage.getItem(objectId) || JSON.stringify(defaultJSON);