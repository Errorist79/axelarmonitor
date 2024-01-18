const axios = require('axios');
const Slimbot = require('slimbot');
const { CONNECTING } = require('ws');
require('dotenv').config()
const TELEGRAMBOTTOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAMCHATID = process.env.TELEGRAM_CHAT_ID
const MSG_PREFIX = process.env.MSG_PREFIX
const RPCSYNCCHECKRUNINTERVALINMINS = process.env.RPC_SYNC_CHECK_RUN_INTERVAL_IN_MINS
const DEADMANSSWITCHRUNINTERVALINMINS = process.env.DEAD_MANS_SWITCH_RUN_INTERVAL_IN_MINS
const NOVOTECHECKINTERVALINMINS = process.env.NO_VOTE_CHECK_INTERVAL_IN_MINS
const AXELAR_BROADCASTER_ADDRESS = process.env.AXELAR_BROADCASTER_ADDRESS
const AXELARSCAN_EVMPOLL_API_URL = process.env.AXELARSCAN_EVMPOLL_API_URL
const AXELARSCAN_HEARTBEAT_API_URL = process.env.AXELARSCAN_HEARTBEAT_API_URL
const ETHRPCENDPOINT = process.env.ETH_RPC_ENDPOINT
const ETH2RPCENDPOINT = process.env.ETH2_RPC_ENDPOINT
const MOONBEAMRPCENDPOINT = process.env.MOONBEAM_RPC_ENDPOINT
const FANTOMRPCENDPOINT = process.env.FANTOM_RPC_ENDPOINT
const AVAXRPCENDPOINT = process.env.AVAX_RPC_ENDPOINT
const POLYGONRPCENDPOINT = process.env.POLYGON_RPC_ENDPOINT
const BINANCERPCENDPOINT = process.env.BINANCE_RPC_ENDPOINT
const AURORARPCENDPOINT = process.env.AURORA_RPC_ENDPOINT
const BASERPCENDPOINT = process.env.BASE_RPC_ENDPOINT
const LINEARPCENDPOINT = process.env.LINEAR_RPC_ENDPOINT
const MANTLERPCENDPOINT = process.env.MANTLE_RPC_ENDPOINT
const CELORPCENDPOINT = process.env.CELO_RPC_ENDPOINT
const KAVARPCENDPOINT = process.env.KAVA_RPC_ENDPOINT
const FILECOINRPCENDPOINT = process.env.FILECOIN_RPC_ENDPOINT
const IMMUTABLERPCENDPOINT = process.env.IMMUTABLE_RPC_ENDPOINT
const SCROLLRPCENDPOINT = process.env.SCROLL_RPC_ENDPOINT
const CENTRIFUGERPCENDPOINT = process.env.CENTRIFUGE_RPC_ENDPOINT
const ARBITRUMRPCENDPOINT = process.env.ARBITRUM_RPC_ENDPOINT
const OPTIMISM_RPC_ENDPOINT = process.env.OPTIMISM_RPC_ENDPOINT
const ETH_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const ETH2_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const MOONBEAM_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const FANTOM_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const AVAX_RPC_ENDPOINT_REQUEST = {"jsonrpc": "2.0","method": "info.isBootstrapped","params":{"chain":"C"},"id":1}
const POLYGON_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const BINANCE_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const AURORA_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const BASE_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const LINEA_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const MANTLE_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const CELO_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const KAVA_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const FILECOIN_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "Filecoin.ChainHead", "params": []}
const IMMUTABLE_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const SCROLL_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const CENTRIFUGE_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const ARBITRUM_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const OPTIMISM_RPC_ENDPOINT_REQUEST = {"id": 1, "jsonrpc": "2.0", "method": "eth_syncing", "params": []}
const TCP_CONNECT_TIMEOUT_IN_MS = 10000



