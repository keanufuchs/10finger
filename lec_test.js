// Rufe den Wert von texte ab
const texte = document.currentScript.getAttribute("data-texte");
document.querySelector(`script[data-texte="${texte}"]`).remove();


function escrit_inicial()
{
	if (document.all) document.all.clock.innerHTML=texte_colors;
	else
	{
		if (document.getElementById)
		{
			document.getElementById("clock").innerHTML=texte_colors;
		}
	}
}

function encripta(Str_Message)
{
	Len_Str_Message=Str_Message.length;
	Str_Encrypted_Message="";
	for (Position = 0 ; Position<Len_Str_Message ; Position++)
	{
		Byte_To_Be_Encrypted = Str_Message.substring(Position, Position+1);
		Ascii_Num_Byte = 999-Str_Message.charCodeAt(Position);
		Str_Encrypted_Message=Str_Encrypted_Message+Ascii_Num_Byte;
	} 
	return(Str_Encrypted_Message);
}

function calcula_checksum(Str_Message)
{
	longitud=Str_Message.length;
	suma=0;
	for (Position = 0 ; Position<longitud ; Position++)
	{
		codi = Str_Message.substring(Position, Position+1);
		suma = suma+Str_Message.charCodeAt(Position);
	} 
	cadena=""+suma;
	return(cadena);
}

function analitza_resultat_test(errors)
{
	var perrors;
	var segons=hora_fi-hora_inici;
	var canvi_de_dia=0;

	if (errors<0) errors=0;

	if (segons<1)
	{
		segons=segons+86400;
		errors=longitud;
		canvi_de_dia=1;
	}

	if (canvi_de_dia==0)
	{
		if (hora_fi<hores[8]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[7]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[6]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[5]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[4]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[3]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[2]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[1]) { segons=segons+300; errors=errors+99; }
		if (hora_fi<hores[0]) { segons=segons+300; errors=errors+99; }
		if (hores[8]<hores[7]) { segons=segons+300; errors=errors+99; }
		if (hores[7]<hores[6]) { segons=segons+300; errors=errors+99; }
		if (hores[6]<hores[5]) { segons=segons+300; errors=errors+99; }
		if (hores[5]<hores[4]) { segons=segons+300; errors=errors+99; }
		if (hores[4]<hores[3]) { segons=segons+300; errors=errors+99; }
		if (hores[3]<hores[2]) { segons=segons+300; errors=errors+99; }
		if (hores[2]<hores[1]) { segons=segons+300; errors=errors+99; }
		if (hores[1]<hores[0]) { segons=segons+300; errors=errors+99; }
		if (hores[0]<hora_inici) { segons=segons+300; errors=errors+99; }
	}

	perrors=round(errors*100/longitud);

	variables_a_encriptar="x="+errors+"&l="+longitud+"&s="+segons+"&h="+hora_servidor+"&";
	variables_encriptades=encripta(variables_a_encriptar);
	checksum=calcula_checksum(variables_encriptades);
	location="fi_test.php?v="+variables_encriptades+"&w="+checksum+"&";
}

function analitza_resultat_lec(errors)
{

	var segons=hora_fi-hora_inici;

	if (errors<0) errors=0;
	if (segons<1) { segons=segons+86400; errors=99; }

	variables_a_encriptar="n="+nom_usuario+"&e="+emailusuario+"&t="+teclado+"&x="+errors+"&l="+longitud+"&s="+segons+"&f="+leccion+"&";
	variables_encriptades=encripta(variables_a_encriptar);
	location="fi_leccion.php?v="+variables_encriptades;
}

function CheckKey(event)
{
	if (plataforma!="win")
	{
		tecla_marcada=event.keyCode || event.which;
		if (tecla_marcada==16)
		{
			vigila=1;
		}
		tecla_anterior=tecla_marcada;
	}
}

