var express = require("express");
var https = require("https");
var http = require("http");

var app = express();
app.use(express.logger());
app.use(express.bodyParser());

var last_posted = (new Date).getTime();

app.post('/bot_callback', function(request, response) {
  console.log("Received: " + request.body.text);
  var command = request.body.text.match(/^\?([a-z]+)/gi);
  if (command) {
   handle_command(command[0], request.body.text.split(" "));
  }
  response.send('handled');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});


function handle_command(cmd, args) {

  console.log("Handling: " + cmd);
  switch (cmd) {
    case "?ping":
      send_to_chat("pong");
      break;
    case "?summon":
      summon(args);
      break;
    case "?hug":
      hug(args);
      break;
    case "?ahmed":
      ahmed();
      break;
    default:
      console.log("Nothing to do for: " + cmd);
      break;
  }
}

function send_to_chat(message) {

  var now = (new Date).getTime();
  var diff = now - last_posted;
  console.log("Time since last posted: "+diff);

  if (diff > process.env.POST_THROTTLE) {

    var post_data = JSON.stringify({
      bot_id: process.env.GROUPME_BOT_ID,
      text: message
    });
    var options = {
      hostname: 'api.groupme.com',
      port: 443,
      path: '/v3/bots/post',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': post_data.length
      }
    };
    // Set up the request
    var post_req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
    console.log("Message sent.");
  } else {
    console.log("Message not sent due to throttling.");
  }
  last_posted = now;
}


function summon(text) {
  http.get("http://images.google.com/images?q=" + encodeURIComponent(text) + "&safe=strict", function(res) {
    var data = "";
    res.on("data", function(chunk){ data += chunk; });
    res.on("end", function(){
      var img = data.match(/imgurl=(.*?)&/gi)[0].match(/imgurl=(.*?)&/);
      if (img[1]) {
        console.log("Sending image link: " +img[1]);
        send_to_chat(img[1]);
      } else {
        console.log("No image link found.");
      }
    });
  });
}

