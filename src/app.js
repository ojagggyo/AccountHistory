require("regenerator-runtime/runtime");
const dsteem = require('dsteem');
let client = new dsteem.Client('https://api.steememory.com');





function donokuraimae(date){
	date1 = new Date(date);
	date1.setHours(date1.getHours() + 9);
	var now = new Date();
	sa = now - date1;
	if(sa >= 86400000){return Math.floor(sa / 86400000)+'日前';}
	if(sa >= 3600000){return Math.floor(sa / 3600000)+'時間前';}
	if(sa >= 60000){return Math.floor(sa / 60000)+'分前';}
	if(sa >= 1000){return Math.floor(sa / 1000)+'秒前';}
	return 'たった今';
}

function vestToSteem(vest){//★

	// return  client.formatter.vestToSteem(
	// 	vest, 
	// 	globalProperties.total_vesting_shares, 
	// 	globalProperties.total_vesting_fund_steem)

console.log(total_vesting_shares);
console.log(total_vesting_fund_steem);
console.log(k);
console.log(sp);
	
	let total_vesting_shares = parseFloat(globalProperties.total_vesting_shares.replace(" VESTS", ""));
	let total_vesting_fund_steem = parseFloat(globalProperties.total_vesting_fund_steem.replace(" STEEM", ""));
	let k = total_vesting_fund_steem / total_vesting_shares;
	sp = vest * k;//保持しているSP
	return sp;
}
	
function ellipsis(s){
	return s.length > 40 ? (s).slice(0,40)+"…" : s;
}

function getUserName(){
  let hash = window.location.hash;// #username
  if (hash == null || hash.trim().length == 0){
	  return "";
  }
  hash = hash.substr(1);//#を取る
  hash = decodeURI(hash).trim();//デコード、トリム]
  return hash;
}

// ---------- emoji ----------
let emoji_index = Math.floor( Math.random() * 4 );	;
function emoji(){
emoji_index = ++emoji_index % 4;
switch(emoji_index)
{
case 0:
emoji_upvote = "👍";
emoji_downvote = "👎";
emoji_author_reward = "💰";
emoji_curation_reward = "💰";
emoji_authored = "🤙";
emoji_replied = "✋";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "💰";
break;
case 1:
emoji_upvote = "😍";
emoji_downvote = "😭";
emoji_author_reward = "😁";
emoji_curation_reward = "😁";
emoji_authored = "🙂";
emoji_replied = "😄";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "😁";
break;	
case 2:
		//🚀🛰️🛸🌌�🛰️📡🚀 🛸🪐⭐"
emoji_upvote = "🚀";
emoji_downvote = "🕳️";
emoji_author_reward = "⭐";
emoji_curation_reward = "⭐";
emoji_authored = "🛸";
emoji_replied = "🛸";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "⭐";
break;
case 3:
		//🍓🍉🍈🍇🍊🍒🍓"
emoji_upvote = "🍉";
emoji_downvote = "🍏";
emoji_author_reward = "🍊";
emoji_curation_reward = "🍊";
emoji_authored = "🍒";
emoji_replied = "🍒";
emoji_transfer = "";
emoji_delegate_vesting_shares = "";
emoji_undelegate_vesting_shares = "";
emoji_claim_reward_balance = "";
emoji_comment_benefactor_reward = "🍊";
break;
}
}

// ---------- power ---------- 
async function getEffectivePower(username){
	let globalProperties = await client.database.getDynamicGlobalProperties();//★
	console.log(globalProperties);
	let total_vesting_shares = parseFloat(globalProperties.total_vesting_shares.replace(" VESTS", ""));
	let total_vesting_fund_steem = parseFloat(globalProperties.total_vesting_fund_steem.replace(" STEEM", ""));
	let k = total_vesting_fund_steem / total_vesting_shares;
	//let accounts = await client.api.getAccounts([username]);//★
	let accounts = await client.database.getAccounts([username]);
	
	console.log(accounts);
	let vesting_shares = parseFloat(accounts[0].vesting_shares.replace(" VESTS", ""));
	let received_vesting_shares = parseFloat(accounts[0].received_vesting_shares.replace(" VESTS", ""));
	let delegated_vesting_shares = parseFloat(accounts[0].delegated_vesting_shares.replace(" VESTS", ""));
	sp = vesting_shares * k;//保持しているSP
	sp1 = received_vesting_shares * k;//委任されたSP
	sp2 = delegated_vesting_shares * k;//委任したSP
	return {sp:sp, received_sp: sp1, delegated_sp: sp2};
}

