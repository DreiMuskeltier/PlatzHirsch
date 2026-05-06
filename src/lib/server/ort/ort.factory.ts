export class OrtFactory {
  static fromVorschlag(vorschlag: any) {
    return {
      name: vorschlag.name,
      beschreibung: vorschlag.beschreibung,
      lat: vorschlag.lat,
      lng: vorschlag.lng,
      createdById: vorschlag.createdById
    };
  }
}