function Comprova_ok(event)
{
	if (plataforma=="win")
	{
		var valor_tecla_event;
		var tecla;

		valor_tecla_event= event.keyCode || event.which;

		tecla=String.fromCharCode(valor_tecla_event);

		if (punter==0) hora_inici=CalculaHora(hora_inici);

		if (texte.substr(punter,4)=="<br>")
		{
			if ( (valor_tecla_event != 13) && (valor_tecla_event != 32) )
			{
				errors=errors+1;
			}
			else
			{
				hores[linia]=CalculaHora(hores[linia]);
				linia=linia+1;
				punter=punter+4;
				if(texte.substring(cursor_pos_color+num_salt_ini,cursor_pos_color+num_salt_ini+4)=='<br>')
				{
					num_salt=num_salt_ini+3;
				}
				else
				{
					if (num_salt>num_salt_ini) num_salt--;
					final_linea=0;
					num_salt=num_salt_ini;
				}
				cursor_pos_color=punter;
				inici_text_no_marcat=texte.substring(0,cursor_pos_color);
				text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
				fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
				if ( (text_marcat=='g') || (text_marcat=='q') ) 
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat_no_subr">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				else
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				if (document.all) document.all.clock.innerHTML=texte_colors;
				else 
				{
					if (document.getElementById)
					{
						document.getElementById("clock").innerHTML=texte_colors;
					}
				}
			}
		}
		else
		{
			if (tecla!=texte.substr(punter,1))
			{
				errors=errors+1;
			}
			else
			{
				punter=punter+1;
				if(texte.substring(cursor_pos_color+num_salt_ini,cursor_pos_color+num_salt_ini+4)=='<br>')
				{	
					num_salt=num_salt_ini+3;
					final_linea=1;
				}
				else
				{
					if (final_linea==1)
					{
						if(num_salt>4) num_salt--;
					}
					else
					{
						if(num_salt>num_salt_ini) num_salt--;
					}
				}
				cursor_pos_color=punter;
				inici_text_no_marcat=texte.substring(0,cursor_pos_color);
				text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
				fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
				if ( (text_marcat=='g') || (text_marcat=='q') ) 
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat_no_subr">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				else
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				if (document.all) 
				{
					document.all.clock.innerHTML=texte_colors;
				}
				else 
				{
					if (document.getElementById)
					{
						document.getElementById("clock").innerHTML=texte_colors;
					}
				}
			}
		}
		if (longitud==punter) 
		{
			hora_fi=CalculaHora(hora_fi);
//			analitza_resultat(errors);
			if (es_una_lec==0) analitza_resultat_test(errors);
			else analitza_resultat_lec(errors);
		}
	}
}

function Fer_en_funcio_de_SO(a,event)
{
	if (plataforma=="win")
	{
		text_ok=texte.substr(0,punter);
		return (text_ok.replace(/<br>/g,String.fromCharCode(10)));
	}
	else
	{
		var tecla;
		var valor_tecla_event;

		jaheaixecat=1;

		valor_tecla_event= event.keyCode || event.which;

		// caps lock
		if (valor_tecla_event==20) {a=a.substr(0,contador_real); return(a);}

		// back space
		if (valor_tecla_event==8) {a=valor_anterior.substr(0,contador_real+1); return(a);}

		// intro
		if (valor_tecla_event==13) tecla=String.fromCharCode(valor_tecla_event);
		else tecla=a.substr(contador_real,1);
		
		if (punter==0) hora_inici=CalculaHora(hora_inici)

		if (plataforma=="mac")
		{
			if (ojo_accent_mac==1)
			{
				ojo_accent_mac=0;
				if ((a.length)>tamany_textarea) 
				{
					a=a.substr(0,contador_real);
					errors++;
					return(a);
				}
			}
			if ((tecla=='`') || (tecla=='\xB4') || (tecla=='\xA8') || (tecla=='^') || (tecla=='~'))
			{
				pppp=texte.substr(punter,1);
				if (pppp!=tecla) // entrar� nom�s en cas d'error. Per resoldre el cas de leccionus45 que ha de clicar ^ sense vocal
				{
					tamany_textarea=a.length;
					a=a.substr(0,contador_real)+tecla;
					ojo_accent_mac=1;
					return(a);
				}
			}
		}

		if (texte.substr(punter,4)=="<br>")
		{
			primer_caracter_linia=1;
			if (tecla=" ") valor_tecla_event=32; //necessari per un bug a LG amb IE
			if ( (valor_tecla_event != 13) && (valor_tecla_event != 32) )
			{
				if (vigila!=1)
				{
					//if (tecla!="") �s necessari per un bug a LG amb IE
					if (tecla!="") errors=errors+1;
				}
				a=a.substr(0,contador_real);
				vigila=0;
			}
			else
			{
				if (valor_tecla_event == 32)
				{
					a=a.substr(0,contador_real)+String.fromCharCode(13);
				}

				hores[linia]=CalculaHora(hores[linia]);
				linia=linia+1;

				punter=punter+4;

				contador_real=contador_real+1;

				if (texte.substring(cursor_pos_color+num_salt_ini,cursor_pos_color+num_salt_ini+4)=='<br>')
				{
					num_salt=num_salt_ini+3;
				}
				else
				{
					if (num_salt>num_salt_ini) num_salt--;
					final_linea=0;
					num_salt=num_salt_ini;
				}

				cursor_pos_color=punter;
				inici_text_no_marcat=texte.substring(0,cursor_pos_color);
				text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
				fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
				if ( (text_marcat=='g') || (text_marcat=='q') )
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat_no_subr">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				else
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				if (document.all) document.all.clock.innerHTML=texte_colors;
				else 
				{
					if (document.getElementById)
					{
						document.getElementById("clock").innerHTML=texte_colors;
					}
				}
			}
		}
		else
		{
			if (tecla!=texte.substr(punter,1))
			{
				if (vigila!=1)
				{
					// he hagut de posar if ((tecla!="") && (primer_caracter_linia==0)) per un error (bug) android LG
					if ((tecla!="") && (primer_caracter_linia==0))
					{	
						errors=errors+1;
					}					
				}				
				a=a.substr(0,contador_real);
				vigila=0;
			}
			else
			{
				punter=punter+1
				contador_real=contador_real+1
				primer_caracter_linia=0;

				if(texte.substring(cursor_pos_color+num_salt_ini,cursor_pos_color+num_salt_ini+4)=='<br>')
				{	
					num_salt=num_salt_ini+3;
					final_linea=1;
				}
				else
				{
					if (final_linea==1)
					{
						if(num_salt>4) num_salt--;
					}
					else
					{
						if(num_salt>num_salt_ini) num_salt--;
					}
				}

				cursor_pos_color=punter;
				inici_text_no_marcat=texte.substring(0,cursor_pos_color);
				text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
				fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
				if ( (text_marcat=='g') || (text_marcat=='q') ) 
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat_no_subr">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				else
				{
					texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
				}
				if (document.all)
				{
					document.all.clock.innerHTML=texte_colors;
				}
				else 
				{
					if (document.getElementById)
					{
						document.getElementById("clock").innerHTML=texte_colors;
					}
				}
			}
		}

		if (longitud==punter) 
		{
			hora_fi=CalculaHora(hora_fi);
//			analitza_resultat(errors);
			if (es_una_lec==0) analitza_resultat_test(errors);
			else analitza_resultat_lec(errors);
		}
		valor_anterior=a;
		return(a);
	}

}