function effectivepower(username,id1, id2, id3){
	if(arguments.length == 1){
		id1 = "effectivepowervalue";
		id2 = "effectivepowerdetail";
		id3 = "effectivepower";
	}
	getEffectivePower(username).then(result => {
		document.getElementById(id1).text = 
			//client.formatter.numberWithCommas((result.sp + result.received_sp - result.delegated_sp).toFixed(0)) + " SP" ;//★
			(result.sp + result.received_sp - result.delegated_sp).toFixed(0) + " SP" ;
		document.getElementById(id2).text = 
			'('
			//+ client.formatter.numberWithCommas((result.sp).toFixed(0))
			+ (result.sp).toFixed(0)
			+ ' + '
			//+ client.formatter.numberWithCommas((result.received_sp).toFixed(0))
			+ (result.received_sp).toFixed(0)
			+ ' - ' 
			//+ client.formatter.numberWithCommas((result.delegated_sp).toFixed(0))
			+ (result.delegated_sp).toFixed(0)
			+ ')';
		if(id3){
			document.getElementById(id3).max = result.sp + result.received_sp;
			document.getElementById(id3).value = result.sp + result.received_sp - result.delegated_sp;
		}
	}).catch(err => {
		console.log(err);
	});	
}


	
async function getVotingPower(username) {
	console.log("☆☆☆ function getVotingPower ☆☆☆");
    // 
    //     steem.api.getAccounts([username], function(err, response) {//★
	// 		console.log(err);
	// 		console.log(response);
	// 		if (err) reject(err);
	// 		const voting_power  = response[0].voting_power + (10000 * ((new Date - new Date(response[0].last_vote_time + "Z")) / 1000) / 432000);
	// 		console.log(voting_power);
	// 		resolve(voting_power / 100);
    //     });          
    // });
	return new Promise((resolve, reject) => {
		client.rc.getVPMana(username).then(vPMana =>
			{
				console.log(vPMana.percentage)
				resolve(vPMana.percentage / 100) 
			}
		)		
	});
}

function votingpower(username, id1, id2){
	console.log("☆☆☆ function votingpower ☆☆☆");
	if(arguments.length == 1){
		id1 = "votingpowervalue";
		id2 = "votingpower";
	}
	getVotingPower(username).then(result => {
		document.getElementById(id1).text = result.toFixed(0) + ' %';
		if(id2){
			document.getElementById(id2).value = result;
		}
	}).catch(err => {
		console.log(err);
	});
}

	
function steemAmountFormat(steem, sbd, sp) {
	let s = "";
	let lines = [];
	if(steem > 0){ lines.push(steem.toFixed(3) + " STEEM"); }
	if(sbd > 0){ lines.push(sbd.toFixed(3) + " SBD"); }
	if(sp > 0){ lines.push(sp.toFixed(3) + " SP"); }
	switch(lines.length){
	case 1:
		s = lines[0];
		break;
	case 2:
		s = lines[0] + ' and ' + lines[1];
		break;
	case 3:
		s = lines[0] + ', ' + lines[1] + ' and ' + lines[2];
		break;
	}
	return s;
}	
	
function krwAmountFormat(steemAmount, sbdAmount, spAmount, krw_steem, krw_sbd) {
	if(krw_steem == 0) return "";
	return ' <a class=gray>(' 
		//+ client.formatter.numberWithCommas((steemAmount * krw_steem + sbdAmount * krw_sbd + spAmount * krw_steem).toFixed(0)) //★
		+ (steemAmount * krw_steem + sbdAmount * krw_sbd + spAmount * krw_steem).toFixed(0) //★
		+ ' won)</a>';
}
	
//reputation
function log10(str) {
    const leadingDigits = parseInt(str.substring(0, 4));
    const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001;
    const n = str.length - 1;
    return n + (log - parseInt(log));
}

function repLog10(str) {
    let rep = String(str);
    const neg = rep.charAt(0) === '-';
    rep = neg ? rep.substring(1) : rep;
    let out = log10(rep);
    if (isNaN(out)) out = 0;
    out = Math.max(out - 9, 0); // @ -9, $0.50 earned is approx magnitude 1
    out = (neg ? -1 : 1) * out;
    out = out * 9 + 25; // 9 points per magnitude. center at 25  
    return out;
};

