const options = {
    showLogicTab: true
  };
  var creator = new SurveyCreator.SurveyCreator(options);
  ReactDOM.render (<React.StrictMode>
    <SurveyCreator.SurveyCreatorComponent creator={creator}/>
  </React.StrictMode>, document.getElementById("creatorElement"));
  creator.loadSurvey("d5220f76-4802-40cf-ad67-61d7e55608e5");