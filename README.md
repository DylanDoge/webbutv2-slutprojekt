# Webbutveckling 2 Slutprojekt - KeyB Store
## Installerings Guide
För att kunna testa sidan så kan man använda Live Server
i VSCode för att öppna sidan. Men för att få den dynamiska krävs Python +3.6 med dessa libraries:
1. FastAPI
2. uvicorn
Genom Python pip kan de installeras genom bash/cmd/terminal/PS

```bash
    pip install fastapi
    pip install uvicorn
```
Eftersom att APIn använder sig av CORS (Cross-Origin Resource Sharing), kan det inte fungera för alla IP adresser eller användare som inte befinner sig i listan. Just nu är den inställt på den lokaka adressen 127.0.0.1:5500 och borde fungera utan att lägga till något, om den körs via Live Server. 

Men om det behövs så kan detta göras genom att gå in i main.py filen och lägga till adressen/IP i arrayen. 

 
___
## Om projektet
KeyB Store är en koncept för en webbshop anpassad för att sälja "custom mekaniska tangentbord". En hobby som har växt i populäritet i de senaste åren. Funktioner som en tangent validering finns för att slippa ladda ner liknande program. KeyB Store har syftet att UX ska vara enkelt att navigera och att produkterna är tydligt redovisad. 