async function getReputation(username){
	return new Promise((resolve, reject) => {
		//client.api.getAccounts([username], function(err, response) {//★
	    client.database.getAccounts([username], function(err, response) {
		    if (err) reject(err);
		    resolve(repLog10(response[0].reputation));
		});
	});
}

 function reputation(username, id){
	getReputation(username).then(result => {
		document.getElementById(id).text = result.toFixed(3);
	}).catch(err => {
		console.log(err);
	});	
}

// ---------- age ----------
//27.3217
async function getAge(username){
	return new Promise((resolve, reject) => {
		//client.api.getAccounts([username], function(err, response) {//★
        client.database.getAccounts([username], function(err, response) {
			
			if (err) reject(err);
			date1 = new Date(response[0].created);
			date1.setHours(date1.getHours() + 9);
			var now = new Date();
			sa = now - date1;
			
			resolve({
				moons: sa / 86400000 / 27.3217,//月の公転周期 27.3217日
				days: sa / 86400000, 
				earths: sa / 86400000 / 365.242//地球の公転周期365.242日
			});
		});
	});
}

 function age(username){
	getAge(username).then(result => {
		let index = Math.floor( Math.random() * 3);
		if(result.moons < 1 || index == 0){
			document.getElementById("age").text = result.days.toFixed(3) + ' days';
		}else if(result.earths < 1 || index == 1){
			document.getElementById("age").text = result.moons.toFixed(3) + ' moons';
		}else{
			document.getElementById("age").text = result.earths.toFixed(3) + ' earths';
		}

	}).catch(err => {
		console.log(err);
	});	
}
	
//reward
let total_count = {};
let total_sbd_payout = {};
let total_steem_payout = {};
let total_vesting_payout = {};
let total_sp_payout = {};
function getReward(record){
	const username = document.getElementById("username").value
	let sbd_payout = 0;
	let steem_payout = 0;
	let vesting_payout = 0;
	let op = record[1].op[0];
	if(op == "comment_benefactor_reward" && record[1].op[1].benefactor == username){
		sbd_payout = parseFloat(record[1].op[1].sbd_payout);
		steem_payout = parseFloat(record[1].op[1].steem_payout);
		vesting_payout = parseFloat(record[1].op[1].vesting_payout);
	}else if(op == "author_reward"){
		sbd_payout = parseFloat(record[1].op[1].sbd_payout);
		steem_payout = parseFloat(record[1].op[1].steem_payout);
		vesting_payout = parseFloat(record[1].op[1].vesting_payout);
	}else if(op == "curation_reward"){
		sbd_payout = 0;
		steem_payout = 0;
		vesting_payout = parseFloat(record[1].op[1].reward);
	}else {
		return false;
	}
	

	
	if(total_count[op] === void 0){
		total_count[op] = 1;
		total_sbd_payout[op] = sbd_payout;
		total_steem_payout[op] = steem_payout;
		total_vesting_payout[op] = vesting_payout;
		total_sp_payout[op] = vestToSteem(vesting_payout);
	}else{
		total_count[op] += 1;
		total_sbd_payout[op] += sbd_payout;
		total_steem_payout[op] += steem_payout;
		total_vesting_payout[op] += vesting_payout;
		total_sp_payout[op] += vestToSteem(vesting_payout);
	}
	return true;
}
	
//Donation
let total_donation_count = {};
let total_donation_sbd = {};
let total_donation_steem = {};
let total_donation_vesting = {};
let total_donation_sp = {};
function getReward_donation(record){
	const username = document.getElementById("username").value
	let sbd = 0;
	let steem = 0;
	let vesting = 0;
	let op = record[1].op[0];
	if(op == "comment_benefactor_reward" && record[1].op[1].benefactor != username){//Donation
		op = "donation";
		sbd = parseFloat(record[1].op[1].sbd_payout);
		steem = parseFloat(record[1].op[1].steem_payout);
		vesting = parseFloat(record[1].op[1].vesting_payout);
	}else {
		return false;
	}
	

	if(total_donation_count[op] === void 0){
		total_donation_count[op] = 1;
		total_donation_sbd[op] = sbd;
		total_donation_steem[op] = steem;
		total_donation_vesting[op] = vesting;
		total_donation_sp[op] = vestToSteem(vesting);
	}else{
		total_donation_count[op] += 1;
		total_donation_sbd[op] += sbd;
		total_donation_steem[op] += steem;
		total_donation_vesting[op] += vesting;
		total_donation_sp[op] += vestToSteem(vesting);
	}
	return true;
}

