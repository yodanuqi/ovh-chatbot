"use strict";

const { ButtonsMessage, Button, TextMessage } = require("../../../platforms/generics");
const Bluebird = require("bluebird");
const guides = require("../../../constants/guides").FR;

class DomainToHosting {
  static action(senderId, message, entities) {
    let responses = [new TextMessage(`Tu dois modifier la zone DNS de ton domaine afin d'y ajouter le champs A avec l'ip de ton hébergement web, cette ip se trouve sur la page d'informations de ton hébergement dans l'espace client OVH. Voici un guide pour modifier ta zone DNS grâce à l'espace client OVH: ${guides.modifDns}`)];

    if (Array.isArray(entities.url) && entities.url.length) {
      let url = encodeURIComponent(entities.url[0].value.replace(/https?:\/\//gi, ""));
      let buttons = [new Button("web_url", `https://www.ovh.com/manager/web/#/configuration/domain/${url}?tab=ZONE`, "Gérer la zone DNS")];

      responses.push(new ButtonsMessage("Tu peux modifier ta zone DNS via l'espace client OVH", buttons));
    }

    return Bluebird.resolve(responses);
  }
}

module.exports = { domain_to_hosting: DomainToHosting };