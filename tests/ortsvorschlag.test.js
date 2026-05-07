export{}
const res = await fetch("http://localhost:5173/api/ortvorschlag", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test Ort für HTTP requests",
    beschreibung: "Beschreibung",
    lat: 53.5,
    lng: 10.0,
    userId: "cmoscp9nz0002qj8g9bwsbdxj"
  })
});

console.log(await res.json());