//Power up/down
let total_powerupdown_count = {};
let total_powerupdown_steem = {};
let total_powerupdown_vesting = {};
let total_powerupdown_sp = {};
function getReward_powerupdown(record){

	let steem = 0;
	let vesting = 0;
	let op = record[1].op[0];
	if(op == "transfer_to_vesting"){//Power up
		op = "power_up";
		steem = parseFloat(record[1].op[1].amount);
	}else if(op == "fill_vesting_withdraw"){//Power down
		op = "power_down";
		steem = parseFloat(record[1].op[1].deposited);
	}else {
		return false;
	}
	
	if(total_powerupdown_count[op] === void 0){
		total_powerupdown_count[op] = 1;
		total_powerupdown_steem[op] = steem;
		total_powerupdown_vesting[op] = vesting;
		total_powerupdown_sp[op] = vestToSteem(vesting);
	}else{
		total_powerupdown_count[op] += 1;
		total_powerupdown_steem[op] += steem;
		total_powerupdown_vesting[op] += vesting;
		total_powerupdown_sp[op] += vestToSteem(vesting);
	}
	return true;
}
	
	
// ---------- Price ----------
function getPrice(markets) {
	return new Promise((resolve, reject) => {
		let url = "https://api.upbit.com/v1/ticker?markets=" + markets;
		//$.getJSON(url, (data) => {
		var p = $.getJSON(url, function(data) {
			resolve(data[0].trade_price);
		})
		.done(function() { 
			console.log('getJSON request succeeded!'); 
		})
		.fail(function(jqXHR, textStatus, errorThrown) { 
			console.log('getJSON request failed! ' + textStatus);
			//reject('getJSON request failed! ' + textStatus);
			resolve(0);
		})
		.always(function() { 
			console.log('getJSON request ended!'); 
		});
		
		setTimeout(function(){ 
			p.abort(); 
		}, 5000);
			
	});
};

	
//transfer
let total_transfer_count = {};
let total_transfer_steem = {};
let total_transfer_sbd = {};
function getTransferAmount(record){
	const username = document.getElementById("username").value
	let transfer_steem = 0;
	let transfer_sbd = 0;
	let amount = record[1].op[1].amount;
	let op = record[1].op[0];
	if(op == "transfer" && record[1].op[1].from == username){
		op = op + "_out";
		if(amount.endsWith('STEEM')){
			transfer_steem = parseFloat(record[1].op[1].amount);
		}else{
			transfer_sbd = parseFloat(record[1].op[1].amount);
		}
	}else if(op == "transfer" && record[1].op[1].to == username){
		op = op + "_in";
		if(amount.endsWith('STEEM')){
			transfer_steem = parseFloat(record[1].op[1].amount);
		}else{
			transfer_sbd = parseFloat(record[1].op[1].amount);
		}
	}else {
		return false;
	}
	
	if(total_transfer_count[op] === void 0){
		total_transfer_count[op] = 1;
		total_transfer_steem[op] = transfer_steem;
		total_transfer_sbd[op] = transfer_sbd;
		
	}else{
		total_transfer_count[op] += 1;
		total_transfer_steem[op] += transfer_steem;
		total_transfer_sbd[op] += transfer_sbd;
	}
	return true;
}


//



// ---------- ----------

//function clickBtn(days){
window.clickBtn = async (days) => {
	
	let username = document.getElementById("username").value;
	window.location.hash = '#' + username;
	
	emoji();
	document.getElementById("progress").innerText = "";
	document.getElementById("author_reward").innerText = "";
	document.getElementById("curation_reward").innerText = "";
	document.getElementById("comment_benefactor_reward").innerText = "";
	document.getElementById("transfer_in").innerText = "";
	document.getElementById("transfer_out").innerText = "";
	document.getElementById("donation").innerText = "";
	document.getElementById("power_up").innerText = "";
	document.getElementById("power_down").innerText = "";
	document.getElementById("text").innerText = "";
	
	//payout
	total_count = {};
	total_sbd_payout = {};
	total_steem_payout = {};
	total_vesting_payout = {};
	total_sp_payout = {};
	
	//transfer
	total_transfer_count = {};
	total_transfer_sbd = {};
	total_transfer_steem = {};
	
	//donation
	total_donation_count = {};
	total_donation_sbd = {};
	total_donation_steem = {};
	total_donation_vesting = {};
	total_donation_sp = {};
	
	//power up/down
	total_powerupdown_count = {};
	total_powerupdown_steem = {};
	total_powerupdown_vesting = {};
	total_powerupdown_sp = {};

	aaa(days).then(result => {
		makeTable(result);
	}).catch(err => {
		document.getElementById("text").innerText = err;
		console.log(err);
		alert(err);
	});
}

