'use strict';
exports.handler=function(event, context){
	try{
	var request=event.request;
	var session = event.session;

    if(!event.session.attributes) {
      event.session.attributes = {};
    }
	
	if(request.type==="LaunchRequest"){
		let options={};
		options.speechText="Welcome Toss the coin skill. Using our skill you can get the result of tossing a coin. you can say for example, Toss the coin";
		options.repromptText="would you like to toss the coin?"; 
		options.endSession=false;
		context.succeed(buildResponse(options));
	}
	else if(request.type==="IntentRequest"){
		let options={};
		if(request.intent.name==="HelloIntent"){
			options.speechText="Ok, tossing a coin, and it is, ";
			options.speechText +=getRandom() +". would you like to toss again?";
			options.repromptText="you can say toss again?"; 
		    options.endSession=false;
			context.succeed(buildResponse(options));
		}
		else if (request.intent.name === "TossIntent") {

        handleTossIntent(request,context,session);

      } else if (request.intent.name === "AMAZON.StopIntent" || request.intent.name === "AMAZON.CancelIntent" || request.intent.name === "TossStopIntent") {
        context.succeed(buildResponse({
          speechText: "Good bye. ",
          endSession: true
        }));

      } 
		else{
			context.succeed(buildResponse({
          speechText: "Sorry, I didn't get that. You can say for example toss the coin. ",
          endSession: false
        }));
		}
	}
	
	else if(request.type==="SessionEndedRequest"){
		throw "unknown intent type";
	}
	else{
		throw "unknown intent type";
	}
 } 
catch(e){
    context.fail("Exception: "+e);
 }
};
function getRandom() {
 
  var num= Math.floor(Math.random() * (100 - 1)) + 1;
  if(num%2===0){
	  return "tails";
  }
  else{
	  return "heads";
  }
}
function buildResponse(options){
	var response={
		version:"1.0",
		response:{
			outputSpeech:{
				type:"PlainText",
				text:options.speechText
			},
			shouldEndSession:options.endSession
		}
	};
	
	if(options.repromptText){
			response.response.reprompt={
				outputSpeech:{
					type:"PlainText",
					text:options.repromptText
				}
			};
	}
	return response;
}

function handleTossIntent(request,context,session) {
  let options = {};
  options.session = session;
      options.speechText = "It is, "+getRandom()+ ". ";
      options.speechText += " Do you want to toss again? ";
      options.repromptText = "You can say yes or toss again. ";
      options.session.attributes.tossIntent = true;
      options.endSession = false;
      context.succeed(buildResponse(options));
    
  }

function handleNextTossIntent(request,context,session) {
  let options = {};
  options.session = session;
    
	if(session.attributes.tossIntent) {

        options.speechText = "It is, "+getRandom()+ ". ";
        options.speechText += " Do you want to toss one more time? ";
        options.repromptText = "You can say yes or once more. ";
        //options.session.attributes.quoteIntent = true;
        options.endSession = false;
        context.succeed(buildResponse(options));
      }
     else {
    options.speechText = " Wrong invocation of this intent. ";
    options.endSession = true;
    context.succeed(buildResponse(options));
  }
}