function ahmed () {
  var images = [
    'http://2.bp.blogspot.com/-nWXekkveYkg/Tu_4I8obKDI/AAAAAAAAAtY/WfEENRf8i9E/s320/oreoprah.jpg',
    'http://2.bp.blogspot.com/_VMq0yY9NCOo/SR9D56ytiXI/AAAAAAAAA9Y/w0ChRrG-ACM/s400/its_a_unix_system_i_know_this.jpg',
    'http://24.media.tumblr.com/tumblr_lgbo631c1d1qczbnlo1_500.jpg',
    'http://24.media.tumblr.com/tumblr_lgg4dbT0zB1qb5gkjo1_500.png',
    'http://24.media.tumblr.com/tumblr_lhwirglmXs1qg1lcbo1_500.jpg',
    'http://24.media.tumblr.com/tumblr_lk80ofmBIz1qzma4ho1_500.jpg',
    'http://24.media.tumblr.com/tumblr_lmj8aj5MEO1qisu7ko1_500.jpg',
    'http://25.media.tumblr.com/tumblr_l6l5uecANi1qb4fcso1_400.jpg',
    'http://25.media.tumblr.com/tumblr_lkcejtJ7Sd1qiohu2o1_400.jpg',
    'http://25.media.tumblr.com/tumblr_lrsojjFeuM1qjnhqgo1_500.jpg',
    'http://25.media.tumblr.com/tumblr_m0op5leC4z1rnl7vwo1_500.jpg',
    'http://25.media.tumblr.com/tumblr_m4324kEdGc1qzpzfmo1_500.jpg',
    'http://25.media.tumblr.com/tumblr_m967pwaL5T1qzpwi0o1_500.jpg',
    'http://26.media.tumblr.com/tumblr_kofz55HhWI1qzma4ho1_500.jpg',
    'http://26.media.tumblr.com/tumblr_lgxxtfTNMX1qzwiilo1_500.png',
    'http://26.media.tumblr.com/tumblr_lh1j6iB5dt1qzh5gno1_400.jpg',
    'http://26.media.tumblr.com/tumblr_lhgcymXqxX1qbzrdoo1_500.jpg',
    'http://26.media.tumblr.com/tumblr_ljp6agLMOA1qa70eyo1_500.jpg',
    'http://26.media.tumblr.com/tumblr_lyoid9h0iY1qbohddo1_r1_500.jpg',
    'http://27.media.tumblr.com/tumblr_lbp6y1kooo1qz6f9yo1_500.jpg',
    'http://27.media.tumblr.com/tumblr_lbuhdhNPJt1qb5m0ro1_500.jpg',
    'http://27.media.tumblr.com/tumblr_lo58xjWOUN1qzrlhgo1_r1_500.jpg',
    'http://27.media.tumblr.com/tumblr_lxfylwRBO51qji03jo1_500.jpg',
    'http://28.media.tumblr.com/tumblr_lhi5fegaWQ1qb8xtno1_400.jpg',
    'http://28.media.tumblr.com/tumblr_lhvdwo5Q0a1qe8o39o1_500.jpg',
    'http://28.media.tumblr.com/tumblr_lslypiW8nj1r4r3emo1_500.jpg',
    'http://29.media.tumblr.com/tumblr_l1wsx1R94S1qzmowao1_500.jpg',
    'http://29.media.tumblr.com/tumblr_l8gay24qdG1qzo6t6o1_500.jpg',
    'http://29.media.tumblr.com/tumblr_l8vijrvP0d1qanndio1_500.jpg',
    'http://29.media.tumblr.com/tumblr_leu457YyFu1qa1id2o1_500.jpg',
    'http://29.media.tumblr.com/tumblr_lfb6f1xxdp1qzmowao1_500.jpg',
    'http://29.media.tumblr.com/tumblr_li7zv9oSy51qbjbrso1_500.jpg',
    'http://29.media.tumblr.com/tumblr_lkqxvkqv4j1qanr6lo1_500.jpg',
    'http://29.media.tumblr.com/tumblr_lrufk8Ud2w1qhuy0oo1_500.png',
    'http://3.bp.blogspot.com/_1GR6mjbBpTI/TS8hZ3VXVyI/AAAAAAAABlE/FC_ZskbF0HU/s1600/corner.jpg',
    'http://30.media.tumblr.com/tumblr_koxbdjWceE1qza3e8o1_400.jpg',
    'http://30.media.tumblr.com/tumblr_l3wek2i9FK1qzev6go1_400.jpg',
    'http://30.media.tumblr.com/tumblr_lc816hUcZz1qcjbhoo1_500.jpg',
    'http://30.media.tumblr.com/tumblr_lhbzjdT29C1qb6i6bo1_500.jpg',
    'http://30.media.tumblr.com/tumblr_lp293cxRov1qd5kdjo1_500.jpg',
    'http://apcmag.com/images/jurassic-park-unix-1.jpg',
    'http://archives.bulbagarden.net/media/upload/7/70/079Slowpoke.png',
    'http://assets0.ordienetworks.com/images/user_photos/1234032/c0ce71d2ca1a2cd2b83b8bf4edbe95b5_width_600x.jpg',
    'http://blogs.dallasobserver.com/dc9/cough%20syrup.jpg',
    'http://cdn.someecards.com/someecards/filestorage/suggest-drink-weekend-ecard-someecards.jpg',
    'http://chzmemebase.files.wordpress.com/2011/02/memes-marathon-man.jpg',
    'http://dcist.com/attachments/dcist_nicole/cathy2.jpg',
    'http://farm4.static.flickr.com/3217/3015062728_6b27f9a6ae.jpg',
    'http://fatpita.net/images/image%20%288589%29.jpg',
    'http://files.sharenator.com/great_scott-s400x341-252428.png',
    'http://hackedirl.files.wordpress.com/2011/05/epic-win-photos-yearbook-quote-win2.jpg',
    'http://i.imgur.com/00cNo.jpg',
    'http://i.imgur.com/037z1.png',
    'http://i.imgur.com/0Ehad.jpg',
    'http://i.imgur.com/0hDeI.jpg',
    'http://i.imgur.com/0kESL.jpg',
    'http://i.imgur.com/0nl87.jpg',
    'http://i.imgur.com/0sAOA.jpg',
    'http://i.imgur.com/0yeqY.jpg',
    'http://i.imgur.com/1MCxb.jpg',
    'http://i.imgur.com/1PZYY.png',
    'http://i.imgur.com/1Ukht.jpg',
    'http://i.imgur.com/1zPVu.jpg',
    'http://i.imgur.com/20nM6.jpg',
    'http://i.imgur.com/22Zhs.png',
    'http://i.imgur.com/2FZA0.jpg',
    'http://i.imgur.com/2KpLO.jpg',
    'http://i.imgur.com/2PsQg.jpg',
    'http://i.imgur.com/2TAPd.jpg',
    'http://i.imgur.com/2UkIp.jpg',
    'http://i.imgur.com/2Zqdo.jpg',
    'http://i.imgur.com/2kkso.jpg',
    'http://i.imgur.com/2qCxM.jpg',
    'http://i.imgur.com/2toX2.jpg',
    'http://i.imgur.com/36lUb.jpg',
    'http://i.imgur.com/3ERJE.jpg',
    'http://i.imgur.com/3Gkx5.jpg',
    'http://i.imgur.com/3nU0N.jpg',
    'http://i.imgur.com/42sHY.jpg',
    'http://i.imgur.com/44HVA.jpg',
    'http://i.imgur.com/45qnL.jpg',
    'http://i.imgur.com/4azoe.jpg',
    'http://i.imgur.com/4hS9D.png',
    'http://i.imgur.com/5BcH8.jpg',
    'http://i.imgur.com/5P7tz.png',
    'http://i.imgur.com/5V0dT.jpg',
    'http://i.imgur.com/5de3b.jpg',
    'http://i.imgur.com/5ml5R.jpg',
    'http://i.imgur.com/69tbC.png',
    'http://i.imgur.com/6Af94.jpg',
    'http://i.imgur.com/6EmsE.jpg',
    'http://i.imgur.com/6UYv1.jpg',
    'http://i.imgur.com/6mJWS.jpg',
    'http://i.imgur.com/6pFOa.jpg',
    'http://i.imgur.com/6zcht.jpg',
    'http://i.imgur.com/71boB.jpg',
    'http://i.imgur.com/726G6.png',
    'http://i.imgur.com/78Msb.png',
    'http://i.imgur.com/7DF8r.jpg',
    'http://i.imgur.com/7XRQg.png',
    'http://i.imgur.com/7Y47G.jpg',
    'http://i.imgur.com/7dbJq.jpg',
    'http://i.imgur.com/7lBMC.jpg',
    'http://i.imgur.com/7mwpd.jpg',
    'http://i.imgur.com/7nNde.jpg',
    'http://i.imgur.com/7yHl6.jpg',
    'http://i.imgur.com/83DVM.jpg',
    'http://i.imgur.com/84F3I.jpg',
    'http://i.imgur.com/8OaKf.jpg',
    'http://i.imgur.com/8OpFN.jpg',
    'http://i.imgur.com/8Z4cT.jpg',
    'http://i.imgur.com/8w4YJ.jpg',
    'http://i.imgur.com/9Kg12.jpg',
    'http://i.imgur.com/9KnkV.jpg',
    'http://i.imgur.com/9SzJV.jpg',
    'http://i.imgur.com/9XuZd.png',
    'http://i.imgur.com/9bUNr.jpg',
    'http://i.imgur.com/9fYbZ.jpg',
    'http://i.imgur.com/A97wH.jpg',
    'http://i.imgur.com/ADvB5.jpg',
    'http://i.imgur.com/AIicq.jpg',
    'http://i.imgur.com/AVJXE.jpg',
    'http://i.imgur.com/AYnLb.png',
    'http://i.imgur.com/AbX6F.jpg',
    'http://i.imgur.com/An2Ns.jpg',
    'http://i.imgur.com/B0WyF.jpg',
    'http://i.imgur.com/B4rqR.jpg',
    'http://i.imgur.com/BPwwo.jpg',
    'http://i.imgur.com/BUjUD.jpg',
    'http://i.imgur.com/BWzb6.jpg',
    'http://i.imgur.com/Bd9XA.jpg',
    'http://i.imgur.com/BunyM.png',
    'http://i.imgur.com/C0ewq.jpg',
    'http://i.imgur.com/CYXg2.jpg',
    'http://i.imgur.com/CbyBN.jpg',
    'http://i.imgur.com/Crn5m.jpg',
    'http://i.imgur.com/CwkMq.jpg',
    'http://i.imgur.com/DC7F9.jpg',
    'http://i.imgur.com/DCPzG.jpg',
    'http://i.imgur.com/DCfzA.png',
    'http://i.imgur.com/DI0wS.jpg',
    'http://i.imgur.com/DRaoz.jpg',
    'http://i.imgur.com/DgUck.jpg',
    'http://i.imgur.com/DjVG5.jpg',
    'http://i.imgur.com/E1YOJ.jpg',
    'http://i.imgur.com/EFw9g.jpg',
    'http://i.imgur.com/EJ8wu.jpg',
    'http://i.imgur.com/EVW6P.jpg',
    'http://i.imgur.com/EXvIT.jpg',
    'http://i.imgur.com/F5VPP.png',
    'http://i.imgur.com/F9ySq.jpg',
    'http://i.imgur.com/FH3Np.jpg',
    'http://i.imgur.com/FhuvI.jpg',
    'http://i.imgur.com/FrH2F.jpg',
    'http://i.imgur.com/FsWks.jpg',
    'http://i.imgur.com/Fydew.jpg',
    'http://i.imgur.com/GW3Sv.jpg',
    'http://i.imgur.com/Gtyjf.jpg',
    'http://i.imgur.com/GwpgO.jpg',
    'http://i.imgur.com/H1b2n.jpg',
    'http://i.imgur.com/H6Ep9.jpg',
    'http://i.imgur.com/HpztU.jpg',
    'http://i.imgur.com/HxFjQ.jpg',
    'http://i.imgur.com/I7nmk.jpg',
    'http://i.imgur.com/IN4w6.jpg',
    'http://i.imgur.com/IpxZA.jpg',
    'http://i.imgur.com/Ir5aA.jpg',
    'http://i.imgur.com/Iv0MO.png',
    'http://i.imgur.com/IvAuh.jpg',
    'http://i.imgur.com/J0Sie.png',
    'http://i.imgur.com/JLyWL.jpg',
    'http://i.imgur.com/JTB3l.jpg',
    'http://i.imgur.com/JbJvE.jpg',
    'http://i.imgur.com/Jfy0Y.jpg',
    'http://i.imgur.com/JtRhq.jpg',
    'http://i.imgur.com/KDs2G.jpg',
    'http://i.imgur.com/KFzR0.jpg',
    'http://i.imgur.com/KO4aW.jpg',
    'http://i.imgur.com/KVC3s.jpg',
    'http://i.imgur.com/LGwkM.jpg',
    'http://i.imgur.com/LQoYy.jpg',
    'http://i.imgur.com/LVV6m.jpg',
    'http://i.imgur.com/LbeIu.jpg',
    'http://i.imgur.com/LcE3m.jpg',
    'http://i.imgur.com/LxXdL.jpg',
    'http://i.imgur.com/M22iv.jpg',
    'http://i.imgur.com/MBUCh.jpg',
    'http://i.imgur.com/MGErY.png',
    'http://i.imgur.com/MLwg6.jpg',
    'http://i.imgur.com/MP08Z.jpg',
    'http://i.imgur.com/MSUiF.jpg',
    'http://i.imgur.com/MbaQr.png',
    'http://i.imgur.com/Mhzz1.jpg',
    'http://i.imgur.com/Mvg76.jpg',
    'http://i.imgur.com/MzPq3.jpg',
    'http://i.imgur.com/NJq6Q.png',
    'http://i.imgur.com/NK5Q4.jpg',
    'http://i.imgur.com/NY0tD.jpg',
    'http://i.imgur.com/NpIkU.jpg',
    'http://i.imgur.com/OMeYE.jpg',
    'http://i.imgur.com/P2p4H.jpg',
    'http://i.imgur.com/P6V2i.png',
    'http://i.imgur.com/PO83L.jpg',
    'http://i.imgur.com/PPSuI.jpg',
    'http://i.imgur.com/PvJUL.jpg',
    'http://i.imgur.com/Q87Iv.jpg',
    'http://i.imgur.com/QFmln.jpg',
    'http://i.imgur.com/QblVX.jpg',
    'http://i.imgur.com/QjRgl.jpg',
    'http://i.imgur.com/QkpeV.jpg',
    'http://i.imgur.com/Qnpd7.jpg',
    'http://i.imgur.com/Qpxfb.jpg',
    'http://i.imgur.com/Qsx24.jpg',
    'http://i.imgur.com/QzgGr.jpg',
    'http://i.imgur.com/R2EVt.png',
    'http://i.imgur.com/RAPW3.jpg',
    'http://i.imgur.com/RMZjW.jpg',
    'http://i.imgur.com/RtuXv.jpg',
    'http://i.imgur.com/S8Q6m.jpg',
    'http://i.imgur.com/SCCjz.jpg',
    'http://i.imgur.com/SCPDm.jpg',
    'http://i.imgur.com/SHYsI.jpg',
    'http://i.imgur.com/SbreV.jpg',
    'http://i.imgur.com/So2jc.jpg',
    'http://i.imgur.com/SpfGH.jpg',
    'http://i.imgur.com/SyTaC.png',
    'http://i.imgur.com/TAWfe.jpg',
    'http://i.imgur.com/THcge.jpg',
    'http://i.imgur.com/TSDqS.jpg',
    'http://i.imgur.com/TYCxy.jpg',
    'http://i.imgur.com/TZUkY.jpg',
    'http://i.imgur.com/TmSdS.jpg',
    'http://i.imgur.com/Tnyb4.jpg',
    'http://i.imgur.com/U7kC1.jpg',
    'http://i.imgur.com/U7rb3.jpg',
    'http://i.imgur.com/U9unF.jpg',
    'http://i.imgur.com/UouuV.jpg',
    'http://i.imgur.com/V29Ww.jpg',
    'http://i.imgur.com/V5fcp.png',
    'http://i.imgur.com/V6MQK.png',
    'http://i.imgur.com/VI2Xb.jpg',
    'http://i.imgur.com/VJt9m.jpg',
    'http://i.imgur.com/VL2HH.png',
    'http://i.imgur.com/VMFiW.png',
    'http://i.imgur.com/VTgp0.png',
    'http://i.imgur.com/VV5ju.jpg',
    'http://i.imgur.com/Vbeo2.png',
    'http://i.imgur.com/VkcZn.jpg',
    'http://i.imgur.com/VnnzF.jpg',
    'http://i.imgur.com/W0Iff.jpg',
    'http://i.imgur.com/WBOS1.jpg',
    'http://i.imgur.com/WIKQr.png',
    'http://i.imgur.com/WRDQP.jpg',
    'http://i.imgur.com/WVmZm.jpg',
    'http://i.imgur.com/WZ61U.jpg',
    'http://i.imgur.com/WjmkB.jpg',
    'http://i.imgur.com/WspNa.png',
    'http://i.imgur.com/X35VM.jpg',
    'http://i.imgur.com/X5gCP.jpg',
    'http://i.imgur.com/XLUXy.jpg',
    'http://i.imgur.com/XSJ0W.jpg',
    'http://i.imgur.com/XTXon.jpg',
    'http://i.imgur.com/Xe4d1.jpg',
    'http://i.imgur.com/Y6l4h.jpg',
    'http://i.imgur.com/YB64C.jpg',
    'http://i.imgur.com/YLBTQ.jpg',
    'http://i.imgur.com/YNBm6.jpg',
    'http://i.imgur.com/YO9AM.jpg',
    'http://i.imgur.com/YPc5T.jpg',
    'http://i.imgur.com/YaBbi.jpg',
    'http://i.imgur.com/YcUNX.png',
    'http://i.imgur.com/YeX7n.jpg',
    'http://i.imgur.com/YfopY.jpg',
    'http://i.imgur.com/Yqk07.jpg',
    'http://i.imgur.com/YyWLE.jpg',
    'http://i.imgur.com/ZSjsE.jpg',
    'http://i.imgur.com/ZZWXq.png',
    'http://i.imgur.com/ZtvSl.jpg',
    'http://i.imgur.com/Zvxnw.jpg',
    'http://i.imgur.com/ZyUWA.jpg',
    'http://i.imgur.com/aGa5N.jpg',
    'http://i.imgur.com/aNbKL.jpg',
    'http://i.imgur.com/aaChd.jpg',
    'http://i.imgur.com/akTpH.jpg',
    'http://i.imgur.com/annBL.jpg',
    'http://i.imgur.com/b8OLl.jpg',
    'http://i.imgur.com/b9WEb.jpg',
    'http://i.imgur.com/bFEn9.jpg',
    'http://i.imgur.com/bIBlZ.jpg',
    'http://i.imgur.com/bMuti.jpg',
    'http://i.imgur.com/bTQae.jpg',
    'http://i.imgur.com/bXkTH.jpg',
    'http://i.imgur.com/bYFe7.jpg',
    'http://i.imgur.com/biNdv.jpg',
    'http://i.imgur.com/bqQsb.jpg',
    'http://i.imgur.com/bv79z.jpg',
    'http://i.imgur.com/cO4QA.jpg',
    'http://i.imgur.com/cufqA.jpg',
    'http://i.imgur.com/cxxuj.png',
    'http://i.imgur.com/dAK2A.jpg',
    'http://i.imgur.com/dFTrW.jpg',
    'http://i.imgur.com/dUBQv.jpg',
    'http://i.imgur.com/dbF5t.jpg',
    'http://i.imgur.com/dfOp9.jpg',
    'http://i.imgur.com/dwTqA.jpg',
    'http://i.imgur.com/e2ySD.jpg',
    'http://i.imgur.com/e5CZm.jpg',
    'http://i.imgur.com/e9v6f.jpg',
    'http://i.imgur.com/ecJvb.jpg',
    'http://i.imgur.com/evwWb.png',
    'http://i.imgur.com/f5yDL.jpg',
    'http://i.imgur.com/fAqUa.jpg',
    'http://i.imgur.com/fNDAS.jpg',
    'http://i.imgur.com/fP43i.png',
    'http://i.imgur.com/fQ4Yd.png',
    'http://i.imgur.com/gmMGs.jpg',
    'http://i.imgur.com/hAtTY.jpg',
    'http://i.imgur.com/hsLac.jpg',
    'http://i.imgur.com/hweBx.png',
    'http://i.imgur.com/hwllL.jpg',
    'http://i.imgur.com/hxZSr.jpg',
    'http://i.imgur.com/i0m3N.jpg',
    'http://i.imgur.com/i5PhS.jpg',
    'http://i.imgur.com/i6OOe.jpg',
    'http://i.imgur.com/i86yO.jpg',
    'http://i.imgur.com/iDgmD.jpg',
    'http://i.imgur.com/iR0S4.jpg',
    'http://i.imgur.com/ifr0Y.jpg',
    'http://i.imgur.com/ijcmc.png',
    'http://i.imgur.com/ilM8Z.jpg',
    'http://i.imgur.com/irbru.jpg',
    'http://i.imgur.com/iw6dG.jpg',
    'http://i.imgur.com/iytCf.jpg',
    'http://i.imgur.com/jPaI5.jpg',
    'http://i.imgur.com/jUszV.png',
    'http://i.imgur.com/jgIBL.jpg',
    'http://i.imgur.com/jlRpR.jpg',
    'http://i.imgur.com/jm7Wq.jpg',
    'http://i.imgur.com/k8Fdb.jpg',
    'http://i.imgur.com/kCJqj.jpg',
    'http://i.imgur.com/kHAHX.jpg',
    'http://i.imgur.com/kOq9P.jpg',
    'http://i.imgur.com/kmib1.png',
    'http://i.imgur.com/koTN4.jpg',
    'http://i.imgur.com/ksMmT.jpg',
    'http://i.imgur.com/l0pZ4.jpg',
    'http://i.imgur.com/lMrnX.jpg',
    'http://i.imgur.com/lbP6a.jpg',
    'http://i.imgur.com/lg2xV.jpg',
    'http://i.imgur.com/lmbqF.jpg',
    'http://i.imgur.com/mHrbh.jpg',
    'http://i.imgur.com/mYwn1.jpg',
    'http://i.imgur.com/mfXnU.jpg',
    'http://i.imgur.com/mlVLQ.jpg',
    'http://i.imgur.com/nCa3j.jpg',
    'http://i.imgur.com/nPHQH.jpg',
    'http://i.imgur.com/nUWzI.jpg',
    'http://i.imgur.com/nnLh0.jpg',
    'http://i.imgur.com/nnXj9.jpg',
    'http://i.imgur.com/o3zex.jpg',
    'http://i.imgur.com/oINsU.jpg',
    'http://i.imgur.com/oIr4i.jpg',
    'http://i.imgur.com/oUhai.png',
    'http://i.imgur.com/oZmmd.jpg',
    'http://i.imgur.com/obmq3.jpg',
    'http://i.imgur.com/oqIvc.jpg',
    'http://i.imgur.com/or2d3.jpg',
    'http://i.imgur.com/p6MTy.jpg',
    'http://i.imgur.com/pArGg.jpg',
    'http://i.imgur.com/pF9G8.jpg',
    'http://i.imgur.com/pYTsF.jpg',
    'http://i.imgur.com/pbdt7.jpg',
    'http://i.imgur.com/poJPc.jpg',
    'http://i.imgur.com/ptuH9.jpg',
    'http://i.imgur.com/pvSuJ.jpg',
    'http://i.imgur.com/qSVGs.jpg',
    'http://i.imgur.com/qWk65.jpg',
    'http://i.imgur.com/qZSL8.jpg',
    'http://i.imgur.com/qhC5J.jpg',
    'http://i.imgur.com/qiSqH.jpg',
    'http://i.imgur.com/qowM8.jpg',
    'http://i.imgur.com/qu1XL.png',
    'http://i.imgur.com/r1tBm.png',
    'http://i.imgur.com/r4ofa.jpg',
    'http://i.imgur.com/rAcvN.png',
    'http://i.imgur.com/rEldQ.png',
    'http://i.imgur.com/rJH7H.png',
    'http://i.imgur.com/rPkBn.jpg',
    'http://i.imgur.com/rVf63.png',
    'http://i.imgur.com/rbZgA.jpg',
    'http://i.imgur.com/rfchZ.png',
    'http://i.imgur.com/ri5PT.jpg',
    'http://i.imgur.com/rl5i6.jpg',
    'http://i.imgur.com/s7FFW.jpg',
    'http://i.imgur.com/sEr4A.jpg',
    'http://i.imgur.com/sPeVG.jpg',
    'http://i.imgur.com/sWTY2.jpg',
    'http://i.imgur.com/sXdhP.jpg',
    'http://i.imgur.com/sqSHZ.jpg',
    'http://i.imgur.com/srfOs.jpg',
    'http://i.imgur.com/stJRz.jpg',
    'http://i.imgur.com/t3ibg.jpg',
    'http://i.imgur.com/t7rLb.jpg',
    'http://i.imgur.com/t9OJf.jpg',
    'http://i.imgur.com/tFEmP.jpg',
    'http://i.imgur.com/tLcaY.jpg',
    'http://i.imgur.com/tRDqh.jpg',
    'http://i.imgur.com/tma88.jpg',
    'http://i.imgur.com/turBE.png',
    'http://i.imgur.com/twZzc.jpg',
    'http://i.imgur.com/u4aBp.jpg',
    'http://i.imgur.com/uNPAp.jpg',
    'http://i.imgur.com/uOXxK.jpg',
    'http://i.imgur.com/uWJ4v.jpg',
    'http://i.imgur.com/uWjbg.jpg',
    'http://i.imgur.com/uiNm4.jpg',
    'http://i.imgur.com/vBENk.jpg',
    'http://i.imgur.com/veXgt.png',
    'http://i.imgur.com/voPsl.jpg',
    'http://i.imgur.com/w02wt.jpg',
    'http://i.imgur.com/w4uOw.jpg',
    'http://i.imgur.com/wISmO.jpg',
    'http://i.imgur.com/wKcXO.jpg',
    'http://i.imgur.com/wQHKg.jpg',
    'http://i.imgur.com/wV6a4.jpg',
    'http://i.imgur.com/wdsTr.jpg',
    'http://i.imgur.com/wjjCl.jpg',
    'http://i.imgur.com/x8QJ7.jpg',
    'http://i.imgur.com/xJJtA.jpg',
    'http://i.imgur.com/xP2mD.jpg',
    'http://i.imgur.com/xVCGW.jpg',
    'http://i.imgur.com/xYhZA.png',
    'http://i.imgur.com/xdGfx.jpg',
    'http://i.imgur.com/xqKMf.png',
    'http://i.imgur.com/xxehS.jpg',
    'http://i.imgur.com/y7Hm9.jpg',
    'http://i.imgur.com/yAxd9.jpg',
    'http://i.imgur.com/yUTLJ.jpg',
    'http://i.imgur.com/yWEb8.jpg',
    'http://i.imgur.com/yWFfI.jpg',
    'http://i.imgur.com/ybssQ.jpg',
    'http://i.imgur.com/ypDgD.jpg',
    'http://i.imgur.com/yu0CE.png',
    'http://i.imgur.com/z0xwr.jpg',
    'http://i.imgur.com/zK19w.jpg',
    'http://i.imgur.com/zOAlk.jpg',
    'http://i.imgur.com/zRg1I.png',
    'http://i.imgur.com/zVFA3.jpg',
    'http://i.imgur.com/zYyfs.jpg',
    'http://i.imgur.com/zeJYW.jpg',
    'http://i.qkme.me/3ofwpz.jpg',
    'http://i13.photobucket.com/albums/a278/tsunami_hj/nerdsnuggle.jpg',
    'http://i2.kym-cdn.com/photos/images/original/000/222/508/1295287513-clever-girl.jpg',
    'http://i742.photobucket.com/albums/xx62/kaze_ro/entrapment.jpg',
    'http://imgshare.etsycorp.com/ahashim/hc-0drlz0fm04kwc.png',
    'http://i.imgur.com/KjHax.jpg',
    'http://i.imgur.com/prQ5S.jpg',
    'http://leclownlyrique.files.wordpress.com/2011/01/danny-lyon-manhattan-bridge-tower-in-brooklyn-new-york-city-framed-through-nearby-buildings-1974.jpg',
    'http://media.blogcdn.com/www.comicsalliance.com/media/2011/10/623636809642b8d0c072o.jpg',
    'http://media.laweekly.com/7931915.0.jpg',
    'http://media.tumblr.com/tumblr_lbr4xtrsXS1qbd1bl.png',
    'http://media.tumblr.com/tumblr_lc46n98bXx1qad7to.png',
    'http://media.tumblr.com/tumblr_lkebktJcrS1qc7h4n.png',
    'http://media.tumblr.com/tumblr_llsadfzmyY1qa9f3s.png',
    'http://media.tumblr.com/tumblr_lwb9nyl3JK1qbpd8m.png',
    'http://media.tumblr.com/tumblr_m017dp4sNY1qzkmqd.jpg',
    'http://minnesotansforglobalwarming.com/m4gw/ScientistsAgree.jpg',
    'http://msmagazine.com/blog/files/2010/08/Cathy-Comic1.jpg',
    'http://oi51.tinypic.com/29ks56h.jpg',
    'http://overcompensating.com/comics/20100412.png',
    'http://photos.magbooth.com/New-York/NYC-2010-12-16-Etsy/1049-PM/1129075586_Uzsj7-O.jpg',
    'http://s3.amazonaws.com/kym-assets/photos/images/original/000/116/112/1303428650627.jpg',
    'http://skins13.wincustomize.com/19/65/1965538/32/2763/preview-32-2763.jpg',
    'http://static.fjcdn.com/pictures/Guys_d5bb8d_992278.jpg',
    'http://static.themetapicture.com/media/funny-OK-guy-real-life.jpg',
    'http://upload.wikimedia.org/wikipedia/commons/6/68/Pheasant.jpg',
    'http://www.asianoffbeat.com/OddNews/japan-cool-shirts.jpg',
    'http://www.vh1.com/celebrity/bwe/images/2009/08/dipping-bird-reprise.jpg',
    'http://www.etsy.com/storque/media/articles/2011/03/12471-collectors_tins_small.jpg',
    'http://www.moneyandshit.com/wp-content/uploads/2011/04/wat.jpg',
    'http://pbfcomics.com/archive_b/PBF055-Dinosaur_Meteors.jpg',
    'http://www.playahata.com/images/otherpics/pimpmygolfcart.jpg',
    'http://www.topnews.in/files/putin_0.jpg'
  ];


  send_to_chat(images[Math.floor(Math.random()*images.length)]);
}

function hug(text) {
  user = text.split(" ")[1];
  console.log("Hugging " + user);

  if (hugs[user] === undefined) {
    hugs[user] = 0;
    console.log("Creating hugspace for  " + user);
  }

  hugs[user]++;

  options = {
    hostname: 'confhu.gs',
    port: 80,
    path: '/recv.php',
    method: 'GET',
  }

  var request = http.request(options, function(response) {
    // cool!    
    console.log("Got response from confhu.gs", response);
  });

  send_to_chat("Sent hug to confhu.gs! " + user + " now has " + hugs[user] + " hugs.");
}