function inputChange(event){
    jdenticon.update("#identicon", document.getElementById("username").value);
}

/* ---------------------------------------------------------------------- */

    window.jdenticon_config = {
        replaceMode: "observe"
    };






// ---------- userlink ----------
function setUsername(username){
    let nameList = getUsernames(); 
    let index = nameList.indexOf( username );
    if(index >= 0){
        nameList.splice(index, 1);  
    }
    nameList.push(username);
    document.cookie = "usernames=" + encodeURIComponent(nameList.join(",")) + ";max-age=86400";//60*60*24秒   
}
    
function getUsernames(){
    cookies = document.cookie;
    let lines = cookies.split(';');
    for(var line of lines){
        let elementList = line.split('=');
        let key = elementList[0];
        if( key != 'usernames'){continue;}
        let csv = decodeURIComponent(elementList[1]);        
        return csv.split(',');
    }
    return [];
}

function userlink(){
  let nameList = getUsernames();
  let s = "";
  let name = "";
  while(name = nameList.pop()){
  	s = s + "<a href=javascript:clickUserLink('" + name + "'); class=darkgray>" + name + "</a> ";
  }
  console.log(s);
  document.getElementById("userlink").innerHTML = s;
}

	
// ---------- ----------	
function getPostingJsonMetadata(username) {
    return new Promise((resolve, reject) => {
        //client.api.getAccounts([username], function(err, response) {//★
	client.database.getAccounts([username], function(err, response) {
		if (err) reject(err);
		const posting_json_metadata  = response[0].posting_json_metadata ;
		resolve(JSON.parse(posting_json_metadata));
        });          
    });
}
 function postingJsonMetadataAbout(username, id){
	getPostingJsonMetadata(username).then(result => {
		if(result.profile.about){
			document.getElementById(id).text = result.profile.about;
		}
	}).catch(err => {
		console.log(err);
	});	
}

	
	
