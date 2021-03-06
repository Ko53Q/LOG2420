
/*-------------------------Variables et constantes--------------------*/
const modalOrderBtn = document.querySelector('.order-btn');
const modalOrderBg = document.querySelector('.order-modal-bg');
const modalOrderClose = document.querySelector('.order-btn-close');

const modalNewsBg = document.querySelector('.news-modal-bg');
const modalNewsClose = document.querySelector('.news-btn-close');

const modalCleaningBg = document.querySelector('.nettoyage-modal-bg');
const modalCleaningClose = document.querySelector('.nettoyage-btn-close');



/*---------------------------News Modal---------------------------------*/
document.getElementById("text-clickable").onclick = function () {
  modalNewsBg.classList.add('news-modal-bg-active');
}

modalNewsClose.addEventListener('click', function () {
  modalNewsBg.classList.remove('news-modal-bg-active');
})


/*--------------------------Order modal-------------------------------*/
/*Pour ouvrir le modal order en appuyant sur le bouton commander*/
modalOrderBtn.addEventListener('click', function () {
  modalOrderBg.classList.add('order-modal-bg-active');
})

/*Pour fermer le modal order en appuyant sur l'icon X*/
modalOrderClose.addEventListener('click', function () {
  modalOrderBg.classList.remove('order-modal-bg-active');
})

/*---------------------------Cleaning Modal---------------------------------*/
document.getElementById("title-clickable").onclick = function () {
  modalCleaningBg.classList.add('nettoyage-modal-bg-active');
}

modalCleaningClose.addEventListener('click', function () {
  modalCleaningBg.classList.remove('nettoyage-modal-bg-active');
})


/*--------------------------Order counter list-------------------------*/
/*Incrémenter le compteur dans la section Commande du matériel*/
function incrementCounter(id) {
  let value = document.getElementById(id).value;
  if (value >= 0) //Evite d'afficher des valeurs négatives
    document.getElementById(id).value = ++value;
  else
    document.getElementById(id).value = 0;

}

/*Décrémenter le compteur dans la section Commande du matériel*/
function decrementCounter(id) {
  let value = document.getElementById(id).value;
  if (value > 0) //Evite d'afficher des valeurs négatives
    document.getElementById(id).value = --value;
  else
    document.getElementById(id).value = 0;
}

/*Sauvegarder les données de la commande dans un JSON*/
function confirmOrder(event) {
  let items = [];                                         //Clear array on every new order
  event.preventDefault();                                 //Prevent the page from reloading on form submission

  let item = {
    savon: document.getElementById('first-counter').value,
    guenilles: document.getElementById('second-counter').value,
    desodorisant: document.getElementById('third-counter').value,
    ampoules: document.getElementById('fourth-counter').value,
    autres: document.getElementById('box-comment').value
  }
  items.push(item);                                       //Store item into array
  document.forms[0].reset();                              //Reset input box values to 0

  sessionStorage.setItem("Order", JSON.stringify(items)); //Save to session storage

  displayOrder();                                         //Call displayOrder() to show order confirmation on modal box
}

/*Afficher la valeur de chaque compteur et afficher dans la modale*/
function displayOrder() {
  document.getElementById("savon").innerHTML = "";
  document.getElementById("guenille").innerHTML = "";
  document.getElementById("desodorisant").innerHTML = "";
  document.getElementById("ampoules").innerHTML = "";
  document.getElementById("autres").innerHTML = "";

  let object = JSON.parse(sessionStorage.getItem("Order"));
  let order = object[0];

  if (order.savon != 0)
    document.getElementById("savon").innerHTML = order.savon + " litre(s) de savon";

  if (order.guenilles != 0)
    document.getElementById("guenille").innerHTML = order.guenilles + " guénille(s)";

  if (order.desodorisant != 0)
    document.getElementById("desodorisant").innerHTML = order.desodorisant + " désodorisant(s)";

  if (order.ampoules != 0)
    document.getElementById("ampoules").innerHTML = order.ampoules + " ampoule(s)";

  if (order.autres != 0)
    document.getElementById("autres").innerHTML = "Autres : " + order.autres;
}


/*Copier l'adresse courriel et afficher popup*/
function CopyToClipboard(value, iteration) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(value).select();
  document.execCommand("copy");
  $temp.remove();

  var notificationTag = $("div.copy-notification");
  notificationTag = $("<div/>", { "class": "copy-notification", text: "Adresse copiée" });
  $(".list-employees").eq(iteration).append(notificationTag); /*Changer la valeur de 'iteration' pour l'iteration dans le bottin du JSON .. marche slmt si id dans html*/

  notificationTag.fadeIn("slow", function () {
    setTimeout(function () {
      notificationTag.fadeOut("slow", function () {
        notificationTag.remove();
      });
    }, 1000);
  });
}