function round (n)
{
	n = Math.round(n * 100) / 100;
	n = (n + 0.001) + '';
	return n.substring(0, n.indexOf('.') + 3);
}

function CalculaHora(a)
{
	var d = new Date();
	a=d.getHours()*3600+d.getMinutes()*60+d.getSeconds();
	return(a);
}

function Calcula(Operacion)
{ 
	var Formu = Operacion.form;
	var Expresion = total + UltimaOperacion + Formu.display.value;
	UltimaOperacion = Operacion.value;
	total = eval(Expresion);
	Formu.display.value = total;
	NuevoNumero = true;
}

function Calcula_long_linia_max(text_a_escriure)
{ 
	var lgth = 0;
	var longest;
	
	arr=text_a_escriure.split("<br>");

	for(var i=0; i < arr.length; i++)
	{
		if(arr[i].length > lgth)
		{
			var lgth = arr[i].length;
			longest = arr[i];
		}      
	} 
	return (1+longest.length);
}

function d_tamany()
{
	if (tamano>1)
	{
		tamano=tamano-1;
		if (tamano==1) tamano_px="8px";
		else
		{
			if (tamano==2) tamano_px="10px";
			else
			{
				if (tamano==3) tamano_px="12px";
				else
				{
					if (tamano==4) tamano_px="15px";
					else
					{
						if (tamano==5) tamano_px="18px";
						else
						{
							if (tamano==6) tamano_px="21px";
							else
							{
								if (tamano==7) tamano_px="24px";
								else
								{
									if (tamano==8) tamano_px="28px";
								}
							}
						}
					}
				}
			}
		}
		
		if ( (text_marcat=='g') || (text_marcat=='q') )
		{
			texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat_no_subr">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
		}
		else
		{
			texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
		}
		if (document.all)
		{
			document.all.clock.innerHTML=texte_colors;
		}
		else 
		{
			if (document.getElementById)
			{
				document.getElementById("clock").innerHTML=texte_colors;
			}
		}
		document.getElementById('S1').style.fontSize=tamano_px;
	}
}
function a_tamany()
{
	if (tamano<8)
	{
		tamano=tamano+1;
		if (tamano==1) tamano_px="8px";
		else
		{
			if (tamano==2) tamano_px="10px";
			else
			{
				if (tamano==3) tamano_px="12px";
				else
				{
					if (tamano==4) tamano_px="15px";
					else
					{
						if (tamano==5) tamano_px="18px";
						else
						{
							if (tamano==6) tamano_px="21px";
							else
							{
								if (tamano==7) tamano_px="24px";
								else
								{
									if (tamano==8) tamano_px="28px";
								}
							}
						}
					}
				}
			}
		}

		if ( (text_marcat=='g') || (text_marcat=='q') )
		{
			texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat_no_subr">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
		}
		else
		{
			texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
		}
		if (document.all) document.all.clock.innerHTML=texte_colors;
		else 
		{
			if (document.getElementById)
			{
				document.getElementById("clock").innerHTML=texte_colors;
			}
		}
		document.getElementById('S1').style.fontSize=tamano_px;
	}
}

