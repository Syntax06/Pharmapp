var medicaments = {};
var clients = {};
var fournisseurs = {};
var employes = {};
var name, name2, prenom, tel, entrepriseFournisseur, adressFournisseur, poste;
var quantite = quantite2 = 0;


/*************Fonctions****************/
/*Verifie que c'est un nombre*/
function isANumber(nb) {
    if (nb % 1 === 0 && nb > 0 && !isNaN(nb)) {
        return true;
    } else {
        window.alert("Le champ numérique comporte une erreur, recommencez svp.")
        return false;
    }
}
/**Verifie que c'est un texte */
function isAText(txt) {
    if (isNaN(txt) && txt !== "null") {
        return true;
    } else {
        window.alert("Un champ de texte comporte une erreur, recommencez svp.")
        return false;
    }
}
/**LOCAL STORAGE STOCK */
/**Recupere en local storage */
function getLs() {
    if (!window.localStorage.medicaments) {
        window.localStorage.setItem("medicaments", "");
    } else {
        medicaments = JSON.parse(window.localStorage.getItem('medicaments'));
    }
}
/**Enregistre en local storage */
function saveLs() {
    window.localStorage.setItem('medicaments', JSON.stringify(medicaments));
}

/**LOCAL STORAGE CLIENTS**/
/**Recupere en local storage */
function getClientsLs() {
    if (!window.localStorage.clients) {
        window.localStorage.setItem("clients", "");
    } else {
        clients = JSON.parse(window.localStorage.getItem('clients'));
    }
}
/**Enregistre en local storage */
function saveClientLs() {
    window.localStorage.setItem('clients', JSON.stringify(clients));
}



/**Met à jour le stock medicament */
function majStock() {
    $(".jcp-remove").remove();
    for (var key in medicaments) {
        $("#ligne1").append("<tr class='jcp-remove'><td>" + key + "</td><td>" + medicaments[key] + "</td></tr>");
    }
}
/**Verifie que c'est un telephone */
function telephone(tel) {
    if (!isNaN(tel) && tel.length == 10) {
        return true;
    } else {
        window.alert('Le téléphone n\'est pas bon');
        return false;
    }
}
/**Modification produit */
function modificationStock(name, nb) {
    medicaments[name] = nb;
}
/* Livraison produit*/
function livraisonStock(name, nb) {
    medicaments[name] += nb;
}
/**Suppression stock */
function supprStock(name) {
    delete medicaments[name];
}

/**Constructor client */
function Client(prenom, tel) {
    this.prenom = prenom;
    this.tel = tel;
}

/*Constructor fournisseur */
function Fournisseur(entreprise, adress) {
    this.entreprise = entreprise;
    this.adress = adress;
}

