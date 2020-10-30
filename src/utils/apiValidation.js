const OpenApiValidator = require('express-openapi-validator');
const commons = require('@schul-cloud/commons');

const { Configuration } = commons;

const ignorePathsList = [
	/(.*\/accountModel($|\/$))/,
	/|(.*\/accountModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/accounts($|\/$))/,
	/|(.*\/accounts\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/accounts\/api($|\/$))/,
	/|(.*\/accounts\/confirm($|\/$))/,
	/|(.*\/accounts\/jwtTimer($|\/$))/,
	/|(.*\/accounts\/supportJWT($|\/$))/,
	/|(.*\/activationModel($|\/$))/,
	/|(.*\/activationModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/activation($|\/$))/,
	/|(.*\/activation\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/activation\/eMailAddress($|\/$))/,
	/|(.*\/activation\/eMailAddress\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/activation\/api($|\/$))/,
	/|(.*\/alert($|\/$))/,
	/|(.*\/alert\/api($|\/$))/,
	/|(.*\/analytics($|\/$))/,
	/|(.*\/analytics\/api($|\/$))/,
	/|(.*\/authentication($|\/$))/,
	/|(.*\/authentication\/api($|\/$))/,
	/|(.*\/base64Files($|\/$))/,
	/|(.*\/base64Files\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/base64Files\/api($|\/$))/,
	/|(.*\/calendar($|\/$))/,
	/|(.*\/calendar\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/calendar\/api($|\/$))/,
	/|(.*\/consents($|\/$))/,
	/|(.*\/consents\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/consents\/api($|\/$))/,
	/|(.*\/consents\/[0-9a-f]{24}\/check($|\/$))/,
	/|(.*\/consentVersionsModel($|\/$))/,
	/|(.*\/consentVersionsModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/consentVersions($|\/$))/,
	/|(.*\/consentVersions\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/content\/resources($|\/$))/,
	/|(.*\/content\/resources\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/content\/search($|\/$))/,
	/|(.*\/content\/redirect\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/materials($|\/$))/,
	/|(.*\/materials\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/content\/api($|\/$))/,
	/|(.*\/datasources($|\/$))/,
	/|(.*\/datasources\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/datasources\/api($|\/$))/,
	/|(.*\/datasourceRuns($|\/$))/,
	/|(.*\/datasourceRuns\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/edu-sharing($|\/$))/,
	/|(.*\/edu-sharing\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/edu-sharing\/api($|\/$))/,
	/|(.*\/etherpad\/pads($|\/$))/,
	/|(.*\/etherpad\/sessions($|\/$))/,
	/|(.*\/etherpad\/groups($|\/$))/,
	/|(.*\/etherpad\/authors($|\/$))/,
	/|(.*\/etherpad\/api($|\/$))/,
	/|(.*\/federalStates($|\/$))/,
	/|(.*\/federalStates\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/federalStates\/api($|\/$))/,
	/|(.*\/fileStorage\/api($|\/$))/,
	/|(.*\/files($|\/$))/,
	/|(.*\/files\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/fileStorage\/directories($|\/$))/,
	/|(.*\/fileStorage\/directories\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/fileStorage\/directories\/rename($|\/$))/,
	/|(.*\/fileStorage\/rename($|\/$))/,
	/|(.*\/fileStorage\/signedUrl($|\/$))/,
	/|(.*\/fileStorage\/signedUrl\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/fileStorage\/bucket($|\/$))/,
	/|(.*\/fileStorage\/total($|\/$))/,
	/|(.*\/fileStorage\/copy($|\/$))/,
	/|(.*\/fileStorage\/permission($|\/$))/,
	/|(.*\/fileStorage\/permission\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/fileStorage\/files\/new($|\/$))/,
	/|(.*\/fileStorage\/.*($|\/$))/, // for security check (final path read from globals)
	/|(.*\/fileStorage\/thumbnail($|\/$))/,
	/|(.*\/fileStorage\/thumbnail\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/help\/documents($|\/$))/,
	/|(.*\/help\/api($|\/$))/,
	/|(.*\/fileStorage($|\/$))/,
	/|(.*\/fileStorage\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/helpdesk($|\/$))/,
	/|(.*\/helpdesk\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/helpdesk\/api($|\/$))/,
	/|(.*\/mails($|\/$))/,
	/|(.*\/hash($|\/$))/,
	/|(.*\/homework\/copy($|\/$))/,
	/|(.*\/homework\/copy\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/homework\/api($|\/$))/,
	/|(.*\/homework($|\/$))/,
	/|(.*\/homework\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/submissions($|\/$))/,
	/|(.*\/submissions\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/ldap($|\/$))/,
	/|(.*\/ldap\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/ldap\/api($|\/$))/,
	/|(.*\/lessons($|\/$))/,
	/|(.*\/lessons\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/lessons\/[0-9a-f]{24}\/files($|\/$))/,
	/|(.*\/lessons\/copy($|\/$))/,
	/|(.*\/lessons\/[0-9a-f]{24}\/material($|\/$))/,
	/|(.*\/lessons\/contents\/\w*($|\/$))/,
	/|(.*\/lessons\/api($|\/$))/,
	/|(.*\/link($|\/$))/,
	/|(.*\/link\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/registrationlink($|\/$))/,
	/|(.*\/expertinvitelink($|\/$))/,
	/|(.*\/link\/api($|\/$))/,
	/|(.*\/ltiTools($|\/$))/,
	/|(.*\/ltiTools\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/ltiTools\/api($|\/$))/,
	/|(.*\/tools\/[0-9a-f]{24}\/link($|\/$))/,
	/|(.*\/tools\/sign\/lti11($|\/$))/,
	/|(.*\/tools\/sign\/lti13($|\/$))/,
	/|(.*\/tools\/sign\/lti13($|\/$))/,
	/|(.*\/me\/api($|\/$))/,
	/|(.*\/schools\/[0-9a-f]{24}\/messengerSync($|\/$))/,
	/|(.*\/news($|\/$))/,
	/|(.*\/news\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/news\/api($|\/$))/,
	/|(.*\/newsModel($|\/$))/,
	/|(.*\/newsModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/nexboard\/projects($|\/$))/,
	/|(.*\/nexboard\/projects\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/nexboard\/boards($|\/$))/,
	/|(.*\/nexboard\/boards\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/nexboard\/api($|\/$))/,
	/|(.*\/notification\/messages($|\/$))/,
	/|(.*\/notification\/messages\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/notification\/devices($|\/$))/,
	/|(.*\/notification\/devices\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/notification\/callback($|\/$))/,
	/|(.*\/notification($|\/$))/,
	/|(.*\/notification\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/notification\/api($|\/$))/,
	/|(.*\/oauth2\/baseUrl($|\/$))/,
	/|(.*\/oauth2\/clients($|\/$))/,
	/|(.*\/oauth2\/clients\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/oauth2\/loginRequest\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/oauth2\/consentRequest\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/oauth2\/introspect($|\/$))/,
	/|(.*\/oauth2\/auth\/sessions\/consent\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/oauth2\/api($|\/$))/,
	/|(.*\/passwordRecovery($|\/$))/,
	/|(.*\/passwordRecovery\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/passwordRecovery\/reset($|\/$))/,
	/|(.*\/passwordRecovery\/api($|\/$))/,
	/|(.*\/pseudonym($|\/$))/,
	/|(.*\/pseudonym\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/pseudonym\/api($|\/$))/,
	/|(.*\/releases\/fetch($|\/$))/,
	/|(.*\/releases($|\/$))/,
	/|(.*\/releases\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/releases\/api($|\/$))/,
	/|(.*\/resolve\/scopes\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/resolve\/users\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/resolve\/api($|\/$))/,
	/|(.*\/rocketChat\/channel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/rocketChat\/user($|\/$))/,
	/|(.*\/rocketChat\/user\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/rocketChat\/login\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/rocketChat\/logout\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/rocketChat\/api($|\/$))/,
	/|(.*\/roles($|\/$))/,
	/|(.*\/roles\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/roles\/user\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/permissions\/user\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/roles\/\w*\/permissions($|\/$))/,
	/|(.*\/roles\/api($|\/$))/,
	/|(.*\/roster($|\/$))/,
	/|(.*\/roster\/users\/[0-9a-f]{24}\/metadata($|\/$))/,
	/|(.*\/roster\/users\/[0-9a-f]{24}\/groups($|\/$))/,
	/|(.*\/roster\/groups\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/roster\/api($|\/$))/,
	/|(.*\/schools($|\/$))/,
	/|(.*\/schools\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/schools\/api($|\/$))/,
	/|(.*\/schools\/[0-9a-f]{24}\/maintenance($|\/$))/,
	/|(.*\/schoolGroup($|\/$))/,
	/|(.*\/schoolGroup\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/years($|\/$))/,
	/|(.*\/years\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/gradeLevels($|\/$))/,
	/|(.*\/gradeLevels\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/school\/teacher\/studentvisibility($|\/$))/,
	/|(.*\/school\/teacher\/studentvisibility\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/serviceTemplate\/modelService($|\/$))/,
	/|(.*\/statistics($|\/$))/,
	/|(.*\/statistics\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/statistics\/api($|\/$))/,
	/|(.*\/statisticmails($|\/$))/,
	/|(.*\/storageProvider($|\/$))/,
	/|(.*\/storageProvider\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/storageProvider\/api($|\/$))/,
	/|(.*\/sync($|\/$))/,
	/|(.*\/sync\/api($|\/$))/,
	/|(.*\/systems($|\/$))/,
	/|(.*\/systems\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/systems\/api($|\/$))/,
	/|(.*\/teams($|\/$))/,
	/|(.*\/teams\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/teams\/extern\/get($|\/$))/,
	/|(.*\/teams\/extern\/add\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/teams\/extern\/accept\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/teams\/extern\/remove\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/teams\/api($|\/$))/,
	/|(.*\/teams\/manage\/admin($|\/$))/,
	/|(.*\/teams\/manage\/admin\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/teams\/[0-9a-f]{24}\/userPermissions($|\/$))/,
	/|(.*\/teams\/[0-9a-f]{24}\/userPermissions\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/users\/[0-9a-f]{24}\/teams($|\/$))/,
	/|(.*\/usersModel($|\/$))/,
	/|(.*\/usersModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/users($|\/$))/,
	/|(.*\/users\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/users\/linkImport\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/publicTeachers($|\/$))/,
	/|(.*\/publicTeachers\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/registrationPinsModel($|\/$))/,
	/|(.*\/registrationPinsModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/registrationPins($|\/$))/,
	/|(.*\/registrationPins\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/registration($|\/$))/,
	/|(.*\/registration\/consent\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/forcePasswordChange($|\/$))/,
	/|(.*\/firstLogin($|\/$))/,
	/|(.*\/users\/mail\/registrationLink($|\/$))/,
	/|(.*\/users\/qrRegistrationLink($|\/$))/,
	/|(.*\/users\/[0-9a-f]{24}\/skipregistration($|\/$))/,
	/|(.*\/users\/skipregistration($|\/$))/,
	/|(.*\/registrationSchool\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/users\/api($|\/$))/,
	/|(.*\/courses\/api($|\/$))/,
	/|(.*\/courseModel($|\/$))/,
	/|(.*\/courseModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/courses($|\/$))/,
	/|(.*\/courses\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/courseGroupModel($|\/$))/,
	/|(.*\/courseGroupModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/courseGroups($|\/$))/,
	/|(.*\/courseGroups\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/classModel($|\/$))/,
	/|(.*\/classModel\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/classes($|\/$))/,
	/|(.*\/classes\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/grades($|\/$))/,
	/|(.*\/grades\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/classes\/successor($|\/$))/,
	/|(.*\/classes\/successor\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/courses\/[0-9a-f]{24}\/members($|\/$))/,
	/|(.*\/courses\/[0-9a-f]{24}\/userPermissions($|\/$))/,
	/|(.*\/courses\/[0-9a-f]{24}\/userPermissions\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/users\/[0-9a-f]{24}\/courses($|\/$))/,
	/|(.*\/courses\/copy($|\/$))/,
	/|(.*\/courses\/share($|\/$))/,
	/|(.*\/courses\/share\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/videoconference($|\/$))/,
	/|(.*\/videoconference\/\w*\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/videoconference\/api($|\/$))/,
	/|(.*\/webuntisMetadata($|\/$))/,
	/|(.*\/webuntisMetadata\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/webuntisMetadata\/api($|\/$))/,
	/|(.*\/wopi\/files\/[0-9a-f]{24}\/contents($|\/$))/,
	/|(.*\/wopi\/files\/[0-9a-f]{24}($|\/$))/,
	/|(.*\/wopi\/api($|\/$))/,
	/|(.*\/legacy\/v1\/\/api($|\/$))/,
];

const ignorePaths = new RegExp(ignorePathsList.map((r) => r.source).join(''));

if (Configuration.has('API_VALIDATION_WHITELIST_EXTENSION')) {
	ignorePathsList.push(new RegExp(`|(${Configuration.get('API_VALIDATION_WHITELIST_EXTENSION')})`));
}

const registerApiValidation = async (app, apiSpec) => {
	if (Configuration.get('FEATURE_API_VALIDATION_ENABLED')) {
		const validateResponses = Configuration.get('FEATURE_API_RESPONSE_VALIDATION_ENABLED');
		app.use(
			OpenApiValidator.middleware({
				apiSpec,
				ignorePaths,
				validateRequests: true,
				validateResponses,
			})
		);
	}
};

module.exports = { registerApiValidation };
