
//aktalizace defaultnich hodnot pri nacteni stranky
window.addEventListener('load', () => {
   let pocatecniCastka = 0;  
   document.getElementById("castka").innerHTML=`${pocatecniCastka}`
});

//funkce, ktera nam vypisuje v dokumentu finalni cenu
function vypisVyslednouCenu(){
   let finalMnozstviKrmiva = calcMnozstviKrmiva();
   let finalKvalita = calcKvalita();
   let konecnaCena = finalKvalita;
   document.getElementById("castka").innerHTML=konecnaCena;
   return konecnaCena;
};

function calcMnozstviKrmiva(){
   let cena = parseInt(document.objednavka_krmiva.vyber_krmiva.value);
   let kg = parseInt(document.objednavka_krmiva.pocet.value);
   let cenaMnozstviKrmiva = cena * kg;
   return cenaMnozstviKrmiva;
};

function calcKvalita(){
   let predchoziCena = calcMnozstviKrmiva();
   let kvalitaKrmiva1 = 0;
   let kvalitaKrmiva2 = 0;
   let kvalitaKrmiva3 = 0;
   let kvalitaKrmiva4 = 0;
   let priplatekOdvoz = 0;
   if (document.objednavka_krmiva.kvalita[0].checked){
      kvalitaKrmiva1 = calcMnozstviKrmiva() * (0.3);
   }
   if (document.objednavka_krmiva.kvalita[1].checked){
      kvalitaKrmiva2 = calcMnozstviKrmiva() * (0.5);
   }
   if (document.objednavka_krmiva.kvalita[2].checked){
      kvalitaKrmiva3 = (calcMnozstviKrmiva() * (0.15))*(-1);
   }
   if (document.objednavka_krmiva.kvalita[3].checked){
      kvalitaKrmiva4 = 500;
   }
   let novaCena = predchoziCena + kvalitaKrmiva1 + kvalitaKrmiva2 + kvalitaKrmiva3 + kvalitaKrmiva4;
   
   if(document.objednavka_krmiva.odvoz[1].checked){  
      priplatekOdvoz = novaCena * 0.1;
   }
   else if(document.objednavka_krmiva.odvoz[2].checked){
      priplatekOdvoz = 250;
   }
   let cenaOdvozKvalita = novaCena + priplatekOdvoz ;
   return cenaOdvozKvalita;
};

function odpovedKontrola(){
   let celkoveNaklady = vypisVyslednouCenu();
   let rozpocetKlienta = parseInt(document.form_odpoved.odpoved.value);
   if(rozpocetKlienta >= celkoveNaklady){
      document.querySelector('#ans').classList.add('green');
      document.querySelector('#ans').classList.remove('red');
      document.getElementById("ans").innerHTML=" Na nákup Vám to stačí";
   } else {
      document.querySelector('#ans').classList.add('red');
      document.querySelector('#ans').classList.remove('green');
      document.getElementById("ans").innerHTML=" Tato částka nestačí";
   }
};
//overeni email
function hlidac(){
   with(event)
   if (keyCode < 48 || (keyCode > 57 && keyCode < 65) || (keyCode > 90 && keyCode < 97) || keyCode > 122)
   returnValue=false;
}

