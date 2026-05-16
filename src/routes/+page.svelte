<h1>PLATZHIRSCH</h1>


<div class="startbereich-page">
  
  <div class="text-bild">
    <p>PlatzHirsch ist deine Karte für Wilhelmsburg – entdecke besondere Orte, teile deine Lieblingsplätze und gestalte deinen Stadtteil mit.</p>
    <!-- <img src="/hirsch.jpg" alt="Hirsch" /> -->
  </div>

   <div class="text-info">
   <h2>Was ist PlatzHirsch?</h2>
    <p>Wir sammeln Orte die es wert sind gefunden zu werden. Parks, Treffpunkte, versteckte Ecken – vorgeschlagen von Menschen die Wilhelmsburg kennen.</p>
    
  </div>

     <div class="text-info">
     <h2>Wie funktioniert es?</h2>
    <p>Öffne die <a href="/Karte">Karte</a>, entdecke Orte in deiner Nähe und markiere deine Favoriten. Kennst du einen Ort der noch fehlt? Halte die Karte gedrückt und schlage ihn vor.</p>
    
  </div>

     <div class="text-info">
     <h2>Das Konzept:</h2>
    <p>PlatzHirsch lebt von seinen Nutzern. Jeder Ort auf der Karte wurde von jemandem vorgeschlagen, geprüft und freigegeben. Keine Werbung, keine gesponserten Einträge – nur echte Empfehlungen.</p>
    
  </div>

     <div class="text-info">
     <h2> Wie du mitmachst:</h2>
    <p>Du brauchst keinen Account um die Karte zu nutzen. <a href="login?mode=register">Registriere</a> dich wenn du Orte vorschlagen oder deine Favoriten dauerhaft speichern möchtest.</p>
    
  </div>



</div>

<style>
.startbereich-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 8rem;
  background-color: var(--bg);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
}
 h2 {
  text-align: center;
  width: 100%;
  background-color: var(--bg-nav);
  border-radius: 8px;
  padding: 4px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
 }

.text-bild {
  
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  width: 130%;
}

.text-bild p {
  font-size: 1.25rem;
  line-height: 1.6;
  text-align: justify;
  word-break: break-word;
  overflow-wrap: break-word;
}



.text-info {
  
  gap: 2rem;
  align-items: flex-start;
  justify-content: center;
  width: fit-content;
  max-width: 600px;
}

.text-info p {
  font-size: 1rem;
  line-height: 1.6;
  text-align: justify;
  word-break: break-word;
  overflow-wrap: break-word;
  width: fit-content;
   max-width: 600px;
}

a {
  color: var(--text);
  text-decoration: underline;
  cursor: pointer;
}

a:hover {
  color: var(--text-hover);
}

</style>