// ---------- ----------
function makeLine(record){
	let indenticon_type = 'small';//small, large
	let body = '';
	let identicon =  '';
	let time = donokuraimae(record[1].timestamp);
	if(record[1].op[0] == 'vote'){
		const username = document.getElementById("username").value;
		const voter = record[1].op[1].voter;
		const author = record[1].op[1].author;
		const permlink = record[1].op[1].permlink;
		const weight = record[1].op[1].weight;
		identicon =  '<canvas class=small id=' + record[0] + ' width=24 height=24 data-jdenticon-value=' + voter + '></canvas>'; 
		body = (
			voter == username ? 
				voter 
				: 
				'<a href=' + window.location.pathname + '#' + voter + ' target=' + voter  
				+ ' onmouseover=showTooltip(event) onmouseout=hideTooltip(event)'
				+ ' data-username='+ voter
				+ '>' + voter +  '</a>'
			)
			+ (weight >= 0 ? ' upvote' : ' downvote')
			+ (weight >= 0 ? (voter == username ? '' : emoji_upvote) : emoji_downvote)
			+ ' <a href=https://steemit.com/'
			+ '@' + author + '/' + permlink
			+ '>'
			+ ellipsis('@' + author + '/' + permlink) 
			+ '</a>' 
			+ ' (' + weight/100 + '%)';
	}
	else if(record[1].op[0] == 'curation_reward'){
		const curator = record[1].op[1].curator;
		const comment_author = record[1].op[1].comment_author;
		const comment_permlink = record[1].op[1].comment_permlink;
		const reward = record[1].op[1].reward;		
		identicon = '<canvas class=small id=' + record[0] + ' width=24 height=24 data-jdenticon-value=' + curator + '></canvas>';
		body = curator + ' curation reward' + emoji_curation_reward 
			+ ' ' + vestToSteem(reward).toFixed(3) + ' SP' 
			+ ' for <a href=https://steemit.com/@' + comment_author + '/' + comment_permlink + '>' 
			+ ellipsis('@' + comment_author + '/' + comment_permlink) + '</a>' ;
	}
	else if(record[1].op[0] == 'comment_benefactor_reward'){
		const benefactor = record[1].op[1].benefactor;
		const author = record[1].op[1].author;
		const permlink = record[1].op[1].permlink;
		const sbd_payout = record[1].op[1].sbd_payout;
		const steem_payout = record[1].op[1].steem_payout;
		const vesting_payout = record[1].op[1].vesting_payout;
		identicon = '<canvas class=small id=' + record[0] + ' width=24 height=24 data-jdenticon-value=' + benefactor + '></canvas>';
		body = benefactor + ' comment benefactor reward' + emoji_comment_benefactor_reward
			+ ' ' + sbd_payout + ' and ' + vestToSteem(vesting_payout).toFixed(3) + ' SP'
			+ ' for <a href=https://steemit.com/@' + author + '/' + permlink + '>' 
			+ ellipsis('@' + author + '/' + permlink) + '</a>' ;
	}
	else if(record[1].op[0] == 'comment' && record[1].op[1].parent_author == ''){
		const author = record[1].op[1].author;
		const permlink = record[1].op[1].permlink;
		identicon =  '<canvas class=large id=' + record[0] + ' width=48 height=48 data-jdenticon-value=' + author + '></canvas>';
		body = author + ' authored a post' + emoji_authored + ' <a href=https://steemit.com/@' + author + '/' + permlink + '>' 
			+ ellipsis('@' + author + '/' + permlink) + '</a>' ;
		indenticon_type = 'large';
	}
	else if(record[1].op[0] == 'comment' && record[1].op[1].parent_author != ''){
		const author = record[1].op[1].author;
		const permlink = record[1].op[1].permlink;
		const parent_author = record[1].op[1].parent_author;
		const parent_permlink = record[1].op[1].parent_permlink;
		//https://steemit.com/hive-161179/@yasu/5ffedu
		identicon =  '<canvas class=large id=' + record[0] + ' width=48 height=48 data-jdenticon-value=' + author + '></canvas>';
		body = author 
			+ ' replied to' 
			+ emoji_replied 
			+ ' <a href=https://steemit.com/' 
			+ '@' + parent_author + '/' + parent_permlink + '#' + '@' + author + '/' + permlink 
			+ '>' 
			+ ellipsis('@' + parent_author + '/' + parent_permlink)
			+ '</a>' ;
		indenticon_type = 'large';
	}
	else if(record[1].op[0] == 'author_reward'){
		const author = record[1].op[1].author;
		const permlink = record[1].op[1].permlink;
		const sbd_payout = record[1].op[1].sbd_payout;
		const steem_payout = record[1].op[1].steem_payout;
		const vesting_payout = record[1].op[1].vesting_payout;
		identicon = '<canvas class=small id=' + record[0] + ' width=24 height=24 data-jdenticon-value=' + author + '></canvas>';
		body = author 
			+ '  author reward' + emoji_author_reward 
			+ ' ' + sbd_payout + ' and ' + vestToSteem(vesting_payout).toFixed(3) + ' SP'
			+ ' for <a href=https://steemit.com/@' + author + '/' + permlink + '>' 
			+ ellipsis('@' + author + '/' + permlink) + '</a>' ;
	}
	else if(record[1].op[0] == 'transfer'){
		const from = record[1].op[1].from;
		const to = record[1].op[1].to;
		const amount = record[1].op[1].amount;
		const memo = record[1].op[1].memo;
		identicon = '<canvas class=small id=' + record[0] + ' width=48 height=48 data-jdenticon-value=' + from + '></canvas>';
		body = from 
			+ '  transfer' + emoji_transfer 
			+ ' ' + amount + ' to ' + to
			+ ' ' + memo;
		indenticon_type = 'large';
	} 
	else if(record[1].op[0] == 'claim_reward_balance'){
		const account = record[1].op[1].account;
		const reward_steem = record[1].op[1].reward_steem;
		const reward_sbd = record[1].op[1].reward_sbd;
		const reward_vests = record[1].op[1].reward_vests;
		identicon = '<canvas class=small id=' + record[0] + ' width=24 height=24 data-jdenticon-value=' + account + '></canvas>';
		body = account + ' claim reward' + emoji_claim_reward_balance
			+ ' ' + reward_sbd + ' and ' + vestToSteem(reward_vests).toFixed(3) + ' SP'
	} 
	else if(record[1].op[0] == 'delegate_vesting_shares'){
		//{"delegator":"deimage","delegatee":"japansteemit","vesting_shares":"368173.275664 VESTS"}
		//deimage delegate 200.002 SP to japansteemit
		const delegator = record[1].op[1].delegator;
		const delegatee = record[1].op[1].delegatee;
		const vesting_shares = record[1].op[1].vesting_shares;
		identicon = '<canvas class=small id=' + record[0] + ' width=48 height=48 data-jdenticon-value=' + delegator + '></canvas>';
		const v = parseFloat(vesting_shares);
		body = delegator
			+ (v > 0 ? ' delegate' : ' undelegate')
			+ (v > 0 ? emoji_delegate_vesting_shares : emoji_undelegate_vesting_shares)
			+ (v > 0 ? ' ' + vestToSteem(vesting_shares).toFixed(3) + ' SP' : '')
			+ ' to ' + delegatee;
		indenticon_type = 'large';
	} 
	else
	{
		identicon =  '<canvas class=small width=24 height=24></canvas>';
		body = record[1].op[0] + ' ' + JSON.stringify(record[1].op[1]);
	}
	return {identicon: identicon, body: body, time: time, type: indenticon_type};
}
		
