
YUI.add('ysf-leaguecontests',function(Y){Y.namespace('Fantasy');Y.Fantasy.LeagueContests={init:function(){var dfLeagueContest=Y.one('.ysf-df-weekly-challenge'),dfPlaySelector='.ysf-df-play-daily';if(dfLeagueContest){var matchupSection=dfLeagueContest.ancestor('.matchups-body'),delegateSection=matchupSection||dfLeagueContest,dfAttrs=dfLeagueContest.getData(),lt=dfAttrs.lt,rapidParams={cat:lt,itc:1};delegateSection.delegate('click',function(e){e.preventDefault();var form=Y.one(e.target.getData('form-selector'));if(form){var bucketId=e.target.getData('contest-bucket');if(bucketId){rapidParams.aid=bucketId;}
var slk=e.target.get('textContent');Y.Fantasy.rapid.beaconClick('recur_contest',slk,'1',rapidParams,'recur_contest_join');form.submit();}},'.ysf-df-weekly-challenge-submit');delegateSection.delegate('click',function(e){e.preventDefault();var slk=e.target.get('textContent');Y.Fantasy.rapid.beaconClick('recur_contest',slk,'1',rapidParams,'recur_contest_play');window.location=e.target.get('href');},dfPlaySelector);var spaceid=dfAttrs.spaceid,pd=dfAttrs.pd,lid=dfAttrs.lid,tid=dfAttrs.tid,rapidPageParams={spaceid:spaceid,mrkt:'US',lang:'en-US',pd:pd,paid:lid,site:'fullfantasy',test_id:tid};Y.Fantasy.rapid.beaconPageview(rapidPageParams);}}};},'',{'requires':['node']});