const slimbot = new Slimbot(TELEGRAMBOTTOKEN);
async function checksyncstatus(...deadmanswitchflag){
    let rpcrequestmap = [
        {
            "rpcendpoint":ETHRPCENDPOINT,
            "rpcendpointrequest":ETH_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":MOONBEAMRPCENDPOINT,
            "rpcendpointrequest":MOONBEAM_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":FANTOMRPCENDPOINT,
            "rpcendpointrequest":FANTOM_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":AVAXRPCENDPOINT,
            "rpcendpointrequest":AVAX_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":POLYGONRPCENDPOINT,
            "rpcendpointrequest":POLYGON_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":ETH2RPCENDPOINT,
            "rpcendpointrequest":ETH2_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":AURORARPCENDPOINT,
            "rpcendpointrequest":AURORA_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":BINANCERPCENDPOINT,
            "rpcendpointrequest":BINANCE_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":BASERPCENDPOINT,
            "rpcendpointrequest":BASE_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":LINEARPCENDPOINT,
            "rpcendpointrequest":LINEA_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":MANTLERPCENDPOINT,
            "rpcendpointrequest":MANTLE_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":CELORPCENDPOINT,
            "rpcendpointrequest":CELO_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":KAVARPCENDPOINT,
            "rpcendpointrequest":KAVA_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":FILECOINRPCENDPOINT,
            "rpcendpointrequest":FILECOIN_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":IMMUTABLERPCENDPOINT,
            "rpcendpointrequest":IMMUTABLE_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":SCROLLRPCENDPOINT,
            "rpcendpointrequest":SCROLL_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":CENTRIFUGERPCENDPOINT,
            "rpcendpointrequest":CENTRIFUGE_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":ARBITRUMRPCENDPOINT,
            "rpcendpointrequest":ARBITRUM_RPC_ENDPOINT_REQUEST
        },
        {
            "rpcendpoint":OPTIMISM_RPC_ENDPOINT,
            "rpcendpointrequest":OPTIMISM_RPC_ENDPOINT_REQUEST
        },
        

    ]

    let source = axios.CancelToken.source();
    setTimeout(() => {
        source.cancel();
    }, TCP_CONNECT_TIMEOUT_IN_MS);

    Promise.allSettled(rpcrequestmap.map((endpoint) => axios.post(endpoint.rpcendpoint,endpoint.rpcendpointrequest)))
        .then((results) => {
            let ethresult = results[0]
            let moonbeamresult = results[1]
            let fantomresult = results[2]
            let avaxresult = results[3]
            let polygonresult = results[4]
            let eth2result = results[5]
            let auroraresult = results[6]
            let binanceresult = results[7]
            let baseresult = results[8]
            let linearesult = results[9]
            let mantleresult = results[10]
            let celoresult = results[11]
            let kavaresult = results[12]
            let filecoinresult = results[13]
            let immutableresult = results[14]
            let scrollresult = results[15]
            let centrifugeresult = results[16]
            let arbitrumresult = results[17]
            let optimismresult = results[18]
            let ethstatus=false;
            let eth2status=false;
            let moonbeamstatus=false;
            let fantomstatus=false;
            let avaxstatus=false;
            let polygonstatus=false;
            let aurorastatus=false;
            let binancestatus=false;
            let basestatus=false;
            let lineastatus=false;
            let mantlestatus=false;
            let celostatus=false;
            let kavastatus=false;
            let filecoinstatus=false;
            let immutablestatus=false;
            let scrollstatus=false;
            let centrifugestatus=false;
            let arbitrumstatus=false;
            let optimismstatus=false;
            if(ethresult.status === 'fulfilled' && ethresult.value.data.hasOwnProperty('result') && !ethresult.value.data.result){
                ethstatus=true;
            }
            if(eth2result.status === 'fulfilled' && eth2result.value.data.hasOwnProperty('result') && !eth2result.value.data.result){
                eth2status=true;
            }
            if(auroraresult.status === 'fulfilled' && auroraresult.value.data.hasOwnProperty('result') && !auroraresult.value.data.result){
                aurorastatus=true;
            }
            if(binanceresult.status === 'fulfilled' && binanceresult.value.data.hasOwnProperty('result') && !binanceresult.value.data.result){
                binancestatus=true;
            }
            if(moonbeamresult.status === 'fulfilled' && moonbeamresult.value.data.hasOwnProperty('result') && !moonbeamresult.value.data.result){
                moonbeamstatus=true;
            }
            if(fantomresult.status === 'fulfilled' && fantomresult.value.data.hasOwnProperty('result') && !fantomresult.value.data.result){
                fantomstatus=true;
            }
            if(avaxresult.status === 'fulfilled' && avaxresult.value.data.hasOwnProperty('result') && avaxresult.value.data.result.isBootstrapped){
                avaxstatus=true;
            }
            if(polygonresult.status === 'fulfilled' && polygonresult.value.data.hasOwnProperty('result') && !polygonresult.value.data.result){
                polygonstatus=true;
            }
            if(baseresult.status === 'fulfilled' && baseresult.value.data.hasOwnProperty('result') && !baseresult.value.data.result){
                basestatus=true;
            }
            if(linearesult.status === 'fulfilled' && linearesult.value.data.hasOwnProperty('result') && !linearesult.value.data.result){
                lineastatus=true;
            }
            if(mantleresult.status === 'fulfilled' && mantleresult.value.data.hasOwnProperty('result') && !mantleresult.value.data.result){
                mantlestatus=true;
            }
            if(celoresult.status === 'fulfilled' && celoresult.value.data.hasOwnProperty('result') && !celoresult.value.data.result){
                celostatus=true;
            }
            if(kavaresult.status === 'fulfilled' && kavaresult.value.data.hasOwnProperty('result') && !kavaresult.value.data.result){
                kavastatus=true;
            }
            if(filecoinresult.status === 'fulfilled' && filecoinresult.value.data.hasOwnProperty('result') && !filecoinresult.value.data.result){
                filecoinstatus=true;
            }
            if(immutableresult.status === 'fulfilled' && immutableresult.value.data.hasOwnProperty('result') && !immutableresult.value.data.result){
                immutablestatus=true;
            }
            if(scrollresult.status === 'fulfilled' && scrollresult.value.data.hasOwnProperty('result') && !scrollresult.value.data.result){
                scrollstatus=true;
            }
            if(centrifugeresult.status === 'fulfilled' && centrifugeresult.value.data.hasOwnProperty('result') && !centrifugeresult.value.data.result){
                centrifugestatus=true;
            }
            if(arbitrumresult.status === 'fulfilled' && arbitrumresult.value.data.hasOwnProperty('result') && !arbitrumresult.value.data.result){
                arbitrumstatus=true;
            }
            if(optimismresult.status === 'fulfilled' && optimismresult.value.data.hasOwnProperty('result') && !optimismresult.value.data.result){
                optimismstatus=true;
            }
            if(!ethstatus || !moonbeamstatus || !fantomstatus || !avaxstatus || !polygonstatus || !eth2status || !aurorastatus || !binancestatus || !basestatus || !lineastatus || !mantlestatus || !celostatus || !kavastatus || !filecoinstatus || !immutablestatus || !scrollstatus || !centrifugestatus || !arbitrumstatus || !optimismstatus || deadmanswitchflag[0]){
                const alertmsg = MSG_PREFIX +
                                `
                                __RPC Chain Status__
                                \`\`\`
                               ETHStatus:     ${getlogo(ethstatus)}
                               ETH2Status:     ${getlogo(eth2status)}
                               BinanceStatus:     ${getlogo(binancestatus)}
                               AuroraStatus:     ${getlogo(aurorastatus)}
                               MbeamStatus:   ${getlogo(moonbeamstatus)}
                               FantomStatus:  ${getlogo(fantomstatus)}
                               AvaxStatus:    ${getlogo(avaxstatus)}
                               PolygonStatus: ${getlogo(polygonstatus)}
                               BaseStatus:    ${getlogo(basestatus)}
                               LineaStatus:   ${getlogo(lineastatus)}
                               MantleStatus:  ${getlogo(mantlestatus)}
                               CeloStatus:    ${getlogo(celostatus)}
                               KavaStatus:    ${getlogo(kavastatus)}
                               filecoinStatus:    ${getlogo(filecoinstatus)}
                               immutableStatus:    ${getlogo(immutablestatus)}
                               scrollStatus:    ${getlogo(scrollstatus)}
                               centrifugeStatus:    ${getlogo(centrifugestatus)}
                               arbitrumStatus:    ${getlogo(arbitrumstatus)}
                               optimismStatus:    ${getlogo(optimismstatus)}
                                \`\`\`
                                `;
                slimbot.sendMessage(TELEGRAMCHATID, alertmsg,{parse_mode: 'MarkdownV2'});
            }
        }).catch(function(err) {
            console.log(err.message);
        });


}


