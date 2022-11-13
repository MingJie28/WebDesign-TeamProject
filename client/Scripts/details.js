const options = {
  showLogicTab: true
};
var creator = new SurveyCreator.SurveyCreator(options);
ReactDOM.render (<React.StrictMode>
  <SurveyCreator.SurveyCreatorComponent creator={creator}/>
</React.StrictMode>, document.getElementById("creatorElement"));
creator.JSON = {
  "completedHtml": "<h3>Thank you for your feedback.</h3><h5>Your thoughts and ideas will help us to create a great product!</h5>",
  "completedHtmlOnCondition": [
    {
      "expression": "{nps_score} > 8",
      "html": "<h3>Thank you for your feedback.</h3><h5>We glad that you love our product. Your ideas and suggestions will help us to make our product even better!</h5>"
    }, {
      "expression": "{nps_score} < 7",
      "html": "<h3>Thank you for your feedback.</h3><h5> We are glad that you share with us your ideas.We highly value all suggestions from our customers. We do our best to improve the product and reach your expectation.</h5><br />"
    }
  ],
  "pages": [
    {
      "name": "page1",
      "elements": [
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
  ],
  "showQuestionNumbers": "off"
};