(function () {
  "use strict";

  var config = window.GCONT_SITE_CONFIG || {};
  var number = String(config.whatsappNumber || "").replace(/\D/g, "");
  var campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var campaign = {};

  document.querySelectorAll("[data-fiscal-product-name]").forEach(function (element) {
    element.textContent = config.fiscalProductName || "Solução fiscal";
  });

  var solutionField = document.querySelector('[data-whatsapp-form] [name="solucao"]');
  if (solutionField) {
    var requestedSolution = new URLSearchParams(window.location.search).get("solucao");
    var solutionMap = {
      demonstracao: "Demonstração das soluções",
      notasync: "Solução fiscal",
      "gcont-ia": "GCONT IA",
      "ponte-contabil": "Ponte Contábil",
      loja: "Loja de ferramentas"
    };
    if (requestedSolution && solutionMap[requestedSolution]) solutionField.value = solutionMap[requestedSolution];
  }

  try {
    var currentParams = new URLSearchParams(window.location.search);
    var savedCampaign = JSON.parse(window.sessionStorage.getItem("gcont-campaign") || "{}");
    campaign = savedCampaign && typeof savedCampaign === "object" ? savedCampaign : {};
    campaignKeys.forEach(function (key) {
      var value = currentParams.get(key);
      if (value) campaign[key] = value.slice(0, 120);
    });
    if (Object.keys(campaign).length) {
      window.sessionStorage.setItem("gcont-campaign", JSON.stringify(campaign));
    }
  } catch (error) {
    campaign = {};
  }

  function campaignSummary() {
    return campaignKeys.filter(function (key) { return campaign[key]; })
      .map(function (key) { return key.replace("utm_", "") + "=" + campaign[key]; })
      .join("; ");
  }

  function whatsappUrl(message) {
    var url = new URL("https://wa.me/" + number);
    var origin = campaignSummary();
    url.searchParams.set("text", message + (origin ? "\n\nOrigem do site: " + origin : ""));
    return url.toString();
  }

  function emitConversion(name, details) {
    window.dispatchEvent(new CustomEvent("gcont:conversion", {
      detail: Object.assign({ event: name, campaign: campaignSummary() || undefined }, details || {})
    }));
  }
  window.GCONTTrack = emitConversion;

  if (document.body && document.body.getAttribute("data-page") === "product") {
    emitConversion("product_view", { product: document.body.getAttribute("data-product") || "unknown" });
  }

  var menuButton = document.querySelector("[data-menu-toggle]");
  var primaryNav = document.getElementById("primary-nav");

  function closeMenu() {
    if (!menuButton || !primaryNav) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
    primaryNav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuButton && primaryNav) {
    menuButton.addEventListener("click", function () {
      var isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      primaryNav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 860) closeMenu();
    });
  }

  document.querySelectorAll("[data-whatsapp-message]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (!number) return;
      event.preventDefault();
      var destination = whatsappUrl(link.getAttribute("data-whatsapp-message") || "Olá! Gostaria de falar com a GCONT TECH.");
      emitConversion("whatsapp_click", { product: link.getAttribute("data-product") || "geral" });
      window.open(destination, "_blank", "noopener,noreferrer");
    });
  });

  document.querySelectorAll('a[href*="wa.me/"]:not([data-whatsapp-message])').forEach(function (link) {
    link.addEventListener("click", function () {
      emitConversion("whatsapp_click", { product: link.getAttribute("data-product") || "geral" });
    });
  });

  document.querySelectorAll("[data-track]").forEach(function (element) {
    if (element.hasAttribute("data-whatsapp-message")) return;
    element.addEventListener("click", function () {
      emitConversion(element.getAttribute("data-track"), {
        product: element.getAttribute("data-product") || "geral",
        target: element.getAttribute("href") || "button"
      });
    });
  });

  document.querySelectorAll("[data-whatsapp-form]").forEach(function (form) {
    var status = form.querySelector("[data-form-status]");
    var fallback = form.querySelector("[data-form-fallback]");
    var started = false;

    form.addEventListener("input", function () {
      if (!started) {
        started = true;
        emitConversion("form_start", { product: form.getAttribute("data-product") || "geral" });
      }
    }, { once: true });

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      if (String(data.get("website") || "").trim()) {
        if (status) status.textContent = "Não foi possível preparar a mensagem. Tente novamente ou fale pelo WhatsApp.";
        return;
      }

      var phone = String(data.get("whatsapp") || "").replace(/\D/g, "");
      if (phone.length < 10 || phone.length > 13) {
        var phoneField = form.querySelector('[name="whatsapp"]');
        phoneField.setCustomValidity("Informe um número com DDD.");
        phoneField.reportValidity();
        phoneField.addEventListener("input", function () { phoneField.setCustomValidity(""); }, { once: true });
        return;
      }

      var interest = String(data.get("solucao") || "Quero conhecer as soluções da GCONT TECH");
      var message = [
        "Olá! Gostaria de conversar com a GCONT TECH.",
        "Nome: " + String(data.get("nome") || "").trim(),
        "Empresa/escritório: " + String(data.get("empresa") || "").trim(),
        "E-mail: " + String(data.get("email") || "").trim(),
        "WhatsApp: " + String(data.get("whatsapp") || "").trim(),
        "Solução de interesse: " + interest
      ].join("\n");
      var destination = whatsappUrl(message);
      if (fallback) {
        fallback.href = destination;
        var fallbackWrap = fallback.closest("[data-form-fallback-wrap]");
        if (fallbackWrap) fallbackWrap.hidden = false;
      }
      if (status) status.textContent = "A mensagem está pronta para o WhatsApp. Revise os dados e toque em Enviar para concluir o contato.";
      emitConversion("whatsapp_message_prepared", { product: form.getAttribute("data-product") || interest });

      window.open(destination, "_blank", "noopener,noreferrer");
    });
  });
})();
