const options = {
  showLogicTab: true
};
var creator = new SurveyCreator.SurveyCreator(options);
ReactDOM.render (<React.StrictMode>
  <SurveyCreator.SurveyCreatorComponent creator={creator}/>
  
</React.StrictMode>, document.getElementById("creatorElement"));
// Automatically save survey definition on changing. Hide "Save" button
creator.isAutoSave = true;
// Show state button here
creator.showState = true;
var survey_list = "SaveLoadSurveyCreatorExample";
// Setting this callback will make visible the "Save" button
creator.saveSurveyFunc = function (saveNo, callback) {
  // save the survey JSON
  console.log(creator.text);
  // You can store in your database JSON as text: creator.text  or as JSON: creator.JSON
  window.localStorage.setItem(survey_list, creator.text);
  // We assume that we can't get error on saving data in local storage
  // Tells creator that changing (saveNo) saved successfully.
  // Creator will update the status from Saving to saved
  callback(saveNo, true);
}
var defaultJSON = {
  pages: [
    {
      name: 'page1',
      elements: [
        {
          "type": "rating",
          "name": "nps_score",
          "title": "How much do you like comp 229?",
          "isRequired": true,
          "rateMin": 0,
          "rateMax": 10,
          "minRateDescription": "(I don't)",
          "maxRateDescription": "(Love it)"
        }, {
          "type": "checkbox",
          "name": "promoter_features",
          "visible": false,
          "visibleIf": "{nps_score} >= 9",
          "title": "What do you like learning about?",
          "isRequired": true,
          "validators": [
            {
              "type": "answercount",
              "text": "Please select two features maximum.",
              "maxCount": 2
            }
          ],
          "choices": [
            "Performance", "EJS", "NodeJS", "React", "Angular"
          ],
          "showOtherItem": true,
          "otherText": "Other feature:",
          "colCount": 2
        }, {
          "type": "comment",
          "name": "passive_experience",
          "visible": false,
          "visibleIf": "{nps_score} > 6  and {nps_score} < 9",
          "title": "What would you like to learn about?"
        }, {
          "type": "comment",
          "name": "disappointed_experience",
          "visible": false,
          "visibleIf": "{nps_score} notempty",
          "title": "What do you think is missing from the course?"
        }
      ]
    }
  ]
};
creator.text = window.localStorage.getItem(survey_list) || JSON.stringify(defaultJSON);
// If you get JSON from your database then you can use creator.JSON property
// creator.JSON = yourJSON;
