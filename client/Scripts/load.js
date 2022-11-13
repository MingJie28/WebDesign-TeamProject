const survey = require("../../server/models/survey");

var options = {
  showLogicTab: true,
  haveCommercialLicense: true //Add this line
};
var creator = new survey.SurveyCreator
                  ("YourCreatorElement", options);
  ReactDOM.render (<React.StrictMode>
    <SurveyCreator.SurveyCreatorComponent creator={creator}/>
  </React.StrictMode>, document.getElementById("creatorElement"));

  //change "SaveLoadSurveyCreatorExample" to object id
  creator.text = window.localStorage.getItem("survey") || JSON.stringify(defaultJSON);