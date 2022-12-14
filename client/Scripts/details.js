//301254146 301188372 details.js
//this javascript will open the update page depending on the database ids



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
// Automatically save survey definition on changing. Hide "Save" button
creator.isAutoSave = true;
// Show state button here
creator.showState = true;


var objectId = document.getElementById("id").value;

// Setting this callback will make visible the "Save" button
creator.saveSurveyFunc = function (saveNo, callback) {
  // save the survey JSON
  console.log(creator.text);
  // You can store in your database JSON as text: creator.text  or as JSON: creator.JSON
  window.localStorage.setItem(objectId, creator.text);
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
          
        }
      ]
    }
  ]
};
creator.text = window.localStorage.getItem(objectId) || JSON.stringify(defaultJSON);

// If you get JSON from your database then you can use creator.JSON property
// creator.JSON = yourJSON;
