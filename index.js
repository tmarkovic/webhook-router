const yaml = require("js-yaml");
const path = require("path");
const { readConfig } = require("./utils");
const SmeeClient = require("smee-client");
const onDeath = require("death");

const configFile =
  process.env.WEBHOOK_CONFIG || path.join("etc", "webhooks", "config.yaml");

(async () => {
  const config = yaml.safeLoad(readConfig(configFile));
  var clients = [];
  config.forEach(el => {
    console.info("Configuring: " + el.name);
    el.sources.forEach(source => {
      el.targets.forEach(target => {
        const client = new SmeeClient({ source, target });
        const events = client.start();
        clients.push(events);
      });
    });
  });
  onDeath(signal => {
    console.log("Received signal: " + signal + ". Terminating...");
    clients.forEach(client => {
      client.close();
    });
    process.exit();
  });
})();