function makeTable(records){

	console.log('☆records☆');
	console.log(records);
	html = '<table border=0 cellpadding=0 style="background-color: #f1f1f1;">';
	for(var i=records.length-1;i>=0;i=i-1){
		const line = makeLine(records[i]);
		html = html + '<tr style="background-color: #ffffff;">'
			+ '<td>' 
			+ line.identicon 
			+ '<div class=' + line.type + '>'
			+ ' <span class=' + line.type + '>' 
			+ line.body 
			+ '</span>'
			+ (line.type == 'small' ? ' ' : '<br/>')  + '<a class=gary>' + line.time + '</a>'
			+ '</div>'
			+ '</td>'
			+ '</tr>';
	}
	html = html + '</table>';
	console.log(html);
	document.getElementById("text").innerHTML = html;	
}


let globalProperties;
let krwsteem;
let krwsbd;
let krwtrx;
let krwbtc;
let krweth;
async function aaa(days){
	globalProperties = await client.database.getDynamicGlobalProperties();//★

	console.log("★★★★★");
    console.log(globalProperties);


	krwsteem = await getPrice('KRW-STEEM');
	krwsbd = await getPrice('KRW-SBD');
	krwtrx = await getPrice('KRW-TRX');
	krwbtc = await getPrice('KRW-BTC');
	krweth = await getPrice('KRW-ETH');
	document.getElementById('price').innerHTML = 
		'<a class=right>STEEM ' + (krwsteem == 0 ? "---" : krwsteem) + ' won</a>' 
		+ '<br/><a class=right>SBD ' + (krwsbd == 0 ? "---" : krwsbd) + ' won</a>'
		+ '<br/><a class="right gray">TRX ' + (krwtrx == 0 ? "---" : krwtrx) + ' won</a>'
		+ '<br/><a class="right gray">BTC ' + (krwbtc == 0 ? "---" : krwbtc/1000000) + 'M won</a>'
		+ '<br/><a class="right gray">ETH ' + (krweth == 0 ? "---" : krweth/1000000) + 'M won</a>';
	//
	let username = document.getElementById("username").value;
	effectivepower(username);
  	votingpower(username);
	reputation(username, "reputation");
	age(username);
	setUsername(username);
	userlink();
	
	//
	let out = [];
	let limit = 100;
	let lastlength = limit;
	let firstValue = -1;
  	let firstTimestamp = new Date();
	let now = new Date();
	//while (lastlength == limit && now.getTime() - firstTimestamp.getTime() <= (86400000 * days)){
	while (firstValue != 0 && now.getTime() - firstTimestamp.getTime() <= (86400000 * days)){
		//limitより小さいfirstValueでエラーになる問題の対応。
		if(firstValue != -1 && firstValue < limit) {
			limit = firstValue;
		}
		//let ret = await client.api.getAccountHistoryAsync(username, firstValue, limit);//★
		let ret = await client.database.call('get_account_history',[username, firstValue, limit]);
		
		
		//console.log(ret);		
		firstValue = ret[0][0];
    		firstTimestamp = new Date(ret[0][1].timestamp);
		firstTimestamp.setHours(firstTimestamp.getHours() + 9);
		ret.shift();
		lastlength = ret.length;
		
		for(var i=ret.length-1;i>=0;i=i-1){
			if(now.getTime() - (new Date(ret[i][1].timestamp).getTime() + 3600000 * 9) > (86400000 * days)){
				ret.splice(i,1);
				continue;
				//ret.splice(0, i + 1);//残りの要素を削除
				//break;//すべて処理済
			}
			
			if(getReward(ret[i])){
				['author_reward', 'curation_reward', 'comment_benefactor_reward'].forEach(function(op){
					if(total_count[op] === void 0){
					}else{						
						let s = 
						    (op == "author_reward" ? "Author: " : (op == "curation_reward" ? "Curation: " : "Benefactor: "))
							+ steemAmountFormat(total_steem_payout[op], total_sbd_payout[op], total_sp_payout[op])
							+ krwAmountFormat(0, total_sbd_payout[op], total_sp_payout[op], krwsteem, krwsbd)
							+ '<br/>'
						document.getElementById(op).innerHTML = s;
					}
				});
			}
			
			
			//donation
			if(getReward_donation(ret[i])){
				['donation'].forEach(function(op){
					if(total_donation_count[op] === void 0){
					}else{						
						let s = steemAmountFormat(total_donation_steem[op], total_donation_sbd[op], total_donation_sp[op])
							+ krwAmountFormat(0, total_donation_sbd[op], total_donation_sp[op], krwsteem, krwsbd)
							+ '<br/>'
						document.getElementById(op).innerHTML = s;
					}
				});
			}
			
			//power up/down
			if(getReward_powerupdown(ret[i])){
				['power_up', 'power_down'].forEach(function(op){
					if(total_powerupdown_count[op] === void 0){
					}else{						
						let s = 
						    (op == "power_up" ? "Power up: " : "Power down: ")
							+ steemAmountFormat(total_powerupdown_steem[op], 0, total_powerupdown_sp[op])
							+ krwAmountFormat(total_powerupdown_steem[op], 0, total_powerupdown_sp[op], krwsteem, krwsbd)
							+ '<br/>'
						document.getElementById(op).innerHTML = s;
					}
				});
			}
			
			
			
			if(getTransferAmount(ret[i])){
				['transfer_in', 'transfer_out'].forEach(function(op){
					if(total_transfer_count[op] === void 0){
					}else{						
						let s = 
						    (op == "transfer_in" ? "Incoming: " : "Outgoing: ")
							+ steemAmountFormat(total_transfer_steem[op], total_transfer_sbd[op], 0)
							+ krwAmountFormat(total_transfer_steem[op], total_transfer_sbd[op], 0, krwsteem, krwsbd)
							+ '<br/>'
						document.getElementById(op).innerHTML = s;
					}
				});
			}
			
			let timestamp = new Date(ret[i][1].timestamp + "z");

			
			let termDay = (now - timestamp) / 86400000;

			document.getElementById("progress").innerText = timestamp.toLocaleString() + ' to now' + ' (' + termDay.toFixed(3) + ' days)';
		}
		
		out = ret.concat(out);
	}
	
	//console.log(out);
	return out;
};