function getlogo(ethstatus) {
    if(ethstatus)
        return '✅';
    else return '❌';
}

async function checkheartbeat(){
    console.log('entering checkheartbeat')
    let requestbody = {}

    let utcdate = new Date(new Date().toUTCString())
    let curutcepoch = Math.round(utcdate.valueOf())
    requestbody['sender'] = AXELAR_BROADCASTER_ADDRESS
    requestbody['size'] = 1

    const headers = {
        'Content-Type': 'application/json'
    }
    const json = JSON.stringify(requestbody);
    const res = await axios.post(AXELARSCAN_HEARTBEAT_API_URL, json,{headers: headers});
    console.log(res.data.data)
    let lastheartbeattimestamp = res.data.data[0]['timestamp']
    let deltainmins = (curutcepoch - lastheartbeattimestamp)/60000
    console.log('heartbeat delta in mins is ' + deltainmins)
    if(deltainmins >= 10){
        slimbot.sendMessage(TELEGRAMCHATID, MSG_PREFIX + ' : stale heartbeat on axelar');
        console.log('stale heartbeat')
    }
}

async function checknovotes(){
    console.log('entering checknovotes')
    let requestbody = {}
    let utcdate = new Date(new Date().toUTCString())
    utcdate.setMinutes(utcdate.getMinutes() - NOVOTECHECKINTERVALINMINS)
    requestbody['voter'] = AXELAR_BROADCASTER_ADDRESS
    requestbody['vote'] = 'no'
    requestbody['fromTime'] =  String(Math.round(utcdate.valueOf() / 1000))
    requestbody['size'] = 10
    const headers = {
        'Content-Type': 'application/json'
    }
    const json = JSON.stringify(requestbody);
    const res = await axios.post(AXELARSCAN_EVMPOLL_API_URL, json,{headers: headers});
    console.log(res.data.data)
    res.data.data.forEach(poll=>{
        let totalparticipants = poll['participants'].length
        let pollid = poll['id']
        let chain = poll['sender_chain']
        let nooffalsevotesinpoll = 0;
        Object.keys(poll).forEach(key=>{
            if(key.startsWith('axelar1')){
                let vote = poll[key]['vote']
                if(vote === false){
                    nooffalsevotesinpoll++;
                }
             }
        })
        console.log(totalparticipants)
        console.log(nooffalsevotesinpoll)
        console.log(' percentage of false votes ' + (nooffalsevotesinpoll/totalparticipants))
        //Considerd as NO vote if more than 50% of participants in poll votes YES and you voted NO
        if((nooffalsevotesinpoll/totalparticipants)<=0.5){
            //raise alarm
            slimbot.sendMessage(TELEGRAMCHATID, MSG_PREFIX + ' voted ❌ for ' + chain + ' in poll id '+ pollid,);
            console.log('voted false for ' + chain + ' in poll id '+ pollid)
        }

    })

}

setInterval(checksyncstatus, RPCSYNCCHECKRUNINTERVALINMINS * 60  * 1000,false);
setInterval(checksyncstatus, DEADMANSSWITCHRUNINTERVALINMINS * 60  * 1000,true);
checksyncstatus(true);
//Checks no votes every 10 min
setInterval(checknovotes, 10 * 60  * 1000);
//Checks stale heartbeat every 10 min
setInterval(checkheartbeat, 10 * 60  * 1000);
