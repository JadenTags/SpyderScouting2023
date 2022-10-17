const clientId = config["clientId"];
const clientSecret = config["clientSecret"];
const refreshToken = config["refreshToken"];
const tbaKey = config["tbaKey"];
const userDatabaseGSID = config["userDatabaseGSID"];
const passcodeGSID = config["passcodeGSID"];
const feedbackGSID = config["feedbackGSID"];
const matchGSID = config["matchGSID"];
const pitGSID = config["pitGSID"];
const preGSID = config["preGSID"];

var curOrderNum = 0;
var orderStorage = {};

//GLOBAL DATA VARIABLES
var name = "";
var closestCompText;
var closestCompData;
var matchStatus;
var globalDataStored;

//SIMULATION VARIABLES
var finishedMatches = 0; //DEFAULT = 0
var testDate = new Date("2022-03-10"); //DEFAULT = new Date();