function clickUserLink(username){
	document.getElementById("username").value = username;
	clickBtn(1);
}
	
function clickAppLink(appname){
	username = document.getElementById("username").value;
	//location.href = appname + username;
	
	var a = document.createElement('a');
	a.href = appname + username;
	a.target = '_blank';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

window.onload = function() {
	let username = getUserName();

	if(username == ''){
		let userList = getUsernames();
		if(userList.length == 0) return;
		username = userList.pop();
	}
	document.getElementById("username").value = username;
	clickBtn(1);
};


/* --------------------------------------------------------------------- */



function showTooltip(e) {
let tooltip = document.getElementById("tooltip");
let username = e.target.getAttribute('data-username');
	
	
tooltip.style.top = e.pageY + 10 + 'px';
tooltip.style.left = e.pageX + 10 + 'px';
let s = "<div style='background-color: white; padding: 10px; width: 300;box-shadow: rgba(0, 0, 0, 0.2) 0px 20px 30px;'>"
	+ "<image src=https://steemitimages.com/u/" + username + "/avatar style='float: left; margin: 4px;'/>"
	+ "<a style='font-size: xx-large; margin: 4px;'>" + username + "</a>"
	+ "<br/>"
	+ "<a id=tooltip_about style='margin: 4px;'></a>"
	+ "<table style='background-color: white;clear: left;'>"
	+ "<tr><td>Reputation</td><td><a id=tooltip_rep></a></td></tr>"
	+ "<tr><td>Effective Power</td><td><a id=tooltip_ep1></a> <a id=tooltip_ep2></a></td></tr>"
	+ "<tr><td>Voting Power</td><td><a id=tooltip_vp></a></td></tr>"
	+ "</table>"
	+ "</div>" 
tooltip.innerHTML = s;
tooltip.style.display = "block";
reputation(username, "tooltip_rep");
effectivepower(username, "tooltip_ep1", "tooltip_ep2");
votingpower(username, "tooltip_vp");
postingJsonMetadataAbout(username, "tooltip_about");
}
function moveTooltip(e) {
}
function hideTooltip(e) {
var tooltip = document.getElementById("tooltip");
tooltip.style.display = "none";
}