// funci� per a que funcioni amb navegador "Edge" (windows 10)
function moveCaretToEnd(el)
{
	if (typeof el.selectionStart == "number")
	{
		el.selectionStart = el.selectionEnd = el.value.length;
	}
	else if (typeof el.createTextRange != "undefined")
	{
		el.focus();
		var range = el.createTextRange();
		range.collapse(false);
		range.select();
	}
}

var total=0;
var UltimaOperacion="+";
var NuevoNumero=true;
var punter=0;
var contador_real=0;
var num_salt_ini=1;
var num_salt=num_salt_ini;
var errors=0;
var perrors=0;
var longitud=0;

var hora_inici;
var hora_fi;
var text_marcat;
var cursor_pos_color=0;
var texte_colors;
var tamano=5;
var tamano_px="18px";

var final_linea=0;
var long_max=Calcula_long_linia_max(texte);
var num_files=texte.split("<br>").length;
var valor_anterior=""
var vigila=0
var posicio_cursor=0
var jaheaixecat=1;
var tecla_anterior;
var primer_caracter_linia=0;

var platform = window.navigator.platform.toLowerCase();
var plataforma;
var navegador=window.navigator.userAgent.toLowerCase();

var linia=0;
var hores=new Array(0,0,0,0,0,0,0,0,0);


////// incorporat per les proves mac
var ojo_accent_mac=0;
var tamany_textarea;

/////////////////////////
var es_una_lec=0;
var text_url = (document.URL).toLowerCase();
var mira_si_test=text_url.indexOf("test.php");
if ( mira_si_test==(-1)) es_una_lec=1;
/////////////////////////

// valors coneguts de platform: win32, macintel (gio), macppc (antic), ipad, linux* (android)
// considero tractament de ipad igual que per windows (funciona b�)
if (platform.indexOf('win') != -1) plataforma='win';
else 
{
	if (platform.indexOf('mac') != -1) plataforma='mac';
	else
	{
		if (platform.indexOf('linux') != -1) plataforma='linux';
		else plataforma='win';
	}
}

// per a que funcioni windows edge (per windows 10))
if (navegador.indexOf('edge/') != -1) plataforma="edge";

if (screen.width>1275) tamano=6;	// ok provat per 1280 de resolucio
else
{
	if (screen.width > 800) tamano=5;	//portatil senzill
	else
	{
		if (screen.width > 730) tamano=4;  //ipad vertical
		else
		{
			if (screen.width > 500) tamano=3;	//s4 mini horitzontal
			else
			{
				if (screen.width > 400) tamano=2;	//young2 horitzontal
				else tamano=1;		// mobil vertical
			}
		}
	}
}

if (tamano==6) tamano_px='21px';
else
{
	if (tamano==5) tamano_px='18px';
	else
	{
		if (tamano==4) tamano_px="15px";
		else
		{
			if (tamano==3) tamano_px="12px";
			else
			{
				if (tamano==2) tamano_px="10px";
				else tamano_px="8px";
			}
		}
	}
}

longitud=texte.length;

inici_text_no_marcat=texte.substring(0,cursor_pos_color-1);
text_marcat=texte.substring(cursor_pos_color, cursor_pos_color+num_salt);
fi_text_no_marcat=texte.substring(cursor_pos_color+num_salt,longitud);
if ( (text_marcat=='g') || (text_marcat=='q') ) 
{
	texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat_no_subr">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
}
else
{
	texte_colors='<div id="text_a_escriure" style="font-size:'+tamano_px+';">'+inici_text_no_marcat+'<span class="textmarcat">'+text_marcat+'</span>'+fi_text_no_marcat+'</div>';
}