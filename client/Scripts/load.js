const options = {
    showLogicTab: true
  };
  var creator = new SurveyCreator.SurveyCreator(options);
  ReactDOM.render (<React.StrictMode>
    <SurveyCreator.SurveyCreatorComponent creator={creator}/>
  </React.StrictMode>, document.getElementById("creatorElement"));

  //change "SaveLoadSurveyCreatorExample" to object id
  creator.text = window.localStorage.getItem("SaveLoadSurveyCreatorExample") || JSON.stringify(defaultJSON);