# Weather-app

Weather-app je webová aplikace na předpověď počasí.

Předpověď na dnešní a zítřejší den je hodinová s grafy vývoje teplot (aktuální a pocitová) a předpovědí deště.

Spouští se souborem index.html, kde si můžete vybrat mezi vaší polohou či hledání v našeptávači.
Na stránce s předpovědí máte na výběr mezi dnešním dnem, zítřejším a předpovědí na 5 dní.
Vaši polohu či město, které jste vyhledali si můžete uložit a následně přepínat pomocí selektu s názvy měst nebo kliknutím na obrázek.

Podporované prohlížeče jsou Google Chrome, Mozilla Firefox, Microsoft Edge(nepodporuje geolokaci) (safari a ostatní jsem netestoval).

Obsah tabulek je vytvořený dynamicky pomocí javascript souborů ve složce js/content.
content.js je pár stručných funkcí na vytvoření dom elementů a jejich obsahu.
body.js je soubor, který vytvoří obsah levé předpovědi.
header.js je soubor, který vytvoří obsah pravé předpovědi (dnešní den).
images.js je soubor, který vytvoří obrázky, jejich zdroj je z wiki api.
predpoved.js je napojen na openweathermap api.

grafy jsou vytvořené pomocí knihovny třetí strany chartjs.org 
ve složce js/chart jsou 2 soubory na vytvoření grafů pomocí api.

ostatní soubory:
search.js je soubor, který vyhledává výraz z našeptávače ze souboru city.json
savecity.js je soubor, který uloží město do lokální paměti
position.js je soubor, který určí vaši geolokaci.
index.js je soubor, který najde náhodné město ze souboru city.json a na úvodní stránce ho zobrazí v pravém banneru.
Chart.roundedBarCharts.min.js je knihovna třetí strany na zaoblené okraje u grafů.
helper.js je pár jednoduchých pomocných funkcí.
actions.js je pár funkcí, které slouží na přesměrování, tažení pomocí myši u divu s obrázky a pozici "míčku".
redirection.js je soubor, který vás přesměruje na mobilní verzi, pokud jste na mobilním zařízení.

(responsivnost je pouze na ipad a iphone X)

