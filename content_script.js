const browserExtionsionId = chrome.runtime.id;
const scriptUrl = `chrome-extension://${browserExtionsionId}/minified-hundred/init.js`;



const examurl = window.location.href;
const examframe = document.createElement("iframe");
examframe.src = examurl;
examframe.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
`;

const handleMessage = (event) => {
  if (event.data === "proctorClientLoaded") {
    const iframe = document.querySelector("iframe");
    const body = iframe.contentWindow.document.body;
    body.appendChild(examframe);
  }
};
window.addEventListener("message", handleMessage);

document.body.innerHTML = "";

const iframe = document.createElement("iframe");
iframe.style.cssText = `
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

iframe.srcdoc = `
<html lang="en-us">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Proview</title>
  </head>
  <body style="height: 100vh;">
  <div style="position: relative;">
    <div id="buttonsContainer" style="position: fixed; top: 5px; right: 0;">
      <button id="showReferenceLinks" style="background-color: #4CAF50; color: white; border: none; border-radius: 10px; padding: 10px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); cursor: pointer;">
        Reference Links
      </button>
      <button id="stopProctoring" style="margin-left: 10px; background-color: #ff4d4d; color: white; border: none; border-radius: 10px; padding: 10px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); cursor: pointer;">
        Stop Proctoring
      </button>
      <div id="referenceLinks" style="position: absolute; top: 50px; right: 0px; background-color: white; color: black; border: none; border-radius: 10px; padding: 10px 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); cursor: pointer; display: none;">
        <h3>Reference Links</h3>
        <ul id="referenceLinksList">
        </ul>
      </div>
    </div>
  </div>
    <script type="text/javascript">
      (function(i, s, o, g, r, a, m) {
        i['TalviewProctor'] = r;
        i[r] = i[r] || function() {
          (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', '${scriptUrl}', 'tv');
      window.isProctored = true;
      tv('init', '7deb1e1b-3b3a-400a-9d14-48242bc7f566', {
         profileId: '232r2342',
        session: '2432423',
        sessionType: 'ai_proctor',
        skipHardwareTest: false,
        previewStyle: 'position: fixed; bottom:0px',
        screen: true,
        initCallback: function (err, uuid) {
            window.parent.postMessage('proctorClientLoaded', '*');
        },
      });
    </script>
  </body>
</html>`;

document.body.appendChild(iframe);