/**Constructor Employe */
function Employe(prenom, poste) {
    this.prenom = prenom;
    this.poste = poste;
}
/****************JQUERY******************/
$(document).ready(function () {
    getLs();
    getClientsLs();
    majStock();
    majClients();

    /**************************DECO NAVIGATION***************************/
    $(".jcp-hide").hide();
    $(".jcp-hide").mouseover(function () {
        $(this).css({ "text-decoration": "none" });
    });
    $(".jcp-menu").mouseover(function () {
        $(this).css({ "background-color": "#88c250", "color": "white" });
    });
    $(".jcp-menu").mouseleave(function () {
        $(this).css({ "background-color": "white", "color": " #12263f" });
    });
    $(".jcp-sous-menu1").mouseover(function () {
        $(this).css({ "background-color": "grey", "color": "white" });
        $(".jcp-menu1").css({ "background-color": "#88c250", "color": "white" });
    });
    $(".jcp-sous-menu1").mouseleave(function () {
        $(this).css({ "background-color": "white", "color": " #12263f" });
        $(".jcp-menu1").css({ "background-color": "white", "color": " #12263f" });
    });
    $(".jcp-sous-menu2").mouseover(function () {
        $(this).css({ "background-color": "grey", "color": "white" });
        $(".jcp-menu2").css({ "background-color": "#88c250", "color": "white" });
    });
    $(".jcp-sous-menu2").mouseleave(function () {
        $(this).css({ "background-color": "white", "color": " #12263f" });
        $(".jcp-menu2").css({ "background-color": "white", "color": " #12263f" });
    });
    $(".jcp-sous-menu3").mouseover(function () {
        $(this).css({ "background-color": "grey", "color": "white" });
        $(".jcp-menu3").css({ "background-color": "#88c250", "color": "white" });
    });
    $(".jcp-sous-menu3").mouseleave(function () {
        $(this).css({ "background-color": "white", "color": " #12263f" });
        $(".jcp-menu3").css({ "background-color": "white", "color": " #12263f" });
    });
    $(".jcp-sous-menu4").mouseover(function () {
        $(this).css({ "background-color": "grey", "color": "white" });
        $(".jcp-menu4").css({ "background-color": "#88c250", "color": "white" });
    });
    $(".jcp-sous-menu4").mouseleave(function () {
        $(this).css({ "background-color": "white", "color": " #12263f" });
        $(".jcp-menu4").css({ "background-color": "white", "color": " #12263f" });
    });
    $(".jcp-menu1").click(function () {
        $(".jcp-sous-menu1").slideToggle();
        $(".jcp-sous-menu2").slideUp();
        $(".jcp-sous-menu3").slideUp();
        $(".jcp-sous-menu4").slideUp();
    });
    $(".jcp-menu2").click(function () {
        $(".jcp-sous-menu2").slideToggle();
        $(".jcp-sous-menu1").slideUp();
        $(".jcp-sous-menu3").slideUp();
        $(".jcp-sous-menu4").slideUp();
    });
    $(".jcp-menu3").click(function () {
        $(".jcp-sous-menu3").slideToggle();
        $(".jcp-sous-menu2").slideUp();
        $(".jcp-sous-menu1").slideUp();
        $(".jcp-sous-menu4").slideUp();
    });
    $(".jcp-menu4").click(function () {
        $(".jcp-sous-menu4").slideToggle();
        $(".jcp-sous-menu2").slideUp();
        $(".jcp-sous-menu3").slideUp();
        $(".jcp-sous-menu1").slideUp();
    });


    /****VERIF INPUT FORMULAIRE****/
    $("input[type=text], textarea").focusout(function () {
        var val = $(this).val();
        if (val === "") {
            $(this).removeClass("jcp-normal").addClass("jcp-alert");

            $("#message").css({ "display": "block" })
        } else {
            $("#message").css({ "display": "none" });
            $(this).removeClass("jcp-alert").addClass("jcp-normal");
        }
    });

    /**********************PAGE STOCK************************/
    /*AJOUT STOCK*/
    $("form[name=formMedicament]").submit(function (e) {
        e.preventDefault();
        if ($("#name").val() !== "" && $("#quantiteMedic").val() !== "" && isAText($("#name").val()) && isANumber($("#quantiteMedic").val())) {
            name = $("#name").val();
            quantite = Number($("#quantiteMedic").val());
            let x = medicaments[name];

            if (medicaments[name]) {
                if (confirm(name + " existe déjà en stock, voulez-vous remplacer sa quantité de " + x + " par " + quantite + " ?")) {
                    medicaments[name] = quantite;
                }
            } else {
                medicaments[name] = quantite;
            }
            $(this).slideUp(function () {
                majStock();
                saveLs();
                $("#name").val("");
                $("#quantiteMedic").val("");
                $("#message2").fadeIn(function () {
                    $(this).fadeOut(4000, function () {
                        $("form[name=formMedicament]").slideDown();
                    });
                })


            });
        }
    });
    $(".jcp-hideModif").hide();
    $("#message2").hide();

    /* $("form[name=formMedicament]").submit(function (e) {
         e.preventDefault();
         if ($("#name").val() !== "" && $("#quantiteMedic").val() !== "" && isAText($("#name").val()) && isANumber($("#quantiteMedic").val())) {
             $(this).slideUp(function () {
                 name = $("#name").val();
                 quantite = Number($("#quantiteMedic").val());
                 console.log(name + " " + quantite);
                 medicaments[name] = quantite;
                 majStock();
                 saveLs();
                 $("#name").val("");
                 $("#quantiteMedic").val("");
                 
             });
         }
     });*/
    /**MODIFICATION STOCK */
    $("#modifStock").click(function () {
        $("form[name=formModif]").slideToggle();
        $("form[name=formSuppr]").slideUp();
    });
    $("form[name=formModif]").submit(function (e) {
        e.preventDefault();
        if ($("#nameModif").val() && isAText($("#nameModif").val())) {
            name2 = $("#nameModif").val();
            if (medicaments[name2]) {
                $("#formChange").slideDown();
                $("form[name=formChange]").submit(function (e) {
                    e.preventDefault();
                    if ($("#quantite2").val() && isANumber($("#quantite2").val())) {
                        quantite2 = Number($("#quantite2").val());
                        livraisonStock(name2, quantite2);
                        majStock();
                        saveLs();
                        $("#quantite2").val("");
                        $("#nameModif").val("");
                        $("form[name=formModif], form[name=formChange]").slideUp();
                    }
                });
                /*$("#livraison").click(function () {
                    livraisonStock(name, quantite2);
                    majStock();
                    $("#quantite2").val("");
                    $("form[name=formModif]").slideUp();
                });*/

            } else {
                $("form[name=formChange]").slideUp();
                window.alert("Ce medicament n'existe pas en stock.");
            }
        }
    });
    /**SUPPRESSION STOCK */
    $("#supprStock").click(function () {
        $("form[name=formSuppr]").slideToggle();
        $("form[name=formModif]").slideUp();
    });
    $("form[name=formSuppr]").submit(function (e) {
        e.preventDefault();
        if ($("#nameModif1").val() && isAText($("#nameModif1").val())) {
            name2 = $("#nameModif1").val();
            if (medicaments[name2]) {
                if (confirm("Confirmez-vous la suppression?")) {
                    supprStock(name2);
                    majStock();
                    saveLs();

                } else {
                    window.alert("Suppression annulée.");

                }

                /*$("#livraison").click(function () {
                    livraisonStock(name, quantite2);
                    majStock();
                    $("#quantite2").val("");
                    $("form[name=formModif]").slideUp();
                });*/
                $("#quantite2").val("");
                $("#nameModif").val("");
                $("#nameModif1").val("");
                $("form[name=formModif], form[name=formSuppr]").slideUp();


            } else {
                $("form[name=formChange]").slideUp();
                window.alert("Ce medicament n'existe pas en stock.");
            }
        }
    });

    /****************CAPTURE DES FORMULAIRES***************************** */



    /*Page Client */
    /**AJOUT CLIENT */
    $("form[name=formClient]").submit(function (e) {
        e.preventDefault();
        if ($("#nameclt").val() !== "" && $("#prenomclt").val() !== "" && $("#telclt").val() !== "" && isAText($("#nameclt").val()) && isAText($("#prenomclt").val()) && telephone($("#telclt").val())) {
            nameclt = $("#nameclt").val();
            prenom = $("#prenomclt").val();
            tel = $("#telclt").val();
            console.log(name + " " + prenom + " " + tel);
            /* if (clients[name].prenom && clients[name].tel) {
                 if (confirm(name + " est déjà enregistré, voulez-vous le modifier?")) {
 
                 }
             } else {
                 
             }*/
            clients[nameclt] = new Client(prenom, tel);
            majClients();
            saveClientLs();
            /*$("#name").val("");
            $("#prenom").val("");
            $("#tel").val("");*/

        }
    });
    function majClients() {

        $(".jcp-removeclt").remove();
        for (var key in clients) {
            $("#ligne2").append("<tr class='jcp-removeclt'><td>" + key + "</td><td>" + clients[key].prenom + "</td><td>" + clients[key].tel + "</td></tr>");
        }
    }
    /*Page Fournisseur*/
    $("form[name=formFournisseur]").submit(function (e) {
        e.preventDefault();
        if ($("#name").val() !== "" && $("#entrepriseFournisseur").val() !== "" && $("#adressFournisseur").val() !== "") {
            name = $("#name").val();
            entrepriseFournisseur = $("#entrepriseFournisseur").val();
            adressFournisseur = $("#adressFournisseur").val();
            console.log(name + " " + entrepriseFournisseur + " " + adressFournisseur);
            fournisseur[name] = new Fournisseur(entrepriseFournisseur, adressFournisseur);
            $("#name").val("");
            $("#entrepriseFournisseur").val("");
            $("#adressFournisseur").val("");
        }
    });
    /*Page employé */
    $("form[name=formEmploye]").submit(function (e) {
        e.preventDefault();
        if ($("#name").val() !== "" && $("#prenom").val() !== "" && $("#poste").val() !== "") {
            name = $("#name").val();
            prenom = $("#prenom").val();
            poste = $("#poste").val();
            console.log(name + " " + prenom + " " + poste);
            employe[name] = new Employe(prenom, poste);
            $("#name").val("");
            $("#prenom").val("");
            $("#poste").val("");

        }

    });


    /**RESPONSIVE */
    $("#burger").click(function () {
        $("li").slideToggle();
    });


    /* /message pharmaciens/*/
    $(".bulle").hide()
    $(".bulle2").hide()
    $(".jcp-speech").hide()

    $(".jcp-btn-speech").click(function () {
        $(".jcp-speech").fadeToggle(1000, function () {
            $(".bulle2").show("slow", function () {
                $(".bulle2").animate({ "width": "175px" }, 400, function () {
                    $(".bulle2").animate({ "width": "150px" }, 400, function () {
                        $(".bulle2").hide("slow")
                    });
                });
            });
        });
    });
    $(".pharmaco").mouseover(function () {
        $(".bulle").show("slow", function () {
            $(this).animate({ "width": "175px" }, 400, function () {
                $(this).animate({ "width": "150px" }, 400, function () {
                    $(this).animate({ "width": "175px" }, 400, function () {
                        $(this).animate({ "width": "150px" });
                    });
                });
            });
        });
    });

    $(".pharmaco").mouseleave(function () {
        $(".bulle").hide("fast", function () {
            let q = 1 + Math.floor(Math.random() * 10);
            $(".bulle").attr("src", "assets/parole" + q + ".png")
        });
    });


});




